'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  mfgDate?: string;
  expDate?: string;
}

export default function ProductTable({ products }: { products: Product[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { addToCart } = useCart();

  const toggleRow = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm font-semibold uppercase tracking-wider">
              <th className="p-4 px-6">Medicine Name</th>
              <th className="p-4 px-6">Description</th>
              <th className="p-4 px-6">Price</th>
              <th className="p-4 px-6">Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((product) => (
              <React.Fragment key={product.id}>
                <tr 
                  onClick={() => toggleRow(product.id)}
                  className={`group cursor-pointer transition-colors ${expandedId === product.id ? 'bg-blue-50/50' : 'hover:bg-slate-50'}`}
                >
                  <td className="p-4 px-6 font-bold text-slate-800">{product.name}</td>
                  <td className="p-4 px-6 text-slate-500 text-sm max-w-xs truncate">{product.description}</td>
                  <td className="p-4 px-6 font-extrabold text-blue-600">₹{product.price.toFixed(2)}</td>
                  <td className="p-4 px-6 text-slate-700">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${product.stock > 50 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                      {product.stock} units
                    </span>
                  </td>
                </tr>
                
                {/* Expanded Details Row */}
                {expandedId === product.id && (
                  <tr className="bg-slate-50/50 border-t-0 shadow-inner">
                    <td colSpan={4} className="p-6 px-10">
                      <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Details</h4>
                          <p className="text-slate-700">{product.description}</p>
                        </div>
                        <div className="flex flex-col gap-3 min-w-[250px] bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500 font-medium">Mfg. Date:</span>
                            <span className="font-semibold text-slate-800">{formatDate(product.mfgDate)}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500 font-medium">Expiry Date:</span>
                            <span className="font-semibold text-red-600">{formatDate(product.expDate)}</span>
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                            }}
                            className="mt-2 w-full bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors shadow-md"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        
        {products.length === 0 && (
          <div className="p-12 text-center text-slate-500">
            No products available.
          </div>
        )}
      </div>
    </div>
  );
}
