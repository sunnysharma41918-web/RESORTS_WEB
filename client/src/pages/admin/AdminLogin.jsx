import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, ShieldCheck, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/images/hero/New Logo CHT.png';
import EditorialHeritageStamp from '../../components/common/EditorialHeritageStamp';
import MagneticButton from '../../components/common/MagneticButton';
import EditorialBackgroundElements from '../../components/common/EditorialBackgroundElements';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  React.useEffect(() => {
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

  const handleFillDemo = () => {
    setEmail('admin@countryholidays.com');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="min-h-screen w-full bg-[#FAFDF2] text-[#0E0E0E] flex flex-col justify-between p-6 sm:p-10 relative select-none font-manrope overflow-hidden">
      
      {/* Background Architectural Grid Lines */}
      <EditorialBackgroundElements variant="light" position="top-right" />

      {/* 1. TOP HEADER */}
      <header className="flex items-center justify-between z-10 max-w-7xl mx-auto w-full pb-6 border-b border-[#E9E9DE]">
        <Link to="/" className="flex items-center space-x-3 group">
          <img
            src={logoImg}
            alt="Country Holidays Travel Resorts"
            className="h-9 sm:h-10 w-auto object-contain"
          />
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 bg-white border border-[#E9E9DE] text-[#FF1F02] shadow-sm">
            ADMIN PORTAL
          </span>
        </Link>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#4A4A4A] hover:text-[#FF1F02] transition-colors"
        >
          <span>RETURN TO RESORT</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </header>

      {/* 2. MAIN CENTERPIECE: ASYMMETRICAL EDITORIAL LOGIN SUITE */}
      <main className="w-full max-w-6xl mx-auto my-auto z-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Image Frame with Upper PORTAL Typography (6 Cols) */}
          <div className="hidden lg:block lg:col-span-6 relative pt-10">
            {/* Monumental Upper Overlaid Text */}
            <div className="absolute top-0 left-0 z-30 pointer-events-none select-none">
              <span className="text-6xl xl:text-7xl font-extrabold uppercase tracking-tight leading-none text-art-trio block">
                PORTAL
              </span>
            </div>

            {/* Animated Red CHTR Heritage Stamp Overlapping Corner */}
            <div className="absolute -bottom-6 -left-6 z-40">
              <EditorialHeritageStamp size={105} centerText="CHTR" year="EST 2026" />
            </div>

            <div className="relative rounded-none overflow-hidden aspect-[4/3] border border-[#E9E9DE] shadow-xl bg-black">
              <img
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=90"
                alt="Sanctuary Control Center"
                className="w-full h-full object-cover filter brightness-90 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white text-xs font-mono">
                <span className="tracking-widest uppercase text-white/90">AUTHENTICATION VAULT</span>
                <span className="text-[#FF1F02] font-bold">● 256-BIT ENCRYPTION</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Beige/Ivory Login Credentials Box (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 sm:p-12 bg-white border border-[#E9E9DE] shadow-xl space-y-8 relative">
              
              <div className="space-y-3 border-b border-[#E9E9DE] pb-6">
                <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.14em] text-[#FF1F02]">
                  <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
                  <span>01 — EXECUTIVE ACCESS</span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#0E0E0E]">
                  CONTROL CENTER
                </h1>
                
                <p className="text-xs sm:text-sm font-light text-[#4A4A4A] leading-relaxed">
                  Authenticate credentials to manage resort inventory, guest inquiries, and bespoke itineraries.
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="p-4 bg-red-50 border border-[#FF1F02] text-red-700 text-xs flex items-start space-x-3">
                  <AlertCircle className="w-4 h-4 text-[#FF1F02] shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Form Inputs */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0E0E0E] flex items-center justify-between">
                    <span>Executive Email</span>
                    <span className="text-[#999999] text-[10px]">* REQUIRED</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="admin@countryholidays.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3.5 bg-[#FAFDF2] border border-[#E9E9DE] focus:border-[#FF1F02] text-sm text-[#0E0E0E] outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0E0E0E] flex items-center justify-between">
                    <span>Security Password</span>
                    <span className="text-[#999999] text-[10px]">* REQUIRED</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3.5 bg-[#FAFDF2] border border-[#E9E9DE] focus:border-[#FF1F02] text-sm text-[#0E0E0E] outline-none transition-colors pr-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#0E0E0E] transition-colors cursor-pointer"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={handleFillDemo}
                    className="text-[10px] font-mono uppercase tracking-widest text-[#FF1F02] hover:underline cursor-pointer font-bold"
                  >
                    ✦ Auto-Fill Demo Credentials
                  </button>

                  <span className="text-[10px] font-mono text-[#666666] uppercase">
                    Admin Security Level 4
                  </span>
                </div>

                <MagneticButton>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[#0E0E0E] hover:bg-[#FF1F02] text-white font-bold text-xs uppercase tracking-[0.16em] transition-all duration-300 shadow-xl flex items-center justify-center gap-3 group cursor-pointer disabled:opacity-50"
                  >
                    <span>{loading ? 'AUTHENTICATING...' : 'SECURE SIGN IN'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </MagneticButton>
              </form>

            </div>
          </div>

        </div>
      </main>

      {/* 3. FOOTER TELEMETRY */}
      <footer className="z-10 max-w-7xl mx-auto w-full pt-6 border-t border-[#E9E9DE] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#666666] tracking-wider">
        <span>● CHTR EXECUTIVE CONTROL SYSTEM</span>
        <span>ISO 27001 SECURE CERTIFIED</span>
        <span>EST. 2026</span>
      </footer>

    </div>
  );
}
