"use client";

import { useState, useEffect } from "react";
import { Product } from "../types";
import { Plus, Save, X } from "lucide-react"; // Icons

interface ProductFormProps {
  currentProduct: Product | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ProductForm({ currentProduct, onSuccess, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState<Product>({
    id: 0,
    name: "",
    description: "",
    price: 0,
    quantity: 0,
  });

  useEffect(() => {
    if (currentProduct) {
      setFormData(currentProduct);
    }
  }, [currentProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "name" || name === "description" ? value : Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = currentProduct ? "PUT" : "POST";
    const url = currentProduct
      ? `http://127.0.0.1:8000/products/${currentProduct.id}`
      : "http://127.0.0.1:8000/products";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${JSON.stringify(errorData)}`);
        return;
      }
      onSuccess();
      setFormData({ id: 0, name: "", description: "", price: 0, quantity: 0 });
    } catch (error) {
      console.error("Failed to submit:", error);
    }
  };

  const inputClass = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border";

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {currentProduct ? "Edit Product" : "Add New Product"}
        </h2>
        {currentProduct && (
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition">
            <X size={24} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* ID Field */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700">ID</label>
            <input
              type="number"
              name="id"
              value={formData.id}
              onChange={handleChange}
              disabled={!!currentProduct}
              className={`${inputClass} bg-gray-50`}
              required
            />
          </div>

          {/* Name Field */}
          <div className="md:col-span-10">
            <label className="block text-sm font-semibold text-gray-700">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Wireless Headphones"
              className={inputClass}
              required
            />
          </div>

          {/* Price Field */}
          <div className="md:col-span-6">
            <label className="block text-sm font-semibold text-gray-700">Price ($)</label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`${inputClass} pl-7`}
                required
              />
            </div>
          </div>

          {/* Quantity Field */}
          <div className="md:col-span-6">
            <label className="block text-sm font-semibold text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* Description Field */}
          <div className="md:col-span-12">
            <label className="block text-sm font-semibold text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of the item..."
              className={inputClass}
              required
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          {currentProduct && (
             <button
             type="button"
             onClick={onCancel}
             className="mr-3 px-6 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-all shadow-sm"
           >
             Cancel
           </button>
          )}
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-all shadow-md hover:shadow-lg"
          >
            {currentProduct ? <Save size={18} /> : <Plus size={18} />}
            {currentProduct ? "Save Changes" : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
}