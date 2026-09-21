import { prisma } from "@/lib/prisma";
import { MediaGrid } from "@/components/admin/media-grid";
import { deleteMedia } from "./actions";

export default async function MediaPage() {
  const items = await prisma.media.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <MediaGrid
      items={items.map((m) => ({
        id: m.id,
        path: m.path,
        size: m.size,
        kind: m.kind,
        createdAt: m.createdAt.toISOString(),
      }))}
      deleteAction={deleteMedia}
    />
  );
}
