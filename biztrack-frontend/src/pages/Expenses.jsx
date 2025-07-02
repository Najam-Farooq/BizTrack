import React, { useEffect, useState } from "react";
import api from "../services/api";
import ExpenseForm from "../components/ExpenseForm";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  // Fetch expenses from backend
  const fetchExpenses = async () => {
    try {
      const res = await api.get("/expenses/");
      setExpenses(res.data);
    } catch (error) {
      console.error("❌ Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    try {
      await api.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (error) {
      console.error("❌ Error deleting expense:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Expenses</h2>
      <ExpenseForm
        onSuccess={fetchExpenses}
        editingExpense={editingExpense}
        cancelEdit={() => setEditingExpense(null)}
      />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp.id}>
              <td>{exp.description}</td>
              <td>{exp.amount}</td>
              <td>{exp.category}</td>
              <td>
                <button onClick={() => setEditingExpense(exp)}>Edit</button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {expenses.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No expenses found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Expenses;
