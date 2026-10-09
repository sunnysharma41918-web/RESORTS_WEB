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
  KeyRound,
  ShieldAlert,
  Clock,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import BrandLogo from '../../components/common/BrandLogo';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
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

  // Detect Caps Lock
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
      setError('Please provide both your Administrator ID / Email and Password.');
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
        setError('Too many failed authentication attempts. Access locked for 30 seconds.');
      } else {
        setError(err.message || 'Authentication failed. Please verify your Administrator credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#F4F6F5] text-[#111827] grid grid-cols-1 lg:grid-cols-12 select-none font-manrope">
      
      {/* ========================================================================= */}
      {/* LEFT COLUMN: LUXURY EDITORIAL PHOTOGRAPHIC PLATE (5/12 COLS - FIXED FIT)   */}
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
            <span>Live Sanctuary</span>
            <ArrowRight className="w-3 h-3 text-[#34D399]" />
          </Link>
        </div>

        {/* Middle Floating Feature Pill */}
        <div className="relative z-10 my-auto py-4">
          <div className="p-5 bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl space-y-2.5 max-w-sm">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#34D399]/20 text-[#34D399] rounded-full text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              <span>Executive CMS Control Center</span>
            </div>
            <h3 className="text-lg font-extrabold text-white leading-snug">
              Sanctuaries of Distinction & Wonder
            </h3>
            <p className="text-[11px] text-emerald-100 font-light leading-relaxed">
              Secure enterprise console to curate bespoke resort packages, manage dynamic suites, monitor guest inquiries, and update live portal settings.
            </p>
          </div>
        </div>

        {/* Bottom Security Footer */}
        <div className="relative z-10 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-200 font-semibold tracking-wider uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-[#34D399]" />
            <span>256-Bit Encrypted Executive Authentication</span>
          </div>
          <p className="text-[10px] text-white/70">
            © {new Date().getFullYear()} COUNTRY HOLIDAYS HOTELS & RESORTS PRIVATE LIMITED.
          </p>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* RIGHT COLUMN: PRODUCTION AUTHENTICATION CARD (7/12 COLS - ZERO SCROLL)     */}
      {/* ========================================================================= */}
      <div className="col-span-12 lg:col-span-7 h-full p-4 sm:p-6 lg:p-8 flex flex-col justify-between items-center bg-[#F4F6F5] overflow-hidden">
        
        {/* Mobile Top Brand Bar */}
        <div className="lg:hidden w-full flex items-center justify-between pb-2 border-b border-[#E5EAE7]">
          <Link to="/" className="flex items-center gap-2">
            <BrandLogo size="sm" animated={false} />
            <div className="flex flex-col">
              <span className="text-xs font-black uppercase text-[#111827]">Country Holidays</span>
              <span className="text-[9px] text-[#134E39] font-bold uppercase">Executive CMS</span>
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

        {/* Center Card Container */}
        <div className="w-full max-w-[400px] my-auto space-y-3.5">
          
          {/* Card Box */}
          <div className="bg-white border border-[#E5EAE7] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            
            {/* Header */}
            <div className="space-y-1.5 text-center sm:text-left">
              <div className="w-11 h-11 rounded-2xl bg-[#EBF5EE] text-[#134E39] flex items-center justify-center mb-2 mx-auto sm:mx-0 shadow-2xs">
                <Lock className="w-5 h-5 text-[#134E39]" />
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#111827] tracking-tight">
                Executive Portal Sign-In
              </h1>
              <p className="text-xs text-gray-500 font-normal">
                Enter your authorized administrator credentials to access the console.
              </p>
            </div>

            {/* Session Expired Alert */}
            {isExpiredRedirect && (
              <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Session Expired</strong>
                  <span>Your executive session has timed out due to inactivity. Please sign in again.</span>
                </div>
              </div>
            )}

            {/* Lockout Timer Alert */}
            {lockoutTimer > 0 && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-red-600 shrink-0 animate-pulse" />
                <span>Security cooldown active. Please wait <strong>{lockoutTimer}s</strong> before retrying.</span>
              </div>
            )}

            {/* Error Alert */}
            {error && lockoutTimer === 0 && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span className="leading-tight">{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
              
              {/* Email / Admin ID */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-700 block uppercase tracking-wider">
                  Administrator ID or Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
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
                    placeholder="e.g. CHHR0012 or admin@domain.com"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#F4F6F5] focus:bg-white text-xs sm:text-sm text-[#111827] placeholder:text-gray-400 border border-transparent focus:border-[#134E39] rounded-xl outline-none transition-all font-mono"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-gray-700 block uppercase tracking-wider">
                    Secret Password *
                  </label>
                  {capsLockActive && (
                    <span className="text-[10px] text-amber-600 font-bold flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3" />
                      Caps Lock ON
                    </span>
                  )}
                </div>

                <div className="relative">
                  <KeyRound className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
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
                    placeholder="Enter executive password"
                    className="w-full pl-10 pr-10 py-2.5 bg-[#F4F6F5] focus:bg-white text-xs sm:text-sm text-[#111827] placeholder:text-gray-400 border border-transparent focus:border-[#134E39] rounded-xl outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1.5 text-gray-400 hover:text-gray-700 absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 text-[#134E39]" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & SSL Info */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 accent-[#134E39] rounded cursor-pointer"
                  />
                  <span>Stay logged in</span>
                </label>

                <div className="flex items-center gap-1 text-[10px] text-gray-400 font-mono">
                  <ShieldCheck className="w-3 h-3 text-[#134E39]" />
                  <span>TLS 1.3 Secure</span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading || lockoutTimer > 0}
                  className="w-full py-3.5 bg-[#134E39] hover:bg-[#0E3C2B] active:scale-[0.99] text-white font-bold text-xs sm:text-sm rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 tracking-wider uppercase"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#34D399]" />
                      <span>Authenticating Secure Session...</span>
                    </>
                  ) : lockoutTimer > 0 ? (
                    <span>Locked ({lockoutTimer}s)</span>
                  ) : (
                    <>
                      <span>Sign In to Executive Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>

          {/* Security Notice Footer */}
          <div className="text-center space-y-1 text-[11px] text-gray-400">
            <p>Authorized personnel only. All access attempts are securely logged & audited.</p>
          </div>

        </div>

        {/* Footer */}
        <div className="w-full text-center text-[10px] text-gray-400 pt-1 flex items-center justify-center gap-4">
          <span>COUNTRY HOLIDAYS HOTELS & RESORTS PRIVATE LIMITED</span>
          <span>•</span>
          <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <span>•</span>
          <Link to="/cancellation-policy" className="hover:underline">Cancellation Policy</Link>
        </div>

      </div>

    </div>
  );
}

