import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    Users,
    Search,
    MapPin,
    Star,
    Truck,
    Ban,
    CheckCircle2,
    ChevronRight,
    ShieldCheck
} from 'lucide-react'
import Card from '../components/Card'
import apiClient from '../api/apiClient'

const AdminWaiters = () => {
    const [waiters, setWaiters] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Mocking waiter data for the UI
        setTimeout(() => {
            setWaiters([
                {
                    id: 1,
                    name: 'David Smith',
                    phone: '08123456789',
                    hostel: 'Hall 3',
                    matricNumber: '21/0045',
                    status: 'verified',
                    ordersCompleted: 45,
                    rating: 4.8
                },
                {
                    id: 2,
                    name: 'Sarah Wilson',
                    phone: '08098765432',
                    hostel: 'Hall 5',
                    matricNumber: '21/0122',
                    status: 'pending',
                    ordersCompleted: 12,
                    rating: 4.2
                },
                {
                    id: 3,
                    name: 'James Bond',
                    phone: '09012345678',
                    hostel: 'Hall 1',
                    matricNumber: '21/0007',
                    status: 'verified',
                    ordersCompleted: 124,
                    rating: 4.9
                }
            ])
            setLoading(false)
        }, 1000)
    }, [])

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-text">
                        Waiter Network
                    </h1>
                    <p className="text-text/70 font-medium">
                        Manage your delivery workforce and their performance.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    [1, 2, 3].map(i => <div key={i} className="h-72 bg-gray-100 rounded-[32px] animate-pulse" />)
                ) : (
                    waiters.map((waiter, index) => (
                        <motion.div
                            key={waiter.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="group">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex gap-4">
                                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-primary shadow-inner">
                                            <Users className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-text">{waiter.name}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                {waiter.status === 'verified' ? (
                                                    <div className="flex items-center gap-1 text-[10px] font-black uppercase text-green-500 tracking-widest">
                                                        <ShieldCheck className="w-3 h-3" />
                                                        Verified
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-1 text-[10px] font-black uppercase text-yellow-500 tracking-widest">
                                                        <Clock className="w-3 h-3" />
                                                        Pending Review
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-8">
                                    <div className="flex items-center gap-3 text-sm font-bold text-text/50">
                                        <MapPin className="w-4 h-4" />
                                        Resident of {waiter.hostel}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-bold text-text/50">
                                        <Users className="w-4 h-4" />
                                        Matric: {waiter.matricNumber}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-8 pt-6 border-t border-gray-50">
                                    <div>
                                        <p className="text-[10px] font-black text-text/30 uppercase tracking-widest mb-1">Orders</p>
                                        <p className="text-xl font-black text-text">{waiter.ordersCompleted}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-text/30 uppercase tracking-widest mb-1">Rating</p>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                            <span className="text-xl font-black text-text">{waiter.rating}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button className="flex-1 py-4 bg-gray-50 rounded-2xl font-black text-sm text-text/40 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center gap-2">
                                        <Ban className="w-4 h-4" />
                                        Suspend
                                    </button>
                                    <button className="flex-1 py-4 bg-primary text-white rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                                        Details
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </Card>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    )
}

export default AdminWaiters
