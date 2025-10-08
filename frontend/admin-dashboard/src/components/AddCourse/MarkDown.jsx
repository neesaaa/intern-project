import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

export default function MarkdownField({ label, name, value = '', onChange, field, placeholder }) {
  const [editorValue, setEditorValue] = useState(value);

  const handleChange = (newValue) => {
    setEditorValue(newValue);
    if (onChange) {
      onChange(prev => ({
        ...prev,
        [field]: newValue
      }));
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full text-black" data-color-mode="light">
      {label && (
        <label className="font-medium text-[14px] leading-[100%] tracking-[0.02em]">
          {label}
        </label>
      )}

      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <MDEditor
          value={editorValue}
          onChange={handleChange}
          hideToolbar={false}
          preview="edit"
          height={200}
          textareaProps={{
            placeholder: placeholder || "Write here...",
          }}
          style={{
            backgroundColor: "white",
            color: "black",
            fontFamily: "IBM Plex Sans Arabic, sans-serif",
          }}
        />
      </div>

      <textarea name={name} value={editorValue} readOnly hidden />
    </div>
  );
}