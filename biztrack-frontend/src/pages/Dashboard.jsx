// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("auth/users/me")
      .then(() => api.get("/dashboard/"))
      .then((res) => {
        setSummary(res.data);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="card-grid">
        <div className="card">Total Products: {summary.total_products}</div>
        <div className="card">Low Stock: {summary.low_stock}</div>
        <div className="card">Monthly Expense: Rs {summary.monthly_expense}</div>
      </div>

      <h3>Expense by Category</h3>
      <ul>
        {summary.expense_by_category.map((item, index) => (
          <li key={index}>
            {item.category}: Rs {item.total}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
