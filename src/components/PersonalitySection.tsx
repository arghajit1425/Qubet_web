import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const PersonalitySection: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useApp();
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizResult, setQuizResult] = useState<string | null>(null);

  const handleQuizChoice = (trait: string) => {
    let result = 'Veloura';
    if (trait === 'Bold') result = 'Zafyre';
    if (trait === 'Fresh') result = 'Lumira';
    if (trait === 'Mysterious') result = 'Duskira';
    if (trait === 'Elegance') result = 'Feresse';
    setQuizResult(result);
  };

  return (
    <section className="py-20 bg-[#fcf9f8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#420054] rounded-3xl overflow-hidden shadow-2xl text-white grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Image Left Column */}
          <div className="lg:col-span-5 h-[350px] lg:h-[520px] relative overflow-hidden">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQEdXTvo2Wu0zQfLa_1pfrhPTqjT5FZfZmr6fz4oG6m5O2iZOJnSAevRragQVCF3kbJCOHKPGOXsK14EpWH5_FNwgfcFV1mMAxltLaFwXB9EQ1nLV-b4H8QP2BNN1gNo906Y2VBM_j5HEKbcDRJlfcdWLV1Kz5OzJA4y-22VxzX7g1wbCz2KwjMu5qD-9BFw4boZsPa6Oy2o9Ff9altD-rCnONSWELFH9Mt-4t7T_cLGSLuTaW2D2IYZ0kYxfs6Ljk-K71qee8fCk"
              alt="Find Your Scent Personality"
              className="w-full h-full object-cover object-top filter brightness-[0.9]"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#420054]/90 via-transparent to-transparent"></div>
          </div>

          {/* Text Right Column */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#ffdf9d] text-[#251a00] text-xs font-bold uppercase tracking-[0.25em] mb-4">
              PERSONALITY MATCH
            </span>

            <h2 className="font-display-lg text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
              Choose a perfume that matches your personality <span className="text-gradient-gold">With Qubet</span>
            </h2>

            <p className="text-sm text-white/80 font-light leading-relaxed mb-8 max-w-xl">
              Fragrance is an intimate extension of your aura. Whether you exude calm authority, radiant optimism, or sultry mystery, Qubet formulates notes tailored to your unique spirit.
            </p>

            {/* Interactive Quiz Box */}
            {quizResult ? (
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-[#ffdf9d]/40 mb-8 animate-fade-in">
                <p className="text-xs uppercase tracking-widest text-[#ffdf9d] font-bold mb-1">
                  Your Signature Match
                </p>
                <h3 className="font-display-lg text-2xl font-bold text-white">
                  Qubet {quizResult}
                </h3>
                <p className="text-xs text-white/70 mt-1 mb-4">
                  A perfect blend tailored to your distinct energy profile.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setCurrentView('shop');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#ffdf9d] text-[#251a00] text-xs font-bold uppercase tracking-wider hover:bg-[#e6c274] transition-all"
                >
                  Shop {quizResult} Now
                </button>
              </div>
            ) : showQuiz ? (
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-8 animate-fade-in">
                <p className="text-xs uppercase tracking-widest text-white/80 font-semibold mb-3">
                  Select your primary vibe:
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Bold', 'Fresh', 'Mysterious', 'Elegance'].map((trait) => (
                    <button
                      key={trait}
                      onClick={() => handleQuizChoice(trait)}
                      className="px-4 py-2 rounded-xl bg-white/15 hover:bg-[#ffdf9d] hover:text-[#251a00] text-xs font-bold transition-all cursor-pointer border border-white/20"
                    >
                      {trait}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setShowQuiz(!showQuiz)}
                className="px-8 py-3.5 rounded-full bg-[#ffdf9d] text-[#251a00] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#e6c274] transition-all shadow-lg cursor-pointer flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">psychology</span>
                <span>Take Scent Quiz</span>
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setCurrentView('shop');
                }}
                className="px-6 py-3.5 rounded-full border border-white/30 text-white text-xs font-semibold uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
              >
                Browse All Scents
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
