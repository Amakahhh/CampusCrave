import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import Logo from '../components/Logo'
import Button from '../components/Button'
import FoodBackground from '../components/FoodBackground'
import RotatingTypewriter from '../components/RotatingTypewriter'
import TrendingCravings from '../components/TrendingCravings'
import HowItWorks from '../components/HowItWorks'
import WaiterCTA from '../components/WaiterCTA'
import FAQSection from '../components/FAQSection'
import Footer from '../components/Footer'

const LandingPage = () => {
  const wittyMessages = [
    "Too busy to get your food? We got you.",
    "Need to focus on other things? No worries.",
    "Long day? Let's bring the chow to you.",
    "Hungry but can't leave? We'll deliver.",
    "Caf runs taking too long? Skip the line.",
    "Studying hard? We'll handle the food.",
    "Tired of walking? We'll come to you.",
    "Your cravings, delivered to your door."
  ]

  return (
    <div className="min-h-screen bg-yellow-50 relative overflow-x-hidden">
      {/* Food-themed Animated Background */}
      <FoodBackground />

      {/* Floating Glass Navbar */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl">
        <div className="relative flex items-center justify-between gap-4">
          {/* Left - Logo Container */}
          <div className="bg-white/20 backdrop-blur-lg rounded-full px-4 py-3 shadow-lg border border-white/30">
            <Link to="/" className="flex items-center">
              <Logo size={32} />
            </Link>
          </div>

          {/* Middle - Navigation Links Container - Centered */}
          <div className="hidden md:flex items-center bg-white/20 backdrop-blur-lg rounded-full px-4 py-3 shadow-lg border border-white/30 gap-2 absolute left-1/2 transform -translate-x-1/2">
            <Link
              to="/student/dashboard"
              className="px-4 py-2 rounded-full hover:bg-white/20 transition-colors text-sm font-semibold text-gray-800 font-nunito"
            >
              Order
            </Link>
            <a
              href="#about"
              className="px-4 py-2 rounded-full hover:bg-white/20 transition-colors text-sm font-semibold text-gray-800 font-nunito"
            >
              About Us
            </a>
            <a
              href="#faq"
              className="px-4 py-2 rounded-full hover:bg-white/20 transition-colors text-sm font-semibold text-gray-800 font-nunito"
            >
              FAQ
            </a>
            <a
              href="#waiters"
              className="px-4 py-2 rounded-full hover:bg-white/20 transition-colors text-sm font-semibold text-gray-800 font-nunito"
            >
              Mobile Waiters
            </a>
          </div>

          {/* Right - Auth Buttons Container */}
          <div className="flex items-center bg-white/20 backdrop-blur-lg rounded-full px-4 py-3 shadow-lg border border-white/30 gap-2 ml-auto">
            <Link
              to="/waiter/signup"
              className="px-4 py-2 rounded-full hover:bg-white/20 transition-colors text-sm font-semibold text-gray-800 font-nunito"
            >
              Sign In
            </Link>
            <Link
              to="/student/login"
              className="px-4 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white transition-colors text-sm font-semibold"
            >
              Log In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden bg-white/20 backdrop-blur-lg rounded-full px-4 py-3 shadow-lg border border-white/30 ml-auto">
            <Menu className="w-5 h-5 text-gray-800" />
          </button>
        </div>
      </nav>

      {/* Hero Section - Longer and Higher */}
      <section className="relative z-10 min-h-[120vh] flex flex-col items-center justify-center px-6 pt-32 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Main Heading - Food Delivery Related with Typewriter */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-7xl font-display font-bold text-gray-900 mb-6 leading-tight min-h-[120px] md:min-h-[160px] flex items-center justify-center"
          >
            <RotatingTypewriter 
              messages={wittyMessages} 
              speed={60}
              delayBetweenMessages={2500}
            />
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-2xl md:text-3xl text-gray-700 mb-12 font-semibold max-w-2xl mx-auto"
          >
            Fresh meals from your favorite campus vendors, straight to your hostel door
          </motion.p>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link to="/student/login">
              <Button
                className="!bg-green-600 hover:!bg-green-700 !text-white px-12 py-6 text-lg font-bold shadow-lg hover:shadow-xl border-0"
              >
                Order Food
              </Button>
            </Link>
            <Link to="/waiter/signup">
              <Button
                className="!bg-white hover:!bg-green-600 !text-green-600 border-2 !border-green-600 hover:!border-green-700 hover:!text-white px-12 py-6 text-lg font-bold shadow-lg hover:shadow-xl"
              >
                Become a Waiter
              </Button>
            </Link>
          </motion.div>

        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 bg-white/60 backdrop-blur-sm py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-heading font-bold text-center text-gray-900 mb-12">
            Why Choose CampusCrave?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Fast Delivery',
                description: 'Get your food delivered in 30-45 minutes',
                icon: '🚀',
              },
              {
                title: 'Affordable Prices',
                description: 'Flat ₦500 delivery fee, no hidden charges',
                icon: '💰',
              },
              {
                title: 'Fresh & Tasty',
                description: 'Only the best from trusted campus vendors',
                icon: '🍕',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-6 bg-white rounded-2xl shadow-md"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 bg-gradient-to-r from-green-600 to-green-700 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">
            Ready to satisfy your cravings?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students enjoying convenient food delivery
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/student/login">
              <Button
                variant="primary"
                className="bg-white text-green-600 hover:bg-gray-100 px-10 py-5 text-lg font-bold"
              >
                Start Ordering
              </Button>
            </Link>
            <Link to="/waiter/signup">
              <Button
                variant="secondary"
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-10 py-5 text-lg font-bold"
              >
                Join as Waiter
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
