import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const FAQSection = () => {
  const [expandedIndex, setExpandedIndex] = useState(0)

  const faqs = [
    {
      question: 'Do you deliver to all halls?',
      answer:
        'Yes! We deliver to all residential halls on campus - both the main campus and the surrounding areas. Our delivery network covers every hostel and residential area. You can enter your hostel location when placing an order to confirm delivery.',
      icon: '📍',
    },
    {
      question: 'How do I pay?',
      answer:
        'We accept multiple payment methods for your convenience: Paystack (debit/credit cards), bank transfer, or cash on delivery. When you check out, you\'ll see all available options for your area. All payments are processed securely.',
      icon: '💳',
    },
    {
      question: 'Is there a service fee?',
      answer:
        'Simple! Our service is transparent. There\'s a flat ₦20 service fee to support our platform, plus ₦500 for delivery. No hidden charges, no surprise fees. What you see at checkout is what you pay.',
      icon: '💰',
    },
    {
      question: 'What if my food arrives late?',
      answer:
        'We guarantee delivery within your estimated window. If your order is late, contact us immediately via the app and we\'ll resolve it - whether that\'s a refund, replacement, or credit for your next order. Your satisfaction is our priority.',
      icon: '⚡',
    },
    {
      question: 'Can I schedule orders in advance?',
      answer:
        'Absolutely! You can schedule orders up to 7 days in advance. Just select your preferred delivery time when placing the order. This is perfect for meal prep or ensuring you have food ready when you need it.',
      icon: '🗓️',
    },
    {
      question: 'What\'s your refund policy?',
      answer:
        'If you\'re not satisfied with your order, let us know within 30 minutes of delivery. We offer full refunds or meal replacements. We stand behind every order and want you to be completely happy with what you receive.',
      icon: '↩️',
    },
  ]

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index)
  }

  return (
    <section className="relative z-10 py-32 px-6 bg-gradient-to-b from-yellow-50/50 to-white overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-100/30 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-yellow-100/20 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 font-sans">
            Frequently Asked <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-lg text-gray-600 font-sans">
            Everything you need to know about ordering from CampusCrave.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4 md:space-y-5">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <motion.button
                onClick={() => toggleAccordion(index)}
                className="w-full relative"
                whileHover={{ scale: 1.01 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

                <div className="relative px-6 md:px-8 py-6 bg-white rounded-2xl border border-gray-100 group-hover:border-green-200 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center justify-between gap-4">
                    {/* Left - Icon and Question */}
                    <div className="flex items-center gap-4 text-left flex-1">
                      <span className="text-3xl md:text-4xl flex-shrink-0">{faq.icon}</span>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors font-sans">
                        {faq.question}
                      </h3>
                    </div>

                    {/* Right - Chevron Icon */}
                    <motion.div
                      animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-6 h-6 text-green-600 group-hover:scale-110 transition-transform" />
                    </motion.div>
                  </div>
                </div>
              </motion.button>

              {/* Expandable Answer */}
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 py-6 bg-gradient-to-br from-green-50/50 to-emerald-50/30 rounded-2xl border border-green-100/50 border-t-green-200">
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-700 leading-relaxed text-base md:text-lg font-sans"
                      >
                        {faq.answer}
                      </motion.p>

                      {/* Additional Info Badge */}
                      {index === 2 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="mt-4 inline-block bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-bold font-sans"
                        >
                          💚 That's it! No hidden charges.
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA at Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-6 text-lg font-sans">
            Still have questions? We're here to help!
          </p>
          <button className="inline-block px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 active:scale-95 font-sans">
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQSection
