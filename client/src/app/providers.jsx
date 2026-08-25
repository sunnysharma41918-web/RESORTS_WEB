import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '../context/AppContext';
import { UIProvider } from '../context/UIContext';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import ErrorBoundary from '../components/common/ErrorBoundary';

export default function Providers({ children }) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AppProvider>
          <UIProvider>
            <AuthProvider>
              <BrowserRouter>
                {children}
              </BrowserRouter>
            </AuthProvider>
          </UIProvider>
        </AppProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
