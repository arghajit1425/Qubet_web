import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QubetLogo } from './QubetLogo';

export const CustomerLoginModal: React.FC = () => {
  const { setCurrentView, setUser, showToast } = useApp();
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otp, setOtp] = useState(['5', '2', '8', '9']);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      showToast('Please enter a valid 10-digit mobile number');
      return;
    }
    setStep('otp');
    showToast('OTP sent to +91 ' + phoneNumber);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      name: 'Royal Member',
      email: `user${phoneNumber.slice(-4)}@qubet.com`,
      phone: `+91 ${phoneNumber}`,
      isLoggedIn: true,
      isAdmin: false,
    });
    showToast('Welcome back, Royal Member!');
    setCurrentView('home');
  };

  const handleGuestLogin = () => {
    setUser({
      name: 'Guest Explorer',
      email: 'guest@qubetperfume.com',
      isLoggedIn: true,
      isAdmin: false,
    });
    showToast('Signed in as Guest');
    setCurrentView('home');
  };

  const handleGoogleLogin = () => {
    setUser({
      name: 'Google User',
      email: 'alex.royal@gmail.com',
      isLoggedIn: true,
      isAdmin: false,
    });
    showToast('Logged in with Google');
    setCurrentView('home');
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#1c1b1b] overflow-hidden">
      {/* Background Hotlinked Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAScx17LOhJfg2TxBzxvOeMkJvMpw7aMIDcc_ONWVHVLYA4ZR8GXhFhgqvHC8KvodO70gXLGUxqYp41jbBu3xNTrVsY4GsDEOMlPSQ8Az5W39FJqTzLGmcT8vUlYkD-F3Huw9orQETShaDdBHgh8xYNfzgqhavXNoLiNf1gYpeP3pUgMwTkKUXDBIaV24Iq6FTCXzDu1l_S8RBatmMkMz11ZQ8r2dwfjcImsbrK6qw-wzd_WzrZYb0ZVTSmM4jrSW0934bAbMSdnXM"
          alt="Qubet Perfume Customer Login"
          className="w-full h-full object-cover object-center filter brightness-[0.6] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1b] via-[#420054]/40 to-[#1c1b1b]/80"></div>
      </div>

      {/* Glassmorphic Card */}
      <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/40">
        {/* Brand Header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <QubetLogo variant="light" className="h-12 mb-2" />
          <p className="text-xs text-[#765a16] uppercase tracking-widest font-semibold mt-1">
            Sign in to your Royal Account
          </p>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4e434f] mb-2">
                Mobile Phone Number
              </label>
              <div className="flex rounded-2xl border-2 border-[#d1c2d0] focus-within:border-[#420054] bg-white/90 overflow-hidden transition-colors">
                <span className="px-4 py-3 bg-[#f6f3f2] text-xs font-bold text-[#420054] flex items-center border-r border-[#d1c2d0]">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 10-digit number"
                  className="w-full px-4 py-3 text-sm font-semibold text-[#1c1b1b] placeholder-[#807380] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#420054] text-[#ffdf9d] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#5d1a6f] transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Get OTP</span>
              <span className="material-symbols-outlined text-base">send</span>
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="text-center">
              <p className="text-xs text-[#4e434f] mb-4">
                Enter the 4-digit code sent to <strong className="text-[#420054]">+91 {phoneNumber}</strong>
              </p>

              <div className="flex justify-center gap-3 mb-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[index] = e.target.value;
                      setOtp(newOtp);
                    }}
                    className="w-12 h-12 rounded-xl text-center font-bold text-xl bg-white border-2 border-[#420054] text-[#420054] focus:outline-none shadow-sm"
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setStep('phone')}
                className="text-[11px] text-[#765a16] font-semibold underline hover:text-[#420054]"
              >
                Change Phone Number
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#420054] text-[#ffdf9d] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#5d1a6f] transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Verify & Login</span>
              <span className="material-symbols-outlined text-base">verified</span>
            </button>
          </form>
        )}

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#d1c2d0]"></div>
          </div>
          <span className="relative bg-white/90 px-3 text-[10px] uppercase font-bold text-[#807380] tracking-widest rounded-full">
            OR
          </span>
        </div>

        {/* Alternate Login Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-3 rounded-full bg-white hover:bg-gray-50 border border-[#d1c2d0] text-[#1c1b1b] text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.1 0-5.74-2.09-6.68-4.91H1.28v3.15C3.26 21.3 7.31 24 12 24z"/>
              <path fill="#FBBC05" d="M5.32 14.29c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.56H1.28C.46 8.19 0 10.04 0 12s.46 3.81 1.28 5.44l4.04-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.28 6.56l4.04 3.15c.94-2.82 3.58-4.96 6.68-4.96z"/>
            </svg>
            <span>Login with Google</span>
          </button>

          <button
            type="button"
            onClick={handleGuestLogin}
            className="w-full py-3 rounded-full bg-[#f6f3f2] hover:bg-[#e5e2e1] text-[#420054] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">person_outline</span>
            <span>Continue as Guest</span>
          </button>
        </div>

        {/* Footer Admin Switcher */}
        <div className="mt-8 pt-6 border-t border-[#d1c2d0]/50 text-center">
          <p className="text-xs text-[#4e434f]">
            Are you a store manager or administrator?
          </p>
          <button
            onClick={() => setCurrentView('admin-login')}
            className="mt-2 text-xs font-bold text-[#420054] hover:text-[#765a16] uppercase tracking-wider flex items-center justify-center gap-1 mx-auto cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
            <span>Go to Admin Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};
