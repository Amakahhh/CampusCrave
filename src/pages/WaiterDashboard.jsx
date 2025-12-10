import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, DollarSign } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import Card from '../components/Card'
import Button from '../components/Button'

const WaiterDashboard = () => {
  const [isOnline, setIsOnline] = useState(false)
  const [earnings, setEarnings] = useState(0)
  const [activeOrder, setActiveOrder] = useState(null)
  const [availableOrders, setAvailableOrders] = useState([
    { id: 1, vendor: 'Mama Titi\'s Kitchen', hall: 'Hall 3', orderId: 'ORD001' },
    { id: 2, vendor: 'Uncle B\'s Grill', hall: 'Hall 1', orderId: 'ORD002' },
    { id: 3, vendor: 'Campus Delight', hall: 'Hall 5', orderId: 'ORD003' },
  ])

  const handleToggleOnline = () => {
    setIsOnline(!isOnline)
  }

  const handleClaimOrder = (order) => {
    setActiveOrder(order)
    setAvailableOrders(prev => prev.filter(o => o.id !== order.id))
  }

  const handleMarkCollected = () => {
    setActiveOrder(prev => ({ ...prev, status: 'collected' }))
  }

  const handleMarkDelivered = () => {
    setEarnings(prev => prev + 400)
    setActiveOrder(null)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-background px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link to="/">
            <motion.div whileHover={{ x: -3 }} whileTap={{ scale: 0.9 }}>
              <ArrowLeft className="w-6 h-6 text-text" />
            </motion.div>
          </Link>
          <div className="flex items-center gap-2">
            <Logo size={28} />
            <span className="text-lg font-extrabold tracking-tight text-primary">
              Waiter Dashboard
            </span>
          </div>
        </div>
      </header>

      {/* Online Toggle */}
      <section className="px-6 py-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold tracking-tight text-text mb-1 text-lg">
                {isOnline ? 'You are Online' : 'You are Offline'}
              </h3>
              <p className="text-sm text-text/70 font-medium">
                {isOnline ? 'Ready to receive orders' : 'Turn on to start earning'}
              </p>
            </div>
            <motion.button
              onClick={handleToggleOnline}
              className={`
                relative w-16 h-8 rounded-full p-1 transition-colors duration-300
                ${isOnline ? 'bg-primary' : 'bg-gray-300'}
              `}
            >
              <motion.div
                animate={{ x: isOnline ? 32 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="w-6 h-6 bg-white rounded-full shadow-md"
              />
            </motion.button>
          </div>
        </Card>
      </section>

      {/* Earnings Card */}
      <section className="px-6 mb-6">
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-text/70 mb-1 font-semibold">Today's Earnings</p>
              <motion.p
                key={earnings}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-3xl font-extrabold tracking-tight text-text"
              >
                ₦{earnings.toLocaleString()}
              </motion.p>
            </div>
          </div>
        </Card>
      </section>

      {/* Active Order */}
      <AnimatePresence>
        {activeOrder && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-6 mb-6"
          >
            <Card className="border-2 border-primary">
              <h3 className="font-extrabold tracking-tight text-text mb-4 text-xl">
                Active Order: {activeOrder.orderId}
              </h3>
              <div className="space-y-3 mb-6 text-base">
                <div className="flex justify-between">
                  <span className="text-text/70 font-semibold">Vendor</span>
                  <span className="font-extrabold text-text">{activeOrder.vendor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text/70 font-semibold">Delivery Hall</span>
                  <span className="font-extrabold text-text">{activeOrder.hall}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text/70 font-semibold">Earnings</span>
                  <span className="font-extrabold text-primary text-lg">₦400</span>
                </div>
              </div>
              <div className="space-y-3">
                {activeOrder.status !== 'collected' ? (
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={handleMarkCollected}
                  >
                    Mark as Collected
                  </Button>
                ) : (
                  <Button
                    variant="accent"
                    className="w-full"
                    onClick={handleMarkDelivered}
                  >
                    Mark as Delivered
                  </Button>
                )}
              </div>
            </Card>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Available Orders */}
      <section className="px-6">
        <h3 className="font-extrabold tracking-tight text-text mb-6 text-xl">
          Available Orders
        </h3>
        {availableOrders.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-text/70 font-semibold">No available orders at the moment</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {availableOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: index * 0.1, type: 'spring' }}
              >
                <Card>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-extrabold tracking-tight text-text mb-1 text-lg">
                        {order.vendor}
                      </h4>
                      <p className="text-sm text-text/70 font-medium">
                        Delivery to {order.hall}
                      </p>
                      <p className="text-xs text-text/60 mt-1 font-semibold">
                        Order ID: {order.orderId}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => handleClaimOrder(order)}
                    disabled={!isOnline}
                  >
                    Claim Order
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default WaiterDashboard


