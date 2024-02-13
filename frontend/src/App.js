import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Parent from "./samples/Parent";
import CreateLayout2 from "./samples/create/TwoColumnLayout";
import CreateLayout3 from "./samples/create/ThreeColumnLayout";
import TwoColumnPdfViewer from "./samples/View/TwoColumnPdfViewer";
import ThreeColumnPdfViewer from "./samples/View/ThreeColumnPdfViewer";
import CustomLayout from "./samples/create/CustomLayout";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Parent />} />
          <Route path="/twoColumn" element={<CreateLayout2 />} />
          <Route path="/threeColumn" element={<CreateLayout3 />} />
          <Route path="/custom" element={<CustomLayout />} />
          <Route path="/twoColumnpdfviewer" element={<TwoColumnPdfViewer />} />
          <Route
            path="/threeColumnpdfviewer"
            element={<ThreeColumnPdfViewer />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
