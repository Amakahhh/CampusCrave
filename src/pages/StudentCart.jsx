import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus, Minus, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import Card from '../components/Card'
import Button from '../components/Button'

const StudentCart = () => {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Jollof Rice & Chicken', price: 1500, quantity: 2 },
    { id: 2, name: 'Fried Rice & Beef', price: 1800, quantity: 1 },
    { id: 3, name: 'Pounded Yam & Egusi', price: 2000, quantity: 1 },
  ])

  const deliveryFee = 500
  const serviceFee = 20

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change
          if (newQuantity <= 0) return null
          return { ...item, quantity: newQuantity }
        }
        return item
      }).filter(Boolean)
    )
  }

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal + deliveryFee + serviceFee

  const handleCheckout = () => {
    // In a real app, this would integrate with Paystack
    const orderId = Math.floor(Math.random() * 1000000)
    navigate(`/student/order/${orderId}`)
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
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-accent/10 rounded-full transition-colors"
                          >
                            <Minus className="w-4 h-4 text-text" />
                          </button>
                          <span className="font-extrabold text-text min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:bg-accent/10 rounded-full transition-colors"
                          >
                            <Plus className="w-4 h-4 text-text" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
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
            <Button
              variant="primary"
              className="w-full shadow-2xl"
              onClick={handleCheckout}
            >
              Pay ₦{total.toLocaleString()} with Paystack
            </Button>
          </motion.div>
        )}
      </section>
    </div>
  )
}

export default StudentCart


