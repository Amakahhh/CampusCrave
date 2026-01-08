import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, User, Phone, BookOpen, Building, Hash, Lock } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import Input from '../components/Input'
import Button from '../components/Button'
import Card from '../components/Card'
import apiClient from '../api/apiClient'

const WaiterSignup = () => {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    matricNumber: '',
    password: '',
    confirmPassword: '',
    bankName: '',
    accountNumber: '',
  })
  const navigate = useNavigate()

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.phone || !formData.matricNumber || !formData.password) {
        setError('Please fill all personal details')
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        return
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters')
        return
      }
    }
    setError('')
    setStep(step + 1)
  }

  const handleSignup = async (e) => {
    e.preventDefault()

    // Validate step 2 (payout details)
    if (!formData.bankName || !formData.accountNumber) {
      setError('Please fill in bank details')
      return
    }

    setLoading(true)
    setError('')
    try {
      // Convert phone format: 07XXXXXXXXXX -> 234XXXXXXXXXX
      let phoneNumber = formData.phone
      if (phoneNumber.startsWith('0')) {
        phoneNumber = '234' + phoneNumber.substring(1)
      } else if (!phoneNumber.startsWith('234') && !phoneNumber.startsWith('+234')) {
        phoneNumber = '234' + phoneNumber
      }

      const response = await apiClient.post('/auth/waiter/signup', {
        name: formData.name,
        phone: phoneNumber,
        matricNumber: formData.matricNumber,
        password: formData.password,
        bankDetails: {
          bankName: formData.bankName,
          accountNumber: formData.accountNumber,
        }
      })
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      navigate('/waiter/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white relative flex items-center justify-center px-6 py-20 overflow-x-hidden">
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
        className="relative z-10 w-full max-w-lg"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-primary/20 mb-6">
            <Logo size={44} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-3">
            Start <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Earning</span>
          </h1>
          <p className="text-gray-500 text-lg font-medium">Deliver meals and earn while studying</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {[1, 2].map((s) => (
            <motion.div
              key={s}
              animate={{ width: step >= s ? 48 : 16 }}
              className={`h-2 rounded transition-all ${step >= s ? 'bg-gradient-to-r from-primary to-accent' : 'bg-gray-200'}`}
            />
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <h2 className="text-2xl font-black text-gray-900 mb-6">Personal Details</h2>
                
                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-gray-800 font-semibold text-sm">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <User className="w-5 h-5 text-primary/60" />
                    </div>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:bg-white transition-all text-gray-900 font-medium placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="block text-gray-800 font-semibold text-sm">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <Phone className="w-5 h-5 text-primary/60" />
                    </div>
                    <input
                      type="tel"
                      placeholder="08012345678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:bg-white transition-all text-gray-900 font-medium placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                {/* Matric Number */}
                <div className="space-y-2">
                  <label className="block text-gray-800 font-semibold text-sm">Matric Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <BookOpen className="w-5 h-5 text-primary/60" />
                    </div>
                    <input
                      type="text"
                      placeholder="21/1234"
                      value={formData.matricNumber}
                      onChange={(e) => setFormData({ ...formData, matricNumber: e.target.value })}
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:bg-white transition-all text-gray-900 font-medium placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                {/* Password Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="block text-gray-800 font-semibold text-sm">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <Lock className="w-5 h-5 text-primary/60" />
                      </div>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:bg-white transition-all text-gray-900 font-medium placeholder-gray-400 text-sm"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-gray-800 font-semibold text-sm">Confirm</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <Lock className="w-5 h-5 text-primary/60" />
                      </div>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:bg-white transition-all text-gray-900 font-medium placeholder-gray-400 text-sm"
                        required
                      />
                    </div>
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

                <Button className="w-full !py-4 text-lg font-bold bg-gradient-to-r from-primary to-accent hover:shadow-lg !text-white rounded-2xl transition-all duration-300 mt-8" onClick={handleNextStep}>
                  Next: Bank Details
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleSignup}
                className="space-y-5"
              >
                <h2 className="text-2xl font-black text-gray-900 mb-6">Payout Details</h2>

                {/* Bank Name */}
                <div className="space-y-2">
                  <label className="block text-gray-800 font-semibold text-sm">Bank Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <Building className="w-5 h-5 text-primary/60" />
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. Access Bank"
                      value={formData.bankName}
                      onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:bg-white transition-all text-gray-900 font-medium placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                {/* Account Number */}
                <div className="space-y-2">
                  <label className="block text-gray-800 font-semibold text-sm">Account Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <Hash className="w-5 h-5 text-primary/60" />
                    </div>
                    <input
                      type="text"
                      placeholder="0123456789"
                      value={formData.accountNumber}
                      onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:bg-white transition-all text-gray-900 font-medium placeholder-gray-400"
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

                <div className="flex gap-3 mt-8">
                  <Button type="button" className="flex-1 !py-4 text-base font-bold bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg transition-all" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="submit" className="flex-[2] !py-4 text-base font-bold bg-gradient-to-r from-primary to-accent hover:shadow-lg !text-white rounded-lg transition-all duration-300" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Start Earning'}
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Log In Link */}
        <p className="mt-8 text-center text-gray-600 font-medium">
          Already delivering with us? 
          <Link to="/student/login" className="text-primary font-bold hover:text-accent transition-colors ml-2">Log In</Link>
        </p>
      </motion.div>
    </div>
  )
}

export default WaiterSignup
