import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QubetLogo } from './QubetLogo';

export const Footer: React.FC = () => {
  const { showToast, setCurrentView, setSelectedCategory } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address');
      return;
    }
    showToast('Thank you for subscribing to Qubet Insider VIP!');
    setNewsletterEmail('');
  };

  return (
    <footer id="footer-section" className="bg-[#1c1b1b] text-white pt-20 pb-12 border-t border-[#420054]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="mb-4 cursor-pointer" onClick={() => setCurrentView('home')}>
              <QubetLogo variant="dark" className="h-12" />
            </div>

            <p className="text-xs text-white/70 leading-relaxed font-light mb-6 max-w-sm">
              The Essence of Elegance. Crafted with rare botanical oils, oriental ambers, and timeless mastery. Unlocking emotional resonance in every flacon.
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#ffdf9d] mb-2">
                Join Qubet Insider VIP
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#ffdf9d]"
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#ffdf9d] text-[#251a00] font-bold text-xs uppercase tracking-wider hover:bg-[#e6c274] transition-colors cursor-pointer"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-[#ffdf9d] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70 font-light">
              <li>
                <button onClick={() => setCurrentView('home')} className="hover:text-white transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('All'); setCurrentView('shop'); }} className="hover:text-white transition-colors cursor-pointer">
                  Shop All Scents
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('Perfume'); setCurrentView('shop'); }} className="hover:text-white transition-colors cursor-pointer">
                  Pure Parfum Extraits
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('Collection'); setCurrentView('shop'); }} className="hover:text-white transition-colors cursor-pointer">
                  Curated Collections
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('login')} className="hover:text-white transition-colors cursor-pointer">
                  Customer Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-[#ffdf9d] mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70 font-light">
              <li className="hover:text-white transition-colors cursor-pointer">Track Your Order</li>
              <li className="hover:text-white transition-colors cursor-pointer">Shipping & Returns</li>
              <li className="hover:text-white transition-colors cursor-pointer">Fragrance Finder Quiz</li>
              <li className="hover:text-white transition-colors cursor-pointer">Authenticity Guarantee</li>
              <li className="hover:text-white transition-colors cursor-pointer">Bespoke Concierge</li>
            </ul>
          </div>

          {/* Contact & Admin */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-[#ffdf9d] mb-4">
              Royal Essence
            </h4>
            <div className="space-y-3 text-xs text-white/70 font-light">
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-[#ffdf9d]">location_on</span>
                <span>Flagship Atelier, Mayfair, London</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-[#ffdf9d]">mail</span>
                <span>concierge@qubetperfume.com</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-[#ffdf9d]">call</span>
                <span>+44 20 7946 0912</span>
              </p>
              
              <div className="pt-2">
                <button
                  onClick={() => setCurrentView('admin-login')}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-[#420054] text-[#ffdf9d] border border-[#ffdf9d]/30 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
                  <span>Admin Access</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© {new Date().getFullYear()} Qubet Perfume Co. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
