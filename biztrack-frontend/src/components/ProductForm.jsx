import React, { useEffect, useState } from "react";
import api from "../services/api";

const ProductForm = ({ onSuccess, editingProduct, onUpdate }) => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name,
        category: editingProduct.category,
        quantity: editingProduct.quantity,
        price: editingProduct.price,
      });
    } else {
      setForm({ name: "", category: "", quantity: "", price: "" });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.category || !form.quantity || !form.price) {
      setError("All fields are required");
      return;
    }

    try {
      if (editingProduct) {
        await onUpdate({ ...editingProduct, ...form });
      } else {
        await api.post("/products/", {
          ...form,
          quantity: parseInt(form.quantity),
          price: parseFloat(form.price),
        });
      }

      setForm({ name: "", category: "", quantity: "", price: "" });
      setError("");
      onSuccess();
    } catch (err) {
      console.error("❌ Error saving product:", err);
      setError("Failed to save product");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={form.quantity}
        onChange={handleChange}
      />
      <input
        type="number"
        step="0.01"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
      />
      <button type="submit">{editingProduct ? "Update" : "Add"}</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default ProductForm;
