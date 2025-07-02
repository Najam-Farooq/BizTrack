import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./Dashboard.css"; // optional if styling

const Dashboard = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    api.get("/dashboard/")
      .then((res) => setSummary(res.data))
      .catch((err) => console.error("Error fetching dashboard:", err));
  }, []);

  if (!summary) return <p>Loading...</p>;

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
