import { Activity, ShieldCheck, Truck, Users } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'About Us | PharmaPlus',
  description: 'Learn more about PharmaPlus and our mission to provide accessible healthcare.',
};

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Healthcare You Can Trust
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            At PharmaPlus, our mission is to make high-quality medicines and wellness products accessible, affordable, and transparent for everyone.
          </p>
        </div>
      </section>

      {/* Stats/Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center transform hover:-translate-y-1 transition-transform duration-300">
            <div className="w-14 h-14 mx-auto bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">100% Authentic</h3>
            <p className="text-slate-500 text-sm">Directly sourced from trusted manufacturers.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center transform hover:-translate-y-1 transition-transform duration-300">
            <div className="w-14 h-14 mx-auto bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <Activity className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Quality Care</h3>
            <p className="text-slate-500 text-sm">Ensuring your health is always our priority.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center transform hover:-translate-y-1 transition-transform duration-300">
            <div className="w-14 h-14 mx-auto bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <Truck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Fast Delivery</h3>
            <p className="text-slate-500 text-sm">Get your essentials delivered to your doorstep.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center transform hover:-translate-y-1 transition-transform duration-300">
            <div className="w-14 h-14 mx-auto bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Expert Support</h3>
            <p className="text-slate-500 text-sm">Our AI agent and team are here to help 24/7.</p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 lg:p-16 flex flex-col justify-center">
              <h2 className="text-3xl font-extrabold text-slate-800 mb-6">Our Story</h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Founded with a vision to revolutionize the pharmaceutical supply chain, PharmaPlus bridges the gap between top-tier healthcare products and the people who need them most. We noticed that transparency regarding manufacturing and expiry dates was often lacking in traditional online pharmacies.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Today, we provide a modern, sleek platform where you can confidently browse, verify, and purchase your medications with complete peace of mind. Your health is our commitment.
              </p>
            </div>
            <div className="bg-slate-100 min-h-[300px] relative flex items-center justify-center">
              {/* Abstract decorative element representing pharmacy/tech */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-teal-50 opacity-50"></div>
              <div className="relative z-10 text-9xl">⚕️</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-6">Ready to prioritize your health?</h2>
        <p className="text-slate-500 mb-8 text-lg">
          Join thousands of satisfied customers who trust PharmaPlus for their daily medical needs.
        </p>
        <Link 
          href="/products" 
          className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-xl shadow-slate-200"
        >
          Explore Our Products
        </Link>
      </section>
    </div>
  );
}
