import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AUTH_STORAGE_KEY = 'country_holidays_admin_auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = async (email, password) => {
    try {
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
      return { success: true, user: sessionUser };
    }

    throw new Error('Invalid credentials. Please verify your Administrator ID and Password.');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
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
