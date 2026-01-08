import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, DollarSign } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import Card from '../components/Card'
import Button from '../components/Button'
import apiClient from '../api/apiClient'
import { useEffect } from 'react'

const WaiterDashboard = () => {
  const [isOnline, setIsOnline] = useState(localStorage.getItem('waiterStatus') === 'online')
  const [wallet, setWallet] = useState({ balance: 0 })
  const [activeOrder, setActiveOrder] = useState(null)
  const [availableOrders, setAvailableOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [walletRes, activeRes, availableRes] = await Promise.all([
          apiClient.get('/waiters/wallet'),
          apiClient.get('/orders/waiter/active'),
          apiClient.get('/orders/available')
        ])
        setWallet(walletRes.data)
        setActiveOrder(activeRes.data?.[0] || null)
        setAvailableOrders(availableRes.data)
        setError('')
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err)
        setError('Failed to sync. Please refresh.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 10000) // Poll every 10s

    return () => clearInterval(interval)
  }, [])

  const handleToggleOnline = () => {
    const newStatus = !isOnline
    setIsOnline(newStatus)
    localStorage.setItem('waiterStatus', newStatus ? 'online' : 'offline')
  }

  const handleClaimOrder = async (orderId) => {
    try {
      setLoading(true)
      await apiClient.post(`/orders/${orderId}/claim`)
      // Re-fetch to update state
      const [walletRes, activeRes, availableRes] = await Promise.all([
        apiClient.get('/waiters/wallet'),
        apiClient.get('/orders/waiter/active'),
        apiClient.get('/orders/available')
      ])
      setWallet(walletRes.data)
      setActiveOrder(activeRes.data?.[0] || null)
      setAvailableOrders(availableRes.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to claim order')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (orderId, status) => {
    try {
      setLoading(true)
      await apiClient.post(`/orders/${orderId}/status`, { status })
      // Re-fetch to update state
      const [walletRes, activeRes, availableRes] = await Promise.all([
        apiClient.get('/waiters/wallet'),
        apiClient.get('/orders/waiter/active'),
        apiClient.get('/orders/available')
      ])
      setWallet(walletRes.data)
      setActiveOrder(activeRes.data?.[0] || null)
      setAvailableOrders(availableRes.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update status')
    } finally {
      setLoading(false)
    }
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

      {/* Status Message */}
      {error && <p className="px-6 pb-4 text-red-500 text-sm font-medium text-center">{error}</p>}

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

      {/* Wallet Card */}
      <section className="px-6 mb-6">
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-text/70 mb-1 font-semibold">Wallet Balance</p>
              <motion.p
                key={wallet.balance}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-3xl font-extrabold tracking-tight text-text"
              >
                ₦{wallet.balance.toLocaleString()}
              </motion.p>
              <p className="text-xs text-text/50 font-medium">Earned today</p>
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
                Active Order: {activeOrder.id.slice(-6).toUpperCase()}
              </h3>
              <div className="space-y-3 mb-6 text-base">
                <div className="flex justify-between">
                  <span className="text-text/70 font-semibold">Vendor</span>
                  <span className="font-extrabold text-text">{activeOrder.vendor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text/70 font-semibold">Delivery Hall</span>
                  <span className="font-extrabold text-text">{activeOrder.deliveryAddress.hall}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text/70 font-semibold">Status</span>
                  <span className="font-extrabold text-primary">{activeOrder.status}</span>
                </div>
              </div>
              <div className="space-y-3">
                {activeOrder.status === 'ASSIGNED' && (
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => handleUpdateStatus(activeOrder.id, 'COLLECTED')}
                    disabled={loading}
                  >
                    Mark as Collected
                  </Button>
                )}
                {activeOrder.status === 'COLLECTED' && (
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => handleUpdateStatus(activeOrder.id, 'DELIVERING')}
                    disabled={loading}
                  >
                    Start Delivery
                  </Button>
                )}
                {activeOrder.status === 'DELIVERING' && (
                  <Button
                    variant="accent"
                    className="w-full"
                    onClick={() => handleUpdateStatus(activeOrder.id, 'DELIVERED')}
                    disabled={loading}
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
                        {order.vendor.name}
                      </h4>
                      <p className="text-sm text-text/70 font-medium">
                        Delivery to {order.deliveryAddress.hall}
                      </p>
                      <p className="text-xs text-text/60 mt-1 font-semibold">
                        Order ID: {order.id.slice(-6).toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => handleClaimOrder(order.id)}
                    disabled={!isOnline || loading}
                  >
                    {loading ? 'Claiming...' : 'Claim Order'}
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


