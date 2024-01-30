import React, { useState } from "react";
import { useBlockNote, BlockNoteView } from "@blocknote/react";
import "@blocknote/react/style.css";
import { useData } from "../context/DataContext";

const now = Date.now();

const Editor = ({ onDataFromChild }) => {
  const [editorData, setEditorData] = useState({
    time: now,
    blocks: [],
  });

  const sendDatatoFileScreen = () => {
    onDataFromChild(editorData);
  };

  React.useEffect(() => {
    sendDatatoFileScreen();
  });

  const { data } = useData();
  console.log(data);

  const editor = useBlockNote({
    initialContent: data ? data?.blocks : editorData?.blocks ?? [],
    onEditorContentChange: (editor) => {
      setEditorData({
        time: Date.now(),
        blocks: editor.topLevelBlocks,
      });
    },
    onEditorReady: (editor) => {
      editor.domElement?.focus();
    },
  });

  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <div style={{ width: "80%", padding: "5px" }}>
          <div>
            <BlockNoteView editor={editor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
