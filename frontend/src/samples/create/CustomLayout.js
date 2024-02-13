import React, { useState, useEffect } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import "./styles.css";
import { useBlockNote, BlockNoteView } from "@blocknote/react";
import "@blocknote/react/style.css";
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
  }, [editorData, layout]);

  const editor = useBlockNote({
    initialContent: [],
    onEditorContentChange: (editor) => {
      setEditorData({
        time: Date.now(),
        blocks: editor.topLevelBlocks,
      });
    },
    domAttributes: {
      editor: {
        class: "editor",
        "data-test": "editor",
      },
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

const CustomLayout = (props) => {
  const [layout, setLayout] = useState([]);
  const [editorDataArray, setEditorDataArray] = useState([]);

  const defaultProps = {
    isDraggable: true,
    className: "layout",
    items: 4,
    rowHeight: 30,
    resizeHandles: ["s", "n", "e", "w"],
    cols: 4,
  };

  React.useEffect(() => {
    console.log("Custom Layout  :", editorDataArray);
  }, [editorDataArray]);

  const insertLayout = () => {
    const newLayout = [
      ...layout,
      {
        x: 0,
        y: 0,
        w: 1,
        h: 3,
        i: `${layout.length + 1}`,
      },
    ];
    setLayout(newLayout);
    // Here you can also update editorData.blocks if needed
  };

  function onLayoutChange(newLayout) {
    setLayout(newLayout);
    if (props.onLayoutChange) {
      props.onLayoutChange(newLayout);
    }
  }
  function handleEditorContentChange(layout, content) {
    setEditorDataArray((prevEditorDataArray) => {
      const newData = [...prevEditorDataArray];
      const dataIndex = newData.findIndex((data) => data.layout === layout);
      if (dataIndex !== -1) {
        newData[dataIndex] = { layout, content, ComponentName: "CustomLayout" };
      } else {
        newData.push({ layout, content, ComponentName: "CustomLayout" });
      }
      localStorage.setItem("CustomeditorData", JSON.stringify(newData));

      return newData;
    });
  }

  const handleOnClick = (e) => {
    console.log(e);
    e.stopPropagation();
  };

  return (
    <div className="relative">
      <div className="flex justify-end w-full mr-2 sticky top-0  bg-white shadow-md z-10 opacity-100  p-5">
        <Button LinkComponent={Link} variant="contained">
          Preview
        </Button>
      </div>
      <div className="m-5">
        <Button
          variant="contained"
          sx={{
            margin: "10px",
          }}
          onClick={insertLayout}
        >
          Insert Layout
        </Button>
      </div>
      <ReactGridLayout
        layout={layout}
        onLayoutChange={onLayoutChange}
        {...defaultProps}
      >
        {layout.map((item) => (
          <div
            key={item.i}
            className="grid"
            onClick={(e) => {
              handleOnClick(e);
            }}
          >
            <Editor onContentChange={handleEditorContentChange} />
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
};

export default CustomLayout;
