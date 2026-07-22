import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';

export const WishlistModal: React.FC = () => {
  const {
    wishlist,
    products,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
  } = useApp();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsWishlistOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
            >
              <div className="p-6 border-b border-[#f0eded] bg-[#fcf9f8] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#420054] filled">favorite</span>
                  <h2 className="font-display-lg text-xl font-bold text-[#420054]">
                    Favorites Wishlist
                  </h2>
                  <motion.span
                    key={wishlistProducts.length}
                    initial={{ scale: 0.6 }}
                    animate={{ scale: 1 }}
                    className="bg-[#765a16] text-white text-xs font-bold px-2.5 py-0.5 rounded-full"
                  >
                    {wishlistProducts.length}
                  </motion.span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.15, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsWishlistOpen(false)}
                  className="p-1 rounded-full text-[#807380] hover:text-[#1c1b1b] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {wishlistProducts.length === 0 ? (
                  <div className="text-center py-16 text-[#807380]">
                    <span className="material-symbols-outlined text-6xl text-[#d1c2d0] mb-3">
                      favorite_border
                    </span>
                    <p className="font-display-lg text-xl font-bold text-[#420054]">
                      Your wishlist is empty
                    </p>
                    <p className="text-xs text-[#807380] mt-1 mb-6">
                      Save your favorite fragrances to view or purchase them later.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsWishlistOpen(false)}
                      className="px-6 py-2.5 rounded-full bg-[#420054] text-[#ffdf9d] text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Explore Collection
                    </motion.button>
                  </div>
                ) : (
                  <AnimatePresence>
                    {wishlistProducts.map((prod) => (
                      <motion.div
                        key={prod.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.2 }}
                        className="flex gap-4 p-3 rounded-2xl bg-[#fcf9f8] border border-[#f0eded] items-center"
                      >
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-16 h-16 rounded-xl object-cover border border-[#d1c2d0]/50"
                        />

                        <div className="flex-1">
                          <h4 className="font-display-lg font-bold text-[#420054] text-sm">
                            {prod.name}
                          </h4>
                          <p className="text-[11px] text-[#765a16] italic">{prod.subtitle}</p>
                          <p className="font-display-lg text-xs font-bold text-[#420054] mt-1">
                            {prod.currency}
                            {prod.price}
                          </p>
                        </div>

                        <div className="flex flex-col gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              addToCart(prod, 1);
                              toggleWishlist(prod.id);
                            }}
                            className="p-2 rounded-xl bg-[#420054] text-[#ffdf9d] hover:bg-[#5d1a6f] transition-colors cursor-pointer"
                            title="Move to Cart"
                          >
                            <span className="material-symbols-outlined text-base">
                              shopping_cart
                            </span>
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleWishlist(prod.id)}
                            className="p-2 rounded-xl bg-gray-100 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Remove"
                          >
                            <span className="material-symbols-outlined text-base">delete</span>
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
