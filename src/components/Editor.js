import "./styles.css";
import React, { useState } from "react";
import Editor from "./editor/Editor";
import EditorTextParser from "./editor-parser/EditorTextParser";

export default function EditorScreen(props) {
  const [data, setData] = useState(props.editorData);  
  return (
    <div className="App">
      <div className="app-content">
        {data ? (
          <Editor data={data} setData={setData} />
        ) : (
          <EditorTextParser data={data} />
        )}
      </div>
    </div>
  );
}
