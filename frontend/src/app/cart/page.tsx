'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalBill = cart.reduce((total, item) => {
    const price = item.actualPrice !== undefined ? item.actualPrice : item.product.price;
    return total + (price * item.quantity);
  }, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    // Stripe checkout or actual checkout logic would go here
    toast.success('Proceeding to Checkout...');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 min-h-[70vh] flex flex-col items-center justify-center">
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center max-w-lg w-full">
          <div className="w-24 h-24 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-4">Your cart is empty</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Looks like you haven't added any medicines or wellness products to your cart yet.
          </p>
          <Link 
            href="/products" 
            className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 w-full"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center gap-3 mb-10">
        <ShoppingBag className="w-8 h-8 text-blue-600" />
        <h1 className="text-4xl font-extrabold text-slate-800">Your Cart</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Cart Items List */}
        <div className="flex-1 w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-700">Items ({cart.length})</h3>
            <button 
              onClick={clearCart}
              className="text-sm font-semibold text-red-500 hover:text-red-700 transition-colors"
            >
              Clear Cart
            </button>
          </div>
          
          <ul className="divide-y divide-slate-100">
            {cart.map((item) => (
              <li key={item.product.id} className="p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start group hover:bg-slate-50/50 transition">
                <div className="w-24 h-24 bg-slate-100 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                  💊
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="text-lg font-bold text-slate-800 mb-1">{item.product.name}</h4>
                  <p className="text-slate-500 text-sm mb-1 line-clamp-2">{item.product.description}</p>
                  <p className="text-emerald-600 text-xs font-semibold mb-3 bg-emerald-50 inline-block px-2 py-0.5 rounded-md border border-emerald-100">
                    Sold by: {item.pharmacyName || 'PharmaPlus'}
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-3">
                    <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-md">
                      Qty: {item.quantity}
                    </span>
                    <span className="text-slate-400 text-sm">×</span>
                    <span className="font-semibold text-slate-700">₹{(item.actualPrice !== undefined ? item.actualPrice : item.product.price).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-center sm:items-end justify-between h-full min-w-[100px]">
                  <span className="text-xl font-extrabold text-blue-600 mb-4 sm:mb-0">
                    ₹{((item.actualPrice !== undefined ? item.actualPrice : item.product.price) * item.quantity).toFixed(2)}
                  </span>
                  <button 
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-auto"
                    title="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden sticky top-24">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-xl font-extrabold text-slate-800">Order Summary</h3>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center text-slate-600">
              <span>Subtotal</span>
              <span className="font-semibold">₹{totalBill.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span>Shipping</span>
              <span className="font-semibold text-emerald-600">Free</span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span>Taxes</span>
              <span className="font-semibold">Calculated at checkout</span>
            </div>
            
            <div className="h-px bg-slate-100 my-4"></div>
            
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-slate-800">Total</span>
              <span className="text-2xl font-extrabold text-blue-600">₹{totalBill.toFixed(2)}</span>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors shadow-lg mt-6"
            >
              Proceed to Checkout <ArrowRight className="w-5 h-5" />
            </button>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Secure Checkout & Guaranteed Privacy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
