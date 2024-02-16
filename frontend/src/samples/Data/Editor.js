import React from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = ({ placeholder }) => {
  const [editorHtml, setEditorHtml] = React.useState("");
  const [theme, setTheme] = React.useState("snow");

  const handleChange = (html) => {
    setEditorHtml(html);
  };

  const handleThemeChange = (newTheme) => {
    if (newTheme === "core") newTheme = null;
    setTheme(newTheme);
  };

  return (
    <div>
      <ReactQuill
        theme={theme}
        onChange={handleChange}
        value={editorHtml}
        modules={Editor.modules}
        formats={Editor.formats}
        bounds={".app"}
        placeholder={placeholder}
      />
    </div>
  );
};

Editor.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

Editor.propTypes = {
  placeholder: PropTypes.string,
};

export default Editor;
