import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2, Package, Truck, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import Card from '../components/Card'

const OrderTracking = () => {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    { icon: CheckCircle2, label: 'Order Confirmed', color: 'text-primary' },
    { icon: Package, label: 'Waiter Assigned', color: 'text-secondary' },
    { icon: Package, label: 'Food Collected', color: 'text-secondary' },
    { icon: Truck, label: 'On the Way', color: 'text-text', animated: true },
    { icon: MapPin, label: 'Delivered', color: 'text-primary' },
  ]

  useEffect(() => {
    // Simulate order progress
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1
        }
        return prev
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-background px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link to="/student/dashboard">
            <motion.div whileHover={{ x: -3 }} whileTap={{ scale: 0.9 }}>
              <ArrowLeft className="w-6 h-6 text-text" />
            </motion.div>
          </Link>
          <div className="flex items-center gap-2">
            <Logo size={28} />
            <span className="text-lg font-extrabold tracking-tight text-primary">
              Order #{orderId}
            </span>
          </div>
        </div>
      </header>

      {/* Tracking Timeline */}
      <section className="px-6 py-8">
        <Card>
          <h2 className="text-2xl font-extrabold tracking-tight text-text mb-8">
            Track Your Order
          </h2>
          
          <div className="relative">
            {/* Vertical Line */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute left-6 top-0 bottom-0 w-1 bg-accent/20 rounded-full"
            />
            
            <div className="space-y-8">
              {steps.map((step, index) => {
                const isCompleted = index <= currentStep
                const isCurrent = index === currentStep
                const Icon = step.icon

                return (
                  <div key={index} className="relative flex items-start gap-4">
                    {/* Icon */}
                    <div className="relative z-10">
                      <motion.div
                        animate={
                          isCurrent && step.animated
                            ? {
                                x: [0, 5, -5, 0],
                                y: [0, -5, 5, 0],
                              }
                            : {}
                        }
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className={`
                          w-14 h-14 rounded-full flex items-center justify-center border-2
                          ${isCompleted ? 'bg-primary text-white border-primary' : 'bg-white border-text/20 text-text/40'}
                          transition-all duration-300
                        `}
                      >
                        <Icon className="w-7 h-7" />
                      </motion.div>
                    </div>

                    {/* Label */}
                    <div className="flex-1 pt-2">
                      <p
                        className={`
                          font-extrabold tracking-tight text-lg
                          ${isCompleted ? 'text-text' : 'text-text/40'}
                          transition-colors duration-300
                        `}
                      >
                        {step.label}
                      </p>
                      {isCurrent && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm text-text/70 mt-2 font-semibold"
                        >
                          In progress...
                        </motion.p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Card>

        {/* Order Details */}
        <Card className="mt-6">
          <h3 className="font-extrabold tracking-tight text-text mb-4 text-xl">
            Order Details
          </h3>
          <div className="space-y-3 text-base">
            <div className="flex justify-between">
              <span className="text-text/70 font-semibold">Order ID</span>
              <span className="font-extrabold text-text">#{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text/70 font-semibold">Estimated Delivery</span>
              <span className="font-extrabold text-text">30-45 mins</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text/70 font-semibold">Delivery Hall</span>
              <span className="font-extrabold text-text">Hall 3</span>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}

export default OrderTracking


