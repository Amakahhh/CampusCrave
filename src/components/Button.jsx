import React from 'react'
import { motion } from 'framer-motion'

const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  className = '',
  disabled = false,
  ...props 
}) => {
  const baseStyles = 'px-8 h-14 rounded-full font-bold text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-[#6B1F2A] active:scale-95',
    secondary: 'bg-background text-primary border-2 border-primary hover:bg-primary hover:text-white active:scale-95',
    accent: 'bg-accent text-white hover:bg-[#4A1418] active:scale-95',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white',
  }

  // If className contains !important overrides, don't apply variant styles
  const hasImportantOverrides = className.includes('!bg') || className.includes('!text') || className.includes('!border')
  const finalClassName = hasImportantOverrides 
    ? `${baseStyles} ${className}`
    : `${baseStyles} ${variants[variant]} ${className}`

  return (
    <motion.button
      whileHover={disabled ? {} : { 
        scale: 1.05, 
        y: -2,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
      }}
      whileTap={disabled ? {} : { 
        scale: 0.95,
        y: 0,
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
      }}
      onClick={onClick}
      disabled={disabled}
      className={finalClassName}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17,
      }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Button


