import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./layout/HomeScreen";
import EditorScreen from "./Screens/EditorScreen";
import SettingsScreen from "./Screens/SettingsScreen";
import "./App.css";
import FilesScreen from "./Screens/FilesScreen";
import TrashScreen from "./Screens/TrashScreen";
import TemplatesScreen from "./Screens/TemplatesScreen";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/editor" element={<EditorScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/files" element={<FilesScreen />} />
          <Route path="/trash" element={<TrashScreen />} />
          <Route path="/templates" element={<TemplatesScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
