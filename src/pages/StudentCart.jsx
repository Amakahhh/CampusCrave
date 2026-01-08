import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus, Minus, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import Card from '../components/Card'
import Button from '../components/Button'

import { useCart } from '../context/CartContext'
import apiClient from '../api/apiClient'

const StudentCart = () => {
  const navigate = useNavigate()
  const { cartItems, removeFromCart, updateQuantity, subtotal, deliveryFee, serviceFee, total } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCheckout = async () => {
    setLoading(true)
    setError('')
    try {
      const orderData = {
        vendorId: cartItems[0].vendorId,
        items: cartItems.map(item => ({
          menuItemId: item.foodId,
          quantity: item.quantity
        })),
        deliveryAddress: {
          hall: 'Your Hall', // Should be from user profile or prompted
          room: 'Your Room'
        }
      }

      const response = await apiClient.post('/orders', orderData)
      const { paymentUrl } = response.data

      // Redirect to Paystack payment URL
      window.location.href = paymentUrl
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to initiate checkout. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-32">
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
              Cart
            </span>
          </div>
        </div>
      </header>

      {/* Cart Items */}
      <section className="px-6 py-6">
        {cartItems.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-text/70 mb-6 font-semibold text-lg">Your cart is empty</p>
            <Link to="/student/dashboard">
              <Button variant="primary">Browse Vendors</Button>
            </Link>
          </Card>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Card>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-extrabold tracking-tight text-text mb-1 text-lg">
                          {item.name}
                        </h3>
                        <p className="text-primary font-bold text-lg">
                          ₦{item.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-background rounded-full px-2 py-1 border-2 border-text/20">
                          <button
                            onClick={() => updateQuantity(item.foodId, item.quantity - 1)}
                            className="p-1 hover:bg-accent/10 rounded-full transition-colors"
                          >
                            <Minus className="w-4 h-4 text-text" />
                          </button>
                          <span className="font-extrabold text-text min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.foodId, item.quantity + 1)}
                            className="p-1 hover:bg-accent/10 rounded-full transition-colors"
                          >
                            <Plus className="w-4 h-4 text-text" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.foodId)}
                          className="p-2 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-text/20">
                      <p className="text-sm text-text/70 font-medium">
                        Subtotal: <span className="font-extrabold text-text">₦{(item.price * item.quantity).toLocaleString()}</span>
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <Card className="mb-6">
              <h3 className="font-extrabold tracking-tight text-text mb-4 text-xl">
                Order Summary
              </h3>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-text/70">
                  <span className="font-semibold">Subtotal</span>
                  <span className="font-bold">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-text/70">
                  <span className="font-semibold">Delivery Fee</span>
                  <span className="font-bold">₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-text/70">
                  <span className="font-semibold">Service Fee</span>
                  <span className="font-bold">₦{serviceFee.toLocaleString()}</span>
                </div>
                <div className="pt-4 border-t-2 border-text/20 flex justify-between">
                  <span className="font-extrabold tracking-tight text-text text-xl">Total</span>
                  <span className="font-extrabold tracking-tight text-primary text-xl">
                    ₦{total.toLocaleString()}
                  </span>
                </div>
              </div>
            </Card>
          </>
        )}

        {/* Sticky Checkout Button */}
        {cartItems.length > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-24 left-0 right-0 px-6 z-40"
          >
            {error && <p className="text-red-500 text-sm mb-4 font-medium text-center">{error}</p>}
            <Button
              variant="primary"
              className="w-full shadow-2xl"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? 'Processing...' : `Pay ₦${total.toLocaleString()} with Paystack`}
            </Button>
          </motion.div>
        )}
      </section>
    </div>
  )
}

export default StudentCart


