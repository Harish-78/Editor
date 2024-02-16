import React, { useState } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
// import "./styles.css";
import { Button } from "@mui/material";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import DownloadIcon from "@mui/icons-material/Download";

const ReactGridLayout = WidthProvider(RGL);

const CustomLayoutPdfViewer = (props) => {
  const initialContent = JSON.parse(localStorage.getItem("CustomeditorData"));
  initialContent.shift();
  console.log(initialContent);
  // console.log(JSON.parse(initialContent));
  // const [layout, setLayout] = useState(initialContent);

  // const defaultProps = {
  //   isDraggable: false,
  //   isResizeable: false,
  //   className: "layout",
  //   items: 4,
  //   rowHeight: 30,
  //   resizeHandles: [],
  //   cols: 4,
  // };

  // const editor = useBlockNote({
  //   editable: false,
  //   // initialContent: initialContent
  //   //   ? JSON.parse(initialContent)[0]?.content?.blocks
  //   //   : undefined,
  // });

  // function onLayoutChange(newLayout) {
  //   setLayout(newLayout);
  //   if (props.onLayoutChange) {
  //     props.onLayoutChange(newLayout);
  //   }
  // }

  return (
    <div>
      <div className="flex justify-end">
        <Button
          startIcon={<DownloadIcon />}
          sx={{
            margin: "10px",
          }}
          variant="contained"
          color="info"
          onClick={""}
        >
          Download PDF
        </Button>
      </div>

      {/* <ReactGridLayout
        layout={layout}
        onLayoutChange={onLayoutChange}
        {...defaultProps}
      >
        {layout.map((item) => (
          <div key={item.i} className="grid">
            <BlockNoteView editor={editor} />
          </div>
        ))}
      </ReactGridLayout> */}
    </div>
  );
};

export default CustomLayoutPdfViewer;
