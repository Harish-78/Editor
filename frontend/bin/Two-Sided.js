import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import "./styles.css";

const ReactGridLayout = WidthProvider(RGL);

const ResizableHandles = () => {
  const defaultProps = {
    className: "layout",
    items: 3,
    rowHeight: 30,
    onLayoutChange: () => {},
    cols: 3,
  };

  const generateDOM = () => {
    return _.map(_.range(defaultProps.items), (i) => {
      return (
        <div key={i} className="grid">
          <span className="text">{i}</span>
        </div>
      );
    });
  };

  const generateLayout = () => {
    const availableHandles = ["s", "w", "e", "n"];
    return _.map(new Array(defaultProps.items), (item, i) => {
      const y = _.result(defaultProps, "y") || Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 2) % 3,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        i: i.toString(),
        resizeHandles: availableHandles,
      };
    });
  };

  const onLayoutChange = (layout) => {
    defaultProps.onLayoutChange(layout);
  };

  return (
    <ReactGridLayout
      layout={generateLayout()}
      onLayoutChange={onLayoutChange}
      {...defaultProps}
    >
      {generateDOM()}
    </ReactGridLayout>
  );
};

export default ResizableHandles;

if (process.env.STATIC_EXAMPLES === true) {
  import("./components/hooks/test-hook").then((fn) => fn.default(ResizableHandles));
}





