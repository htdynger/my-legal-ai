import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import './TextEditor.css'
// Кастомные расширения для размера и шрифта
import { FontFamily } from "@tiptap/extension-font-family";


const TextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Strike,
      TextStyle,
      FontFamily,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "<p>Введите текст здесь...</p>",
    onUpdate: ({ editor }) => {
        const html = editor.getHTML(); // HTML с форматированием
        const json = editor.getJSON(); // JSON, где видно, какие стили применены
        console.log("HTML:", html);
        console.log("JSON:", json);
      },
  });

  if (!editor) return null;

  return (
    <div>
      <div className="toolbar" style={{ marginBottom: "1rem" }}>
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          Жирный
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
          Подчеркнутый
        </button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()}>
          Зачеркнутый
        </button>

        <select
          onChange={(e) =>
            editor.chain().focus().setFontFamily(e.target.value).run()
          }
          defaultValue=""
        >
          <option value="">Шрифт</option>
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Courier New">Courier New</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>

        <select
          onChange={(e) =>
            editor.chain().focus().setFontSize(e.target.value).run()
          }
          defaultValue=""
        >
          <option value="">Размер</option>
          <option value="12px">12px</option>
          <option value="16px">16px</option>
          <option value="20px">20px</option>
          <option value="24px">24px</option>
        </select>

        <button onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          Влево
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign("center").run()}>
          Центр
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          Вправо
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;
