/**
 * faststart MP4 (type « qt-faststart ») en Node pur, sans réencodage.
 *
 * Les vidéos filmées sur mobile placent la boîte `moov` (métadonnées,
 * tables d'indexation) APRÈS les données `mdat`. Le navigateur doit alors
 * multiplier les requêtes Range (aller-retour début/fin du fichier) avant
 * de pouvoir lancer la lecture, ce qui provoque des écrans noirs ou des
 * échecs sur réseaux lents.
 *
 * Cette fonction réécrit le conteneur pour placer `moov` juste après `ftyp`
 * et corrige les offsets absolus des chunks (stco/co64). Aucune piste n'est
 * réencodée : l'opération est rapide et sans perte, la taille est identique.
 *
 * Ne s'applique qu'aux MP4/M4V/MOV de type ISO (les WebM ne sont pas
 * concernés). En cas de structure inattendue, on renvoie le buffer d'origine
 * pour ne jamais bloquer un upload.
 */

interface Mp4Box {
  type: string;
  start: number;
  size: number;
  header: number;
  dataStart: number;
  dataEnd: number;
}

const CONTAINERS = new Set([
  "moov",
  "trak",
  "mdia",
  "minf",
  "stbl",
  "udta",
  "edts",
  "dinf",
  "mvex",
  "moof",
  "traf",
  "mfra",
  "skip",
  "meta",
  "ilst",
  "sinf",
  "schi",
]);

function parseBoxes(buf: Buffer, start: number, end: number): Mp4Box[] {
  const boxes: Mp4Box[] = [];
  let p = start;
  while (p + 8 <= end) {
    let size = buf.readUInt32BE(p);
    const type = buf.toString("latin1", p + 4, p + 8);
    let header = 8;
    if (size === 1) {
      size = Number(buf.readBigUInt64BE(p + 8));
      header = 16;
    } else if (size === 0) {
      size = end - p;
    }
    if (size < header || p + size > end) break;
    boxes.push({
      type,
      start: p,
      size,
      header,
      dataStart: p + header,
      dataEnd: p + size,
    });
    p += size;
  }
  return boxes;
}

/** Corrige en place les offsets de chunks dans une copie du buffer `moov`. */
function patchChunkOffsets(moovBuf: Buffer, delta: number): number {
  let patched = 0;

  const walk = (s: number, e: number) => {
    let p = s;
    while (p + 8 <= e) {
      let size = moovBuf.readUInt32BE(p);
      const type = moovBuf.toString("latin1", p + 4, p + 8);
      let header = 8;
      if (size === 1) {
        size = Number(moovBuf.readBigUInt64BE(p + 8));
        header = 16;
      } else if (size === 0) {
        size = e - p;
      }
      if (size < header || p + size > e) break;

      const dStart = p + header;

      if (type === "stco") {
        const count = moovBuf.readUInt32BE(dStart + 4);
        for (let i = 0; i < count; i++) {
          const o = dStart + 8 + i * 4;
          const val = moovBuf.readUInt32BE(o) + delta;
          // Au-delà de 4 Go il faudrait convertir stco en co64 ; les vidéos
          // du site sont plafonnées à 60 Mo, donc ce cas ne doit pas arriver.
          if (val > 0xffffffff) {
            throw new Error("Offset supérieur à 4 Go, non géré");
          }
          moovBuf.writeUInt32BE(val >>> 0, o);
          patched++;
        }
      } else if (type === "co64") {
        const count = moovBuf.readUInt32BE(dStart + 4);
        for (let i = 0; i < count; i++) {
          const o = dStart + 8 + i * 8;
          const val = Number(moovBuf.readBigUInt64BE(o)) + delta;
          moovBuf.writeBigUInt64BE(BigInt(val), o);
          patched++;
        }
      } else if (CONTAINERS.has(type)) {
        // La boîte `meta` contient un en-tête version/flags de 4 octets
        // avant ses boîtes enfants.
        const childStart = type === "meta" ? dStart + 4 : dStart;
        walk(childStart, p + size);
      }

      p += size;
    }
  };

  walk(0, moovBuf.length);
  return patched;
}

export interface FaststartResult {
  buffer: Buffer;
  changed: boolean;
}

/**
 * Renvoie une version « web optimized » du MP4 (moov en tête).
 * Si le fichier est déjà optimisé ou n'est pas un MP4 exploitable,
 * renvoie le buffer d'origine.
 */
export function mp4Faststart(input: Buffer): FaststartResult {
  try {
    const top = parseBoxes(input, 0, input.length);
    const ftyp = top.find((b) => b.type === "ftyp");
    const moov = top.find((b) => b.type === "moov");
    const mdat = top.find((b) => b.type === "mdat");

    if (!moov || !mdat) {
      return { buffer: input, changed: false };
    }
    if (moov.start < mdat.start) {
      return { buffer: input, changed: false };
    }

    const moovBuf = Buffer.from(input.subarray(moov.start, moov.start + moov.size));
    const kept = top.filter((b) => b.type !== "moov" && b.type !== "ftyp");

    // Nouvelle disposition : [ftyp][moov][autres boîtes dans l'ordre d'origine].
    const oldMdatData = mdat.dataStart;
    let cursor = ftyp ? ftyp.size : 0;
    cursor += moov.size;
    for (const b of kept) {
      if (b.type === "mdat") break;
      cursor += b.size;
    }
    const newMdatData = cursor + mdat.header;
    const delta = newMdatData - oldMdatData;

    patchChunkOffsets(moovBuf, delta);

    const parts: Buffer[] = [];
    if (ftyp) parts.push(input.subarray(ftyp.start, ftyp.start + ftyp.size));
    parts.push(moovBuf);
    for (const b of kept) {
      parts.push(input.subarray(b.start, b.start + b.size));
    }

    const out = Buffer.concat(parts);
    if (out.length !== input.length) {
      return { buffer: input, changed: false };
    }
    return { buffer: out, changed: true };
  } catch {
    // Structure inattendue : ne pas casser l'upload, conserver l'original.
    return { buffer: input, changed: false };
  }
}
