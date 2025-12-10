import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// Pages
import LandingPage from './pages/LandingPage'
import StudentLogin from './pages/StudentLogin'
import StudentDashboard from './pages/StudentDashboard'
import StudentCart from './pages/StudentCart'
import OrderTracking from './pages/OrderTracking'
import WaiterSignup from './pages/WaiterSignup'
import WaiterDashboard from './pages/WaiterDashboard'

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/cart" element={<StudentCart />} />
          <Route path="/student/order/:orderId" element={<OrderTracking />} />
          <Route path="/waiter/signup" element={<WaiterSignup />} />
          <Route path="/waiter/dashboard" element={<WaiterDashboard />} />
        </Routes>
      </AnimatePresence>
    </Router>
  )
}

export default App




