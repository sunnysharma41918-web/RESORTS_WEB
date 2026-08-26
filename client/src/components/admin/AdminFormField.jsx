import React from 'react';
import { cn } from '../../utils/cn';

export function FormField({ label, error, required, children, helperText, className = '' }) {
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="block text-xs uppercase tracking-widest text-[#D0D0D0] font-mono font-medium">
          {label} {required && <span className="text-[#FF1F02]">*</span>}
        </label>
      )}
      {children}
      {helperText && <p className="text-[11px] text-[#888888] font-light font-mono">{helperText}</p>}
      {error && <p className="text-xs text-[#FF1F02] font-mono">{error}</p>}
    </div>
  );
}

export function FormInput({ className = '', error, ...props }) {
  return (
    <input
      className={cn(
        'w-full bg-[#0E0E0E] border border-[#333333] focus:border-[#FF1F02] px-4 py-3 text-xs sm:text-sm text-white placeholder:text-[#555555] outline-none transition-all focus:ring-1 focus:ring-[#FF1F02]/50 font-manrope',
        error ? 'border-[#FF1F02]' : '',
        className
      )}
      {...props}
    />
  );
}

export function FormTextarea({ className = '', rows = 4, error, ...props }) {
  return (
    <textarea
      rows={rows}
      className={cn(
        'w-full bg-[#0E0E0E] border border-[#333333] focus:border-[#FF1F02] px-4 py-3 text-xs sm:text-sm text-white placeholder:text-[#555555] outline-none transition-all focus:ring-1 focus:ring-[#FF1F02]/50 leading-relaxed font-manrope',
        error ? 'border-[#FF1F02]' : '',
        className
      )}
      {...props}
    />
  );
}

export function FormSelect({ className = '', options = [], error, children, ...props }) {
  return (
    <select
      className={cn(
        'w-full bg-[#0E0E0E] border border-[#333333] focus:border-[#FF1F02] px-4 py-3 text-xs sm:text-sm text-white outline-none transition-all focus:ring-1 focus:ring-[#FF1F02]/50 font-manrope cursor-pointer',
        error ? 'border-[#FF1F02]' : '',
        className
      )}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="bg-[#1C1C1C] text-white">
          {opt.label}
        </option>
      ))}
      {children}
    </select>
  );
}

export function FormToggle({ label, checked, onChange, description }) {
  return (
    <label className="flex items-center justify-between p-4 bg-[#0E0E0E] border border-[#333333] hover:border-[#444444] transition-colors cursor-pointer select-none">
      <div className="space-y-0.5">
        <span className="text-xs uppercase tracking-widest text-white font-mono font-medium block">
          {label}
        </span>
        {description && <span className="text-[11px] text-[#888888] font-light">{description}</span>}
      </div>
      <div
        onClick={() => onChange(!checked)}
        className={cn(
          'w-12 h-6 flex items-center p-1 transition-colors duration-200 border',
          checked ? 'bg-[#FF1F02] border-[#FF1F02] shadow-[0_0_10px_rgba(255,31,2,0.5)]' : 'bg-[#1C1C1C] border-[#333333]'
        )}
      >
        <div
          className={cn(
            'bg-white w-4 h-4 shadow-md transform transition-transform duration-200',
            checked ? 'translate-x-6' : 'translate-x-0'
          )}
        />
      </div>
    </label>
  );
}
