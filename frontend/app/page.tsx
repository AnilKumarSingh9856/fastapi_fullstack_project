"use client";

import { useEffect, useState } from "react";
import ProductForm from "./components/ProductForm";
import { Product } from "./types";
import { Package, Pencil, Trash2, Search, XCircle } from "lucide-react"; // Added XCircle

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // --- NEW: Search State ---
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`http://127.0.0.1:8000/products/${id}`, { method: "DELETE" });
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  // --- NEW: Filter Logic ---
  // We filter the products array before mapping it in the return statement
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-indigo-600 text-white shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Package size={24} />
              </div>
              <span className="font-bold text-xl tracking-wide">Inventory<span className="text-indigo-200">App</span></span>
            </div>
            <div className="text-sm font-medium text-indigo-100 bg-indigo-700 px-3 py-1 rounded-full">
               FastAPI + Next.js
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-1">
             <div className="sticky top-24">
                <ProductForm 
                    currentProduct={editingProduct} 
                    onSuccess={() => {
                        fetchProducts();
                        setEditingProduct(null);
                    }}
                    onCancel={() => setEditingProduct(null)}
                />
             </div>
          </div>

          {/* Right Column: List */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Header & Stats */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Product List</h2>
                <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border shadow-sm w-fit">
                    Showing {filteredProducts.length} of {products.length} Items
                </span>
            </div>

            {/* --- NEW: Search Bar --- */}
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:text-sm transition-all duration-200 shadow-sm"
                    placeholder="Search products by name or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                    <button 
                        onClick={() => setSearchQuery("")}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                        <XCircle size={18} />
                    </button>
                )}
            </div>

            {/* Product Grid - Now using 'filteredProducts' instead of 'products' */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
                  
                  <div className="p-5 flex-grow">
                    <div className="flex justify-between items-start mb-2">
                        <span className="px-2 py-1 text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 rounded-md">
                            ID: {product.id}
                        </span>
                        <span className="text-lg font-bold text-gray-900">
                            ${product.price.toFixed(2)}
                        </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-indigo-600 transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">
                        {product.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg inline-block">
                        <Package size={16} />
                        <span>Stock: <span className="font-semibold text-gray-900">{product.quantity}</span></span>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex gap-3">
                    <button 
                        onClick={() => setEditingProduct(product)}
                        className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-colors"
                    >
                        <Pencil size={16} /> Edit
                    </button>
                    <button 
                        onClick={() => handleDelete(product.id)}
                        className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-red-600 bg-white border border-gray-200 py-2 rounded-lg hover:bg-red-50 hover:border-red-200 transition-colors"
                    >
                        <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Empty State for Search Results */}
              {filteredProducts.length === 0 && (
                <div className="col-span-full py-12 text-center bg-white rounded-xl border border-dashed border-gray-300">
                    <div className="mx-auto w-12 h-12 text-gray-300 mb-3 flex items-center justify-center">
                        <Search size={32} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                    <p className="text-gray-500">Try adjusting your search query.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}