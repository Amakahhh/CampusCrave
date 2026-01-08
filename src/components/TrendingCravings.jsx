import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, MapPin } from 'lucide-react'

const TrendingCravings = () => {
  const scrollContainerRef = useRef(null)

  const vendors = [
    {
      id: 1,
      name: "Mama T's Kitchen",
      image: "🍲",
      rating: 4.8,
      reviews: 324,
      avgPrice: 1500,
      cuisine: "Nigerian",
    },
    {
      id: 2,
      name: "Babcock Buns",
      image: "🥐",
      rating: 4.9,
      reviews: 512,
      avgPrice: 1200,
      cuisine: "Bakery",
    },
    {
      id: 3,
      name: "Spicy Spot",
      image: "🌶️",
      rating: 4.7,
      reviews: 289,
      avgPrice: 1800,
      cuisine: "Spicy Meals",
    },
    {
      id: 4,
      name: "Pasta Paradise",
      image: "🍝",
      rating: 4.6,
      reviews: 198,
      avgPrice: 2000,
      cuisine: "Italian",
    },
  ]

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      if (direction === 'left') {
        scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      } else {
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    }
  }

  return (
    <section className="relative z-10 py-24 px-6 bg-gradient-to-b from-white to-gray-100/50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gray-200/20 rounded-full blur-3xl -z-10 opacity-30"></div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 font-sans">
            Trending <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Cravings</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl font-sans">
            Discover what's hot on campus right now. Fresh food from your favorite vendors, delivered in minutes.
          </p>
        </motion.div>

        {/* Horizontal Scroll Container */}
        <div className="relative group">
          {/* Scroll Buttons - Hidden on mobile, visible on md+ */}
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 w-14 h-14 bg-white/20 backdrop-blur-lg rounded-full shadow-lg hover:shadow-xl items-center justify-center text-primary hover:bg-white/30 transition-all duration-300 group-hover:opacity-100 opacity-0 hover:scale-110 border border-white/30"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 w-14 h-14 bg-white/20 backdrop-blur-lg rounded-full shadow-lg hover:shadow-xl items-center justify-center text-primary hover:bg-white/30 transition-all duration-300 group-hover:opacity-100 opacity-0 hover:scale-110 border border-white/30"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style]:none [overflow-y]:hidden"
          >
            {vendors.map((vendor, index) => (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-72 group"
              >
                <div className="relative bg-white rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full flex flex-col">
                  {/* Top Image Section (60%) */}
                  <div className="relative h-48 bg-gradient-to-br from-yellow-100 to-orange-100 overflow-hidden flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <span className="text-8xl drop-shadow-lg">{vendor.image}</span>
                  </div>

                  {/* Content Section (40%) */}
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    {/* Vendor Info */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 font-sans group-hover:text-green-600 transition-colors">
                        {vendor.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3 font-sans">{vendor.cuisine}</p>

                    </div>

                    {/* Price Section */}
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm text-gray-600 font-sans">Avg Order:</span>
                        <span className="text-2xl font-bold text-primary font-sans">₦{vendor.avgPrice}</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button className="mt-4 w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:from-accent hover:to-primary active:scale-95 group-hover:scale-105 origin-bottom font-sans border-2 border-primary sketch-border">
                      Order Now
                    </button>
                  </div>

                  {/* Shine Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:animate-pulse pointer-events-none"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Scroll Indicator */}
        <div className="md:hidden flex justify-center gap-2 mt-6">
          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </section>
  )
}

export default TrendingCravings
