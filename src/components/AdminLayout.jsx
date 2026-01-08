import React from 'react'
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    BarChart3,
    Store,
    ShoppingBag,
    Users,
    CreditCard,
    Settings,
    LogOut,
    ChevronRight
} from 'lucide-react'
import Logo from '../components/Logo'

const AdminLayout = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const menuItems = [
        { label: 'Dashboard', icon: BarChart3, path: '/admin/dashboard' },
        { label: 'Vendors', icon: Store, path: '/admin/vendors' },
        { label: 'Orders', icon: ShoppingBag, path: '/admin/orders' },
        { label: 'Waiters', icon: Users, path: '/admin/waiters' },
        { label: 'Payouts', icon: CreditCard, path: '/admin/payouts' },
    ]

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/student/login')
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-gray-200 sticky top-0 h-screen flex flex-col">
                <div className="p-8">
                    <div className="flex items-center gap-3 mb-12">
                        <Logo size={36} />
                        <div>
                            <span className="text-xl font-black tracking-tight text-primary block">
                                CampusCrave
                            </span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                Control Center
                            </span>
                        </div>
                    </div>

                    <nav className="space-y-2">
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path
                            return (
                                <Link key={item.path} to={item.path}>
                                    <motion.div
                                        whileHover={{ x: 4 }}
                                        className={`
                      flex items-center justify-between p-4 rounded-2xl transition-all duration-300
                      ${isActive
                                                ? 'bg-primary text-white shadow-xl shadow-primary/20'
                                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                            }
                    `}
                                    >
                                        <div className="flex items-center gap-4">
                                            <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                                            <span className="font-extrabold tracking-tight">{item.label}</span>
                                        </div>
                                        {isActive && <motion.div layoutId="activeInd" className="w-1 h-1 bg-white rounded-full" />}
                                    </motion.div>
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                <div className="mt-auto p-8 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 p-4 w-full rounded-2xl text-red-500 font-extrabold hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-12 overflow-y-auto">
                <header className="flex justify-between items-center mb-12 bg-white p-6 rounded-[32px] shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 text-sm font-bold text-gray-400">
                        <span>Admin</span>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-gray-900 capitalize">{location.pathname.split('/').pop()}</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right mr-4">
                            <p className="text-sm font-black text-gray-900">System Administrator</p>
                            <p className="text-xs font-bold text-gray-400">admin@campuscrave.com</p>
                        </div>
                        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20">
                            A
                        </div>
                    </div>
                </header>

                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout
