import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import Input from '../components/Input'
import Button from '../components/Button'
import Card from '../components/Card'

const WaiterSignup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    hall: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would create an account
    navigate('/waiter/dashboard')
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
          <h1 className="text-3xl font-extrabold tracking-tight text-text mb-3">
            Become a Waiter
          </h1>
          <p className="text-text/70 mb-6 font-medium">
            Start earning by delivering food to students
          </p>
          <form onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mb-4"
              required
            />
            <Input
              label="Phone Number"
              type="tel"
              placeholder="08012345678"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mb-4"
              required
            />
            <Input
              label="Residence Hall"
              placeholder="Hall 3"
              value={formData.hall}
              onChange={(e) => setFormData({ ...formData, hall: e.target.value })}
              className="mb-6"
              required
            />
            <Button type="submit" variant="primary" className="w-full">
              Create Account
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}

export default WaiterSignup


