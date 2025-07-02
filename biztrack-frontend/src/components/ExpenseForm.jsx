import React, { useState, useEffect } from "react";
import api from "../services/api";

const ExpenseForm = ({ onSuccess, editingExpense, cancelEdit }) => {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingExpense) {
      setForm({
        description: editingExpense.description,
        amount: editingExpense.amount,
        category: editingExpense.category,
      });
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { description, amount, category } = form;

    if (!description || !amount || !category) {
      setError("All fields are required");
      return;
    }

    try {
      if (editingExpense) {
        await api.put(`/expenses/${editingExpense.id}`, {
          ...form,
          amount: parseFloat(amount),
        });
      } else {
        await api.post("/expenses/", {
          ...form,
          amount: parseFloat(amount),
        });
      }

      setForm({ description: "", amount: "", category: "" });
      setError("");
      onSuccess();
    } catch (err) {
      console.error("❌ Error saving expense:", err);
      setError("Failed to save expense");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>{editingExpense ? "Edit Expense" : "Add Expense"}</h3>
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        type="number"
        step="0.01"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
      />
      <button type="submit">{editingExpense ? "Update" : "Add"}</button>
      {editingExpense && (
        <button type="button" onClick={cancelEdit} style={{ marginLeft: "10px" }}>
          Cancel
        </button>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default ExpenseForm;
