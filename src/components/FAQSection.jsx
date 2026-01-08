import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MapPin, CreditCard, Banknote, Home } from 'lucide-react'

const FAQSection = () => {
  const [expandedIndex, setExpandedIndex] = useState(0)

  const faqs = [
    {
      question: 'Do you deliver to all halls?',
      answer:
        'Yes! We deliver straight to your room in all residential halls on campus. Just enter your hall and room number when placing your order, and we\'ll bring your food right to your door.',
      Icon: MapPin,
    },
    {
      question: 'How do I pay?',
      answer:
        'We accept Paystack (debit/credit cards) and bank transfer. All payments are processed securely through our app. No cash on delivery.',
      Icon: CreditCard,
    },
    {
      question: 'What is the delivery fee?',
      answer:
        'Our delivery fee is flat ₦500. No hidden charges, no surprises. What you see at checkout is what you pay.',
      Icon: Banknote,
    },
    {
      question: 'Where will I receive my food?',
      answer:
        'Your food will be delivered right to your room door. Our waiter will call or knock when they arrive so you can receive your order.',
      Icon: Home,
    },
  ]

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index)
  }

  return (
    <section className="relative z-10 py-32 px-6 bg-gradient-to-b from-gray-100/50 to-white overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gray-300/20 rounded-full blur-3xl opacity-30"></div>
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
            Frequently Asked <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Questions</span>
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
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

                <div className="relative px-6 md:px-8 py-6 bg-white/40 backdrop-blur-lg rounded-2xl border border-white/40 group-hover:border-white/60 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center justify-between gap-4">
                    {/* Left - Icon and Question */}
                    <div className="flex items-center gap-4 text-left flex-1">
                      <faq.Icon className="w-6 h-6 text-primary flex-shrink-0" />
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-primary transition-colors font-sans">
                        {faq.question}
                      </h3>
                    </div>

                    {/* Right - Chevron Icon */}
                    <motion.div
                      animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
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
                    <div className="px-6 md:px-8 py-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-white/30">
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-700 leading-relaxed text-base md:text-lg font-sans"
                      >
                        {faq.answer}
                      </motion.p>
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
          <button className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 active:scale-95 font-sans border border-white/30">
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQSection
