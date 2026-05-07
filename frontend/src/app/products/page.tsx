import ProductTable from '@/components/ProductTable';

export const metadata = {
  title: 'Products | PharmaPlus',
};

async function getProducts() {
  try {
    let apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    if (apiUrl.startsWith('/') && typeof window === 'undefined') {
      const host = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
      apiUrl = `${host}${apiUrl}`;
    }
    const res = await fetch(`${apiUrl}/api/products`, { cache: 'no-store' })
      .catch(() => null);
      
    if (res && res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch products", error);
  }
  
  return [];
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">Our Products</h1>
        <p className="text-lg text-slate-500">Discover top-quality medicines and wellness essentials with fully transparent manufacturing details.</p>
      </div>

      <ProductTable products={products} />
    </div>
  );
}
