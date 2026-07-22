import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Categories } from './components/Categories';
import { BestSellers } from './components/BestSellers';
import { PremiumBanner } from './components/PremiumBanner';
import { FeaturedProducts } from './components/FeaturedProducts';
import { WhyTrustUs } from './components/WhyTrustUs';
import { PersonalitySection } from './components/PersonalitySection';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { ShopPage } from './components/ShopPage';
import { CustomerLoginModal } from './components/CustomerLoginModal';
import { AdminLogin } from './components/AdminLogin';
import { AdminPanel } from './components/AdminPanel';
import { CartDrawer } from './components/CartDrawer';
import { WishlistModal } from './components/WishlistModal';
import { QuickViewModal } from './components/QuickViewModal';

const AppContent: React.FC = () => {
  const { currentView, toastMessage } = useApp();

  return (
    <div className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b] flex flex-col justify-between selection:bg-[#420054] selection:text-[#ffdf9d]">
      {/* Toast Notification Bar */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 bg-[#420054] text-[#ffdf9d] px-5 py-3 rounded-2xl shadow-2xl border border-[#ffdf9d]/30 font-bold text-xs uppercase tracking-wider flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">info</span>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main View Router with Smooth Premium Animations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 flex flex-col"
        >
          {currentView === 'admin-dashboard' ? (
            <AdminPanel />
          ) : currentView === 'admin-login' ? (
            <>
              <Header />
              <AdminLogin />
              <Footer />
            </>
          ) : currentView === 'login' ? (
            <>
              <Header />
              <CustomerLoginModal />
              <Footer />
            </>
          ) : currentView === 'shop' ? (
            <>
              <Header />
              <ShopPage />
              <Footer />
            </>
          ) : (
            /* Home Landing Page */
            <>
              <Header />
              <main>
                <Hero />
                <Categories />
                <BestSellers />
                <PremiumBanner />
                <FeaturedProducts />
                <WhyTrustUs />
                <PersonalitySection />
                <Testimonials />
              </main>
              <Footer />
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Interactive Overlays */}
      <CartDrawer />
      <WishlistModal />
      <QuickViewModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
