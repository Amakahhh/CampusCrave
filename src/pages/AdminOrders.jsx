import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    Search,
    Filter,
    Eye,
    Clock,
    CheckCircle2,
    Truck,
    XCircle,
    ShoppingBag,
    User,
    MapPin,
    ExternalLink
} from 'lucide-react'
import Card from '../components/Card'
import apiClient from '../api/apiClient'

const AdminOrders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('ALL')

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        try {
            setLoading(true)
            const response = await apiClient.get('/orders')
            setOrders(response.data)
        } catch (err) {
            console.error('Failed to fetch orders:', err)
        } finally {
            setLoading(false)
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING': return 'bg-yellow-100 text-yellow-700'
            case 'PAID': return 'bg-blue-100 text-blue-700'
            case 'ASSIGNED': return 'bg-purple-100 text-purple-700'
            case 'DELIVERED': return 'bg-green-100 text-green-700'
            case 'CANCELLED': return 'bg-red-100 text-red-700'
            default: return 'bg-gray-100 text-gray-700'
        }
    }

    const filteredOrders = filter === 'ALL'
        ? orders
        : orders.filter(o => o.status === filter)

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-text">
                        Order Oversight
                    </h1>
                    <p className="text-text/70 font-medium">
                        Monitor all transaction and delivery activity.
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
                {['ALL', 'PENDING', 'PAID', 'ASSIGNED', 'DELIVERED', 'CANCELLED'].map((s) => (
                    <button
                        key={s}
                        onClick={() => setFilter(s)}
                        className={`
              px-6 py-2 rounded-xl font-bold transition-all
              ${filter === s ? 'bg-primary text-white shadow-lg' : 'bg-white text-text/50 hover:bg-gray-50'}
            `}
                    >
                        {s}
                    </button>
                ))}
            </div>

            {/* Orders Table */}
            <Card className="p-0 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-8 py-5 text-sm font-black text-text/40 uppercase tracking-widest text-center">ID</th>
                                <th className="px-8 py-5 text-sm font-black text-text/40 uppercase tracking-widest">Customer</th>
                                <th className="px-8 py-5 text-sm font-black text-text/40 uppercase tracking-widest">Vendor</th>
                                <th className="px-8 py-5 text-sm font-black text-text/40 uppercase tracking-widest">Amount</th>
                                <th className="px-8 py-5 text-sm font-black text-text/40 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-sm font-black text-text/40 uppercase tracking-widest">Time</th>
                                <th className="px-8 py-5 text-sm font-black text-text/40 uppercase tracking-widest"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                [1, 2, 3, 4, 5].map(i => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan="7" className="px-8 py-10 bg-gray-50/50"></td>
                                    </tr>
                                ))
                            ) : filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-8 py-20 text-center font-bold text-text/30">
                                        No orders found matching this filter
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-8 py-6 font-mono font-bold text-xs text-text/40 text-center">
                                            #{order.id.slice(-6).toUpperCase()}
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-text/60">
                                                    <User className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-extrabold text-text">{order.customer?.name || 'Anonymous'}</p>
                                                    <p className="text-xs font-bold text-text/40">{order.customer?.phone}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 font-extrabold text-text">
                                            {order.vendor?.name}
                                        </td>
                                        <td className="px-8 py-6 font-black text-primary">
                                            ₦{order.totalAmount.toLocaleString()}
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-tight ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-sm font-bold text-text/40">
                                            {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-primary hover:border-primary/20 hover:shadow-lg transition-all">
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}

export default AdminOrders
