import React from 'react';
import { cn } from '../../utils/cn';

export function FormField({ label, error, required, children, helperText, className = '' }) {
  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label className="block text-xs font-semibold text-gray-700">
          {label} {required && <span className="text-[#134E39] font-bold">*</span>}
        </label>
      )}
      {children}
      {helperText && <p className="text-[11px] text-gray-400 font-normal">{helperText}</p>}
      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
}

export function FormInput({ className = '', error, ...props }) {
  return (
    <input
      className={cn(
        'w-full bg-[#F4F6F5] focus:bg-white border border-transparent focus:border-[#134E39] px-4 py-2.5 text-xs sm:text-sm text-[#111827] placeholder:text-gray-400 outline-none transition-all rounded-xl shadow-2xs font-manrope',
        error ? 'border-red-500' : '',
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
        'w-full bg-[#F4F6F5] focus:bg-white border border-transparent focus:border-[#134E39] px-4 py-2.5 text-xs sm:text-sm text-[#111827] placeholder:text-gray-400 outline-none transition-all rounded-xl shadow-2xs leading-relaxed font-manrope resize-none',
        error ? 'border-red-500' : '',
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
        'w-full bg-[#F4F6F5] focus:bg-white border border-transparent focus:border-[#134E39] px-3.5 py-2.5 text-xs sm:text-sm text-[#111827] outline-none transition-all rounded-xl shadow-2xs font-manrope cursor-pointer',
        error ? 'border-red-500' : '',
        className
      )}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="bg-white text-gray-800">
          {opt.label}
        </option>
      ))}
      {children}
    </select>
  );
}

export function FormToggle({ label, checked, onChange, description }) {
  return (
    <label className="flex items-center justify-between p-4 bg-white border border-[#E5EAE7] hover:border-gray-300 rounded-2xl transition-colors cursor-pointer select-none shadow-2xs">
      <div className="space-y-0.5">
        <span className="text-xs font-bold text-[#111827] block">
          {label}
        </span>
        {description && <span className="text-[11px] text-gray-500 font-normal">{description}</span>}
      </div>
      <div
        onClick={() => onChange(!checked)}
        className={cn(
          'w-11 h-6 flex items-center p-0.5 rounded-full transition-colors duration-200 cursor-pointer',
          checked ? 'bg-[#134E39]' : 'bg-gray-200'
        )}
      >
        <div
          className={cn(
            'bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200',
            checked ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </div>
    </label>
  );
}
