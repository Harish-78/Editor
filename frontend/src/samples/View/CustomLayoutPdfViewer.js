import React, { useState } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
// import "./styles.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";

const ReactGridLayout = WidthProvider(RGL);

const CustomLayout = (props) => {
  const initialContent = localStorage.getItem("ThreeColumneditorData");
  const [layout, setLayout] = useState([]);
  const [editorInstance, setEditorInstance] = useState(null);

  const defaultProps = {
    className: "layout",
    items: 4,
    rowHeight: 30,
    resizeHandles: ["s", "n", "e", "w"],
    cols: 4,
  };

  // Creates a new editor instance.
  const editor = useBlockNote({
    editable: false,
    initialContent: initialContent
      ? JSON.parse(initialContent)[0]?.content?.blocks
      : undefined,
    onEditorReady: (editor) => {
      setEditorInstance(editor);
    },
  });


  

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
  };

  function onLayoutChange(newLayout) {
    setLayout(newLayout);
    if (props.onLayoutChange) {
      props.onLayoutChange(newLayout);
    }
  }

  return (
    <div>
      <div className="flex justify-end">
        <Button
          LinkComponent={Link}
          variant="contained"
          sx={{
            margin: "10px",
          }}
          to="/pdfviewer"
        >
          Preview
        </Button>
      </div>
      <div>
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
          <div key={item.i} className="grid">
            {/* <Editor /> */}
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
};

export default CustomLayout;
