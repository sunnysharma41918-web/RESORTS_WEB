import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Lock,
  Mail,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import BrandLogo from '../../components/common/BrandLogo';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@countryholidaysresorts.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, isAuthenticated, sessionExpired } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isExpiredRedirect = sessionExpired || location.state?.sessionExpired;
  const from = location.state?.from?.pathname || '/admin';

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = () => {
    setEmail('admin@countryholidaysresorts.com');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#F4F6F5] text-[#111827] grid grid-cols-1 lg:grid-cols-12 select-none font-manrope">
      
      {/* ========================================================================= */}
      {/* LEFT COLUMN: LUXURY EDITORIAL PHOTOGRAPHIC PLATE (5/12 COLS - 100% FIXED) */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex lg:col-span-5 h-full relative p-6 xl:p-8 flex-col justify-between overflow-hidden bg-[#134E39] text-white shrink-0">
        
        {/* Background Scenic Resort Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85"
            alt="Country Holidays Luxury Sanctuaries"
            className="w-full h-full object-cover object-center filter brightness-[0.70] contrast-[1.08]"
          />
          {/* Subtle green vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E3C2B] via-black/20 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#134E39]/80 via-transparent to-transparent" />
        </div>

        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BrandLogo size="sm" animated={false} />
            <div className="flex flex-col">
              <span className="text-xs font-black uppercase tracking-wider text-white">
                Country Holidays
              </span>
              <span className="text-[9px] text-[#34D399] font-bold uppercase tracking-widest">
                Hotels & Resorts
              </span>
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-white transition-all shadow-sm"
          >
            <span>Live Site</span>
            <ArrowRight className="w-3 h-3 text-[#34D399]" />
          </Link>
        </div>

        {/* Middle Floating Feature Pill */}
        <div className="relative z-10 my-auto py-4">
          <div className="p-5 bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl space-y-2.5 max-w-sm">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#34D399]/20 text-[#34D399] rounded-full text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              <span>CMS Control Center</span>
            </div>
            <h3 className="text-lg font-extrabold text-white leading-snug">
              Sanctuaries of Distinction & Wonder
            </h3>
            <p className="text-[11px] text-emerald-100 font-light leading-relaxed">
              Curate bespoke resort packages, manage dynamic suites, update live marquee tickers, and respond to VIP guest leads in real time.
            </p>
          </div>
        </div>

        {/* Bottom Slogan */}
        <div className="relative z-10 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-200 font-semibold tracking-wider uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-[#34D399]" />
            <span>Secure 256-Bit Executive Session</span>
          </div>
          <p className="text-[10px] text-white/70">
            © {new Date().getFullYear()} Country Holidays Hotels & Resorts Group.
          </p>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* RIGHT COLUMN: 100% FIXED FIT LOGIN CARD (7/12 COLS - ZERO SCROLL)         */}
      {/* ========================================================================= */}
      <div className="col-span-12 lg:col-span-7 h-full p-4 sm:p-6 lg:p-8 flex flex-col justify-between items-center bg-[#F4F6F5] overflow-hidden">
        
        {/* Mobile Top Brand Bar */}
        <div className="lg:hidden w-full flex items-center justify-between pb-2 border-b border-[#E5EAE7]">
          <Link to="/" className="flex items-center gap-2">
            <BrandLogo size="sm" animated={false} />
            <div className="flex flex-col">
              <span className="text-xs font-black uppercase text-[#111827]">Country Holidays</span>
              <span className="text-[9px] text-[#134E39] font-bold uppercase">Hotels & Resorts CMS</span>
            </div>
          </Link>

          <Link
            to="/"
            className="text-xs font-semibold text-[#134E39] flex items-center gap-1"
          >
            <span>Live Site</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Center Card Container - Perfectly Compact */}
        <div className="w-full max-w-[390px] my-auto space-y-3.5">
          
          {/* Card Box */}
          <div className="bg-white border border-[#E5EAE7] rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
            
            {/* Header */}
            <div className="space-y-1 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-[#EBF5EE] text-[#134E39] flex items-center justify-center mb-2 mx-auto sm:mx-0">
                <Lock className="w-5 h-5 text-[#134E39]" />
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#111827] tracking-tight">
                Welcome Back
              </h1>
              <p className="text-xs text-gray-500 font-normal">
                Sign in to manage your luxury properties & inquiries.
              </p>
            </div>

            {/* Session Expired Alert */}
            {isExpiredRedirect && (
              <div className="p-2.5 bg-amber-50 border border-amber-200 text-amber-800 text-[11px] rounded-xl flex items-start gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Session Timed Out</strong>
                  <span>Please sign in again to continue.</span>
                </div>
              </div>
            )}

            {/* Error Alert */}
            {error && (
              <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-[11px] rounded-xl flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              
              {/* Email / Admin ID */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-700 block">
                  Email Address / Admin ID
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@countryholidaysresorts.com"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-[#F4F6F5] focus:bg-white text-xs text-[#111827] placeholder:text-gray-400 border border-transparent focus:border-[#134E39] rounded-xl outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-gray-700 block">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={handleQuickFill}
                    className="text-[10px] text-[#134E39] font-bold hover:underline cursor-pointer"
                  >
                    Quick Auto-Fill
                  </button>
                </div>

                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2.5 bg-[#F4F6F5] focus:bg-white text-xs text-[#111827] placeholder:text-gray-400 border border-transparent focus:border-[#134E39] rounded-xl outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-gray-400 hover:text-gray-700 absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5 text-[#134E39]" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-1.5 text-[11px] text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 accent-[#134E39] rounded cursor-pointer"
                  />
                  <span>Keep me signed in</span>
                </label>

                <span className="text-[10px] text-gray-400">256-Bit SSL</span>
              </div>

              {/* Submit Button */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#134E39] hover:bg-[#0E3C2B] active:scale-[0.99] text-white font-bold text-xs rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 tracking-wider uppercase"
                >
                  {loading ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span>Sign In to CMS Portal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>

          {/* Quick Demo Credentials Footer Helper */}
          <div className="p-3 bg-[#EBF5EE] border border-[#134E39]/10 rounded-xl flex items-center justify-between text-[11px] text-[#134E39]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#134E39]" />
              <span className="font-semibold">Demo: admin@countryholidaysresorts.com / admin123</span>
            </div>
            <button
              onClick={handleQuickFill}
              className="font-bold underline hover:text-[#0E3C2B] text-[10px] shrink-0 cursor-pointer"
            >
              Fill
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="w-full text-center text-[10px] text-gray-400 pt-1">
          <span>Country Holidays Hotels & Resorts CMS • All Rights Reserved</span>
        </div>

      </div>

    </div>
  );
}
