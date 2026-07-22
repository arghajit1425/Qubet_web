import React from 'react';
import { useApp } from '../context/AppContext';

export const FeaturedProducts: React.FC = () => {
  const { products, addToCart, setQuickViewProduct } = useApp();

  const feresse = products.find((p) => p.name.includes('Feresse')) || products[3];
  const duskira = products.find((p) => p.name.includes('Duskira')) || products[4];

  return (
    <section className="py-24 bg-[#fcf9f8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold tracking-[0.25em] text-[#765a16] uppercase mb-2">
            AUTUMN / WINTER EDITION
          </p>
          <h2 className="font-display-lg text-3xl sm:text-5xl font-bold text-[#420054] tracking-tight">
            FEATURED COLLECTIONS
          </h2>
          <p className="font-display-lg text-lg text-[#765a16] italic mt-3 font-light">
            "More than fragrance — it's a feeling. Our latest collection captures stories, emotions, and moments in every drop."
          </p>
        </div>

        {/* Asymmetric Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Feresse Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#d1c2d0]/50 shadow-lg hover:shadow-2xl transition-all duration-500 group flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden bg-[#e5e2e1] relative cursor-pointer" onClick={() => setQuickViewProduct(feresse)}>
              <img
                src={feresse.image}
                alt={feresse.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-[#ffdf9d] text-[#251a00] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                HOT DROP
              </span>
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-between h-full">
              <div>
                <span className="text-xs font-bold text-[#765a16] uppercase tracking-wider block mb-1">
                  NEW ARRIVAL
                </span>
                <h3 className="font-display-lg text-3xl font-bold text-[#420054] mb-1">
                  {feresse.name}
                </h3>
                <p className="text-sm font-light italic text-[#765a16] mb-3">
                  {feresse.subtitle}
                </p>
                <p className="text-xs text-[#4e434f] leading-relaxed mb-6">
                  {feresse.description}
                </p>
              </div>

              <div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-display-lg text-2xl font-bold text-[#420054]">
                    {feresse.currency}{feresse.price}
                  </span>
                  <span className="text-xs text-[#807380] line-through">₹2,999</span>
                </div>

                <button
                  onClick={() => addToCart(feresse, 1)}
                  className="w-full py-3 rounded-full bg-[#420054] text-[#ffdf9d] text-xs font-bold uppercase tracking-widest hover:bg-[#5d1a6f] transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">shopping_cart</span>
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>

          {/* Duskira Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#d1c2d0]/50 shadow-lg hover:shadow-2xl transition-all duration-500 group flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden bg-[#e5e2e1] relative cursor-pointer" onClick={() => setQuickViewProduct(duskira)}>
              <img
                src={duskira.image}
                alt={duskira.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-[#420054] text-[#ffdf9d] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                LIMITED EDITION
              </span>
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-between h-full">
              <div>
                <span className="text-xs font-bold text-[#765a16] uppercase tracking-wider block mb-1">
                  NIGHTTIME SIGNATURE
                </span>
                <h3 className="font-display-lg text-3xl font-bold text-[#420054] mb-1">
                  {duskira.name}
                </h3>
                <p className="text-sm font-light italic text-[#765a16] mb-3">
                  {duskira.subtitle}
                </p>
                <p className="text-xs text-[#4e434f] leading-relaxed mb-6">
                  {duskira.description}
                </p>
              </div>

              <div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-display-lg text-2xl font-bold text-[#420054]">
                    {duskira.currency}{duskira.price}
                  </span>
                  <span className="text-xs text-[#807380] line-through">₹3,199</span>
                </div>

                <button
                  onClick={() => addToCart(duskira, 1)}
                  className="w-full py-3 rounded-full bg-[#420054] text-[#ffdf9d] text-xs font-bold uppercase tracking-widest hover:bg-[#5d1a6f] transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">shopping_cart</span>
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
