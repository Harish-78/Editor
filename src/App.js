import React from "react";
import ClippedDrawer from "./components/Drawer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/SideBar";
import CreateComponent from "./components/createComponent";

const App = () => {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<ClippedDrawer />} />
            <Route path="/sidebar" element={<Sidebar />} />
            <Route path="/create" element={<CreateComponent />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
