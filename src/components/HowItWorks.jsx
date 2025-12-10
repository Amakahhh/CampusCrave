import React from 'react'
import { motion } from 'framer-motion'

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Browse',
      description: 'Pick from your favorite campus spots. Explore hundreds of meals curated just for you.',
      icon: '🔍',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      number: '02',
      title: 'Pay',
      description: 'Flat ₦500 delivery. No hidden fees, no surprises. What you see is what you pay.',
      icon: '💳',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      number: '03',
      title: 'Relax',
      description: 'We bring it straight to your hostel door. Sit back, study, or chill while we handle it.',
      icon: '🚀',
      gradient: 'from-green-500 to-emerald-500',
    },
  ]

  return (
    <section className="relative z-10 py-32 px-6 bg-white overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-20 right-10 w-96 h-96 bg-green-100/30 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-100/20 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 font-sans">
            How It <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-sans">
            Three simple steps to satisfaction. From hungry to happy in minutes.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative">
          {/* Connector Lines - Hidden on mobile */}
          <div className="hidden md:block absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent z-0 pointer-events-none"></div>

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              {/* Card Container */}
              <div className="relative group cursor-pointer">
                {/* Background Gradient Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300 blur-xl`}></div>

                <div className="relative bg-white border border-gray-100 rounded-3xl p-8 md:p-10 h-full hover:border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-4">
                  {/* Number - Huge Typography */}
                  <div className="mb-6">
                    <div className={`text-9xl font-black bg-gradient-to-br ${step.gradient} bg-clip-text text-transparent opacity-15 font-sans leading-none`}>
                      {step.number}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`inline-block p-4 bg-gradient-to-br ${step.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-4xl">{step.icon}</span>
                  </div>

                  {/* Content */}
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-sans">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed font-sans">
                    {step.description}
                  </p>

                  {/* Bottom Accent Line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.gradient} rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
                </div>
              </div>

              {/* Mobile Connector */}
              {index < steps.length - 1 && (
                <div className="md:hidden flex justify-center my-6">
                  <div className="text-gray-300 text-4xl font-light">↓</div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-20"
        >
          <button className="relative group px-12 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 font-sans overflow-hidden">
            <span className="relative z-10">Get Started Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks
