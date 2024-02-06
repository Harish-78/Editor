import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { FileDataProvider } from "./context/FileDataContext";
import { FolderDataProvider } from "./context/FolderDataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FolderDataProvider>
      <FileDataProvider>
        <App />
      </FileDataProvider>
    </FolderDataProvider>
  </React.StrictMode>
);
