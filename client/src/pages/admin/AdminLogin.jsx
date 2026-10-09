import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  AlertCircle,
  ShieldAlert,
  Clock,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTimer, setLockoutTimer] = useState(0);

  const { login, isAuthenticated, sessionExpired } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isExpiredRedirect = sessionExpired || location.state?.sessionExpired;
  const from = location.state?.from?.pathname || '/admin';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutTimer > 0) {
      const interval = setInterval(() => {
        setLockoutTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [lockoutTimer]);

  const handleKeyDown = (e) => {
    if (e.getModifierState) {
      setCapsLockActive(e.getModifierState('CapsLock'));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (lockoutTimer > 0) return;

    setError('');

    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);

    try {
      await login(email.trim(), password);
      setFailedAttempts(0);
      navigate(from, { replace: true });
    } catch (err) {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);

      if (newAttempts >= 5) {
        setLockoutTimer(30);
        setError('Too many failed attempts. Locked for 30s.');
      } else {
        setError(err.message || 'Invalid credentials. Please verify your administrator details.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen min-h-screen bg-[#FAF8F5] flex flex-col lg:flex-row font-sans select-none antialiased overflow-hidden z-50">

      {/* ========================================================================= */}
      {/* LEFT COLUMN: PILL FORM SECTION (RESPONSIVE FULL WIDTH ON MOBILE, 50% ON LG) */}
      {/* ========================================================================= */}
      <div className="w-full lg:w-1/2 h-full min-h-full p-4 sm:p-8 md:p-10 lg:p-12 xl:p-16 flex flex-col justify-between overflow-y-auto bg-[#FAF8F5]">

        {/* Top Pill Logo */}
        <div className="w-full flex items-center justify-between gap-3 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border border-stone-300 bg-white/70 backdrop-blur-md shadow-xs">
            <img
              src="/country-holidays-logo.png"
              alt="Country Holidays"
              className="w-5 h-5 sm:w-6 sm:h-6 object-contain shrink-0"
            />
            <span className="text-[11px] sm:text-xs font-bold tracking-tight text-stone-800">
              Country Holidays Hotels & Resorts
            </span>
          </div>

          <Link
            to="/"
            className="text-xs font-semibold text-stone-500 hover:text-[#0284C7] transition-colors"
          >
            Live Site →
          </Link>
        </div>

        {/* Center Form Container */}
        <div className="w-full max-w-[340px] sm:max-w-[360px] mx-auto my-auto space-y-5 sm:space-y-6 py-6">

          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1.5 bg-white shadow-md border border-stone-200/90 flex items-center justify-center overflow-hidden">
                <img
                  src="/country-holidays-logo.png"
                  alt="Country Holidays Hotels & Resorts"
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
              Sign In
            </h1>
          </div>

          {/* Session Expired Alert */}
          {isExpiredRedirect && (
            <div className="p-2.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-2xl flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>Session expired. Please sign in again.</span>
            </div>
          )}

          {/* Lockout Timer Alert */}
          {lockoutTimer > 0 && (
            <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-600 shrink-0 animate-pulse" />
              <span>Security cooldown: Wait <strong>{lockoutTimer}s</strong>.</span>
            </div>
          )}

          {/* Error Alert */}
          {error && lockoutTimer === 0 && (
            <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span className="leading-tight">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6" noValidate>

            {/* Email / Username Pill Input */}
            <div className="space-y-2 text-left">
              <label className="text-xs sm:text-sm font-normal text-[#6B7280] ml-4 block">
                User ID
              </label>
              <input
                type="text"
                required
                autoFocus
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
                autoComplete="username"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                className="w-full px-5 sm:px-6 py-3 sm:py-3.5 bg-white text-sm sm:text-base text-[#111827] placeholder:text-[#9CA3AF] border border-[#E5E7EB] focus:border-[#FFCC4D] focus:ring-4 focus:ring-[#FFCC4D]/25 rounded-full outline-none transition-all shadow-xs"
              />
            </div>

            {/* Password Pill Input */}
            <div className="space-y-2 text-left">
              <label className="text-xs sm:text-sm font-normal text-[#6B7280] ml-4 block">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="••••••••••••"
                  className="w-full pl-5 sm:pl-6 pr-12 py-3 sm:py-3.5 bg-white text-sm sm:text-base text-[#111827] placeholder:text-[#9CA3AF] border border-[#E5E7EB] focus:border-[#FFCC4D] focus:ring-4 focus:ring-[#FFCC4D]/25 rounded-full outline-none transition-all shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1.5 text-[#9CA3AF] hover:text-[#4B5563] absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4.5 h-4.5 text-[#4B5563]" />
                  ) : (
                    <Eye className="w-4.5 h-4.5" />
                  )}
                </button>
              </div>

              {capsLockActive && (
                <span className="text-[10px] text-amber-600 font-medium flex items-center gap-1 pt-0.5 ml-4">
                  <ShieldAlert className="w-3 h-3" />
                  Caps Lock ON
                </span>
              )}
            </div>

            {/* Golden Yellow Pill Submit Button */}
            <div className="pt-2 flex justify-center">
              <button
                type="submit"
                disabled={loading || lockoutTimer > 0}
                className="w-full py-2.5 sm:py-3 bg-[#FFCC4D] hover:bg-[#FFC333] active:scale-[0.99] text-[#111827] font-semibold text-sm rounded-full transition-all shadow-md shadow-[#FFCC4D]/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 tracking-wide"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#111827]" />
                    <span>Signing in...</span>
                  </>
                ) : lockoutTimer > 0 ? (
                  <span>Locked ({lockoutTimer}s)</span>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </div>

          </form>

        </div>

        {/* Bottom Links */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] sm:text-xs text-stone-400 pt-2 text-center sm:text-left">
          <span>
            Authorized Personnel Only
          </span>
          <span className="hover:text-stone-600 cursor-pointer transition-colors">
            Terms & Conditions
          </span>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* RIGHT COLUMN: PURE RESORT IMAGE PANEL (DESKTOP & TABLET LANDSCAPE) */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex lg:w-1/2 h-full relative overflow-hidden bg-stone-900 shrink-0 flex-col justify-end p-8 sm:p-12 lg:p-16">

        {/* High-Resolution Luxury Resort Photography */}
        <img
          src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=85"
          alt="Country Holidays Luxury Resort"
          className="w-full h-full object-cover object-center absolute inset-0 filter brightness-[0.88] contrast-[1.05]"
        />

        {/* Dynamic Multi-Stop Gradient Fading for Atmospheric Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20 pointer-events-none" />

        {/* Cool Luxury Typography Overlay with Soft Fading */}
        <div className="relative z-10 space-y-2 max-w-lg text-white">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight leading-tight text-white font-serif">
            Where <span className="italic font-medium text-[#FFD875]">Luxury</span> Meets <span className="italic font-medium text-[#FFD875]">Serenity</span>
          </h2>

          <p className="text-xs sm:text-sm text-white/75 font-light leading-relaxed tracking-wide">
            Curating unforgettable stays across India's most breathtaking sanctuaries
          </p>
        </div>

      </div>

    </div>
  );
}


