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
                      <div className="flex flex-col xl:flex-row gap-8 items-start justify-between">
                        <div className="flex-1 max-w-xl">
                          <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Details</h4>
                          <p className="text-slate-700 mb-6">{product.description}</p>
                          
                          <div className="flex gap-6 mb-6">
                            <div className="bg-white p-3 rounded-lg border border-slate-100 flex-1">
                              <span className="text-xs text-slate-500 block mb-1">Mfg. Date</span>
                              <span className="font-semibold text-slate-800 text-sm">{formatDate(product.mfgDate)}</span>
                            </div>
                            <div className="bg-white p-3 rounded-lg border border-slate-100 flex-1">
                              <span className="text-xs text-slate-500 block mb-1">Expiry Date</span>
                              <span className="font-semibold text-red-600 text-sm">{formatDate(product.expDate)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                          <div className="bg-slate-100 p-3 px-5 border-b border-slate-200">
                            <h4 className="font-bold text-slate-800 text-sm">Compare Prices & Buy</h4>
                          </div>
                          
                          {/* Dynamically generated pharmacy list based on product ID hash */}
                          <ul className="divide-y divide-slate-100">
                            {[
                              { 
                                name: 'PharmaPlus', 
                                price: product.price, 
                                delivery: 'Free',
                                time: '1-2 Days'
                              },
                              { 
                                name: 'Apollo Pharmacy', 
                                price: product.price * (1 + ((product.id.charCodeAt(0) % 15) / 100)), 
                                delivery: '₹40',
                                time: 'Today'
                              },
                              { 
                                name: 'Netmeds', 
                                price: product.price * (1 - ((product.id.charCodeAt(product.id.length-1) % 10) / 100)), 
                                delivery: '₹25',
                                time: '2-3 Days'
                              },
                              { 
                                name: '1mg', 
                                price: product.price * (1 + ((product.id.charCodeAt(product.id.length/2) % 8) / 100)), 
                                delivery: '₹30',
                                time: '2 Days'
                              }
                            ].sort((a, b) => a.price - b.price).map((pharmacy, idx) => (
                              <li key={idx} className="p-4 px-5 flex flex-wrap gap-4 items-center justify-between hover:bg-slate-50 transition">
                                <div>
                                  <div className="font-bold text-slate-800 text-sm flex items-center gap-2">
                                    {pharmacy.name}
                                    {idx === 0 && <span className="bg-emerald-100 text-emerald-700 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">Best Price</span>}
                                  </div>
                                  <div className="text-xs text-slate-500 mt-1">
                                    Delivery: {pharmacy.time} ({pharmacy.delivery})
                                  </div>
                                </div>
                                <div className="flex items-center gap-4">
                                  <span className="font-extrabold text-blue-600">₹{pharmacy.price.toFixed(2)}</span>
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      addToCart(product, 1, pharmacy.name, pharmacy.price);
                                    }}
                                    className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-600 transition-colors shadow-sm"
                                  >
                                    Add
                                  </button>
                                </div>
                              </li>
                            ))}
                          </ul>
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
