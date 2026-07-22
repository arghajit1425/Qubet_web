import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

export const ShopPage: React.FC = () => {
  const {
    products,
    addToCart,
    toggleWishlist,
    wishlist,
    setQuickViewProduct,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useApp();

  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'name'>('featured');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(3000);

  const categories = ['All', 'Perfume', 'Collection', 'Accessories', 'News'];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === 'All' || p.category === selectedCategory;
        const matchesSearch =
          !searchQuery ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = p.price <= maxPriceFilter;

        return matchesCategory && matchesSearch && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0; // featured
      });
  }, [products, selectedCategory, searchQuery, maxPriceFilter, sortBy]);

  return (
    <div className="py-12 bg-[#fcf9f8] min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Banner */}
        <div className="bg-[#420054] text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <span className="inline-block px-3 py-1 rounded-full bg-[#ffdf9d] text-[#251a00] text-[10px] font-bold uppercase tracking-[0.25em] mb-3">
              THE FULL COLLECTION
            </span>
            <h1 className="font-display-lg text-3xl sm:text-5xl font-bold tracking-tight mb-3">
              Explore Signature Scents
            </h1>
            <p className="text-xs sm:text-sm text-white/80 font-light">
              Indulge in artisanal formulations created to reflect individual beauty, confidence, and authority.
            </p>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none hidden md:block">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMlIzW0d-LV4DNnsg6fR1ti2yBttHUdLzX0kT6udKpOErj_0r1oXVecKyjcCV4Vkb1eMSDxpxmtJ7LUZbHqVKbVspP2WemB6nbX3PjYi4wkI62qii-UWIvk-IT5gu5f0Yy60RyWlVwVulcSRGjX9lROGGGFVdTKU8hXBlpU5kE7ImuLQ_6q0NLHMqjli5QPaMh3YvTuo3rASgFH2aNSim5-kn5amEsQJMQe_nqd4wBJdFJtYlwe60ucKiHnIchn9HzvhZ8aYZBjHQ"
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Filters and Search Toolbar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8 bg-white p-4 sm:p-6 rounded-2xl border border-[#d1c2d0]/40 shadow-2xs">
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#420054] text-[#ffdf9d] shadow-sm'
                    : 'bg-[#f6f3f2] text-[#4e434f] hover:bg-[#eae7e7]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-60">
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#f6f3f2] border border-[#d1c2d0] rounded-full py-2 pl-9 pr-3 text-xs focus:outline-none focus:border-[#420054]"
              />
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#807380]">
                search
              </span>
            </div>

            {/* Price Filter Slider */}
            <div className="flex items-center gap-2 bg-[#f6f3f2] px-3.5 py-1.5 rounded-full border border-[#d1c2d0]">
              <span className="text-[11px] font-bold text-[#420054] uppercase">Max:</span>
              <input
                type="range"
                min={200}
                max={3000}
                step={100}
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                className="w-20 accent-[#420054]"
              />
              <span className="text-xs font-bold text-[#420054]">${maxPriceFilter}</span>
            </div>

            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#f6f3f2] border border-[#d1c2d0] text-xs font-bold text-[#420054] rounded-full px-4 py-2 focus:outline-none cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A - Z</option>
            </select>
          </div>
        </div>

        {/* Product Catalog Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#d1c2d0]/40 p-8">
            <span className="material-symbols-outlined text-5xl text-[#807380] mb-3">search_off</span>
            <h3 className="font-display-lg text-2xl font-bold text-[#420054]">No fragrances found</h3>
            <p className="text-xs text-[#807380] mt-1 mb-6">
              Try clearing your search keyword or increasing your max price filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setMaxPriceFilter(3000);
              }}
              className="px-6 py-2.5 rounded-full bg-[#420054] text-[#ffdf9d] font-bold text-xs uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((prod: Product) => {
              const isFavorite = wishlist.includes(prod.id);

              return (
                <div
                  key={prod.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 border border-[#f0eded] flex flex-col justify-between"
                >
                  <div
                    className="relative aspect-[4/5] overflow-hidden bg-[#e5e2e1] cursor-pointer"
                    onClick={() => setQuickViewProduct(prod)}
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    <span className="absolute top-4 left-4 bg-[#420054] text-[#ffdf9d] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                      {prod.category}
                    </span>

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
                    >
                      <span className={`material-symbols-outlined text-lg ${isFavorite ? 'filled' : ''}`}>
                        favorite
                      </span>
                    </button>

                    <div className="absolute inset-x-0 bottom-4 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setQuickViewProduct(prod);
                        }}
                        className="w-full py-2.5 rounded-xl bg-white/90 backdrop-blur-md text-[#420054] font-bold text-xs uppercase tracking-wider hover:bg-[#420054] hover:text-white transition-colors shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-base">visibility</span>
                        <span>Quick Inspect</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3
                        onClick={() => setQuickViewProduct(prod)}
                        className="font-display-lg text-2xl font-bold text-[#420054] hover:text-[#765a16] transition-colors cursor-pointer"
                      >
                        {prod.name}
                      </h3>
                      <p className="text-xs text-[#765a16] italic mt-0.5">{prod.subtitle}</p>
                      <p className="text-xs text-[#807380] line-clamp-2 mt-2 leading-relaxed">
                        {prod.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#f0eded] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#807380] uppercase tracking-wider block">SKU: {prod.sku}</span>
                        <span className="font-display-lg text-xl font-bold text-[#420054]">
                          {prod.currency}{prod.price}
                        </span>
                      </div>

                      <button
                        onClick={() => addToCart(prod, 1)}
                        className="px-5 py-2.5 rounded-full bg-[#420054] text-[#ffdf9d] text-xs font-bold uppercase tracking-wider hover:bg-[#5d1a6f] transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
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
        )}
      </div>
    </div>
  );
};
