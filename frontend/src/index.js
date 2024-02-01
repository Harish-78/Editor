import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DataProvider } from "./context/DataContext";
import { FolderDataProvider } from "./context/FolderDataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FolderDataProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </FolderDataProvider>
  </React.StrictMode>
);
