import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES_DATA } from '../data';

export const Categories: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useApp();

  const handleCategoryClick = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle);
    setCurrentView('shop');
  };

  return (
    <section className="py-20 bg-[#fcf9f8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold tracking-[0.25em] text-[#765a16] uppercase mb-2">
            CURATED SELECTIONS
          </p>
          <h2 className="font-display-lg text-3xl sm:text-4xl md:text-5xl font-bold text-[#420054] tracking-tight">
            SHOP BY CATEGORY
          </h2>
          <div className="w-16 h-0.5 bg-[#765a16] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {CATEGORIES_DATA.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleCategoryClick(item.title)}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer bg-[#f6f3f2] flex flex-col h-[380px]"
            >
              {/* Image Container */}
              <div className="relative w-full h-[280px] overflow-hidden bg-[#e5e2e1]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#420054]/80 via-[#420054]/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                
                <span className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md text-[#420054] flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shadow-md">
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>

              {/* Title & Description */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-white border-t border-[#f0eded]">
                <div>
                  <h3 className="font-display-lg text-xl font-bold text-[#420054] group-hover:text-[#765a16] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#4e434f] mt-1 font-medium line-clamp-1">
                    {item.desc}
                  </p>
                </div>
                
                <div className="flex items-center text-xs font-bold text-[#765a16] uppercase tracking-wider mt-3">
                  <span>Explore Collection</span>
                  <span className="material-symbols-outlined text-sm ml-1 group-hover:translate-x-1.5 transition-transform">
                    chevron_right
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
