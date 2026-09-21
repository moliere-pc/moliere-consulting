"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo2,
  Redo2,
  Link as LinkIcon,
  Image as ImageIcon,
  Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";

function ToolbarButton({
  active,
  onClick,
  label,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={cn(
        "inline-flex h-8.5 w-8.5 items-center justify-center rounded-lg text-ink-600 transition-colors",
        active ? "bg-brand-50 text-brand-700" : "hover:bg-cream hover:text-brand-700"
      )}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({
  name,
  defaultValue,
  placeholder = "Saisissez le contenu…",
}: {
  name: string;
  defaultValue?: string | null;
  placeholder?: string;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-brand-700 underline", rel: "noopener noreferrer" },
      }),
      Image.configure({ inline: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: defaultValue ?? "",
    editorProps: {
      attributes: {
        class:
          "admin-prose min-h-[260px] px-4 py-3 text-sm leading-relaxed text-ink-800 outline-none",
      },
    },
  });

  if (!editor) {
    return <input type="hidden" name={name} value={defaultValue ?? ""} />;
  }

  function addLink() {
    if (!editor) return;
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL du lien (https://…)", previous ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  function addImage() {
    if (!editor) return;
    const url = window.prompt("Adresse de l'image (/uploads/… ou https://…)");
    if (url) editor.chain().focus().setImage({ src: url, alt: "" }).run();
  }

  return (
    <div className="overflow-hidden rounded-xl border border-ink-200 bg-white focus-within:border-brand-400 focus-within:ring-4 focus-within:ring-brand-100">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-ink-150 bg-cream/60 px-2 py-1.5">
        <ToolbarButton label="Gras" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold size={16} />
        </ToolbarButton>
        <ToolbarButton label="Italique" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic size={16} />
        </ToolbarButton>
        <ToolbarButton label="Souligné" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon size={16} />
        </ToolbarButton>
        <span className="mx-1 h-5 w-px bg-ink-150" />
        <ToolbarButton label="Titre 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 size={17} />
        </ToolbarButton>
        <ToolbarButton label="Titre 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <Heading3 size={17} />
        </ToolbarButton>
        <span className="mx-1 h-5 w-px bg-ink-150" />
        <ToolbarButton label="Liste à puces" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List size={17} />
        </ToolbarButton>
        <ToolbarButton label="Liste numérotée" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered size={17} />
        </ToolbarButton>
        <ToolbarButton label="Citation" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote size={16} />
        </ToolbarButton>
        <ToolbarButton label="Séparateur" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus size={17} />
        </ToolbarButton>
        <span className="mx-1 h-5 w-px bg-ink-150" />
        <ToolbarButton label="Lien" active={editor.isActive("link")} onClick={addLink}>
          <LinkIcon size={16} />
        </ToolbarButton>
        <ToolbarButton label="Image" onClick={addImage}>
          <ImageIcon size={16} />
        </ToolbarButton>
        <span className="mx-1 h-5 w-px bg-ink-150" />
        <ToolbarButton label="Annuler" onClick={() => editor.chain().focus().undo().run()}>
          <Undo2 size={15} />
        </ToolbarButton>
        <ToolbarButton label="Refaire" onClick={() => editor.chain().focus().redo().run()}>
          <Redo2 size={15} />
        </ToolbarButton>
      </div>
      <EditorContent editor={editor} />
      <input type="hidden" name={name} value={editor.getHTML()} />
    </div>
  );
}
