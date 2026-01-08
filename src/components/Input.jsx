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
          w-full px-5 py-4 rounded-2xl bg-white/20 backdrop-blur-lg border border-white/30
          focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/30
          transition-all duration-200 text-base font-medium
          text-white placeholder-white/60 shadow-lg
          ${className}
        `}
        {...props}
      />
    </div>
  )
}

export default Input


