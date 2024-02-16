import React, { useState, useEffect } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import { useBlockNote, BlockNoteView } from "@blocknote/react";
import "@blocknote/react/style.css";
import { Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";
import CloseIcon from "@mui/icons-material/Close";
import "./styles.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

function Editor({ i, onContentChange }) {
  const [editorData, setEditorData] = useState({
    time: Date.now(),
    blocks: [],
  });
  const alreadyStoredData = JSON.parse(
    localStorage.getItem("CustomeditorData")
  );
  const contents =
    alreadyStoredData?.length > 0
      ? alreadyStoredData.map((x, i) => x?.content)
      : [];

  console.log(contents);

  useEffect(() => {
    onContentChange(editorData);
  }, [editorData]);

  const editor = useBlockNote({
    initialContent: [],
    onEditorContentChange: (editor) => {
      setEditorData({
        i: i,
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
      <span>
        <BlockNoteView editor={editor} />
      </span>
    </div>
  );
}

const CustomLayout = () => {
  const localitemData = JSON.parse(localStorage.getItem("rgl-7"));

  const [editorDataArray, setEditorDataArray] = useState([]);

  const itemData = (localitemData || []).map((i, key, list) => ({
    i: i?.i || i.toString(),
    x: i?.x !== null ? i?.x : i * 6 || i * 6,
    y: i?.y || 0,
    w: i?.w || 2,
    h: i?.h || 2,
    add: i === list.length - 1,
  }));
  const [items, setItems] = useState(itemData);

  const [newCounter, setNewCounter] = useState(0);
  const [layout, setLayout] = useState([]);
  const [cols, setCols] = useState();
  const [draggable, setDraggable] = useState(false);
  const [resizeable, setResizable] = useState(false);
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setDraggable(event.target.checked);
    setResizable(event.target.checked);
    setChecked(event.target.checked);
  };

  function handleEditorContentChange(content) {
    setEditorDataArray((prevEditorDataArray) => {
      const newData = [...prevEditorDataArray];
      const dataIndex = newData.findIndex(
        (data) => data.layout?.i == content?.i
      );
      const layoutIndex = Number(content?.i);
      if (dataIndex !== -1) {
        newData[dataIndex] = { layout: layout[layoutIndex], content };
      } else {
        newData.push({ layout: layout[layoutIndex], content });
      }
      const filteredData = newData.filter((data) => data.layout !== undefined);
      localStorage.setItem("CustomeditorData", JSON.stringify(filteredData));
      return filteredData;
    });

    console.log("editorArray", editorDataArray);
  }

  const createElement = (el) => {
    const i = el.add ? "+" : el.i;
    return (
      <div key={i} className="box" data-grid={el}>
        <div className="m-2 flex justify-end">
          <IconButton onClick={() => onRemoveItem(i)}>
            <CloseIcon />
          </IconButton>
        </div>
        <span className="text">
          <Editor i={i} onContentChange={handleEditorContentChange} />
        </span>
      </div>
    );
  };

  const onLayoutChange = (layout) => {
    if (layout.length > 0) {
      localStorage.setItem("rgl-7", JSON.stringify(layout));
      setLayout(layout);
    } else {
      localStorage.removeItem("rgl-7");
      setLayout([]);
    }
  };

  const onAddItem = () => {
    setItems([
      ...layout,
      {
        i: newCounter,
        x: (items.length * 6) % (cols || 12),
        y: Infinity,
        w: 6,
        h: 4,
      },
    ]);
    setNewCounter(newCounter + 1);
  };

  const onBreakpointChange = (breakpoint, cols) => {
    setCols(cols);
  };

  const onRemoveItem = (i) => {
    console.log("removing", i);
    setItems(_.reject(items, { i: i }));
  };

  const defaultProps = {
    isDraggable: draggable ? true : false,
    isResizeable: resizeable ? true : false,
    className: "layout",
    rowHeight: 100,
    resizeHandles: resizeable ? ["s", "n", "e", "w"] : [],
  };

  return (
    <div className="relative">
      <div
        className="flex justify-between w-full mr-2 sticky top-0  bg-white shadow-md z-10 opacity-100  p-5"
        id="nav"
      >
        <div>
          <Button variant="contained" onClick={onAddItem}>
            Insert Layout
          </Button>
        </div>

        <div className="flex">
          <Button
            LinkComponent={Link}
            sx={{
              height: "50px",
            }}
            variant="contained"
            to="/customLayoutpdfviewer"
          >
            Preview
          </Button>
          <div className="flex  flex-col justify-end ">
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
          <div>
            <p className="text-[15px]">draggable : {checked ? `ON` : `OFF`}</p>
            <p className="text-[15px]">Resizable : {checked ? `ON` : `OFF`}</p>
          </div>
        </div>
      </div>
      <div>
        <ResponsiveReactGridLayout
          onLayoutChange={onLayoutChange}
          onBreakpointChange={onBreakpointChange}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          useCSSTransforms={true}
          allowOverlap={false}
          {...defaultProps}
        >
          {_.map(items, (el) => createElement(el))}
        </ResponsiveReactGridLayout>
      </div>
    </div>
  );
};

export default CustomLayout;
