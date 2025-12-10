import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, TrendingUp } from 'lucide-react'

const WaiterCTA = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="relative z-10 py-0 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Main Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative group overflow-hidden rounded-3xl md:rounded-4xl shadow-2xl"
        >
          {/* Background - Gradient with Dynamic Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700"></div>

          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -z-10 transform translate-x-32 -translate-y-32 group-hover:translate-x-16 transition-transform duration-500"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl -z-10 transform -translate-x-32 translate-y-32 group-hover:-translate-x-16 transition-transform duration-500"></div>
          </div>

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}></div>

          {/* Content Container */}
          <div className="relative z-10 px-8 md:px-16 py-20 md:py-28 flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex-1 text-center md:text-left"
            >
              {/* Icon Badge */}
              <motion.div
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full mb-6 border border-white/30 font-sans"
              >
                <Zap className="w-5 h-5" />
                <span className="font-bold">Easy Money</span>
              </motion.div>

              {/* Main Heading */}
              <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight font-sans">
                Walking to <br className="hidden md:block" />
                class?{' '}
                <motion.span
                  animate={{ scale: isHovered ? 1.05 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="block md:inline text-yellow-200"
                >
                  Make ₦400
                </motion.span>
              </h2>

              {/* Subheading */}
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-lg font-sans leading-relaxed">
                Earn money with your campus access. Make deliveries on your schedule, keep 80% of what you earn.
              </p>

              {/* Benefits List */}
              <div className="space-y-3 mb-8 text-white font-sans">
                {[
                  { icon: '⚡', text: 'Flexible hours - work when you want' },
                  { icon: '💰', text: 'Keep 80% of delivery earnings' },
                  { icon: '📱', text: 'Get paid via Paystack instantly' },
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3 font-sans"
                  >
                    <span className="text-2xl">{benefit.icon}</span>
                    <span className="text-lg font-medium">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Visual Element */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex-1 relative h-80 md:h-96 hidden md:block"
            >
              {/* Floating Cards Illustration */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Card 1 */}
                <motion.div
                  animate={{
                    y: isHovered ? -10 : 0,
                    rotate: -5,
                    scale: 1.05,
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute w-48 bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 text-white shadow-2xl group-hover:shadow-xl"
                >
                  <div className="text-sm font-bold opacity-80 font-sans">EARNINGS THIS WEEK</div>
                  <div className="text-4xl font-black mt-2 font-sans">₦12,400</div>
                  <div className="text-xs opacity-70 mt-2 font-sans">32 deliveries completed</div>
                </motion.div>

                {/* Card 2 */}
                <motion.div
                  animate={{
                    y: isHovered ? 10 : 0,
                    rotate: 5,
                    scale: 1,
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute w-48 bg-white/30 backdrop-blur-md rounded-2xl p-6 border border-white/40 text-white shadow-2xl -right-12 -bottom-12"
                >
                  <div className="text-sm font-bold opacity-90 font-sans flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    QUICK STATS
                  </div>
                  <div className="text-3xl font-black mt-2 font-sans">4.9 ⭐</div>
                  <div className="text-xs opacity-80 mt-2 font-sans">Rating (247 reviews)</div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative z-10 px-8 md:px-16 pb-8 flex flex-col md:flex-row items-center gap-6"
          >
            {/* Main Button */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="relative group/btn flex-1 md:flex-none px-16 py-5 bg-yellow-300 hover:bg-yellow-400 text-green-700 font-black text-lg rounded-2xl shadow-xl transition-all duration-300 font-sans overflow-hidden"
            >
              <span className="relative z-10">Start Earning</span>
              <motion.div
                animate={{ x: isHovered ? 10 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl"
              >
                →
              </motion.div>
            </motion.button>

            {/* Secondary Info */}
            <div className="text-white text-sm font-sans text-center md:text-left">
              <p className="opacity-90">Join <span className="font-bold">2,400+</span> waiters already earning on CampusCrave</p>
            </div>
          </motion.div>

          {/* Shine Effect */}
          <motion.div
            animate={{ x: isHovered ? '100%' : '-100%' }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent w-96"
          ></motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default WaiterCTA
