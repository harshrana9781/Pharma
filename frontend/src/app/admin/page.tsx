'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Unauthorized access. Please login.');
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        // Fetch users
        const usersRes = await fetch(`${apiUrl}/api/users`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (usersRes.status === 401 || usersRes.status === 403) {
          toast.error('Admin access required');
          router.push('/');
          return;
        }
        
        const usersData = await usersRes.json();
        setUsers(usersData);

        // Fetch products
        const productsRes = await fetch(`${apiUrl}/api/products`);
        const productsData = await productsRes.json();
        setProducts(productsData);

      } catch (error) {
        console.error("Dashboard fetch error:", error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-slate-800">Admin Dashboard</h1>
        <button 
          onClick={() => { localStorage.clear(); router.push('/login'); }}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-bold transition shadow-sm"
        >
          Logout Admin
        </button>
      </div>

      <section>
        <h2 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-2 mb-6">Registered Users ({users.length})</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm font-semibold uppercase tracking-wider">
                <th className="p-4 px-6">Name</th>
                <th className="p-4 px-6">Email</th>
                <th className="p-4 px-6">Role</th>
                <th className="p-4 px-6">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 px-6 font-semibold text-slate-800">{user.name}</td>
                  <td className="p-4 px-6 text-slate-600">{user.email}</td>
                  <td className="p-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 px-6 text-slate-500 text-sm">{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-2 mb-6">Medicines Inventory ({products.length})</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden max-h-[600px] overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-slate-50 shadow-sm border-b border-slate-200">
              <tr className="text-slate-500 text-sm font-semibold uppercase tracking-wider">
                <th className="p-4 px-6">Name</th>
                <th className="p-4 px-6">Price</th>
                <th className="p-4 px-6">Stock</th>
                <th className="p-4 px-6">MFG Date</th>
                <th className="p-4 px-6">EXP Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 px-6 font-semibold text-slate-800">{product.name}</td>
                  <td className="p-4 px-6 font-bold text-emerald-600">${product.price.toFixed(2)}</td>
                  <td className="p-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${product.stock > 50 ? 'bg-slate-100 text-slate-700' : 'bg-red-100 text-red-700'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="p-4 px-6 text-slate-500 text-sm">{product.mfgDate ? new Date(product.mfgDate).toLocaleDateString() : 'N/A'}</td>
                  <td className="p-4 px-6 text-slate-500 text-sm">{product.expDate ? new Date(product.expDate).toLocaleDateString() : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
