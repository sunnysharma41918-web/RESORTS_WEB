import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

const AUTH_STORAGE_KEY = 'country_holidays_admin_auth';
const LAST_ACTIVE_KEY = 'country_holidays_admin_last_active';
const SESSION_TIMEOUT_MS = 10 * 60 * 1000; // 10 Minutes Inactivity Expiration

export function AuthProvider({ children }) {
  const [sessionExpired, setSessionExpired] = useState(false);

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      const lastActive = localStorage.getItem(LAST_ACTIVE_KEY);

      if (saved) {
        if (lastActive) {
          const elapsed = Date.now() - Number(lastActive);
          if (elapsed > SESSION_TIMEOUT_MS) {
            localStorage.removeItem(AUTH_STORAGE_KEY);
            localStorage.removeItem(LAST_ACTIVE_KEY);
            return null;
          }
        }
        return JSON.parse(saved);
      }
      return null;
    } catch {
      return null;
    }
  });

  const logout = useCallback((isExpired = false) => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(LAST_ACTIVE_KEY);
    if (isExpired) {
      setSessionExpired(true);
    }
  }, []);

  const login = async (email, password) => {
    try {
      setSessionExpired(false);
      // 1. Attempt live backend authentication
      const res = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const sessionUser = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          token: data.token,
        };
        setUser(sessionUser);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionUser));
        localStorage.setItem(LAST_ACTIVE_KEY, String(Date.now()));
        return { success: true, user: sessionUser };
      }
    } catch (err) {
      console.warn('[Auth] Live server auth fallback:', err.message);
    }

    // 2. Local fallback credentials (Strictly CHHR0012 & CHR456 only)
    const cleanId = String(email).trim().toLowerCase();
    if (cleanId === 'chhr0012' && password === 'CHR456') {
      const sessionUser = {
        id: 'adm-chhr0012',
        name: 'Super Administrator',
        email: 'CHHR0012',
        role: 'Super Administrator',
        token: `mock-jwt-token-${Date.now()}`,
      };
      setUser(sessionUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionUser));
      localStorage.setItem(LAST_ACTIVE_KEY, String(Date.now()));
      return { success: true, user: sessionUser };
    }

    throw new Error('Invalid credentials. Please verify your Administrator ID and Password.');
  };

  // Automated 10-Minute Activity Tracking & Expiry Monitor
  useEffect(() => {
    if (!user) return undefined;

    const updateActivity = () => {
      localStorage.setItem(LAST_ACTIVE_KEY, String(Date.now()));
    };

    // Check every 5 seconds if 10-minute inactivity limit was breached
    const interval = setInterval(() => {
      const lastActive = localStorage.getItem(LAST_ACTIVE_KEY);
      if (lastActive) {
        const elapsed = Date.now() - Number(lastActive);
        if (elapsed > SESSION_TIMEOUT_MS) {
          logout(true); // Expire session
        }
      }
    }, 5000);

    // Throttled user activity listener (mouse, keys, click, touch, scroll)
    let lastRecorded = 0;
    const handleActivity = () => {
      const now = Date.now();
      if (now - lastRecorded > 4000) {
        lastRecorded = now;
        updateActivity();
      }
    };

    window.addEventListener('mousemove', handleActivity, { passive: true });
    window.addEventListener('keydown', handleActivity, { passive: true });
    window.addEventListener('click', handleActivity, { passive: true });
    window.addEventListener('scroll', handleActivity, { passive: true });
    window.addEventListener('touchstart', handleActivity, { passive: true });

    // Initial touch on mount
    updateActivity();

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
    };
  }, [user, logout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        sessionExpired,
        setSessionExpired,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
