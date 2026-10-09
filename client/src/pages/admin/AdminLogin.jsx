import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  AlertCircle,
  ShieldAlert,
  Clock,
  Loader2,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
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

  // Auto slide carousel on the left panel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const slides = [
    {
      title: 'Country Holidays Sanctuary',
      desc: 'Curate palatial suites, luxury packages & guest experiences with effortless precision.',
    },
    {
      title: 'Bespoke Hospitality CMS',
      desc: 'Seamless real-time synchronization for South and North India resort destinations.',
    },
    {
      title: 'Concierge & Guest Telemetry',
      desc: 'Monitor incoming reservations and direct booking inquiries securely.',
    },
  ];

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
      setError('Please provide your Username/Email and Password.');
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
    <div className="min-h-screen w-full bg-[#525E59] flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans select-none antialiased">
      
      {/* Floating Split Card Container */}
      <div className="w-full max-w-4xl bg-white rounded-[28px] overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[560px] border border-black/5">
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN: ARTISTIC SAGE GREEN ILLUSTRATED HERO PANEL                   */}
        {/* ========================================================================= */}
        <div className="w-full md:w-1/2 bg-[#95B7A9] p-8 sm:p-10 flex flex-col justify-between items-center text-white relative overflow-hidden shrink-0 min-h-[380px] md:min-h-full">
          
          {/* Subtle decorative background circles */}
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-black/5 pointer-events-none" />

          {/* Top subtle badge */}
          <div className="w-full flex items-center justify-between z-10">
            <span className="text-[11px] font-bold tracking-widest uppercase text-white/80">
              CHHR PORTAL
            </span>
            <Link
              to="/"
              className="text-[11px] font-semibold text-white/90 hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>Live Site</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Center Artistic Botanical Bird Illustration SVG */}
          <div className="my-auto py-4 flex items-center justify-center z-10">
            <svg
              className="w-56 h-56 sm:w-64 sm:h-64 drop-shadow-sm transition-transform duration-700 hover:scale-105"
              viewBox="0 0 320 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Vines and Stems */}
              <path
                d="M160 250 C160 180, 140 120, 130 70"
                stroke="#6C8A7D"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M145 150 C180 140, 200 110, 210 80"
                stroke="#6C8A7D"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M140 180 C110 160, 95 130, 90 95"
                stroke="#6C8A7D"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Leaves */}
              <path d="M130 90 C120 80, 115 65, 125 60 C135 65, 135 80, 130 90 Z" fill="#607C70" />
              <path d="M150 125 C165 120, 175 110, 170 100 C155 105, 148 115, 150 125 Z" fill="#607C70" />
              <path d="M105 155 C90 150, 85 140, 90 130 C100 135, 105 145, 105 155 Z" fill="#607C70" />
              <path d="M185 100 C200 95, 205 85, 200 75 C190 80, 185 90, 185 100 Z" fill="#607C70" />

              {/* Berries / Golden Buds */}
              <circle cx="95" cy="85" r="7" fill="#F4E8C1" />
              <circle cx="108" cy="72" r="6" fill="#F4E8C1" />
              <circle cx="120" cy="80" r="7.5" fill="#F4E8C1" />
              <circle cx="138" cy="62" r="6.5" fill="#F4E8C1" />
              <circle cx="152" cy="74" r="7" fill="#F4E8C1" />

              {/* Burgundy & Pink Flowers */}
              {/* Top Pink Tulip */}
              <path
                d="M115 135 C110 105, 150 105, 145 135 C135 145, 125 145, 115 135 Z"
                fill="#E86178"
              />
              <path
                d="M122 135 C125 115, 135 115, 138 135 Z"
                fill="#88283E"
              />

              {/* Small Burgundy Rose Flower */}
              <circle cx="118" cy="100" r="11" fill="#88283E" />
              <circle cx="112" cy="95" r="5" fill="#E86178" />
              <circle cx="124" cy="95" r="5" fill="#E86178" />
              <circle cx="118" cy="105" r="5" fill="#E86178" />

              {/* Peach Bloom Right */}
              <path
                d="M175 125 C165 110, 200 100, 205 120 C195 130, 185 130, 175 125 Z"
                fill="#F39C80"
              />
              <circle cx="190" cy="115" r="4" fill="#F7C469" />

              {/* Bottom Yellow Tulips near bird */}
              <path
                d="M180 185 C175 170, 195 165, 200 180 C192 188, 185 188, 180 185 Z"
                fill="#F7C469"
              />
              <circle cx="75" cy="195" r="6" fill="#F4E8C1" />
              <circle cx="85" cy="208" r="5" fill="#F4E8C1" />
              <path
                d="M75 220 L75 200 M85 220 L85 212"
                stroke="#6C8A7D"
                strokeWidth="2"
              />

              {/* Ground Shadow */}
              <ellipse cx="150" cy="225" rx="55" ry="7" fill="#7D9F91" />

              {/* Bird's Tail (Peacock / Sanctuary feathers) */}
              <path
                d="M165 195 C175 140, 225 130, 220 180 C205 205, 180 205, 165 195 Z"
                fill="#88283E"
              />
              <path
                d="M170 190 C180 145, 215 145, 205 185 Z"
                fill="#F39C80"
              />
              <path
                d="M172 185 C185 155, 200 155, 195 185 Z"
                fill="#E86178"
              />

              {/* Bird's Body */}
              <ellipse
                cx="140"
                cy="188"
                rx="34"
                ry="28"
                fill="#EEA28C"
              />

              {/* Bird's Wing */}
              <path
                d="M135 185 C145 185, 162 195, 155 215 C140 220, 130 205, 135 185 Z"
                fill="#88283E"
              />
              <path
                d="M137 187 C143 187, 153 195, 148 208 C140 210, 135 200, 137 187 Z"
                fill="#E86178"
              />

              {/* Bird's Head */}
              <circle cx="120" cy="172" r="18" fill="#EEA28C" />

              {/* Bird's Eye */}
              <circle cx="125" cy="168" r="7" fill="#FFFFFF" />
              <circle cx="126.5" cy="168" r="4.5" fill="#4B6358" />
              <circle cx="125" cy="166" r="1.8" fill="#FFFFFF" />

              {/* Bird's Beak */}
              <path d="M102 172 L110 168 L110 176 Z" fill="#F7C469" />

              {/* Bird's Feet */}
              <path
                d="M132 215 L126 226 M142 215 L138 226"
                stroke="#F7C469"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Feature Text Slide */}
          <div className="w-full text-center space-y-2 z-10">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white transition-all duration-300">
              {slides[activeSlide].title}
            </h2>
            <p className="text-xs sm:text-sm text-white/85 max-w-xs mx-auto leading-relaxed font-normal">
              {slides[activeSlide].desc}
            </p>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-2 pt-3">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeSlide === idx ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: MINIMALIST CLEAN WHITE LOGIN FORM                           */}
        {/* ========================================================================= */}
        <div className="w-full md:w-1/2 bg-white p-8 sm:p-12 lg:p-14 flex flex-col justify-between items-center text-[#2D3748]">
          
          <div className="w-full max-w-sm my-auto space-y-6">
            
            {/* Header / Brand Title */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl sm:text-4xl font-serif italic text-[#333E39] font-normal tracking-wide">
                Country Holidays
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 font-normal">
                Welcome to Country Holidays Portal
              </p>
            </div>

            {/* Session Expired Alert */}
            {isExpiredRedirect && (
              <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Session timed out. Please sign in to resume.</span>
              </div>
            )}

            {/* Lockout Timer Alert */}
            {lockoutTimer > 0 && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-600 shrink-0 animate-pulse" />
                <span>Security cooldown. Wait <strong>{lockoutTimer}s</strong>.</span>
              </div>
            )}

            {/* Error Alert */}
            {error && lockoutTimer === 0 && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span className="leading-tight">{error}</span>
              </div>
            )}

            {/* Form with Minimalist Underline Inputs */}
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              
              {/* Username / Email Field */}
              <div className="space-y-1 text-left">
                <label className="text-xs text-gray-400 font-medium block">
                  Username or Email
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
                  placeholder="Enter administrator ID"
                  className="w-full py-2.5 text-sm sm:text-base text-gray-800 placeholder:text-gray-300 border-b border-gray-200 focus:border-[#525E59] outline-none transition-colors bg-transparent"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-1 text-left">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-gray-400 font-medium block">
                    Password
                  </label>
                  {capsLockActive && (
                    <span className="text-[10px] text-amber-600 font-bold flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3" />
                      Caps Lock ON
                    </span>
                  )}
                </div>

                <div className="relative">
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
                    className="w-full py-2.5 pr-8 text-sm sm:text-base text-gray-800 placeholder:text-gray-300 border-b border-gray-200 focus:border-[#525E59] outline-none transition-colors bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-gray-400 hover:text-gray-700 absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 text-[#525E59]" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <div className="text-right pt-1">
                  <button
                    type="button"
                    onClick={() => alert('Please contact the IT Security team at Country Holidays Hotels & Resorts for password recovery.')}
                    className="text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              {/* Rounded Dark Charcoal Pill Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading || lockoutTimer > 0}
                  className="w-full py-3.5 bg-[#5A6460] hover:bg-[#47524E] active:scale-[0.99] text-white font-semibold text-sm rounded-full transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Signing in...</span>
                    </>
                  ) : lockoutTimer > 0 ? (
                    <span>Locked ({lockoutTimer}s)</span>
                  ) : (
                    <span>Sign in</span>
                  )}
                </button>
              </div>

            </form>

            {/* Subtle Divider */}
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-gray-200" />
              <span className="flex-shrink mx-3 text-xs text-gray-400 font-medium">or</span>
              <div className="flex-grow border-t border-gray-200" />
            </div>

            {/* Google / SSO Button */}
            <button
              type="button"
              onClick={() => alert('Single Sign-On is configured for internal corporate directory. Please sign in with your Administrator credentials.')}
              className="w-full py-2.5 px-4 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-full text-xs font-semibold text-gray-600 flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-2xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>

          </div>

          {/* Bottom Link */}
          <div className="w-full text-center text-xs text-gray-500 pt-4">
            <span>Authorized personnel? </span>
            <Link to="/" className="text-[#525E59] font-bold hover:underline">
              Return to Website
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}

