import React, { useState } from 'react';
import { INITIAL_TESTIMONIALS } from '../data';

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % INITIAL_TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + INITIAL_TESTIMONIALS.length) % INITIAL_TESTIMONIALS.length);
  };

  const current = INITIAL_TESTIMONIALS[activeIndex];

  return (
    <section className="py-20 bg-[#f6f3f2] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold tracking-[0.25em] text-[#765a16] uppercase mb-2">
            REAL REVIEWS
          </p>
          <h2 className="font-display-lg text-3xl sm:text-4xl font-bold text-[#420054]">
            WHAT OUR CUSTOMERS SAY
          </h2>
          <div className="w-16 h-0.5 bg-[#765a16] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Carousel Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#f0eded] shadow-xl relative text-center">
          <span className="material-symbols-outlined text-6xl text-[#420054]/15 absolute top-6 left-8 select-none">
            format_quote
          </span>

          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Stars */}
            <div className="flex justify-center gap-1 text-amber-500 mb-6">
              {[...Array(current.rating)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-xl filled">
                  star
                </span>
              ))}
            </div>

            {/* Quote */}
            <p className="font-display-lg text-xl sm:text-2xl text-[#1c1b1b] leading-relaxed italic mb-8">
              "{current.quote}"
            </p>

            {/* Author */}
            <div>
              <h4 className="font-bold text-[#420054] text-lg">
                {current.name}
              </h4>
              <p className="text-xs text-[#765a16] uppercase tracking-widest font-semibold mt-0.5">
                Verified Customer • {current.location}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#f0eded]">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-[#f6f3f2] hover:bg-[#420054] hover:text-[#ffdf9d] text-[#420054] transition-colors cursor-pointer"
              title="Previous Review"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
            </button>

            <div className="flex gap-2">
              {INITIAL_TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    activeIndex === idx ? 'bg-[#420054] w-6' : 'bg-[#d1c2d0]'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-[#f6f3f2] hover:bg-[#420054] hover:text-[#ffdf9d] text-[#420054] transition-colors cursor-pointer"
              title="Next Review"
            >
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
