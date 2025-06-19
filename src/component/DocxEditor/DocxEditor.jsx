import React, { useState } from "react";
import { saveAs } from "file-saver";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
} from "docx";

const DocxEditor = () => {
  const [text, setText] = useState("");

//   const handleDownload = async () => {
//     const doc = new Document({
//       sections: [
//         {
//           children: text.split("\n").map(
//             (line) =>
//               new Paragraph({
//                 children: [new TextRun(line)],
//               })
//           ),
//         },
//       ],
//     });

//     const blob = await Packer.toBlob(doc);
//     saveAs(blob, "document.docx");
//   };


    const run1 = new TextRun({ text: "Привет, ", font: "Arial", size: 28 });
    const run2 = new TextRun({ text: "это ", italic: true, color: "007ACC", size: 28 });
    const run3 = new TextRun({ text: "пример ", bold: true, underline: {}, size: 28 });

//     const handleDownload = async () => {

//         const paragraph = new Paragraph({
//             children: [run1, run2, run3],
//         });

//         const doc = new Document({
//         sections: [{children: [paragraph]}, {children: [paragraph]}],
//         });

//     const blob = await Packer.toBlob(doc);
//     saveAs(blob, "document.docx");
//   };


  const handleDownload = async () => {

    const textRun = new TextRun({
        text: text
    })
    const paragraph = new Paragraph({
        children: [textRun]
    })
    const doc = new Document({
        sections: [{children: [paragraph]}, {children: [paragraph]}]

    })

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "document.docx");
  }


  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Редактор текста</h1>
      <textarea
        className="w-full h-60 border p-2 rounded resize-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите ваш текст здесь..."
      />
      <button
        onClick={handleDownload}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Скачать .docx
      </button>
    </div>
  );
};

export default DocxEditor;
