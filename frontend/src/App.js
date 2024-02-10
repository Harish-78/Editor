import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./layout/HomeScreen";
import SettingsScreen from "./Screens/SettingsScreen";
import TrashScreen from "./Screens/TrashScreen";
import TemplatesScreen from "./Screens/TemplatesScreen";
import SimpleDialogDemo from "./components/SearchDialog";
import Editor from "./samples/Editor";
import Parent from "./samples/Parent";
// import Parent from "./samples/Parent";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Editor />} /> */}
          <Route path="/" element={<Parent />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/trash" element={<TrashScreen />} />
          <Route path="/templates" element={<TemplatesScreen />} />
          <Route path="/editor/:id" element={<Editor />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/searchDialog" element={<SimpleDialogDemo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
