'use client';

import Link from 'next/link';
import { ShoppingCart, User, Menu, LogOut, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{name: string, role: string} | null>(null);
  const { cartCount, clearCart } = useCart();

  useEffect(() => {
    // Read from localStorage only after component mounts (client-side)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user data");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    clearCart();
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 transition-all">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
                PharmaPlus
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-slate-600 hover:text-blue-600 font-medium transition">Products</Link>
            <Link href="/about" className="text-slate-600 hover:text-blue-600 font-medium transition">About</Link>
            <Link href="/contact" className="text-slate-600 hover:text-blue-600 font-medium transition">Contact</Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/cart" className="relative text-slate-600 hover:text-blue-600 transition group">
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{cartCount}</span>
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4 border-l border-slate-200 pl-4">
                <div className="flex items-center space-x-2">
                  <span className="text-slate-700 font-bold">Welcome, {user.name}</span>
                  {user.role === 'ADMIN' && (
                     <Link href="/admin" title="Admin Dashboard">
                       <ShieldCheck className="w-5 h-5 text-purple-600 hover:text-purple-800 transition-colors" />
                     </Link>
                  )}
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full hover:bg-red-100 transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-semibold text-sm">Logout</span>
                </button>
              </div>
            ) : (
              <Link href="/login" className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition shadow-md hover:shadow-lg focus:ring-4 ring-blue-600/20">
                <User className="w-4 h-4" />
                <span className="font-semibold text-sm">Sign In</span>
              </Link>
            )}
          </div>

           <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4 absolute w-full shadow-lg">
          <div className="flex flex-col space-y-4">
            <Link href="/products" className="text-slate-600 font-medium px-4 py-2 hover:bg-slate-50 rounded-lg">Products</Link>
            <Link href="/cart" className="text-slate-600 font-medium px-4 py-2 hover:bg-slate-50 rounded-lg flex items-center justify-between">
              Cart <span className="bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded-full">{cartCount}</span>
            </Link>
            
            <div className="h-px bg-slate-100 my-2"></div>
            
            {user ? (
              <>
                <div className="px-4 py-2">
                  <span className="text-slate-500 text-sm block mb-1">Logged in as</span>
                  <div className="font-bold text-slate-800 flex items-center gap-2">
                    {user.name} 
                    {user.role === 'ADMIN' && <Link href="/admin"><ShieldCheck className="w-4 h-4 text-purple-600 inline" /></Link>}
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="bg-red-50 text-red-600 text-center font-bold px-4 py-3 rounded-xl flex justify-center items-center gap-2 border border-red-100"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="bg-blue-600 text-white text-center font-medium px-4 py-3 rounded-xl">Sign In</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
