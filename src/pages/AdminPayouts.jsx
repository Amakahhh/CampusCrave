import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    CreditCard,
    CheckCircle2,
    XCircle,
    Clock,
    Search,
    DollarSign,
    User,
    ArrowUpRight
} from 'lucide-react'
import Card from '../components/Card'
import apiClient from '../api/apiClient'

const AdminPayouts = () => {
    const [payouts, setPayouts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // In a real app, we'd fetch actual payout requests
        // For now, we'll use mock data to demonstrate the UI
        setTimeout(() => {
            setPayouts([
                {
                    id: 'PO-7842',
                    waiter: { name: 'David Smith', phone: '08123456789' },
                    amount: 12500,
                    status: 'PENDING',
                    bank: { name: 'Zenith Bank', account: '0123456789' },
                    date: new Date().toISOString()
                },
                {
                    id: 'PO-7841',
                    waiter: { name: 'Sarah Wilson', phone: '08098765432' },
                    amount: 8400,
                    status: 'COMPLETED',
                    bank: { name: 'GTBank', account: '0987654321' },
                    date: new Date(Date.now() - 86400000).toISOString()
                }
            ])
            setLoading(false)
        }, 1000)
    }, [])

    const handleApprove = (id) => {
        setPayouts(payouts.map(p => p.id === id ? { ...p, status: 'COMPLETED' } : p))
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-text">
                        Waiter Payouts
                    </h1>
                    <p className="text-text/70 font-medium">
                        Review and process earnings withdrawal requests.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {loading ? (
                        [1, 2].map(i => <div key={i} className="h-40 bg-gray-100 rounded-[32px] animate-pulse" />)
                    ) : payouts.length === 0 ? (
                        <Card className="text-center py-20">
                            <CreditCard className="w-16 h-16 text-text/10 mx-auto mb-4" />
                            <p className="text-text/50 font-black">No payout requests found</p>
                        </Card>
                    ) : (
                        payouts.map((p) => (
                            <motion.div
                                key={p.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <Card className="hover:shadow-xl transition-shadow border border-transparent hover:border-primary/10">
                                    <div className="flex items-start justify-between">
                                        <div className="flex gap-4">
                                            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-primary shadow-inner">
                                                <User className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-black text-text">{p.waiter.name}</h3>
                                                <p className="text-sm font-bold text-text/40">{p.waiter.phone}</p>
                                                <div className="mt-4 flex items-center gap-4">
                                                    <div className="px-3 py-1 bg-gray-100 rounded-lg text-[10px] font-black tracking-widest text-text/40 uppercase">
                                                        {p.id}
                                                    </div>
                                                    <div className={`
                            px-3 py-1 rounded-lg text-[10px] font-black tracking-widest uppercase
                            ${p.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}
                          `}>
                                                        {p.status}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-2xl font-black text-primary">₦{p.amount.toLocaleString()}</p>
                                            <p className="text-xs font-bold text-text/30 mt-1">
                                                {new Date(p.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm font-bold text-text/60">
                                            <Clock className="w-4 h-4" />
                                            Paid into: <span className="text-text">{p.bank.name} • {p.bank.account}</span>
                                        </div>

                                        {p.status === 'PENDING' && (
                                            <div className="flex gap-3">
                                                <button className="px-6 py-2 rounded-xl bg-red-50 text-red-500 font-black text-sm hover:bg-red-100 transition-colors">
                                                    Decline
                                                </button>
                                                <button
                                                    onClick={() => handleApprove(p.id)}
                                                    className="px-6 py-2 rounded-xl bg-primary text-white font-black text-sm shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                                                >
                                                    Approve Payout
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            </motion.div>
                        ))
                    )}
                </div>

                <div className="space-y-6">
                    <Card className="bg-primary text-white p-8">
                        <h3 className="text-white/60 font-bold uppercase tracking-widest text-xs mb-4">Pending Requests</h3>
                        <p className="text-5xl font-black mb-2">01</p>
                        <p className="text-white/80 font-bold text-sm">₦12,500 total pending</p>
                        <div className="mt-8 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                            <p className="text-xs font-bold text-white/60 mb-2">Performance Tip</p>
                            <p className="text-sm font-bold leading-relaxed">Faster payout processing improves waiter morale and availability by 40%.</p>
                        </div>
                    </Card>

                    <Card>
                        <h3 className="text-text/40 font-bold uppercase tracking-widest text-xs mb-6">Quick Filters</h3>
                        <div className="space-y-3">
                            <button className="w-full p-4 rounded-2xl bg-gray-50 text-text font-black text-sm flex items-center justify-between group hover:bg-gray-100 transition-all">
                                High Priority ({'>'}₦50k)
                                <ArrowUpRight className="w-4 h-4 text-text/20 group-hover:text-primary" />
                            </button>
                            <button className="w-full p-4 rounded-2xl bg-gray-50 text-text font-black text-sm flex items-center justify-between group hover:bg-gray-100 transition-all">
                                Oldest Requests
                                <ArrowUpRight className="w-4 h-4 text-text/20 group-hover:text-primary" />
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default AdminPayouts
