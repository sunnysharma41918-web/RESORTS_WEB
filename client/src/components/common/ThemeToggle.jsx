import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/cn';

export default function ThemeToggle({ className = '', variant = 'icon' }) {
  const { isDark, toggleTheme } = useTheme();

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle dark / light mode"
        title={isDark ? 'Switch to Light Sanctuary Theme' : 'Switch to Dark Cinematic Theme'}
        className={cn(
          'relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer backdrop-blur-md select-none group',
          isDark
            ? 'bg-black/60 hover:bg-[#FF1F02] border border-white/20 hover:border-[#FF1F02] text-amber-400 hover:text-white'
            : 'bg-white/90 hover:bg-[#FF1F02] border border-[#E9E9DE] hover:border-[#FF1F02] text-[#0E0E0E] hover:text-white shadow-lg',
          className
        )}
      >
        {isDark ? (
          <Sun className="w-4 h-4 transition-transform duration-500 group-hover:rotate-90 group-hover:scale-110" />
        ) : (
          <Moon className="w-4 h-4 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark / light mode"
      className={cn(
        'flex items-center space-x-2.5 px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 select-none group cursor-pointer backdrop-blur-md shadow-md',
        isDark
          ? 'bg-black/60 hover:bg-[#FF1F02] border border-white/20 hover:border-[#FF1F02] text-white'
          : 'bg-white/90 hover:bg-[#FF1F02] border border-[#E9E9DE] hover:border-[#FF1F02] text-[#0E0E0E] hover:text-white',
        className
      )}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-3.5 h-3.5 text-amber-400 group-hover:text-white transition-transform duration-500 group-hover:rotate-90" />
        ) : (
          <Moon className="w-3.5 h-3.5 text-[#0E0E0E] group-hover:text-white transition-transform duration-500 group-hover:-rotate-12" />
        )}
      </div>
      <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
    </button>
  );
}
