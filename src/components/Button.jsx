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
    primary: 'bg-primary/20 backdrop-blur-lg border border-white/30 text-primary hover:bg-primary/30 active:scale-95 shadow-lg',
    secondary: 'bg-white/20 backdrop-blur-lg border-2 border-white/30 text-white hover:bg-white/40 active:scale-95 shadow-lg',
    accent: 'bg-accent/20 backdrop-blur-lg border border-white/30 text-accent hover:bg-accent/30 active:scale-95 shadow-lg',
    outline: 'bg-white/10 backdrop-blur-lg border-2 border-white/30 text-white hover:bg-white/20 shadow-lg',
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


