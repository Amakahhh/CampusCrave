import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, User, Mail, Phone, Home, Building, Lock } from 'lucide-react'
import Logo from '../components/Logo'
import Button from '../components/Button'
import apiClient from '../api/apiClient'

const StudentSignup = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        hostel: '',
        room: '',
    })
    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()

        if (!formData.name || !formData.email || !formData.phone || !formData.password) {
            setError('Please fill in all required fields')
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

            // Direct signup - no verification
            const response = await apiClient.post('/auth/student/signup', {
                email: formData.email,
                name: formData.name,
                phone: phoneNumber,
                password: formData.password,
                hostel: formData.hostel || '',
                room: formData.room || '',
            })

            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            navigate('/student/dashboard')
        } catch (err) {
            setError(err.response?.data?.error || 'Signup failed. Please try again.')
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
                className="relative z-10 w-full max-w-lg"
            >
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-primary/20 mb-6">
                        <Logo size={44} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-3">
                        Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Crave</span>
                    </h1>
                    <p className="text-gray-500 text-lg font-medium">Get meals delivered to your room</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8">
                    <form onSubmit={handleSignup} className="space-y-5">
                        {/* Full Name */}
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
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:bg-white transition-all text-gray-900 font-medium placeholder-gray-400"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="block text-gray-800 font-semibold text-sm">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    <Mail className="w-5 h-5 text-primary/60" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:bg-white transition-all text-gray-900 font-medium placeholder-gray-400"
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
                                    placeholder="07012345678"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:bg-white transition-all text-gray-900 font-medium placeholder-gray-400"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
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
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:bg-white transition-all text-gray-900 font-medium placeholder-gray-400"
                                    required
                                />
                            </div>
                            <p className="text-gray-500 text-xs mt-1">Any characters allowed</p>
                        </div>

                        {/* Hostel and Room */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <label className="block text-gray-800 font-semibold text-sm">Hostel</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                        <Building className="w-5 h-5 text-primary/60" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="e.g. Eni Njoku"
                                        value={formData.hostel}
                                        onChange={(e) => setFormData({ ...formData, hostel: e.target.value })}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:bg-white transition-all text-gray-900 font-medium text-sm placeholder-gray-400"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-gray-800 font-semibold text-sm">Room</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                        <Home className="w-5 h-5 text-primary/60" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="e.g. A201"
                                        value={formData.room}
                                        onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:bg-white transition-all text-gray-900 font-medium text-sm placeholder-gray-400"
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

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 text-lg font-bold bg-gradient-to-r from-primary to-accent hover:shadow-lg text-white rounded-lg transition-all duration-300 mt-8 disabled:opacity-50"
                        >
                            {loading ? 'Creating account...' : 'Sign Up'}
                        </button>

                        {/* Login Link */}
                        <p className="text-center text-gray-600 text-sm mt-6">
                            Already have an account?{' '}
                            <Link to="/student/login" className="font-bold text-primary hover:text-accent transition-colors">
                                Log In
                            </Link>
                        </p>
                    </form>
                </div>

                {/* Additional Links */}
                <div className="mt-8 text-center space-y-4">
                    <p className="text-gray-600 font-medium text-sm">
                        Want to deliver with us?{' '}
                        <Link to="/waiter/signup" className="text-primary font-bold hover:text-accent transition-colors">
                            Become a Mobile Waiter
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}

export default StudentSignup
