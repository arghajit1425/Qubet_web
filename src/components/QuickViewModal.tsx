import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, wishlist } = useApp();
  const [quantity, setQuantity] = useState(1);

  const isFavorite = quickViewProduct ? wishlist.includes(quickViewProduct.id) : false;

  const handleAddToCart = () => {
    if (!quickViewProduct) return;
    addToCart(quickViewProduct, quantity);
    setQuickViewProduct(null);
  };

  return (
    <AnimatePresence>
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setQuickViewProduct(null)}
            className="absolute inset-0 bg-black/75 backdrop-blur-xs"
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#d1c2d0] relative grid grid-cols-1 md:grid-cols-2 z-10"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md text-[#420054] flex items-center justify-center shadow-md hover:bg-white transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </motion.button>

            {/* Image Preview */}
            <div className="relative aspect-square md:aspect-auto bg-[#e5e2e1] overflow-hidden">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover object-center"
              />
              <span className="absolute top-4 left-4 bg-[#420054] text-[#ffdf9d] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                {quickViewProduct.category}
              </span>
            </div>

            {/* Product Information */}
            <div className="p-6 sm:p-8 flex flex-col justify-between bg-white">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-[#765a16] uppercase tracking-wider">
                    {quickViewProduct.sku}
                  </span>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    <span className="material-symbols-outlined text-sm filled">star</span>
                    <span className="text-xs font-bold text-[#1c1b1b]">5.0</span>
                  </div>
                </div>

                <h3 className="font-display-lg text-3xl font-bold text-[#420054]">
                  {quickViewProduct.name}
                </h3>
                <p className="text-xs text-[#765a16] italic font-medium mb-3">
                  {quickViewProduct.subtitle}
                </p>

                <p className="text-xs text-[#4e434f] leading-relaxed mb-4">
                  {quickViewProduct.description}
                </p>

                {/* Scent Notes */}
                {quickViewProduct.notes && (
                  <div className="mb-6">
                    <span className="text-[10px] font-bold text-[#807380] uppercase tracking-widest block mb-2">
                      Fragrance Accord Notes
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {quickViewProduct.notes.map((note, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-full bg-[#f0eded] text-[#420054] text-[10px] font-bold"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div className="font-display-lg text-2xl font-bold text-[#420054] mb-4">
                  {quickViewProduct.currency}
                  {quickViewProduct.price}
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-bold text-[#4e434f] uppercase">Quantity:</span>
                  <div className="flex items-center gap-3 border border-[#d1c2d0] rounded-full px-3 py-1 bg-[#f6f3f2]">
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="text-[#420054] font-bold text-sm w-5 h-5 flex items-center justify-center cursor-pointer"
                    >
                      -
                    </motion.button>
                    <span className="text-xs font-bold text-[#1c1b1b]">{quantity}</span>
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      onClick={() => setQuantity((q) => q + 1)}
                      className="text-[#420054] font-bold text-sm w-5 h-5 flex items-center justify-center cursor-pointer"
                    >
                      +
                    </motion.button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 rounded-full bg-[#420054] text-[#ffdf9d] text-xs font-bold uppercase tracking-widest hover:bg-[#5d1a6f] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">shopping_bag</span>
                    <span>Add ({quantity}) to Cart</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className={`p-3.5 rounded-full border transition-all cursor-pointer ${
                      isFavorite
                        ? 'bg-[#420054] text-[#ffdf9d] border-[#420054]'
                        : 'border-[#d1c2d0] text-[#420054] hover:bg-[#f0eded]'
                    }`}
                    title="Toggle Wishlist"
                  >
                    <span
                      className={`material-symbols-outlined text-lg ${
                        isFavorite ? 'filled' : ''
                      }`}
                    >
                      favorite
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
