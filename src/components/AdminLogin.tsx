import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QubetLogo } from './QubetLogo';

export const AdminLogin: React.FC = () => {
  const { setCurrentView, setUser, showToast } = useApp();
  const [adminId, setAdminId] = useState('ADMIN001');
  const [password, setPassword] = useState('Admin@1234');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminId.trim() || !password.trim()) {
      setErrorMsg('Please enter both User ID and Password.');
      return;
    }

    if (adminId.trim() === 'ADMIN001' && password === 'Admin@1234') {
      setUser({
        name: 'Pranay Chakraborty',
        email: 'pranay.chakraborty@qubetperfume.com',
        isLoggedIn: true,
        isAdmin: true,
        avatarUrl: null,
      });
      showToast('Welcome Pranay Chakraborty - Admin Authenticated');
      setCurrentView('admin-dashboard');
    } else {
      setErrorMsg('Invalid Credentials. Try User ID: ADMIN001 & Password: Admin@1234');
      showToast('Invalid admin credentials');
    }
  };

  return (
    <div className="min-h-[90vh] bg-[#1c1b1b] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 min-h-[600px] border border-[#d1c2d0]/40">
        {/* Left Purple Brand Panel */}
        <div className="lg:col-span-5 bg-[#420054] text-white p-8 sm:p-12 relative flex flex-col justify-between overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-40">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIyXKzBHPuq-w8AqFTbkYTNXhwINcQjH_3_BQsrLMuCTbMNa_u2BgXqGnvePCBo4FWnZHiu6Y9PcNB73q8HvWd45BrrYyTFyxd-TXCNydh1SmCH5Wxt5ts5WeXKtgbGDrjrHlqllQam54FEJ1bKEsbfm9yesYlwhcrqnAeERJZUVX5i0F1mEbv84xVJ4gT8ITD3AGrUa9iuP8pZHQR8GCqzEvfkJpzxWR4Eh6Zzu8emBVBhYHhLhTUfQmMtz0VrfaVBzf72RUAAbM"
              alt="Admin Background"
              className="w-full h-full object-cover object-center filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#420054] via-[#420054]/80 to-transparent"></div>
          </div>

          <div className="relative z-10">
            <div className="mb-6 cursor-pointer" onClick={() => setCurrentView('home')}>
              <QubetLogo variant="gold" className="h-10" />
            </div>

            <span className="inline-block px-3 py-1 rounded-full bg-[#ffdf9d] text-[#251a00] text-[10px] font-bold uppercase tracking-[0.25em] mb-4">
              ROYAL ESSENCE ADMIN
            </span>

            <h2 className="font-display-lg text-3xl font-bold leading-tight mb-4 text-white">
              Executive Management & Asset Portal
            </h2>

            <p className="text-xs text-white/80 font-light leading-relaxed">
              Secure administrative center for website banners, product asset library, catalog management, and analytics.
            </p>
          </div>

          <div className="relative z-10 pt-8 border-t border-white/20 mt-8">
            <p className="font-display-lg text-sm text-[#ffdf9d] italic font-light">
              "The ultimate luxury is the scent of authority."
            </p>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="lg:col-span-7 p-8 sm:p-12 bg-[#fcf9f8] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                System: Optimal
              </span>

              <button
                onClick={() => setCurrentView('login')}
                className="text-xs font-semibold text-[#765a16] hover:text-[#420054] flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                <span>Customer Login</span>
              </button>
            </div>

            <h3 className="font-display-lg text-2xl sm:text-3xl font-bold text-[#420054] mb-2">
              ADMIN PORTAL ACCESS
            </h3>
            <p className="text-xs text-[#4e434f] mb-8">
              Enter your credentials to manage Royal Essence store resources.
            </p>

            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-base">error</span>
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleAdminAuth} className="space-y-6">
              {/* User ID */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4e434f] mb-2">
                  Admin User ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={adminId}
                    onChange={(e) => {
                      setAdminId(e.target.value);
                      setErrorMsg('');
                    }}
                    placeholder="e.g. ADMIN001"
                    className="w-full bg-white border-2 border-[#d1c2d0] rounded-2xl py-3 pl-11 pr-4 text-sm font-semibold text-[#1c1b1b] focus:outline-none focus:border-[#420054]"
                  />
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-[#807380]">
                    badge
                  </span>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4e434f] mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorMsg('');
                    }}
                    placeholder="Enter password"
                    className="w-full bg-white border-2 border-[#d1c2d0] rounded-2xl py-3 pl-11 pr-11 text-sm font-semibold text-[#1c1b1b] focus:outline-none focus:border-[#420054]"
                  />
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-[#807380]">
                    lock
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-base text-[#807380] hover:text-[#420054] cursor-pointer"
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Remember Device & Preset Quick Fill */}
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-[#4e434f] cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-[#d1c2d0] text-[#420054] focus:ring-[#420054]" />
                  <span>Remember device for 30 days</span>
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setAdminId('ADMIN001');
                    setPassword('Admin@1234');
                    setErrorMsg('');
                  }}
                  className="text-[#765a16] font-bold hover:underline"
                >
                  Fill Default Credentials
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#420054] text-[#ffdf9d] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#5d1a6f] transition-all shadow-lg hover:shadow-xl cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Authorize & Access Panel</span>
                <span className="material-symbols-outlined text-base">login</span>
              </button>
            </form>
          </div>

          <div className="mt-8 pt-4 border-t border-[#d1c2d0]/50 text-center text-[11px] text-[#807380]">
            Demo credentials: ID <code className="bg-[#f0eded] px-1.5 py-0.5 rounded font-bold text-[#420054]">ADMIN001</code> | Password <code className="bg-[#f0eded] px-1.5 py-0.5 rounded font-bold text-[#420054]">Admin@1234</code>
          </div>
        </div>
      </div>
    </div>
  );
};
