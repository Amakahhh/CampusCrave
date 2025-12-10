import React from 'react'
import { motion } from 'framer-motion'

const FoodBackground = () => {
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
      {/* Uniform background - single color, no gradients */}
      <div className="absolute inset-0 bg-gray-200" />
      
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
          }}
          animate={{
            x: '120%',
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
            {/* Main cloud body */}
            <div
              className="absolute bg-white rounded-full opacity-90"
              style={{
                width: `${cloud.size * 0.5}px`,
                height: `${cloud.size * 0.5}px`,
                left: '25%',
                top: '25%',
              }}
            />
            {/* Left puff */}
            <div
              className="absolute bg-white rounded-full opacity-90"
              style={{
                width: `${cloud.size * 0.4}px`,
                height: `${cloud.size * 0.4}px`,
                left: '0%',
                top: '30%',
              }}
            />
            {/* Right puff */}
            <div
              className="absolute bg-white rounded-full opacity-90"
              style={{
                width: `${cloud.size * 0.45}px`,
                height: `${cloud.size * 0.45}px`,
                left: '50%',
                top: '20%',
              }}
            />
            {/* Top puff */}
            <div
              className="absolute bg-white rounded-full opacity-90"
              style={{
                width: `${cloud.size * 0.35}px`,
                height: `${cloud.size * 0.35}px`,
                left: '30%',
                top: '0%',
              }}
            />
            {/* Bottom puff */}
            <div
              className="absolute bg-white rounded-full opacity-90"
              style={{
                width: `${cloud.size * 0.38}px`,
                height: `${cloud.size * 0.38}px`,
                left: '20%',
                top: '50%',
              }}
            />
            {/* Additional small puffs for realism */}
            <div
              className="absolute bg-white rounded-full opacity-85"
              style={{
                width: `${cloud.size * 0.25}px`,
                height: `${cloud.size * 0.25}px`,
                left: '60%',
                top: '45%',
              }}
            />
            <div
              className="absolute bg-white rounded-full opacity-85"
              style={{
                width: `${cloud.size * 0.22}px`,
                height: `${cloud.size * 0.22}px`,
                left: '5%',
                top: '55%',
              }}
            />
          </div>
        </motion.div>
        );
      })}
      

      {/* 2 Shops with Striped Umbrellas - Duller colors, positioned way lower */}
      {shops.map((shop, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: shop.x,
            bottom: shop.bottom,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: shop.delay + 0.5, type: 'spring', duration: 0.6 }}
        >
          <div className="relative">
            {/* Shop body - Duller colors */}
            <div className="w-28 h-20 bg-gradient-to-b from-gray-200 to-gray-300 rounded-lg shadow-xl border-2 border-gray-400 relative">
              {/* Striped Umbrella/Awning - Duller reds */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-36 h-12">
                {/* Umbrella top - Muted red */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-gradient-to-b from-red-400 to-red-500 rounded-t-full shadow-lg opacity-80">
                  {/* Stripes - Duller */}
                  <div className="absolute top-0 left-0 right-0 h-full" style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, #B91C1C 0px, #B91C1C 8px, #DC2626 8px, #DC2626 16px)'
                  }} />
                </div>
                {/* Umbrella pole - Duller gray */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-6 bg-gray-600 rounded-full" />
              </div>
              {/* Shop door - Duller brown */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-16 bg-gradient-to-b from-amber-600 to-amber-700 rounded-t-lg border-2 border-amber-800 opacity-90">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Delivery People */}
      {deliveryPeople.map((person, i) => {
        return (
          <motion.div
            key={person.id}
            className="absolute"
            style={{
              left: person.path[0].x,
              bottom: person.path[0].y,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
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
            {/* Professional Delivery Person */}
            <div className="relative">
              <motion.div
                className="relative"
                animate={{
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Head with cap */}
                <div className="relative mx-auto mb-0.5">
                  <div className="w-7 h-7 bg-gradient-to-b from-amber-200 to-amber-300 rounded-full mx-auto border-2 border-amber-400 shadow-sm" />
                  {/* Cap */}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-green-600 rounded-t-full" />
                  <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-green-700 rounded-full" />
                </div>
                
                {/* Professional uniform body */}
                <div className="w-10 h-12 bg-gradient-to-b from-green-600 to-green-700 rounded-lg mx-auto relative shadow-md border border-green-800">
                  {/* Uniform details */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-white/30 rounded-full" />
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-white/20 rounded-full" />
                  
                  {/* Professional Delivery Bag */}
                  <motion.div
                    className="absolute -right-3 top-3 w-7 h-10 rounded-lg shadow-xl border-2 border-white/20"
                    style={{ 
                      backgroundColor: person.bagColor,
                      backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(0,0,0,0.1))'
                    }}
                    animate={{
                      rotate: [0, 3, -3, 0],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                    }}
                  >
                    {/* Bag details */}
                    <div className="absolute top-1 left-1 right-1 h-1 bg-white/60 rounded-full" />
                    <div className="absolute top-2.5 left-1.5 right-1.5 h-0.5 bg-white/40 rounded-full" />
                    <div className="absolute top-4 left-2 right-2 h-0.5 bg-white/30 rounded-full" />
                    {/* Handle */}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-gray-800 rounded-t-full" />
                  </motion.div>
                  
                  {/* ID badge */}
                  <div className="absolute top-6 right-1 w-3 h-3 bg-yellow-400 rounded-full border border-yellow-500 shadow-sm" />
                </div>
                
                {/* Professional legs with proper walking animation */}
                <div className="flex gap-1.5 justify-center mt-0.5">
                  {/* Left leg */}
                  <motion.div
                    className="relative"
                    animate={{
                      x: [0, 4, 0, -2, 0],
                      y: [0, -2, 0, 2, 0],
                      rotate: [0, 8, 0, -5, 0],
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      times: [0, 0.25, 0.5, 0.75, 1],
                    }}
                  >
                    <div className="w-2.5 h-7 bg-gradient-to-b from-blue-700 to-blue-800 rounded-full" />
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-1.5 bg-gray-900 rounded-full" />
                  </motion.div>
                  {/* Right leg */}
                  <motion.div
                    className="relative"
                    animate={{
                      x: [0, -2, 0, 4, 0],
                      y: [0, 2, 0, -2, 0],
                      rotate: [0, -5, 0, 8, 0],
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      times: [0, 0.25, 0.5, 0.75, 1],
                    }}
                  >
                    <div className="w-2.5 h-7 bg-gradient-to-b from-blue-700 to-blue-800 rounded-full" />
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-1.5 bg-gray-900 rounded-full" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )
      })}

    </div>
  )
}

export default FoodBackground
