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
    // Frontend demo credentials or custom admin login
    if (
      (email === 'admin@countryholidays.com' && password === 'admin123') ||
      (email === 'admin' && password === 'admin') ||
      (email.includes('@') && password.length >= 4)
    ) {
      const sessionUser = {
        id: 'adm-001',
        name: 'Executive Director',
        email: email || 'admin@countryholidays.com',
        role: 'Super Administrator',
        token: `mock-jwt-token-${Date.now()}`,
      };
      setUser(sessionUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionUser));
      return { success: true, user: sessionUser };
    }

    throw new Error('Invalid email or password. Use demo credentials: admin@countryholidays.com / admin123');
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
