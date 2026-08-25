import React, { createContext, useContext, useState } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';
import { CONTACT_INFO } from '../data/contact';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [siteSettings] = useState({
    siteConfig: SITE_CONFIG,
    contactInfo: CONTACT_INFO,
  });

  return (
    <AppContext.Provider value={{ siteSettings }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
