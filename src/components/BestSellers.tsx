import React from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

export const BestSellers: React.FC = () => {
  const { products, addToCart, toggleWishlist, wishlist, setQuickViewProduct } = useApp();
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 3);

  return (
    <section id="bestsellers-section" className="py-20 bg-[#f6f3f2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#d1c2d0]/40 pb-6">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-[#765a16] uppercase mb-1">
              MOST COVETED FRAGRANCES
            </p>
            <h2 className="font-display-lg text-3xl sm:text-4xl md:text-5xl font-bold text-[#420054]">
              BEST SELLERS
            </h2>
          </div>
          <p className="text-sm text-[#4e434f] max-w-md mt-3 md:mt-0 font-light">
            Loved by thousands across the globe. Unrivaled complexity and timeless elegance in every drop.
          </p>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bestSellers.map((prod: Product) => {
            const isFavorite = wishlist.includes(prod.id);

            return (
              <div
                key={prod.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#f0eded] flex flex-col justify-between"
              >
                {/* Product Image Box */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#e5e2e1] cursor-pointer" onClick={() => setQuickViewProduct(prod)}>
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Badge */}
                  <span className="absolute top-4 left-4 bg-[#420054] text-[#ffdf9d] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                    BEST SELLER
                  </span>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(prod.id);
                    }}
                    className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                      isFavorite
                        ? 'bg-[#420054] text-[#ffdf9d]'
                        : 'bg-white/80 text-[#420054] hover:bg-white'
                    }`}
                    title="Toggle Favorite"
                  >
                    <span className={`material-symbols-outlined text-lg ${isFavorite ? 'filled' : ''}`}>
                      favorite
                    </span>
                  </button>

                  {/* Quick View Floating Overlay */}
                  <div className="absolute inset-x-0 bottom-4 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(prod);
                      }}
                      className="w-full py-2.5 rounded-xl bg-white/90 backdrop-blur-md text-[#420054] font-bold text-xs uppercase tracking-wider hover:bg-[#420054] hover:text-white transition-colors shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-base">visibility</span>
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-[#765a16] uppercase tracking-wider">
                        {prod.category}
                      </span>
                      <div className="flex items-center gap-0.5 text-amber-500">
                        <span className="material-symbols-outlined text-sm filled">star</span>
                        <span className="text-xs font-bold text-[#1c1b1b]">5.0</span>
                      </div>
                    </div>

                    <h3
                      onClick={() => setQuickViewProduct(prod)}
                      className="font-display-lg text-2xl font-bold text-[#420054] hover:text-[#765a16] transition-colors cursor-pointer"
                    >
                      {prod.name}
                    </h3>
                    
                    <p className="text-xs text-[#4e434f] italic mt-0.5">
                      {prod.subtitle}
                    </p>

                    <p className="text-xs text-[#807380] line-clamp-2 mt-2 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>

                  {/* Price & Add to Cart Action */}
                  <div className="mt-6 pt-4 border-t border-[#f0eded] flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#807380] uppercase tracking-wider block">Price</span>
                      <span className="font-display-lg text-xl font-bold text-[#420054]">
                        {prod.currency}{prod.price}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(prod, 1)}
                      className="px-5 py-2.5 rounded-full bg-[#420054] text-[#ffdf9d] text-xs font-bold uppercase tracking-wider hover:bg-[#5d1a6f] transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-base">shopping_bag</span>
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
