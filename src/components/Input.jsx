import React from 'react'

const Input = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  className = '',
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-extrabold tracking-tight text-text mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          w-full px-5 py-4 rounded-2xl border-2 border-text/20
          focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
          transition-all duration-200 text-base font-medium
          bg-white text-text
          ${className}
        `}
        {...props}
      />
    </div>
  )
}

export default Input


