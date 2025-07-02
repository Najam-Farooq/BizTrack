import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Expenses from "./pages/Expenses";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        {/* Simple Navigation */}
        <nav>
          <Link to="/" style={{ marginRight: "10px" }}>Dashboard</Link>
          <Link to="/products" style={{ marginRight: "10px" }}>Products</Link>
          <Link to="/expenses">Expenses</Link>
        </nav>

        <hr />

      
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/expenses" element={<Expenses />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
