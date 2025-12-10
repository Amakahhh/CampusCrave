import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ShoppingCart, User, UtensilsCrossed } from 'lucide-react'

const FloatingNav = () => {
  const location = useLocation()

  const navItems = [
    { path: '/student/dashboard', icon: Home, label: 'Home' },
    { path: '/student/cart', icon: ShoppingCart, label: 'Cart' },
    { path: '/student/orders', icon: UtensilsCrossed, label: 'Orders' },
    { path: '/student/profile', icon: User, label: 'Profile' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="bg-accent rounded-full px-4 py-3 shadow-2xl flex items-center gap-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)
          
          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-full transition-colors ${
                  active ? 'bg-primary text-white' : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
              </motion.div>
            </Link>
          )
        })}
      </div>
    </motion.nav>
  )
}

export default FloatingNav

