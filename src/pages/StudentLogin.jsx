import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import Input from '../components/Input'
import Button from '../components/Button'
import Card from '../components/Card'

const StudentLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showOTP, setShowOTP] = useState(false)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const navigate = useNavigate()

  const handlePhoneSubmit = (e) => {
    e.preventDefault()
    if (phoneNumber.length >= 10) {
      setShowOTP(true)
    }
  }

  const handleOTPChange = (index, value) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus()
    }

    // Auto-verify when all fields are filled
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
      setTimeout(() => {
        navigate('/student/dashboard')
      }, 500)
    }
  }

  const handleOTPKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus()
    }
  }

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <Link to="/" className="inline-flex items-center gap-2 text-text/70 mb-8 hover:text-text transition-colors">
        <motion.div whileHover={{ x: -3 }} whileTap={{ scale: 0.9 }}>
          <ArrowLeft className="w-5 h-5" />
        </motion.div>
        <span className="font-semibold">Back</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <Logo size={40} />
          <span className="text-3xl font-extrabold tracking-tight text-primary">
            CampusCrave
          </span>
        </motion.div>

        <Card>
          {!showOTP ? (
            <>
              <h1 className="text-3xl font-extrabold tracking-tight text-text mb-3">
                Welcome Back!
              </h1>
              <p className="text-text/70 mb-6 font-medium">
                Enter your phone number to continue
              </p>
              <form onSubmit={handlePhoneSubmit}>
                <Input
                  type="tel"
                  placeholder="08012345678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="mb-6"
                />
                <Button type="submit" variant="primary" className="w-full">
                  Continue
                </Button>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-extrabold tracking-tight text-text mb-3">
                Enter OTP
              </h1>
              <p className="text-text/70 mb-6 font-medium">
                We sent a code to {phoneNumber}
              </p>
              <div className="flex gap-3 justify-center mb-6">
                {otp.map((digit, index) => (
                  <motion.input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOTPChange(index, e.target.value)}
                    onKeyDown={(e) => handleOTPKeyDown(index, e)}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileFocus={{ scale: 1.1 }}
                    className="w-14 h-16 text-center text-2xl font-extrabold rounded-2xl border-2 border-text/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white text-text"
                  />
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-text/60 text-center font-medium"
              >
                Auto-verifying...
              </motion.p>
            </>
          )}
        </Card>
      </motion.div>
    </div>
  )
}

export default StudentLogin


