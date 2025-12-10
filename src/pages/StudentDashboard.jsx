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

const StudentDashboard = () => {
  const navigate = useNavigate()
  const [cartCount, setCartCount] = useState(0)
  const [cartAnimation, setCartAnimation] = useState(false)

  // Mock vendor data
  const vendors = [
    {
      id: 1,
      name: 'Mama Titi\'s Kitchen',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      name: 'Uncle B\'s Grill',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
    },
    {
      id: 3,
      name: 'Campus Delight',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    },
    {
      id: 4,
      name: 'Spice Route',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    },
  ]

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1)
    setCartAnimation(true)
    setTimeout(() => setCartAnimation(false), 600)
  }

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
              animate={cartAnimation ? { scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] } : {}}
              transition={{ duration: 0.6 }}
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
            {getGreeting()}, John 👋
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
                onClick={() => navigate(`/student/vendor/${vendor.id}`)}
                hover
                className="p-0 overflow-hidden cursor-pointer"
              >
                <div className="relative h-40 bg-gray-200 overflow-hidden rounded-t-[32px]">
                  <motion.img
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
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
                    <span className="text-sm font-bold text-text">{vendor.rating}</span>
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


