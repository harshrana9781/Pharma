'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white min-h-[600px] flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl font-extrabold mb-6 tracking-tight drop-shadow-md">
            Your Health, <span className="text-teal-300">Delivered.</span>
          </h1>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Get your medications, supplements, and wellness products delivered quickly, safely, and securely to your doorstep.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/products" className="bg-white text-blue-700 hover:bg-slate-50 px-8 py-4 rounded-full font-semibold transition shadow-lg hover:-translate-y-1">
              Shop Now
            </Link>
            <Link href="/login" className="bg-transparent border border-white/50 hover:bg-white/10 px-8 py-4 rounded-full font-semibold transition backdrop-blur-sm">
              Log In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800">Why Choose PharmaPlus?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
               { title: 'Verified Products', desc: '100% genuine medicines from authorized distributors.', icon: '🛡️' },
               { title: 'Fast Delivery', desc: 'Same-day delivery in select cities and fast shipping nationwide.', icon: '⚡' },
               { title: 'Secure Payments', desc: 'Your transactions are protected by industry-leading encryption.', icon: '🔒' },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 rounded-3xl bg-slate-50 hover:bg-slate-100 transition duration-300 shadow-sm border border-slate-100 group">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
