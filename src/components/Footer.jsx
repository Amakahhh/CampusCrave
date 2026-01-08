import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Mail, Shield, Github, Twitter } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const links = [
    {
      category: 'Platform',
      items: [
        { label: 'Order Food', href: '/student/dashboard' },
        { label: 'Become a Waiter', href: '/waiter/signup' },
        { label: 'How It Works', href: '#howitworks' },
        { label: 'For Vendors', href: '#vendors' },
      ],
    },
    {
      category: 'Company',
      items: [
        { label: 'About Us', href: '#about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      category: 'Legal',
      items: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'Safety', href: '/safety' },
      ],
    },
  ]

  const socialLinks = [
    { icon: Twitter, label: 'Twitter', href: '#twitter', color: 'hover:text-blue-400' },
    { icon: Github, label: 'GitHub', href: '#github', color: 'hover:text-gray-700' },
    { icon: Mail, label: 'Email', href: 'mailto:hello@campuscrave.com', color: 'hover:text-red-500' },
  ]

  return (
    <footer className="relative z-10 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gray-200/20 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-black text-gray-900 font-sans mb-2">
                CampusCrave
              </h3>
              <p className="text-gray-600 text-sm font-sans">
                Food delivery by students, for students. Campus dining made easy.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.2, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center text-gray-700 transition-all duration-300 hover:bg-primary/30 border border-white/30 hover:border-white/50 ${social.color} group`}
                    title={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Links Sections */}
          {links.map((section, index) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-5 font-sans">
                {section.category}
              </h4>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-gray-600 hover:text-primary transition-colors duration-300 text-sm font-sans group relative"
                    >
                      <span className="relative">
                        {item.label}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-12"></div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-gray-600 text-sm font-sans flex items-center justify-center md:justify-start gap-2">
              CampusCrave © {currentYear}. Made with{' '}
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
                className="inline-block"
              >
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              </motion.span>{' '}
              for Babcock.
            </p>
          </div>

          {/* Admin Links */}
          <div className="flex items-center gap-4 md:gap-6">
            <a
              href="/admin/login"
              className="text-sm text-gray-600 hover:text-primary transition-colors font-sans font-bold group relative"
            >
              <span className="relative">
                Login as Admin
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </span>
            </a>

            <span className="hidden md:block text-gray-200">|</span>

            <a
              href="/privacy"
              className="text-sm text-gray-600 hover:text-primary transition-colors font-sans font-bold group relative"
            >
              <span className="relative">
                Privacy
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </span>
            </a>
          </div>
        </motion.div>

        {/* Security Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg border border-white/30 rounded-full px-6 py-3 font-sans">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm text-gray-700">
              Secure payments via <span className="font-bold">Paystack</span>
            </span>
          </div>
        </motion.div>

        {/* Floating Elements - Decorative */}
        <div className="fixed bottom-10 right-10 pointer-events-none hidden xl:block">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-4xl opacity-10"
          >
            🍕
          </motion.div>
        </div>

        <div className="fixed bottom-32 left-10 pointer-events-none hidden xl:block">
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-4xl opacity-10"
          >
            🥤
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
