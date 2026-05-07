import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
      <div className="relative h-48 w-full bg-slate-50 overflow-hidden">
        {product.imageUrl ? (
          <Image 
            src={product.imageUrl} 
            alt={product.name} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            <span className="text-4xl">💊</span>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-slate-800 mb-2 truncate">{product.name}</h3>
        <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-extrabold text-blue-600">₹{product.price.toFixed(2)}</span>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors shadow-md">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
