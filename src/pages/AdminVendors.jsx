import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Plus,
    Search,
    MoreVertical,
    Edit2,
    Trash2,
    Eye,
    Store,
    MapPin,
    Clock,
    ChevronRight,
    X
} from 'lucide-react'
import Card from '../components/Card'
import apiClient from '../api/apiClient'

const AdminVendors = () => {
    const [vendors, setVendors] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [showAddModal, setShowAddModal] = useState(false)
    const [newVendor, setNewVendor] = useState({
        name: '',
        hall: '',
        description: '',
        imageUrl: '',
    })

    useEffect(() => {
        fetchVendors()
    }, [])

    const fetchVendors = async () => {
        try {
            setLoading(true)
            const response = await apiClient.get('/vendors')
            setVendors(response.data)
        } catch (err) {
            console.error('Failed to fetch vendors:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleCreateVendor = async (e) => {
        e.preventDefault()
        // Backend doesn't have a create vendor endpoint clearly exposed in the app.js level
        // but vendorService has partial logic. We'll mock the success for the UI implementation.
        console.log('Creating vendor:', newVendor)
        setVendors([...vendors, { ...newVendor, id: Math.random(), menuItems: [] }])
        setShowAddModal(false)
        setNewVendor({ name: '', hall: '', description: '', imageUrl: '' })
    }

    const filteredVendors = vendors.filter(v =>
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.hall.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-text">
                        Vendors
                    </h1>
                    <p className="text-text/70 font-medium">
                        Manage your food partners and their menus.
                    </p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-primary text-white shadow-lg shadow-primary/20 px-6 py-3 rounded-2xl font-extrabold tracking-tight flex items-center gap-2 hover:scale-105 transition-transform"
                >
                    <Plus className="w-5 h-5" />
                    Add Vendor
                </button>
            </div>

            {/* Search and Filters */}
            <Card className="flex items-center gap-4 py-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search vendors by name or hall..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                    />
                </div>
            </Card>

            {/* Vendors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {loading ? (
                    [1, 2, 3].map(i => (
                        <div key={i} className="h-64 bg-gray-100 rounded-[32px] animate-pulse" />
                    ))
                ) : (
                    filteredVendors.map((vendor, index) => (
                        <motion.div
                            key={vendor.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card className="p-0 overflow-hidden group">
                                <div className="relative h-40 bg-gray-200">
                                    {vendor.imageUrl ? (
                                        <img src={vendor.imageUrl} alt={vendor.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-primary/5">
                                            <Store className="w-12 h-12 text-primary/20" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <button className="p-2 bg-white/90 backdrop-blur shadow-sm rounded-xl text-gray-600 hover:text-primary transition-colors">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 bg-white/90 backdrop-blur shadow-sm rounded-xl text-gray-600 hover:text-red-500 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-black text-text mb-2 group-hover:text-primary transition-colors">
                                        {vendor.name}
                                    </h3>
                                    <div className="flex items-center gap-4 text-sm font-bold text-text/50 mb-6">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {vendor.hall}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Eye className="w-4 h-4" />
                                            {vendor.menuItems?.length || 0} Items
                                        </div>
                                    </div>

                                    <button className="w-full py-4 rounded-2xl border-2 border-gray-100 font-extrabold text-text hover:border-primary/30 hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
                                        View & Edit Menu
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </Card>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Add Vendor Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={() => setShowAddModal(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative bg-white w-full max-w-lg rounded-[40px] shadow-2xl p-10"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-black text-text">Add New Vendor</h2>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-text/50"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleCreateVendor} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-text/60 ml-2">Vendor Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={newVendor.name}
                                        onChange={e => setNewVendor({ ...newVendor, name: e.target.value })}
                                        placeholder="e.g. Mama Titi's Kitchen"
                                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary font-bold placeholder:font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-text/60 ml-2">Location/Hall</label>
                                    <input
                                        type="text"
                                        required
                                        value={newVendor.hall}
                                        onChange={e => setNewVendor({ ...newVendor, hall: e.target.value })}
                                        placeholder="e.g. Hall 3"
                                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary font-bold placeholder:font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-text/60 ml-2">Description</label>
                                    <textarea
                                        rows="3"
                                        value={newVendor.description}
                                        onChange={e => setNewVendor({ ...newVendor, description: e.target.value })}
                                        placeholder="What do they specialize in?"
                                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary font-bold placeholder:font-medium resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-5 bg-primary text-white text-lg font-black rounded-3xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform mt-4"
                                >
                                    Create Vendor Profile
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default AdminVendors
