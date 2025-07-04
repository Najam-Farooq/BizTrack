// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import PrivateRoute from "./router/PrivateRoute";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Expenses from "./pages/Expenses";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";

const Layout = ({ children }) => {
  const location = useLocation();
  const noSidebarRoutes = ["/login", "/register", "/unauthorized"];

  const hideSidebar = noSidebarRoutes.includes(location.pathname);

  return (
    <>
      <Navbar />
      {!hideSidebar && <Sidebar />}
      <div style={{ marginLeft: hideSidebar ? 0 : 200, padding: "90px 20px 20px" }}>
        {children}
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute allowedRoles={["admin", "manager"]}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/products"
            element={
              <PrivateRoute allowedRoles={["admin", "customer"]}>
                <Products />
              </PrivateRoute>
            }
          />
          <Route
            path="/expenses"
            element={
              <PrivateRoute allowedRoles={["admin", "customer"]}>
                <Expenses />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
