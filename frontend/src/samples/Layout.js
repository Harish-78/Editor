import React, { useState } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import "./styles.css";
import Editor from "./Editor";
import { Button } from "@mui/material";

const ReactGridLayout = WidthProvider(RGL);

const Layout2 = (props) => {
  const [layout, setLayout] = useState(generateLayout());
  const defaultProps = {
    isDraggable: false,

    className: "layout",
    items: 2,
    rowHeight: 30,
    resizeHandles: ["s", "n"],
    cols: 2,
  };

  function generateDOM() {
    return [
      <div key={"1"} className="grid">
        <Editor />
      </div>,
      <div key={"2"} className="grid">
        <Editor />
      </div>,
    ];
  }

  function generateLayout() {
    return [
      {
        x: 0,
        y: 0,
        w: 1,
        h: 13,
        i: "1",
      },
      {
        x: 1,
        y: 0,
        w: 1,
        h: 13,
        i: "2",
      },
    ];
  }

  function onLayoutChange(layout) {
    setLayout(layout);
    if (props.onLayoutChange) {
      props.onLayoutChange(layout);
    }
  }

  return (
    <div>
      <ReactGridLayout
        layout={layout}
        onLayoutChange={onLayoutChange}
        {...defaultProps}
      >
        {generateDOM()}
      </ReactGridLayout>
    </div>
  );
};

const Layout3 = (props) => {
  const [layout, setLayout] = useState(generateLayout());
  const defaultProps = {
    isDraggable: false,

    className: "layout",
    items: 3,
    rowHeight: 30,
    resizeHandles: ["s", "n"],
    cols: 3,
  };

  function generateDOM() {
    return [
      <div key={"1"} className="grid">
        <Editor />
      </div>,
      <div key={"2"} className="grid">
        <Editor />
      </div>,
      <div key={"3"} className="grid">
        <Editor />
      </div>,
    ];
  }

  function generateLayout() {
    return [
      {
        x: 0,
        y: 0,
        w: 1,
        h: 13,
        i: "1",
      },
      {
        x: 1,
        y: 0,
        w: 1,
        h: 13,
        i: "2",
      },
      {
        x: 2,
        y: 0,
        w: 1,
        h: 13,
        i: "3",
      },
    ];
  }

  function onLayoutChange(layout) {
    setLayout(layout);
    if (props.onLayoutChange) {
      props.onLayoutChange(layout);
    }
  }

  return (
    <div>
      <ReactGridLayout
        layout={layout}
        onLayoutChange={onLayoutChange}
        {...defaultProps}
      >
        {generateDOM()}
      </ReactGridLayout>
    </div>
  );
};

const CustomLayout = (props) => {
  const [layout, setLayout] = useState([]);

  const defaultProps = {
    className: "layout",
    items: 4,
    rowHeight: 30,
    resizeHandles: ["s", "n", "e", "w"],
    cols: 4,
  };

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

  return (
    <div>
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
            <Editor />
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
};

export { Layout2, Layout3, CustomLayout };
