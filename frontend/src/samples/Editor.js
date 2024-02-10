import React, { useState } from "react";
import { useBlockNote, BlockNoteView } from "@blocknote/react";
import "@blocknote/react/style.css";

function Editor() {
  const [isHovered, setIsHovered] = useState(false);
  const [editorData, setEditorData] = useState({
    time: Date.now(),
    blocks: [],
  });
  React.useEffect(() => {
    console.log(editorData);
  }, [editorData]);
  const editor = useBlockNote({
    initialContent: [],
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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`overflow-hidden  p-5`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <BlockNoteView editor={editor} />
    </div>
  );
}

export default Editor;
