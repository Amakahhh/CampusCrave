import React from 'react'
import { motion } from 'framer-motion'

const Badge = ({ children, className = '', rotate = -2 }) => {
  return (
    <motion.span
      initial={{ rotate: 0 }}
      animate={{ rotate }}
      whileHover={{ rotate: rotate + 2, scale: 1.05 }}
      className={`inline-block px-3 py-1 rounded-full bg-secondary text-white font-bold text-xs ${className}`}
    >
      {children}
    </motion.span>
  )
}

export default Badge



