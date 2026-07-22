import React from 'react';

export const WhyTrustUs: React.FC = () => {
  const trustPillars = [
    {
      icon: 'verified',
      title: 'Quality Assurance',
      desc: 'Formulated in Grasse, France with IFRA-certified pure essential oils.'
    },
    {
      icon: 'potted_plant',
      title: 'Cruelty Free',
      desc: '100% vegan formulation. Never tested on animals, ethically harvested ingredients.'
    },
    {
      icon: 'support_agent',
      title: '24/7 Support',
      desc: 'Dedicated fragrance concierges to assist with bespoke recommendations anytime.'
    },
    {
      icon: 'groups',
      title: 'Community Driven',
      desc: 'Over 50,000 satisfied fragrance lovers sharing scent journey stories globally.'
    },
    {
      icon: 'eco',
      title: 'Eco-Conscious',
      desc: 'Refillable crystal flacons and 100% recyclable FSC-certified packaging.'
    },
    {
      icon: 'spa',
      title: 'Natural Extracts',
      desc: 'Hand-picked jasmines, wild saffron, and genuine aged agarwood extracts.'
    }
  ];

  return (
    <section id="about-section" className="py-20 bg-[#f6f3f2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold tracking-[0.25em] text-[#765a16] uppercase mb-2">
            UNCOMPROMISING EXCELLENCE
          </p>
          <h2 className="font-display-lg text-3xl sm:text-4xl md:text-5xl font-bold text-[#420054]">
            Why Trust Us?
          </h2>
          <div className="w-16 h-0.5 bg-[#765a16] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trustPillars.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-[#f0eded] shadow-xs hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#420054]/10 text-[#420054] group-hover:bg-[#420054] group-hover:text-[#ffdf9d] transition-all duration-300 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">
                  {item.icon}
                </span>
              </div>

              <h3 className="font-display-lg text-xl font-bold text-[#420054] mb-2 group-hover:text-[#765a16] transition-colors">
                {item.title}
              </h3>

              <p className="text-xs text-[#4e434f] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
