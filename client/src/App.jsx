import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import User from "./pages/User";
import Admin from "./pages/Admin";
import AdminFormcreate from "./pages/AdminFormcreate";
import Navbar from "./componets/Navbar";
import Home from "./pages/Home";
import AdminShowUserData from "./pages/AdminShowUserData";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/createform" element={<AdminFormcreate />} />
          <Route path="/admin/userdata" element={<AdminShowUserData />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
