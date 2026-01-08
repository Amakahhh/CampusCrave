import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import Card from '../components/Card'
import Button from '../components/Button'
import FloatingNav from '../components/FloatingNav'
import Badge from '../components/Badge'
import Typewriter from '../components/Typewriter'
import apiClient from '../api/apiClient'
import { useEffect } from 'react'
import { useCart } from '../context/CartContext'

const StudentDashboard = () => {
  const navigate = useNavigate()
  const { cartItems } = useCart()
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const cartCount = cartItems.length

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true)
        const response = await apiClient.get('/vendors')
        setVendors(response.data)
      } catch (err) {
        console.error('Failed to fetch vendors:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchVendors()
  }, [])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="bg-background px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Logo size={32} />
            </motion.div>
            <span className="text-xl font-extrabold tracking-tight text-primary">
              CampusCrave
            </span>
          </div>
          <Link to="/student/cart" className="relative">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingCart className="w-6 h-6 text-text" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.div>
          </Link>
        </div>
      </header>

      {/* Greeting */}
      <section className="px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-extrabold tracking-tight text-text mb-2">
            {getGreeting()}, {user.name?.split(' ')[0] || 'Student'} 👋
          </h1>
          <p className="text-text/70 text-lg">
            <Typewriter text="What are you craving today?" speed={50} />
          </p>
        </motion.div>
      </section>

      {/* Vendor Grid */}
      <section className="px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-4"
        >
          {vendors.map((vendor, index) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: 0.3 + index * 0.1,
                type: 'spring',
                stiffness: 200,
                damping: 20
              }}
            >
              <Card
                onClick={() => navigate(`/student/order?vendorId=${vendor.id}`)}
                hover
                className="p-0 overflow-hidden cursor-pointer"
              >
                <div className="relative h-40 bg-gray-200 overflow-hidden rounded-t-[32px] flex items-center justify-center">
                  {vendor.imageUrl ? (
                    <motion.img
                      src={vendor.imageUrl}
                      alt={vendor.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  ) : (
                    <span className="text-4xl text-gray-300 font-bold">{vendor.name.charAt(0)}</span>
                  )}
                  {index === 0 && (
                    <div className="absolute top-3 right-3">
                      <Badge>NEW</Badge>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-extrabold tracking-tight text-text mb-2 text-lg">
                    {vendor.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-secondary text-secondary" />
                    <span className="text-sm font-bold text-text">4.5</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Floating Navigation */}
      <FloatingNav />
    </div>
  )
}

export default StudentDashboard


