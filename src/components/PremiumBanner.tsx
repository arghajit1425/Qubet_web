import React from 'react';
import { useApp } from '../context/AppContext';

export const PremiumBanner: React.FC = () => {
  const { setCurrentView, addToCart, products } = useApp();
  const aquaProduct = products.find((p) => p.name.includes('AQUA')) || products[0];

  return (
    <section className="py-16 bg-[#1c1b1b] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#420054] text-white border border-[#5d1a6f] shadow-2xl min-h-[450px] flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0 z-0 opacity-40">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh7pcCwobQiUhTMRKfedLS4yGDutuzrJmjCvVPW0UdQ_sGrN6qSFqpJLtgkhDEQpX_4RP7I_xVO4HMQS-3jrr1IBmJcOKzN0PpfbfpALGf5AGWIZP7dqMWqsQWujqs9pGgVpfbwakLBNIlAk9jzN7aNrtT1gbCTeCx_JvL3JD9bRhzyhPySb6TLDx6_r_LRsAAySMEdAeVyh2P5F4UhMwgUxBv8I410jAffaLZNd-xeCAvK_Zm-N8OMP4A3zujuWCeSYpBO1jPpcU"
              alt="AQUA MAJESTY Premium Banner"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#420054] via-[#420054]/90 to-transparent"></div>
          </div>

          {/* Banner Text Content */}
          <div className="relative z-10 max-w-2xl p-8 sm:p-12 lg:p-16">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#ffdf9d] text-[#251a00] text-xs font-bold uppercase tracking-[0.25em] mb-4">
              SPECIAL RELEASE
            </span>

            <h2 className="font-display-lg text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
              PREMIUM Range of Perfumes
            </h2>

            <p className="font-display-lg text-xl sm:text-2xl text-[#ffdf9d] font-light italic mb-6">
              Dominate your day With AQUA MAJESTY
            </p>

            <p className="text-sm text-white/80 font-light leading-relaxed mb-8 max-w-lg">
              Engineered with deep ocean marine accords, calabrian bergamot, and golden ambergris. Designed for the individual who leaves a regal mark everywhere.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => addToCart(aquaProduct, 1)}
                className="px-8 py-3.5 rounded-full bg-[#ffdf9d] text-[#251a00] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#e6c274] transition-all shadow-lg hover:shadow-xl cursor-pointer flex items-center gap-2"
              >
                <span>Order AQUA MAJESTY ($899)</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>

              <button
                onClick={() => setCurrentView('shop')}
                className="px-6 py-3.5 rounded-full border border-white/30 text-white text-xs font-semibold uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
              >
                View Full Range
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
