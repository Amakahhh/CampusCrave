import React from 'react'
import { motion } from 'framer-motion'
import { Search, CreditCard, Sparkles } from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Browse',
      description: 'Pick from your favorite campus spots. Explore hundreds of meals curated just for you.',
      icon: Search,
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-100/20',
    },
    {
      number: '02',
      title: 'Pay',
      description: 'Flat ₦500 delivery. No hidden fees, no surprises. What you see is what you pay.',
      icon: CreditCard,
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-100/20',
    },
    {
      number: '03',
      title: 'Relax',
      description: 'We bring it straight to your hostel door. Sit back, study, or chill while we handle it.',
      icon: Sparkles,
      color: 'from-pink-400 to-pink-600',
      bgColor: 'bg-pink-100/20',
    },
  ]

  return (
    <section className="relative z-10 py-32 px-6 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl opacity-30"></div>
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
            How It <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-sans">
            Three simple steps to satisfaction. From hungry to happy in minutes.
          </p>
        </motion.div>

        {/* Steps Grid with Roadmap Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative">
          {/* Roadmap Connector Lines - Desktop only */}
          <div className="hidden md:block absolute top-28 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 z-0 pointer-events-none"></div>

          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                {/* Roadmap Dot - Desktop only */}
                <div className="hidden md:block absolute top-24 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.2 }}
                    className={`w-6 h-6 bg-gradient-to-br ${step.color} rounded-full border-4 border-white shadow-lg`}
                  ></motion.div>
                </div>

                {/* Card Container */}
                <div className="relative group cursor-pointer pt-8 md:pt-0">
                  <div className={`relative ${step.bgColor} backdrop-blur-lg rounded-3xl p-8 md:p-10 h-full border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-4 overflow-hidden`}>
                    {/* Animated gradient background on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>

                    {/* Number - Subtle Typography */}
                    <div className="mb-6">
                      <div className={`text-7xl font-black bg-gradient-to-br ${step.color} bg-clip-text text-transparent opacity-20 font-sans leading-none select-none`}>
                        {step.number}
                      </div>
                    </div>

                    {/* Icon - Professional and colorful */}
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      className={`inline-block p-4 bg-gradient-to-br ${step.color} rounded-2xl mb-6 group-hover:shadow-lg transition-all`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-sans">
                      {step.title}
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed font-sans">
                      {step.description}
                    </p>

                    {/* Bottom Accent Line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color} rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
                  </div>
                </div>

                {/* Mobile Connector */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-6">
                    <div className="text-gray-300 text-4xl font-light">↓</div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-20"
        >
          <button className="relative group px-12 py-5 bg-gradient-to-r from-primary to-accent text-white font-bold text-lg rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 font-sans overflow-hidden border border-white/20">
            <span className="relative z-10">Get Started Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks
