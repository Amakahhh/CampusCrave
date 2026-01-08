import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, Lock, ArrowLeft } from 'lucide-react'
import Logo from '../components/Logo'
import Input from '../components/Input'
import Button from '../components/Button'
import Card from '../components/Card'
import apiClient from '../api/apiClient'

const StudentLogin = () => {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await apiClient.post('/auth/student/login', { phone, password })
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      navigate('/student/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid phone or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white relative flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-primary/8 to-transparent rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-tl from-accent/8 to-transparent rounded-full blur-[120px]" />

      {/* Back Button */}
      <div className="absolute top-8 left-8 z-20">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-white p-3 rounded-xl border border-gray-200 group-hover:border-primary/30 group-hover:shadow-md transition-all shadow-sm">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </div>
          <span className="text-gray-800 font-semibold text-base hidden sm:inline">Back</span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-primary/20 mb-6">
            <Logo size={44} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-3">
            Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Back</span>
          </h1>
          <p className="text-gray-500 text-lg font-medium">Sign in to your account</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Phone Input */}
            <div className="space-y-2">
              <label className="block text-gray-800 font-semibold text-sm">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Phone className="w-5 h-5 text-primary/60" />
                </div>
                <input
                  type="tel"
                  placeholder="08012345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:bg-white transition-all text-gray-900 font-medium placeholder-gray-400"
                  required
                />
              </div>
              <p className="text-gray-500 text-xs mt-1">Enter the phone number you signed up with</p>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-gray-800 font-semibold text-sm">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Lock className="w-5 h-5 text-primary/60" />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:bg-white transition-all text-gray-900 font-medium placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                <p className="text-red-700 text-sm font-semibold">{error}</p>
              </motion.div>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full !py-4 text-lg font-bold bg-gradient-to-r from-primary to-accent hover:shadow-lg !text-white rounded-lg transition-all duration-300 mt-8"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </div>

        {/* Sign Up Link */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-gray-600 font-medium">
            Don't have an account? 
            <Link to="/student/signup" className="text-primary font-bold hover:text-accent transition-colors ml-2">Sign Up</Link>
          </p>
          <div className="border-t border-gray-200 pt-4">
            <p className="text-gray-500 text-sm mb-2">Want to deliver with us?</p>
            <Link to="/waiter/signup" className="text-primary font-semibold hover:text-accent transition-colors text-sm">
              Become a Mobile Waiter →
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default StudentLogin
