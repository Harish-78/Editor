import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./layout/HomeScreen";
import SettingsScreen from "./Screens/SettingsScreen";
import "./App.css";
import TrashScreen from "./Screens/TrashScreen";
import TemplatesScreen from "./Screens/TemplatesScreen";
import Editor from "./Screens/EditorScreen";
import SimpleDialogDemo from "./components/SearchDialog";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/trash" element={<TrashScreen />} />
          <Route path="/templates" element={<TemplatesScreen />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/searchDialog" element={<SimpleDialogDemo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
