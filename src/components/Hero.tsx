import React from 'react';
import { useApp } from '../context/AppContext';

export const Hero: React.FC = () => {
  const { setCurrentView, banners } = useApp();
  const aquaMajestyBanner = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzUUhwZ8qD3DsofCKlzF-JtFYb0psBvQzGmIK9mDDTvMZDoVn_A9Id3bOjcXHWDRXOlVlKRZCnALstgyaBeKdh69zvQNi3wrTAqC5JM1IVwSjthHljPITYsZAYCeCjRC62CD9m3IJm5-gO6hLi4FjQDnBQKw4ilW92V449Lh1LG97xniQ_Fp0DKGmqB_Dr9W-CgszQYGOEiIGftKCVM8UF0WEOX4If7sQYsd67g-ZSL78JdXYkRWpS_FnufNRzLhipFifDJSMv5YM';
  const heroBanner = banners[0]?.image || aquaMajestyBanner;

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#1c1b1b]">
      {/* Blurred Aqua Majesty Background Image with Purple & Gold Atmosphere Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={heroBanner}
          alt="Aqua Majesty Qubet Perfume Luxury Hero"
          className="w-full h-full object-cover object-center filter blur-[2px] sm:blur-[3px] brightness-[0.85] contrast-[1.05] scale-102 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1b] via-[#1c1b1b]/30 to-[#420054]/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c1b1b]/60 via-transparent to-[#1c1b1b]/60"></div>
      </div>

      {/* Content Overlay Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white py-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#ffdf9d]/30 text-[#ffdf9d] text-xs font-semibold uppercase tracking-[0.3em] mb-6 shadow-xl animate-fade-in">
          <span className="material-symbols-outlined text-sm text-[#ffdf9d]">auto_awesome</span>
          <span>ROYAL ESSENCE COLLECTION</span>
        </div>

        <h1 className="font-display-lg text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.08] mb-6 drop-shadow-2xl">
          THE ESSENCE <br className="hidden sm:inline" />
          <span className="italic font-light text-gradient-gold">of elegance</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/80 font-light leading-relaxed mb-10 tracking-wide">
          Crafted with rare botanical oils and aged oriental accords. Discover signature scents designed to command presence and leave an indelible impression.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={() => setCurrentView('shop')}
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-[#420054] text-[#ffdf9d] border border-[#ffdf9d]/40 text-sm font-bold uppercase tracking-[0.25em] hover:bg-[#5d1a6f] hover:shadow-[0_0_25px_rgba(211,136,226,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-3"
          >
            <span>Order Now</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>

          <button
            onClick={() => {
              document.getElementById('bestsellers-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer"
          >
            Explore Bestsellers
          </button>
        </div>

        {/* Floating Trust Indicators */}
        <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <div className="font-display-lg text-2xl font-bold text-[#ffdf9d]">100%</div>
            <div className="text-xs text-white/60 uppercase tracking-widest mt-1">Authentic Extracts</div>
          </div>
          <div>
            <div className="font-display-lg text-2xl font-bold text-[#ffdf9d]">24 Hours+</div>
            <div className="text-xs text-white/60 uppercase tracking-widest mt-1">Longevity Guarantee</div>
          </div>
          <div>
            <div className="font-display-lg text-2xl font-bold text-[#ffdf9d]">Cruelty-Free</div>
            <div className="text-xs text-white/60 uppercase tracking-widest mt-1">Ethical Sourcing</div>
          </div>
          <div>
            <div className="font-display-lg text-2xl font-bold text-[#ffdf9d]">Free Express</div>
            <div className="text-xs text-white/60 uppercase tracking-widest mt-1">Global Shipping</div>
          </div>
        </div>
      </div>
    </section>
  );
};
