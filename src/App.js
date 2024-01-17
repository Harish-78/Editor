import React from "react";
import ClippedDrawer from "./components/Drawer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/SideBar";

const App = () => {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<ClippedDrawer />} />
            <Route path="/sidebar" element={<Sidebar/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
