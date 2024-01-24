import React from "react";
import { useBlockNote, BlockNoteView } from "@blocknote/react";
import "@blocknote/react/style.css";

// Create a new BlockNote editor with the video block
function EditorScreen() {
  const [value, setData] = React.useState([]);
  const editor = useBlockNote();

  return (
    <BlockNoteView editor={editor} value={value} onChange={(d) => setData(d)} />
  );
}

export default EditorScreen;
