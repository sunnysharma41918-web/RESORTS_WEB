import React, { createContext, useContext, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 pointer-events-none max-w-md w-full px-4 sm:px-0">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-5 py-3.5 bg-[#1C1C1C] border shadow-2xl transition-all duration-300 font-manrope ${
              t.type === 'success'
                ? 'border-emerald-500/50 text-white'
                : t.type === 'error'
                ? 'border-[#FF1F02]/60 text-white'
                : 'border-[#EAB308]/50 text-white'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              {t.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : t.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-[#FF1F02] shrink-0" />
              ) : (
                <Info className="w-4 h-4 text-[#EAB308] shrink-0" />
              )}
              <span className="text-xs font-medium tracking-wide truncate">{t.message}</span>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-[#888888] hover:text-white transition-colors ml-2 p-1"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return { addToast: (msg) => console.log('[Toast]', msg) };
  }
  return context;
}
