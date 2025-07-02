import React, { useEffect, useState } from "react";
import api from "../services/api";
import ProductForm from "../components/ProductForm";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products/");
      setProducts(res.data);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("❌ Error deleting product:", err);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleUpdate = async (updatedProduct) => {
    try {
      await api.put(`/products/${updatedProduct.id}`, updatedProduct);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("❌ Error updating product:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>

      <ProductForm
        onSuccess={fetchProducts}
        editingProduct={editingProduct}
        onUpdate={handleUpdate}
      />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.name}</td>
              <td>{prod.category}</td>
              <td>{prod.quantity}</td>
              <td>{prod.price}</td>
              <td>
                <button onClick={() => handleEdit(prod)}>Edit</button>
                <button onClick={() => handleDelete(prod.id)} style={{ marginLeft: "10px" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
