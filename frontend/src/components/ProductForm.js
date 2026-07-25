import React, { useState } from "react";
import { addProduct } from "../services/api";
import { toast } from "react-toastify";

const ProductForm = ({ onProductAdded }) => {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",
    costPrice: "",
    sellingPrice: "",
    stock: "",
    reorderLevel: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔹 SEND DATA TO BACKEND
      const res = await addProduct({
        ...form,
        costPrice: Number(form.costPrice),
        sellingPrice: Number(form.sellingPrice),
        stock: Number(form.stock),
        reorderLevel: Number(form.reorderLevel)
      });

      // ✅ SHOW BACKEND MESSAGE
      toast.success(res.data.message);

      // 🔄 RESET FORM
      setForm({
        name: "",
        brand: "",
        category: "",
        costPrice: "",
        sellingPrice: "",
        stock: "",
        reorderLevel: ""
      });

      onProductAdded();
    } catch (err) {
      toast.error("Failed to add product");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Product</h3>

      <input
        name="name"
        placeholder="Product Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        name="brand"
        placeholder="Brand"
        value={form.brand}
        onChange={handleChange}
        required
      />

      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="costPrice"
        placeholder="Cost Price"
        value={form.costPrice}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="sellingPrice"
        placeholder="Selling Price"
        value={form.sellingPrice}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="reorderLevel"
        placeholder="Reorder Level"
        value={form.reorderLevel}
        onChange={handleChange}
      />
      <br></br>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
