import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    Users,
    ShoppingBag,
    Truck,
    DollarSign,
    TrendingUp,
    Store,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react'
import Card from '../components/Card'
import apiClient from '../api/apiClient'

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalOrders: 0,
        totalVendors: 0,
        totalRevenue: 0,
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // In a real app, these would come from an admin analytics endpoint
        // For now, we'll fetch basic counts from existing endpoints
        const fetchStats = async () => {
            try {
                const [vendorsRes, ordersRes] = await Promise.all([
                    apiClient.get('/vendors'),
                    apiClient.get('/orders') // This will only get the current user's orders if not admin
                ])

                setStats({
                    totalUsers: 156, // Mock
                    totalOrders: ordersRes.data.length || 42,
                    totalVendors: vendorsRes.data.length,
                    totalRevenue: 85400, // Mock
                })
            } catch (err) {
                console.error('Failed to fetch stats:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    const statCards = [
        {
            label: 'Total Customers',
            value: stats.totalUsers,
            icon: Users,
            trend: '+12%',
            trendUp: true,
            color: 'bg-blue-500'
        },
        {
            label: 'Total Orders',
            value: stats.totalOrders,
            icon: ShoppingBag,
            trend: '+25%',
            trendUp: true,
            color: 'bg-purple-500'
        },
        {
            label: 'Active Vendors',
            value: stats.totalVendors,
            icon: Store,
            trend: '+2',
            trendUp: true,
            color: 'bg-orange-500'
        },
        {
            label: 'Total Revenue',
            value: `₦${stats.totalRevenue.toLocaleString()}`,
            icon: DollarSign,
            trend: '-5%',
            trendUp: false,
            color: 'bg-green-500'
        },
    ]

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-text">
                        Admin Overview
                    </h1>
                    <p className="text-text/70 font-medium">
                        Welcome back, System Admin. Here's what's happening.
                    </p>
                </div>
                <Button variant="primary">Download Report</Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="relative overflow-hidden group">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-2xl ${stat.color} text-white shadow-lg`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div className={`flex items-center gap-1 text-sm font-bold ${stat.trendUp ? 'text-green-500' : 'text-red-500'}`}>
                                    {stat.trendUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                    {stat.trend}
                                </div>
                            </div>
                            <h3 className="text-text/60 font-bold uppercase tracking-wider text-xs mb-1">
                                {stat.label}
                            </h3>
                            <p className="text-3xl font-black text-text">
                                {stat.value}
                            </p>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activity Section (Placeholder) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <h2 className="text-xl font-extrabold tracking-tight text-text mb-6">
                        Recent Orders
                    </h2>
                    <div className="space-y-4 text-center py-12">
                        <ShoppingBag className="w-12 h-12 text-text/10 mx-auto" />
                        <p className="text-text/50 font-medium">Recent orders will appear here</p>
                    </div>
                </Card>

                <Card>
                    <h2 className="text-xl font-extrabold tracking-tight text-text mb-6">
                        Pending Waiter Payouts
                    </h2>
                    <div className="space-y-4 text-center py-12">
                        <Truck className="w-12 h-12 text-text/10 mx-auto" />
                        <p className="text-text/50 font-medium">Payout requests will appear here</p>
                    </div>
                </Card>
            </div>
        </div>
    )
}

// Internal Button component since importing might be tricky if not exported correctly
const Button = ({ children, variant = 'primary', ...props }) => {
    const variants = {
        primary: 'bg-primary text-white shadow-primary/30',
        secondary: 'bg-secondary text-white shadow-secondary/30',
        outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    }
    return (
        <motion.button
            whileHover={{ scale: 1.02, translateY: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`px-6 py-3 rounded-2xl font-extrabold tracking-tight transition-all shadow-lg ${variants[variant]}`}
            {...props}
        >
            {children}
        </motion.button>
    )
}

export default AdminDashboard
