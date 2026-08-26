import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, AlertCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import BrandLogo from '../../components/common/BrandLogo';

// Interactive Animated Mascot (Reacts to ID typing, covers eyes on password, peeks on show password)
function InteractiveMascot({ isUsernameFocused, isPasswordFocused, showPassword, textLength, isAuthenticating }) {
  // Eye pupil offset based on typing length
  const eyeOffset = Math.min(Math.max((textLength - 5) * 1.2, -6), 6);

  return (
    <div className="w-20 h-20 mx-auto relative flex items-center justify-center select-none pointer-events-none mb-1">
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full drop-shadow-lg transition-all duration-300"
      >
        {/* Head background shadow */}
        <circle cx="60" cy="62" r="42" fill="#0E0E14" opacity="0.4" />

        {/* Ears */}
        <circle cx="28" cy="32" r="16" fill="#2E2E3E" />
        <circle cx="28" cy="32" r="9" fill="#FF1F02" opacity="0.8" />
        <circle cx="92" cy="32" r="16" fill="#2E2E3E" />
        <circle cx="92" cy="32" r="9" fill="#FF1F02" opacity="0.8" />

        {/* Main Face / Head */}
        <circle cx="60" cy="60" r="40" fill="#232332" />
        
        {/* Facial highlights */}
        <path
          d="M30 65 Q60 90 90 65 Q60 75 30 65"
          fill="#1C1C28"
          opacity="0.6"
        />

        {/* Cheeks blush */}
        <circle cx="34" cy="68" r="6" fill="#FF1F02" opacity="0.25" />
        <circle cx="86" cy="68" r="6" fill="#FF1F02" opacity="0.25" />

        {/* Muzzle */}
        <ellipse cx="60" cy="70" rx="16" ry="12" fill="#3A3A4D" />
        
        {/* Cute Nose */}
        <polygon
          points="55,66 65,66 60,72"
          fill="#FF1F02"
          className="transition-transform duration-300"
        />

        {/* Mouth */}
        {isAuthenticating ? (
          // Happy / Excited Mouth
          <path d="M52 74 Q60 84 68 74" stroke="#FAFDF2" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        ) : (
          // Gentle smile
          <path d="M54 75 Q60 80 66 75" stroke="#9E9EB3" strokeWidth="2" fill="none" strokeLinecap="round" />
        )}

        {/* Eyes & Pupils Layer */}
        {(!isPasswordFocused || (isPasswordFocused && showPassword)) && (
          <g className="transition-all duration-300">
            {/* Left Eye White */}
            <circle cx="44" cy="52" r="10" fill="#FAFDF2" />
            {/* Left Eye Pupil */}
            <circle
              cx={44 + (isUsernameFocused ? eyeOffset : 0)}
              cy={isUsernameFocused ? 54 : 52}
              r="4.5"
              fill="#0F0F17"
              className="transition-all duration-150"
            />
            {/* Left Eye Glint */}
            <circle
              cx={42 + (isUsernameFocused ? eyeOffset : 0)}
              cy={isUsernameFocused ? 52 : 50}
              r="1.8"
              fill="#FFFFFF"
            />

            {/* Right Eye */}
            <circle cx="76" cy="52" r="10" fill="#FAFDF2" />
            {/* Right Eye Pupil */}
            <circle
              cx={76 + (isUsernameFocused ? eyeOffset : 0)}
              cy={isUsernameFocused ? 54 : 52}
              r="4.5"
              fill="#0F0F17"
              className="transition-all duration-150"
            />
            {/* Right Eye Glint */}
            <circle
              cx={74 + (isUsernameFocused ? eyeOffset : 0)}
              cy={isUsernameFocused ? 52 : 50}
              r="1.8"
              fill="#FFFFFF"
            />
          </g>
        )}

        {/* Closed Eyes Lines (when covering eyes) */}
        {isPasswordFocused && !showPassword && (
          <g stroke="#FAFDF2" strokeWidth="3" strokeLinecap="round">
            <path d="M38 52 Q44 57 50 52" fill="none" />
            <path d="M70 52 Q76 57 82 52" fill="none" />
          </g>
        )}

        {/* HANDS / PAWS ANIMATION */}
        {/* Left Paw */}
        <g
          className="transition-all duration-300 ease-out"
          style={{
            transform: isPasswordFocused
              ? showPassword
                ? 'translate(0px, -6px) rotate(8deg)' // Peek state (left hand slightly lowered)
                : 'translate(4px, -18px) rotate(22deg)' // Covering eye
              : 'translate(0px, 14px)', // Rest position at bottom
            transformOrigin: '28px 100px',
          }}
        >
          <ellipse cx="36" cy="82" rx="14" ry="11" fill="#323244" stroke="#1C1C28" strokeWidth="2" />
          {/* Paw pads */}
          <circle cx="36" cy="80" r="4" fill="#FF1F02" opacity="0.6" />
          <circle cx="28" cy="82" r="2" fill="#FF1F02" opacity="0.5" />
          <circle cx="36" cy="87" r="2" fill="#FF1F02" opacity="0.5" />
          <circle cx="44" cy="82" r="2" fill="#FF1F02" opacity="0.5" />
        </g>

        {/* Right Paw */}
        <g
          className="transition-all duration-300 ease-out"
          style={{
            transform: isPasswordFocused
              ? 'translate(-4px, -18px) rotate(-22deg)' // Covering right eye
              : 'translate(0px, 14px)', // Rest position at bottom
            transformOrigin: '92px 100px',
          }}
        >
          <ellipse cx="84" cy="82" rx="14" ry="11" fill="#323244" stroke="#1C1C28" strokeWidth="2" />
          {/* Paw pads */}
          <circle cx="84" cy="80" r="4" fill="#FF1F02" opacity="0.6" />
          <circle cx="76" cy="82" r="2" fill="#FF1F02" opacity="0.5" />
          <circle cx="84" cy="87" r="2" fill="#FF1F02" opacity="0.5" />
          <circle cx="92" cy="82" r="2" fill="#FF1F02" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
}

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Mascot Focus States
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#181824] text-white grid grid-cols-1 lg:grid-cols-12 select-none font-manrope">
      
      {/* ========================================================================= */}
      {/* LEFT COLUMN: 100% FULL-HEIGHT HERO PHOTOGRAPHIC PLATE WITH BRAND & SLOGAN */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex lg:col-span-6 h-full relative p-8 lg:p-12 flex-col justify-between overflow-hidden border-r border-[#2D2D3F]">
        
        {/* Background Scenic Mountain Dunes / Sunset Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2000&q=85"
            alt="Country Holidays Mountain Sanctuary"
            className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.12]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181824] via-black/20 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-[#181824]/60" />
        </div>

        {/* Top Bar inside Left Plate: Logo + "Back to website" button */}
        <div className="relative z-10 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2.5 group">
            <BrandLogo size="sm" animated={true} />
            <span className="text-[9px] font-mono font-bold tracking-widest text-[#FF1F02] uppercase px-2 py-0.5 bg-black/60 backdrop-blur-md rounded border border-white/10">
              CHHR
            </span>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-[11px] font-medium text-white/90 hover:text-white transition-all shadow-md hover:border-white"
          >
            <span>Back to website</span>
            <ArrowRight className="w-3 h-3 text-[#FF1F02]" />
          </Link>
        </div>

        {/* Bottom Slogan & Carousel Indicators */}
        <div className="relative z-10 space-y-4 max-w-md">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#FF1F02] font-semibold block drop-shadow">
              SANCTUARIES OF DISTINCTION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-[1.08] drop-shadow-lg font-syne">
              Capturing Moments, <br />
              Creating Memories
            </h2>
            <p className="text-xs text-white/80 font-light leading-relaxed drop-shadow">
              Country Holidays Hotels & Resorts executive management portal & CRM lead briefing desk.
            </p>
          </div>

          {/* Slider Dots */}
          <div className="flex items-center space-x-2 pt-1">
            <div className="w-8 h-1 bg-white rounded-full transition-all" />
            <div className="w-2.5 h-1 bg-white/40 rounded-full" />
            <div className="w-2.5 h-1 bg-white/40 rounded-full" />
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* RIGHT COLUMN: COMPACT MINIMIZED LOGIN FORM WITH INTERACTIVE MASCOT        */}
      {/* ========================================================================= */}
      <div className="col-span-12 lg:col-span-6 h-full p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-[#181824] overflow-y-auto relative">
        
        {/* Mobile Top Bar */}
        <div className="lg:hidden flex items-center justify-between pb-3 border-b border-[#2D2D3F]">
          <Link to="/" className="flex items-center space-x-2">
            <BrandLogo size="sm" animated={true} />
            <span className="text-[9px] font-mono font-bold text-[#FF1F02] uppercase">CHHR</span>
          </Link>
          <Link to="/" className="text-xs font-mono text-white/70 hover:text-white flex items-center gap-1">
            <span>Website</span>
            <ArrowRight className="w-3 h-3 text-[#FF1F02]" />
          </Link>
        </div>

        {/* Centerpiece Minimized Form Container */}
        <div className="w-full max-w-[340px] mx-auto my-auto py-2 space-y-4">
          
          {/* Interactive Mascot (Compact 80px) */}
          <InteractiveMascot
            isUsernameFocused={isUsernameFocused}
            isPasswordFocused={isPasswordFocused}
            showPassword={showPassword}
            textLength={email.length}
            isAuthenticating={loading}
          />

          {/* Header */}
          <div className="text-center space-y-0.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-syne">
              Sign in
            </h1>
            <p className="text-[11px] text-[#9E9EB3] font-light">
              Enter Super Administrator credentials
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="p-2.5 bg-red-950/70 border border-[#FF1F02] text-red-200 text-[11px] rounded-lg flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-[#FF1F02] shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            
            {/* Field 1: Administrator ID / Email */}
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-[#C8C8DC] block">
                Administrator ID / Email
              </label>
              <input
                type="text"
                required
                placeholder="CHHR0012"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsUsernameFocused(true)}
                onBlur={() => setIsUsernameFocused(false)}
                className="w-full px-3.5 py-2.5 bg-[#242436] text-white text-xs rounded-lg outline-none border border-[#34344E] focus:border-[#7A5AF8] focus:bg-[#28283D] transition-all placeholder:text-[#646482]"
              />
            </div>

            {/* Field 2: Password with Eye Mascot Trigger */}
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-[#C8C8DC] block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  className="w-full px-3.5 py-2.5 bg-[#242436] text-white text-xs rounded-lg outline-none border border-[#34344E] focus:border-[#7A5AF8] focus:bg-[#28283D] transition-all placeholder:text-[#646482] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7C7C9E] hover:text-white transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5 text-[#7A5AF8]" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center space-x-2 pt-0.5">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 accent-[#7A5AF8] cursor-pointer rounded border-[#3A3A54]"
              />
              <label htmlFor="rememberMe" className="text-[11px] text-[#B2B2CC] cursor-pointer font-light select-none">
                Remember Me on this device
              </label>
            </div>

            {/* Action Button */}
            <div className="pt-1.5">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-[#6B46C1] via-[#7A5AF8] to-[#9061F9] hover:brightness-110 active:scale-[0.99] text-white font-bold text-xs rounded-lg transition-all shadow-[0_6px_20px_rgba(122,90,248,0.35)] cursor-pointer disabled:opacity-50 tracking-wider uppercase font-mono"
              >
                {loading ? 'AUTHENTICATING...' : 'SIGN IN TO PORTAL'}
              </button>
            </div>

            {/* Legal Disclaimer */}
            <div className="pt-1 text-center text-[10px] text-[#7A7A99] font-light">
              By signing in you agree to our{' '}
              <Link to="/terms" className="underline hover:text-white transition-colors">
                Terms
              </Link>{' '}
              &{' '}
              <Link to="/privacy-policy" className="underline hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </div>

          </form>

        </div>

        {/* Footer Telemetry */}
        <div className="pt-3 flex items-center justify-between text-[11px] text-[#646482] font-mono border-t border-[#2D2D3F]">
          <span>● CHHR CONSOLE</span>
          <span>SECURITY LEVEL 4</span>
        </div>

      </div>

    </div>
  );
}
