import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'search';
  value: string;
  onChange: (value: string) => void;
  icon?: LucideIcon;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  icon: Icon,
  error,
  required = false,
  disabled = false,
  className = ''
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`
            block w-full rounded-lg border-gray-600 shadow-sm transition-colors duration-200 bg-gray-700 text-white
            ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-emerald-500 focus:ring-emerald-500'}
            ${disabled ? 'bg-gray-800 cursor-not-allowed' : 'bg-gray-700'}
          `}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};

export default Input;