'use client';

import { Mail, MapPin, Phone, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Your message has been sent successfully! We will get back to you soon.');
    // Normally you'd send this data to an API route here
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Have questions about your order, our products, or need medical advice? Our team is always here to help you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg mb-1">Our Location</h3>
                <p className="text-slate-500 leading-relaxed">
                  123 Health Avenue, Medical District<br />
                  New Delhi, ND 110001<br />
                  India
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg mb-1">Phone Number</h3>
                <p className="text-slate-500 leading-relaxed">
                  Toll-Free: 1800-123-4567<br />
                  Support: +91 98765 43210
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg mb-1">Email Address</h3>
                <p className="text-slate-500 leading-relaxed">
                  support@pharmaplus.com<br />
                  info@pharmaplus.com
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-slate-100 relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-blue-50 to-teal-50 rounded-full blur-3xl opacity-70 z-0"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-slate-800 mb-8">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-slate-600">Full Name</label>
                    <input 
                      type="text" 
                      id="name"
                      required
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-5 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-slate-600">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      required
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-5 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-semibold text-slate-600">Subject</label>
                  <input 
                    type="text" 
                    id="subject"
                    required
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-5 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    placeholder="How can we help you?"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-slate-600">Message</label>
                  <textarea 
                    id="message"
                    required
                    rows={5}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-5 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
