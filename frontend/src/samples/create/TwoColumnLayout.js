import React, { useState, useEffect } from "react";
import {
  BlockNoteEditor,
  uploadToTmpFilesDotOrg_DEV_ONLY,
} from "@blocknote/core";
import { useBlockNote, BlockNoteView } from "@blocknote/react";
import "@blocknote/react/style.css";
import RGL, { WidthProvider } from "react-grid-layout";
import "./styles.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const ReactGridLayout = WidthProvider(RGL);

function Editor({ layout, onContentChange }) {
  const [editorData, setEditorData] = useState({
    time: Date.now(),
    blocks: [],
  });

  useEffect(() => {
    onContentChange(layout, editorData);
  }, [editorData, layout, onContentChange]);

  const editor = useBlockNote({
    initialContent: [],
    uploadFile: uploadToTmpFilesDotOrg_DEV_ONLY,
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
    <div className={`overflow-hidden`}>
      <BlockNoteView editor={editor} />
    </div>
  );
}

const CreateLayout2 = (props) => {
  const [layout, setLayout] = useState(generateLayout());
  const [editorDataArray, setEditorDataArray] = useState([]);

  const defaultProps = {
    isDraggable: false,
    className: "layout",
    items: 2,
    rowHeight: 30,
    resizeHandles: ["s", "n", "e", "w"],
    cols: 2,
  };
  console.log(props);

  React.useEffect(() => {
    console.log("Layout 2 :", editorDataArray);
  }, [editorDataArray]);

  function generateLayout() {
    return [
      { x: 0, y: 0, w: 1, h: 13, i: "1" },
      { x: 1, y: 0, w: 1, h: 13, i: "2" },
      { x: 2, y: 0, w: 1, h: 13, i: "3" },
    ];
  }

  function onLayoutChange(layout) {
    setLayout(layout);
  }

  function handleEditorContentChange(layout, content) {
    setEditorDataArray((prevEditorDataArray) => {
      const newData = [...prevEditorDataArray];
      const dataIndex = newData.findIndex((data) => data.layout === layout);
      if (dataIndex !== -1) {
        newData[dataIndex] = { layout, content, ComponentName: "Layout2" };
      } else {
        newData.push({ layout, content, ComponentName: "Layout2" });
      }
      localStorage.setItem("editorData", JSON.stringify(newData));
      return newData;
    });
  }

  return (
    <div className="relative">
      <div className="flex justify-end w-full mr-2 sticky top-0 shadow-md z-10 opacity-100 bg-white  p-5  ">
        <Button
          LinkComponent={Link}
          variant="contained"
          to="/twoColumnpdfviewer"
        >
          {" "}
          Preview
        </Button>
      </div>
      <div className="m-5">
        <ReactGridLayout
          layout={layout}
          onLayoutChange={onLayoutChange}
          {...defaultProps}
        >
          <div key={"1"} className="grid">
            <Editor layout={"1"} onContentChange={handleEditorContentChange} />
          </div>
          <br />
          <div key={"2"} className="grid">
            <Editor layout={"2"} onContentChange={handleEditorContentChange} />
          </div>
        </ReactGridLayout>
      </div>
    </div>
  );
};

export default CreateLayout2;
