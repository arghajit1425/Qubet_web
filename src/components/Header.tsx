import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { ViewMode } from '../types';
import { QubetLogo } from './QubetLogo';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cart,
    wishlist,
    user,
    setIsCartOpen,
    setIsWishlistOpen,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
  } = useApp();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleNavClick = (view: ViewMode, sectionId?: string) => {
    setCurrentView(view);
    setIsMenuOpen(false);
    if (sectionId) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      {/* Quick Screen Switcher Bar for AI Studio Preview & Instant Navigation */}
      <div className="bg-[#420054] text-white py-1.5 px-4 text-xs font-medium border-b border-[#5d1a6f] flex flex-wrap items-center justify-between gap-2 z-50 relative">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm text-[#ffdf9d]">crown</span>
          <span className="tracking-widest uppercase font-semibold text-[#ffdf9d] text-[11px]">
            Qubet Royal Essence
          </span>
          <span className="hidden sm:inline-block text-white/40">|</span>
          <span className="hidden sm:inline-block text-white/70">Switch Screen View:</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          {(
            [
              { id: 'home', label: '1. Landing Page' },
              { id: 'shop', label: 'Shop Catalog' },
              { id: 'login', label: '2. User Login' },
              { id: 'admin-login', label: '3. Admin Login' },
              ...(user.isAdmin ? [{ id: 'admin-dashboard' as ViewMode, label: '4. Admin Panel' }] : []),
            ]
          ).map((screen) => (
            <motion.button
              key={screen.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentView(screen.id)}
              className={`px-2.5 py-0.5 rounded-full text-[11px] transition-all duration-200 cursor-pointer ${
                currentView === screen.id
                  ? 'bg-[#ffdf9d] text-[#251a00] font-bold shadow-sm'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              {screen.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main Floating Glass Header */}
      <header className="sticky top-0 z-40 w-full transition-all duration-300">
        <div className="bg-[#fcf9f8]/95 backdrop-blur-md border-b border-[#d1c2d0]/30 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            {/* Top Left Logo & Admin Quick Edit Badge */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentView('home')}
                className="flex items-center group cursor-pointer text-left hover:opacity-90 transition-opacity"
                title="Qubet Perfume Home"
              >
                <QubetLogo variant="light" className="h-11 sm:h-12" />
              </motion.button>

              {user.isAdmin && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentView('admin-dashboard')}
                  className="px-2.5 py-1 rounded-full bg-[#ffdf9d] text-[#251a00] hover:bg-amber-300 text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 shadow-2xs border border-[#765a16]/20 cursor-pointer"
                  title="Admin: Click to upload custom top-left logo"
                >
                  <span className="material-symbols-outlined text-xs text-[#420054]">photo_camera</span>
                  <span className="hidden sm:inline">Change Logo</span>
                </motion.button>
              )}
            </div>

            {/* Action Tools & Top Right 3-Line Menu */}
            <div className="flex items-center gap-2.5 sm:gap-4">
              {/* Search Symbol Icon / Expandable Search Field */}
              <AnimatePresence mode="wait">
                {isSearchOpen ? (
                  <motion.div
                    key="search-input"
                    initial={{ opacity: 0, scale: 0.9, width: 0 }}
                    animate={{ opacity: 1, scale: 1, width: 'auto' }}
                    exit={{ opacity: 0, scale: 0.9, width: 0 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className="relative flex items-center"
                  >
                    <input
                      type="text"
                      autoFocus
                      placeholder="Search fragrances..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setCurrentView('shop');
                          setIsSearchOpen(false);
                        }
                      }}
                      className="w-44 sm:w-60 bg-[#f6f3f2] border border-[#420054] rounded-full py-1.5 pl-8 pr-8 text-xs text-[#1c1b1b] placeholder-[#807380] focus:outline-none shadow-sm"
                    />
                    <span className="material-symbols-outlined absolute left-2.5 text-base text-[#420054]">
                      search
                    </span>
                    <button
                      onClick={() => setIsSearchOpen(false)}
                      className="absolute right-2 text-[#807380] hover:text-[#420054] p-0.5 rounded-full cursor-pointer"
                      title="Close Search"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.button
                    key="search-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2 rounded-full text-[#420054] hover:bg-[#f0eded] transition-colors cursor-pointer"
                    title="Search Fragrances"
                  >
                    <span className="material-symbols-outlined text-xl">search</span>
                  </motion.button>
                )}
              </AnimatePresence>

              {/* User Account / Login */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  if (user.isAdmin) {
                    setCurrentView('admin-dashboard');
                  } else {
                    setCurrentView('login');
                  }
                }}
                className="p-2 rounded-full text-[#420054] hover:bg-[#f0eded] transition-colors relative cursor-pointer group"
                title={user.isLoggedIn ? user.name : 'Account Login'}
              >
                <span className="material-symbols-outlined text-xl">person</span>
                {user.isLoggedIn && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>
                )}
              </motion.button>

              {/* Wishlist Icon */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsWishlistOpen(true)}
                className="p-2 rounded-full text-[#420054] hover:bg-[#f0eded] transition-colors relative cursor-pointer"
                title="Wishlist"
              >
                <span className="material-symbols-outlined text-xl">favorite</span>
                {wishlist.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 bg-[#765a16] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                  >
                    {wishlist.length}
                  </motion.span>
                )}
              </motion.button>

              {/* Shopping Cart Icon */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsCartOpen(true)}
                className="p-2 rounded-full bg-[#420054] text-white hover:bg-[#5d1a6f] transition-colors relative cursor-pointer shadow-sm flex items-center justify-center"
                title="Shopping Cart"
              >
                <span className="material-symbols-outlined text-xl">shopping_cart</span>
                {totalCartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-[#ffdf9d] text-[#251a00] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-[#420054]"
                  >
                    {totalCartCount}
                  </motion.span>
                )}
              </motion.button>

              {/* Top Right 3-Line Menu Option Button */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2.5 rounded-full bg-[#420054]/10 text-[#420054] hover:bg-[#420054] hover:text-[#ffdf9d] transition-all cursor-pointer flex items-center justify-center border border-[#420054]/20 shadow-2xs"
                title="Open Navigation Menu"
                aria-label="Toggle Navigation Menu"
              >
                <span className="material-symbols-outlined text-2xl">
                  {isMenuOpen ? 'close' : 'menu'}
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-Over Navigation Drawer (3-Line Menu Modal) */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="w-screen max-w-sm bg-[#1c1b1b] text-white shadow-2xl flex flex-col justify-between border-l border-[#420054]/50"
              >
                {/* Header inside drawer */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                  <QubetLogo variant="gold" className="h-10" />
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-2xl">close</span>
                  </motion.button>
                </div>

                {/* Navigation Links inside 3-line menu */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* Search Bar inside Drawer */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search perfumes & collections..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setCurrentView('shop');
                          setIsMenuOpen(false);
                        }
                      }}
                      className="w-full bg-white/10 border border-white/20 rounded-full py-2.5 pl-10 pr-4 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#ffdf9d]"
                    />
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#ffdf9d]">
                      search
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-[#ffdf9d] uppercase tracking-[0.25em] mb-3">
                      Main Navigation
                    </p>

                    <motion.button
                      whileHover={{ x: 6, backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNavClick('home')}
                      className={`w-full text-left px-4 py-3 rounded-2xl flex items-center justify-between text-sm font-bold tracking-wider uppercase transition-all cursor-pointer ${
                        currentView === 'home'
                          ? 'bg-[#420054] text-[#ffdf9d] border border-[#ffdf9d]/30'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-lg">home</span>
                        <span>Home</span>
                      </span>
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ x: 6, backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNavClick('shop')}
                      className={`w-full text-left px-4 py-3 rounded-2xl flex items-center justify-between text-sm font-bold tracking-wider uppercase transition-all cursor-pointer ${
                        currentView === 'shop'
                          ? 'bg-[#420054] text-[#ffdf9d] border border-[#ffdf9d]/30'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-lg">storefront</span>
                        <span>Shop Catalog</span>
                      </span>
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ x: 6, backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNavClick('home', 'about-section')}
                      className="w-full text-left px-4 py-3 rounded-2xl flex items-center justify-between text-sm font-bold tracking-wider uppercase text-white/80 hover:text-white transition-all cursor-pointer"
                    >
                      <span className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-lg">auto_awesome</span>
                        <span>About Us</span>
                      </span>
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ x: 6, backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNavClick('home', 'footer-section')}
                      className="w-full text-left px-4 py-3 rounded-2xl flex items-center justify-between text-sm font-bold tracking-wider uppercase text-white/80 hover:text-white transition-all cursor-pointer"
                    >
                      <span className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-lg">call</span>
                        <span>Contact Us</span>
                      </span>
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </motion.button>
                  </div>

                  {/* Categories Quick Filter */}
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-[10px] font-bold text-[#ffdf9d] uppercase tracking-[0.25em] mb-3">
                      Popular Collections
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {['Perfume', 'Collection', 'Accessories', 'News'].map((cat) => (
                        <motion.button
                          key={cat}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => {
                            setSelectedCategory(cat);
                            handleNavClick('shop');
                          }}
                          className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white/80 hover:bg-[#420054] hover:text-[#ffdf9d] transition-all text-left cursor-pointer"
                        >
                          {cat}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Drawer Footer Actions */}
                <div className="p-6 border-t border-white/10 space-y-3 bg-[#141313]">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      handleNavClick(user.isAdmin ? 'admin-dashboard' : 'login');
                    }}
                    className="w-full py-3 rounded-full bg-white/10 border border-white/20 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">person</span>
                    <span>{user.isLoggedIn ? `Account (${user.name})` : 'Customer Sign In'}</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNavClick(user.isAdmin ? 'admin-dashboard' : 'admin-login')}
                    className="w-full py-2.5 rounded-full bg-[#420054] text-[#ffdf9d] border border-[#ffdf9d]/30 font-bold text-xs uppercase tracking-wider hover:bg-[#5d1a6f] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">admin_panel_settings</span>
                    <span>Admin Access Portal</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
