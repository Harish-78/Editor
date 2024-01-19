import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ color: [] }, { background: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["blockquote", "code-block"],
    [{ script: "sub" }, { script: "super" }],
  ],
};

function Editor(props) {
  const [value, setValue] = useState(props.data);

  const handleEditorChange = (newValue) => {
    setValue(newValue);
    props.onUpdate(newValue);
  };

  useEffect(() => {
    if (props.data !== undefined) {
      setValue(props.data);
    } else {
      // Handle the case when props.data is undefined (clear the editor)
      setValue("");
    }
  }, [props.data]);

  return (
    <div>
      <ReactQuill
        style={{ height: "65vh", width: "min-width" }}
        theme="snow"
        value={value}
        onChange={handleEditorChange}
        modules={modules}
      />
    </div>
  );
}

export default Editor;
