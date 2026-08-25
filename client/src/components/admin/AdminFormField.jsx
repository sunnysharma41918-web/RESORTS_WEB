import React from 'react';
import { cn } from '../../utils/cn';

export function FormField({ label, error, required, children, helperText, className = '' }) {
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="block text-xs uppercase tracking-luxury text-white/90 font-medium">
          {label} {required && <span className="text-orange-500">*</span>}
        </label>
      )}
      {children}
      {helperText && <p className="text-[11px] text-luxury-muted font-light">{helperText}</p>}
      {error && <p className="text-xs text-red-400 font-light">{error}</p>}
    </div>
  );
}

export function FormInput({ className = '', error, ...props }) {
  return (
    <input
      className={cn(
        'w-full bg-luxury-dark border border-luxury-border focus:border-orange-500 px-4 py-3 text-sm text-white rounded-2xl placeholder:text-luxury-muted/60 outline-none transition-all focus:ring-1 focus:ring-orange-500/50',
        error ? 'border-red-500/80' : '',
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
        'w-full bg-luxury-dark border border-luxury-border focus:border-orange-500 px-4 py-3 text-sm text-white rounded-2xl placeholder:text-luxury-muted/60 outline-none transition-all focus:ring-1 focus:ring-orange-500/50 leading-relaxed',
        error ? 'border-red-500/80' : '',
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
        'w-full bg-luxury-dark border border-luxury-border focus:border-orange-500 px-4 py-3 text-sm text-white rounded-2xl outline-none transition-all focus:ring-1 focus:ring-orange-500/50',
        error ? 'border-red-500/80' : '',
        className
      )}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="bg-luxury-stone text-white">
          {opt.label}
        </option>
      ))}
      {children}
    </select>
  );
}

export function FormToggle({ label, checked, onChange, description }) {
  return (
    <label className="flex items-center justify-between p-4 bg-luxury-dark border border-luxury-border rounded-2xl cursor-pointer select-none">
      <div className="space-y-0.5">
        <span className="text-xs uppercase tracking-luxury text-white font-medium block">
          {label}
        </span>
        {description && <span className="text-[11px] text-luxury-muted">{description}</span>}
      </div>
      <div
        onClick={() => onChange(!checked)}
        className={cn(
          'w-12 h-6 flex items-center p-1 rounded-full transition-colors duration-200 border',
          checked ? 'bg-orange-500 border-orange-500 shadow-[0_0_10px_rgba(255,107,0,0.5)]' : 'bg-luxury-stone border-luxury-border'
        )}
      >
        <div
          className={cn(
            'bg-black w-4 h-4 rounded-full shadow-md transform transition-transform duration-200',
            checked ? 'translate-x-6' : 'translate-x-0'
          )}
        />
      </div>
    </label>
  );
}
