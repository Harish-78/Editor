import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./layout/HomeScreen";
import EditorScreen from "./Screens/EditorScreen";
import SettingsScreen from "./Screens/SettingsScreen";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/editor" element={<EditorScreen />} />
          <Route path="/settings" element={<SettingsScreen/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
