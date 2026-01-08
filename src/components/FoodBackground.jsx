import React from 'react'
import { motion } from 'framer-motion'

const FoodBackground = ({ variant = 'light' }) => {
  // 2 Shops with striped umbrellas (positioned in the road area at bottom)
  const shops = [
    { x: '20%', bottom: '12%', delay: 0 },
    { x: '70%', bottom: '12%', delay: 0.3 },
  ]

  // Realistic white clouds at the top - distributed across screen from start
  const clouds = [
    { x: -200, y: '8%', size: 180, speed: 40, delay: 0 },
    { x: '15%', y: '12%', size: 160, speed: 35, delay: 0 },
    { x: '45%', y: '6%', size: 200, speed: 45, delay: 0 },
    { x: '70%', y: '10%', size: 150, speed: 38, delay: 0 },
    { x: '95%', y: '14%', size: 170, speed: 42, delay: 0 },
    { x: -150, y: '9%', size: 165, speed: 36, delay: 8 },
    { x: -180, y: '11%', size: 190, speed: 44, delay: 10 },
  ]

  // Delivery people with paths (updated for shops at bottom)
  const deliveryPeople = [
    {
      id: 1,
      startX: '20%',
      startY: '12%',
      path: [
        { x: '20%', y: '12%' }, // Start at shop 1
        { x: '30%', y: '25%' },  // Walk up
        { x: '50%', y: '30%' },  // Deliver
        { x: '65%', y: '15%' },  // Walk to shop 2
        { x: '70%', y: '12%' },  // Arrive at shop 2
        { x: '20%', y: '12%' },  // Return to start
      ],
      duration: 30,
      delay: 0,
      bagColor: '#F59E0B'
    },
    {
      id: 2,
      startX: '70%',
      startY: '12%',
      path: [
        { x: '70%', y: '12%' },  // Start at shop 2
        { x: '55%', y: '28%' },  // Walk up
        { x: '35%', y: '32%' },  // Deliver
        { x: '25%', y: '15%' },  // Walk to shop 1
        { x: '20%', y: '12%' },  // Arrive at shop 1
        { x: '70%', y: '12%' },  // Return
      ],
      duration: 28,
      delay: 6,
      bagColor: '#EF4444'
    },
    {
      id: 3,
      startX: '45%',
      startY: '30%',
      path: [
        { x: '45%', y: '30%' },  // Start in middle
        { x: '60%', y: '25%' },  // Walk to shop 2
        { x: '70%', y: '12%' },  // Arrive at shop 2
        { x: '50%', y: '28%' },  // Walk back
        { x: '20%', y: '12%' },  // Go to shop 1
        { x: '40%', y: '35%' },  // Deliver
        { x: '45%', y: '30%' },  // Return
      ],
      duration: 32,
      delay: 10,
      bagColor: '#10B981'
    },
  ]

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Uniform background */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${variant === 'dark' ? 'bg-[#0f172a]' : 'bg-gray-200'}`} />

      {variant === 'dark' && (
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,38,53,0.1),transparent_70%)]" />
        </div>
      )}

      {/* Realistic White Clouds - Moving Horizontally */}
      {clouds.map((cloud, i) => {
        const isPercentage = typeof cloud.x === 'string' && cloud.x.includes('%');
        const startX = isPercentage ? cloud.x : `${cloud.x}px`;

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: cloud.y,
              left: startX,
              opacity: variant === 'dark' ? 0.4 : 0.9
            }}
            animate={{
              x: '120vw',
            }}
            transition={{
              duration: cloud.speed,
              repeat: Infinity,
              ease: 'linear',
              delay: cloud.delay,
              repeatDelay: 0,
            }}
          >
            {/* Realistic cloud shape - multiple overlapping circles */}
            <div className="relative" style={{ width: `${cloud.size}px`, height: `${cloud.size * 0.7}px` }}>
              <div
                className="absolute bg-white rounded-full"
                style={{ width: `${cloud.size * 0.5}px`, height: `${cloud.size * 0.5}px`, left: '25%', top: '25%' }}
              />
              <div
                className="absolute bg-white rounded-full"
                style={{ width: `${cloud.size * 0.4}px`, height: `${cloud.size * 0.4}px`, left: '0%', top: '30%' }}
              />
              <div
                className="absolute bg-white rounded-full"
                style={{ width: `${cloud.size * 0.45}px`, height: `${cloud.size * 0.45}px`, left: '50%', top: '20%' }}
              />
              <div
                className="absolute bg-white rounded-full"
                style={{ width: `${cloud.size * 0.35}px`, height: `${cloud.size * 0.35}px`, left: '30%', top: '0%' }}
              />
              <div
                className="absolute bg-white rounded-full"
                style={{ width: `${cloud.size * 0.38}px`, height: `${cloud.size * 0.38}px`, left: '20%', top: '50%' }}
              />
            </div>
          </motion.div>
        );
      })}

      {/* 2 Shops with Striped Umbrellas */}
      {shops.map((shop, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: shop.x,
            bottom: shop.bottom,
            opacity: variant === 'dark' ? 0.6 : 1
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: variant === 'dark' ? 0.6 : 1 }}
          transition={{ delay: shop.delay + 0.5, type: 'spring', duration: 0.6 }}
        >
          <div className="relative">
            <div className="w-28 h-20 bg-gradient-to-b from-gray-200 to-gray-300 rounded-lg shadow-xl border-2 border-gray-400 relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-36 h-12">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-gradient-to-b from-red-400 to-red-500 rounded-t-full shadow-lg opacity-80 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-full" style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, #B91C1C 0px, #B91C1C 8px, #DC2626 8px, #DC2626 16px)'
                  }} />
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-6 bg-gray-600 rounded-full" />
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-16 bg-gradient-to-b from-amber-600 to-amber-700 rounded-t-lg border-2 border-amber-800 opacity-90">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Delivery People */}
      {deliveryPeople.map((person) => (
        <motion.div
          key={person.id}
          className="absolute"
          style={{
            left: person.path[0].x,
            bottom: person.path[0].y,
            opacity: variant === 'dark' ? 0.5 : 1
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: variant === 'dark' ? 0.5 : 1,
            left: person.path.map(p => p.x),
            bottom: person.path.map(p => p.y),
          }}
          transition={{
            opacity: { delay: person.delay + 1, duration: 0.5 },
            left: {
              duration: person.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: person.delay,
              times: person.path.map((_, idx) => idx / (person.path.length - 1)),
            },
            bottom: {
              duration: person.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: person.delay,
              times: person.path.map((_, idx) => idx / (person.path.length - 1)),
            },
          }}
        >
          <div className="relative scale-75 md:scale-100">
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="relative mx-auto mb-0.5">
                <div className="w-7 h-7 bg-gradient-to-b from-amber-200 to-amber-300 rounded-full mx-auto border-2 border-amber-400 shadow-sm" />
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-green-600 rounded-t-full" />
              </div>
              <div className="w-10 h-12 bg-gradient-to-b from-green-600 to-green-700 rounded-lg mx-auto relative shadow-md border border-green-800">
                <motion.div
                  className="absolute -right-3 top-3 w-7 h-10 rounded-lg shadow-xl border-2 border-white/20"
                  style={{ backgroundColor: person.bagColor }}
                  animate={{ rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
              </div>
              <div className="flex gap-1.5 justify-center mt-0.5">
                {[0, 1].map((leg) => (
                  <motion.div
                    key={leg}
                    className="w-2.5 h-7 bg-gradient-to-b from-blue-700 to-blue-800 rounded-full"
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: leg * 0.3 }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default FoodBackground
