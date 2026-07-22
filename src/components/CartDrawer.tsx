import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    showToast,
  } = useApp();

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 1000;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleStartCheckout = () => {
    if (cart.length === 0) return;
    setIsCheckoutModalOpen(true);
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrderPlaced(true);
    showToast('Order successfully confirmed! Thank you for choosing Qubet.');
    setTimeout(() => {
      clearCart();
      setIsOrderPlaced(false);
      setIsCheckoutModalOpen(false);
      setIsCartOpen(false);
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsCartOpen(false)}
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
              {/* Header */}
              <div className="p-6 border-b border-[#f0eded] bg-[#fcf9f8] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#420054]">shopping_bag</span>
                  <h2 className="font-display-lg text-xl font-bold text-[#420054]">Your Cart</h2>
                  <motion.span
                    key={cart.reduce((a, b) => a + b.quantity, 0)}
                    initial={{ scale: 0.6 }}
                    animate={{ scale: 1 }}
                    className="bg-[#420054] text-[#ffdf9d] text-xs font-bold px-2.5 py-0.5 rounded-full"
                  >
                    {cart.reduce((a, b) => a + b.quantity, 0)}
                  </motion.span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.15, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-full text-[#807380] hover:text-[#1c1b1b] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </motion.button>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="px-6 py-3 bg-[#420054]/5 border-b border-[#f0eded]">
                <div className="flex justify-between text-xs text-[#420054] font-bold mb-1">
                  <span>
                    {subtotal >= freeShippingThreshold
                      ? '🎉 You unlocked FREE Express Shipping!'
                      : `Add $${freeShippingThreshold - subtotal} more for Free Shipping`}
                  </span>
                </div>
                <div className="w-full bg-[#d1c2d0]/40 h-2 rounded-full overflow-hidden">
                  <motion.div
                    className="bg-[#420054] h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressToFreeShipping}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Cart Item List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 text-[#807380]">
                    <span className="material-symbols-outlined text-6xl text-[#d1c2d0] mb-3">
                      shopping_cart
                    </span>
                    <p className="font-display-lg text-xl font-bold text-[#420054]">
                      Your cart is empty
                    </p>
                    <p className="text-xs text-[#807380] mt-1 mb-6">
                      Explore our best sellers and add your signature fragrance.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-2.5 rounded-full bg-[#420054] text-[#ffdf9d] text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Start Shopping
                    </motion.button>
                  </div>
                ) : (
                  <AnimatePresence>
                    {cart.map((item) => (
                      <motion.div
                        key={item.product.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-4 p-3 rounded-2xl bg-[#fcf9f8] border border-[#f0eded]"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-20 rounded-xl object-cover border border-[#d1c2d0]/50"
                        />

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h4 className="font-display-lg font-bold text-[#420054] text-base">
                                {item.product.name}
                              </h4>
                              <motion.button
                                whileHover={{ scale: 1.2, color: '#e11d48' }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removeFromCart(item.product.id)}
                                className="text-[#807380] transition-colors cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-sm">delete</span>
                              </motion.button>
                            </div>
                            <p className="text-[11px] text-[#765a16] italic">
                              {item.product.subtitle}
                            </p>
                          </div>

                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center gap-2 border border-[#d1c2d0] rounded-full px-2 py-0.5 bg-white">
                              <motion.button
                                whileTap={{ scale: 0.8 }}
                                onClick={() =>
                                  updateCartQuantity(item.product.id, item.quantity - 1)
                                }
                                className="text-[#420054] font-bold text-xs w-5 h-5 flex items-center justify-center cursor-pointer"
                              >
                                -
                              </motion.button>
                              <span className="text-xs font-bold text-[#1c1b1b] px-1">
                                {item.quantity}
                              </span>
                              <motion.button
                                whileTap={{ scale: 0.8 }}
                                onClick={() =>
                                  updateCartQuantity(item.product.id, item.quantity + 1)
                                }
                                className="text-[#420054] font-bold text-xs w-5 h-5 flex items-center justify-center cursor-pointer"
                              >
                                +
                              </motion.button>
                            </div>

                            <span className="font-display-lg text-sm font-bold text-[#420054]">
                              {item.product.currency}
                              {item.product.price * item.quantity}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Cart Footer Subtotal & Checkout */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-[#f0eded] bg-[#fcf9f8] space-y-4">
                  <div className="space-y-1.5 text-xs text-[#4e434f]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-bold text-[#1c1b1b]">${subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Shipping</span>
                      <span className="font-bold text-emerald-600">
                        {subtotal >= freeShippingThreshold ? 'FREE' : '$25'}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-[#420054] pt-2 border-t border-[#d1c2d0]/50">
                      <span>Total</span>
                      <span className="font-display-lg text-xl">
                        ${subtotal >= freeShippingThreshold ? subtotal : subtotal + 25}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleStartCheckout}
                    className="w-full py-4 rounded-full bg-[#420054] text-[#ffdf9d] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#5d1a6f] transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Checkout</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>

          {/* CHECKOUT CONFIRMATION MODAL */}
          <AnimatePresence>
            {isCheckoutModalOpen && (
              <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#d1c2d0]"
                >
                  {isOrderPlaced ? (
                    <div className="text-center py-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4"
                      >
                        <span className="material-symbols-outlined text-4xl">check_circle</span>
                      </motion.div>
                      <h3 className="font-display-lg text-2xl font-bold text-[#420054]">
                        Order Confirmed!
                      </h3>
                      <p className="text-xs text-[#4e434f] mt-2">
                        Receipt #QB-{Math.floor(Math.random() * 89999 + 10000)} has been dispatched.
                        Your bespoke fragrance is being prepared at our atelier.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-display-lg text-xl font-bold text-[#420054]">
                          Express Checkout
                        </h3>
                        <button
                          onClick={() => setIsCheckoutModalOpen(false)}
                          className="text-[#807380] hover:text-[#420054] cursor-pointer"
                        >
                          <span className="material-symbols-outlined">close</span>
                        </button>
                      </div>

                      <form onSubmit={handleConfirmOrder} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold uppercase text-[#4e434f] mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            defaultValue="Sophia Montgomery"
                            className="w-full bg-[#f6f3f2] border border-[#d1c2d0] rounded-xl p-2.5 text-xs focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase text-[#4e434f] mb-1">
                            Shipping Address
                          </label>
                          <input
                            type="text"
                            required
                            defaultValue="742 Evergreen Terrace, Mayfair, London"
                            className="w-full bg-[#f6f3f2] border border-[#d1c2d0] rounded-xl p-2.5 text-xs focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase text-[#4e434f] mb-1">
                            Payment Method
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              className="p-2.5 rounded-xl border-2 border-[#420054] bg-[#420054]/5 text-xs font-bold text-[#420054] flex items-center gap-2 cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-base">
                                credit_card
                              </span>
                              <span>Credit Card</span>
                            </motion.div>
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              className="p-2.5 rounded-xl border border-[#d1c2d0] text-xs font-bold text-[#807380] flex items-center gap-2 cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-base">
                                account_balance_wallet
                              </span>
                              <span>Apple Pay</span>
                            </motion.div>
                          </div>
                        </div>

                        <div className="pt-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            type="submit"
                            className="w-full py-3.5 rounded-full bg-[#420054] text-[#ffdf9d] text-xs font-bold uppercase tracking-wider hover:bg-[#5d1a6f] cursor-pointer"
                          >
                            Pay ${subtotal >= freeShippingThreshold ? subtotal : subtotal + 25} & Place Order
                          </motion.button>
                        </div>
                      </form>
                    </div>
                  )}
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
};
