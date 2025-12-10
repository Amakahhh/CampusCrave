import React from 'react'
import { motion } from 'framer-motion'

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated clouds - More visible */}
      <div className="absolute top-0 left-0 right-0 h-60 z-10">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/70 rounded-full"
            style={{
              width: `${150 + i * 40}px`,
              height: `${80 + i * 30}px`,
              left: `${i * 15}%`,
              top: `${20 + i * 20}px`,
              filter: 'blur(40px)',
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 12 + i * 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Animated cityscape */}
      <div className="absolute bottom-0 left-0 right-0 h-[500px] z-10">
        {/* Buildings - More visible and colorful */}
        {[
          { x: '5%', width: '12%', height: '60%', color: '#F4D03F', delay: 0 },
          { x: '20%', width: '15%', height: '80%', color: '#E67E22', delay: 0.2 },
          { x: '40%', width: '18%', height: '70%', color: '#3498DB', delay: 0.4 },
          { x: '60%', width: '14%', height: '65%', color: '#E91E63', delay: 0.6 },
          { x: '78%', width: '16%', height: '75%', color: '#9B59B6', delay: 0.8 },
        ].map((building, i) => (
          <motion.div
            key={i}
            className="absolute bottom-16 rounded-t-lg shadow-lg"
            style={{
              left: building.x,
              width: building.width,
              height: building.height,
              backgroundColor: building.color,
              border: '2px solid rgba(0,0,0,0.1)',
            }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: building.delay, duration: 0.8 }}
          >
            {/* Windows */}
            <div className="grid grid-cols-3 gap-1 p-2">
              {[...Array(9)].map((_, j) => (
                <div
                  key={j}
                  className="bg-black/30 rounded-sm"
                  style={{ height: '20px' }}
                />
              ))}
            </div>
          </motion.div>
        ))}

        {/* Trees - More visible */}
        {[
          { x: '15%', size: 50 },
          { x: '35%', size: 60 },
          { x: '55%', size: 55 },
          { x: '75%', size: 65 },
        ].map((tree, i) => (
          <motion.div
            key={i}
            className="absolute bottom-16"
            style={{ left: tree.x }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 + i * 0.1, type: 'spring' }}
          >
            <div
              className="bg-green-500 rounded-full shadow-md"
              style={{
                width: `${tree.size}px`,
                height: `${tree.size}px`,
                marginLeft: `-${tree.size / 2}px`,
              }}
            />
            <div
              className="bg-green-600 rounded-full mx-auto shadow-md"
              style={{
                width: `${tree.size * 0.6}px`,
                height: `${tree.size * 0.6}px`,
                marginTop: `-${tree.size * 0.3}px`,
              }}
            />
          </motion.div>
        ))}

        {/* Road */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-16 bg-gray-600"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          {/* Road markings */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-yellow-300"
                style={{
                  width: '40px',
                  height: '4px',
                  left: `${i * 12.5}%`,
                }}
                animate={{
                  x: [0, 20, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Delivery rider on scooter */}
        <motion.div
          className="absolute bottom-16"
          initial={{ x: '-100px' }}
          animate={{ x: '120%' }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className="relative">
            {/* Scooter body */}
            <div className="w-16 h-8 bg-yellow-400 rounded-lg relative">
              <div className="absolute -top-2 left-2 w-4 h-4 bg-yellow-500 rounded-full" />
              <div className="absolute -top-2 right-2 w-4 h-4 bg-yellow-500 rounded-full" />
            </div>
            {/* Delivery box */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-12 h-10 bg-yellow-400 rounded border-2 border-yellow-600">
              <div className="absolute top-1 left-1 right-1 h-1 bg-yellow-600 rounded" />
            </div>
            {/* Rider */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
              <div className="w-6 h-6 bg-pink-400 rounded-full" />
              <div className="w-8 h-6 bg-yellow-400 rounded-t-lg mx-auto -mt-1" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-300/60 via-blue-200/40 to-transparent z-5" />
    </div>
  )
}

export default AnimatedBackground

