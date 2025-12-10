import React from 'react'
import { motion } from 'framer-motion'

const Card = ({ children, className = '', onClick, hover = false, noBorder = false }) => {
  const baseStyles = `bg-white rounded-[32px] p-6 ${noBorder ? '' : 'border-2 border-text/20'}`
  
  const Component = onClick || hover ? motion.div : 'div'
  const motionProps = onClick || hover ? {
    whileHover: { scale: 1.02, y: -4 },
    whileTap: onClick ? { scale: 0.98 } : {},
    transition: { duration: 0.2, type: 'spring', stiffness: 300 }
  } : {}

  return (
    <Component
      className={`${baseStyles} ${className}`}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </Component>
  )
}

export default Card


