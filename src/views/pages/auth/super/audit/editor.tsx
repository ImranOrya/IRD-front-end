import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const QuillEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      const Size: any = Quill.import("formats/size");
      Size.whitelist = ["small", "medium", "large", "huge"];
      Quill.register(Size, true);

      const quill = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              [{ size: ["small", "medium", "large", "huge"] }],
              ["undo", "redo"],
            ],
            handlers: {
              undo: () => handleUndo(quill),
              redo: () => handleRedo(quill),
            },
          },
          history: {
            delay: 1000,
            maxStack: 100,
            userOnly: true,
          },
        },
      });
    }
  }, []);

  const handleUndo = (quill: Quill) => {
    quill.history.undo();
    console.log("you clicked undo");
  };

  const handleRedo = (quill: Quill) => {
    quill.history.redo();
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Quill Editor with TailwindCSS</h2>
      <div
        ref={editorRef}
        className="bg-white shadow-md rounded-lg p-4 border border-gray-300"
        style={{ height: "300px", width: "800px" }}
      />
    </div>
  );
};

export default QuillEditor;
