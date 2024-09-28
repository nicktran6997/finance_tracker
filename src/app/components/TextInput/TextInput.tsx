import React, { ChangeEvent } from 'react';

interface InputFieldProps {
  id: string;
  name: string;
  labelCopy: string;
  type?: string; // Optional, defaults to 'text'
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoComplete?: string;
  className?: string;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  type = 'text', // Default to 'text'
  value,
  onChange,
  required = false,
  autoComplete = 'off',
  className = '',
  placeholder = '',
  labelCopy = ''
}) => {
  return (
    <>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            { labelCopy }
        </label>
        <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            autoComplete={autoComplete}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
            placeholder={placeholder}
        />
    </>
  );
};

export default InputField;
