import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, ShoppingCart, Star, Clock, MapPin, X, Plus, Minus } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'

const StudentOrder = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  const [selectedFood, setSelectedFood] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [cartItems, setCartItems] = useState([])
  const [showCart, setShowCart] = useState(false)

  // Mock data - replace with API calls
  const vendors = [
    {
      id: 1,
      name: "Mama T's Kitchen",
      rating: 4.8,
      reviews: 324,
      deliveryTime: 15,
      image: '🍲',
      category: 'nigerian',
      foods: [
        { id: 101, name: 'Jollof Rice', price: 1200, description: 'Spiced rice with meat', image: '🍚' },
        { id: 102, name: 'Pepper Soup', price: 800, description: 'Hot pepper soup with beef', image: '🍲' },
        { id: 103, name: 'Pounded Yam', price: 1500, description: 'Smooth pounded yam with egusi soup', image: '🥣' },
      ]
    },
    {
      id: 2,
      name: "Babcock Buns",
      rating: 4.9,
      reviews: 512,
      deliveryTime: 10,
      image: '🥐',
      category: 'bakery',
      foods: [
        { id: 201, name: 'Croissants', price: 500, description: 'Buttery croissants', image: '🥐' },
        { id: 202, name: 'Bread Loaf', price: 800, description: 'Fresh bread loaf', image: '🍞' },
        { id: 203, name: 'Pastries Mix', price: 1000, description: 'Assorted pastries', image: '🧁' },
      ]
    },
    {
      id: 3,
      name: "Spicy Spot",
      rating: 4.7,
      reviews: 289,
      deliveryTime: 20,
      image: '🌶️',
      category: 'spicy',
      foods: [
        { id: 301, name: 'Spicy Fried Rice', price: 1500, description: 'Very spicy fried rice', image: '🍚' },
        { id: 302, name: 'Hot Wings', price: 1200, description: 'Crispy spicy chicken wings', image: '🍗' },
        { id: 303, name: 'Suya', price: 900, description: 'Grilled suya meat', image: '🍖' },
      ]
    },
    {
      id: 4,
      name: "Pasta Paradise",
      rating: 4.6,
      reviews: 198,
      deliveryTime: 18,
      image: '🍝',
      category: 'italian',
      foods: [
        { id: 401, name: 'Spaghetti Carbonara', price: 1800, description: 'Creamy carbonara pasta', image: '🍝' },
        { id: 402, name: 'Lasagna', price: 2000, description: 'Layered lasagna with sauce', image: '🍝' },
        { id: 403, name: 'Fettuccine', price: 1600, description: 'Fresh fettuccine pasta', image: '🍝' },
      ]
    },
    {
      id: 5,
      name: "Burger Haven",
      rating: 4.5,
      reviews: 156,
      deliveryTime: 12,
      image: '🍔',
      category: 'fast-food',
      foods: [
        { id: 501, name: 'Classic Burger', price: 1000, description: 'Beef burger with lettuce and tomato', image: '🍔' },
        { id: 502, name: 'Double Burger', price: 1300, description: 'Double patty burger', image: '🍔' },
        { id: 503, name: 'Chicken Burger', price: 950, description: 'Crispy chicken breast burger', image: '🍗' },
      ]
    },
    {
      id: 6,
      name: "Fresh Bowl",
      rating: 4.9,
      reviews: 402,
      deliveryTime: 15,
      image: '🥗',
      category: 'healthy',
      foods: [
        { id: 601, name: 'Caesar Salad', price: 1100, description: 'Fresh caesar salad with croutons', image: '🥗' },
        { id: 602, name: 'Grain Bowl', price: 1400, description: 'Quinoa and vegetable bowl', image: '🥗' },
        { id: 603, name: 'Smoothie Bowl', price: 1200, description: 'Acai bowl with fruits', image: '🍓' },
      ]
    },
  ]

  const categories = [
    { id: 'all', label: 'All', icon: '🏪' },
    { id: 'nigerian', label: 'Nigerian', icon: '🍲' },
    { id: 'bakery', label: 'Bakery', icon: '🥐' },
    { id: 'spicy', label: 'Spicy', icon: '🌶️' },
    { id: 'italian', label: 'Italian', icon: '🍝' },
    { id: 'fast-food', label: 'Fast Food', icon: '🍔' },
    { id: 'healthy', label: 'Healthy', icon: '🥗' },
  ]

  const sortOptions = [
    { id: 'popular', label: 'Most Popular' },
    { id: 'fastest', label: 'Fastest Delivery' },
    { id: 'rating', label: 'Highest Rating' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
  ]

  // Filter and sort vendors
  const filteredAndSortedVendors = useMemo(() => {
    let result = [...vendors]

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(v => v.category === selectedCategory)
    }

    // Filter by search
    if (searchQuery) {
      result = result.filter(v =>
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.foods.some(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Sort
    switch (sortBy) {
      case 'fastest':
        result.sort((a, b) => a.deliveryTime - b.deliveryTime)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'price-low':
        result.sort((a, b) => Math.min(...a.foods.map(f => f.price)) - Math.min(...b.foods.map(f => f.price)))
        break
      case 'price-high':
        result.sort((a, b) => Math.max(...b.foods.map(f => f.price)) - Math.max(...a.foods.map(f => f.price)))
        break
      case 'popular':
      default:
        result.sort((a, b) => b.reviews - a.reviews)
        break
    }

    return result
  }, [searchQuery, selectedCategory, sortBy])

  const handleAddToCart = (food, vendor) => {
    const existingItem = cartItems.find(item => item.foodId === food.id && item.vendorId === vendor.id)
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.foodId === food.id && item.vendorId === vendor.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ))
    } else {
      setCartItems([...cartItems, {
        foodId: food.id,
        vendorId: vendor.id,
        vendorName: vendor.name,
        foodName: food.name,
        price: food.price,
        quantity
      }])
    }
    setSelectedFood(null)
    setQuantity(1)
  }

  const handleRemoveFromCart = (foodId, vendorId) => {
    setCartItems(cartItems.filter(item => !(item.foodId === foodId && item.vendorId === vendorId)))
  }

  const handleUpdateQuantity = (foodId, vendorId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(foodId, vendorId)
    } else {
      setCartItems(cartItems.map(item =>
        item.foodId === foodId && item.vendorId === vendorId
          ? { ...item, quantity: newQuantity }
          : item
      ))
    }
  }

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const deliveryFee = 500
  const grandTotal = cartTotal + (cartItems.length > 0 ? deliveryFee : 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 font-sans">
            Order <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Food</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Browse your favorite vendors and get food delivered straight to your room.
          </p>
        </motion.div>

        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search vendors or food..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/40 backdrop-blur-lg border border-white/30 rounded-2xl text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
            </motion.div>

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mb-8"
            >
              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Category</h3>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {categories.map(cat => (
                    <motion.button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-5 py-3 rounded-full font-semibold whitespace-nowrap transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-primary text-white shadow-lg'
                          : 'bg-white/20 backdrop-blur-lg border border-white/30 text-gray-900 hover:border-white/50'
                      }`}
                    >
                      <span className="mr-2">{cat.icon}</span>
                      {cat.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Sort Filter */}
              <div className="flex items-center gap-4">
                <Filter className="w-5 h-5 text-gray-600" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-5 py-3 bg-white/40 backdrop-blur-lg border border-white/30 rounded-2xl text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  {sortOptions.map(opt => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </motion.div>

            {/* Results Count */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-600 mb-6 font-sans"
            >
              Showing {filteredAndSortedVendors.length} vendor{filteredAndSortedVendors.length !== 1 ? 's' : ''}
            </motion.p>

            {/* Vendors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedVendors.map((vendor, index) => (
                <motion.div
                  key={vendor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="group cursor-pointer hover:-translate-y-2 h-full flex flex-col">
                    {/* Vendor Header */}
                    <div className="mb-4">
                      <div className="text-6xl mb-4">{vendor.image}</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                        {vendor.name}
                      </h3>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(vendor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="font-bold text-gray-900">{vendor.rating}</span>
                        <span className="text-sm text-gray-600">({vendor.reviews})</span>
                      </div>

                      {/* Delivery Info */}
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{vendor.deliveryTime} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>Your Room</span>
                        </div>
                      </div>
                    </div>

                    {/* Foods List */}
                    <div className="flex-1 mb-6">
                      <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Available Foods</h4>
                      <div className="space-y-2">
                        {vendor.foods.map(food => (
                          <motion.button
                            key={food.id}
                            onClick={() => setSelectedFood({ ...food, vendor })}
                            whileHover={{ x: 4 }}
                            className="w-full text-left p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-all"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="font-semibold text-gray-900 flex items-center gap-2">
                                  <span>{food.image}</span>
                                  {food.name}
                                </div>
                                <p className="text-xs text-gray-600 mt-1">{food.description}</p>
                              </div>
                              <span className="font-bold text-primary whitespace-nowrap ml-2">₦{food.price}</span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* View More Button */}
                    <Button
                      className="w-full bg-white/30 hover:bg-white/40 text-gray-900 border border-white/30"
                    >
                      View Menu
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredAndSortedVendors.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-2xl text-gray-600 mb-4">No vendors found</p>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </motion.div>
            )}
          </div>

          {/* Cart Sidebar - Desktop */}
          {cartItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden lg:block w-96"
            >
              <Card className="sticky top-32 bg-white/40 backdrop-blur-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <ShoppingCart className="w-6 h-6" />
                  Your Order
                </h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {cartItems.map(item => (
                    <motion.div
                      key={`${item.vendorId}-${item.foodId}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 bg-white/30 rounded-xl"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-xs text-gray-600 font-semibold">{item.vendorName}</p>
                          <p className="font-semibold text-gray-900">{item.foodName}</p>
                          <p className="text-sm text-primary font-bold">₦{item.price}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveFromCart(item.foodId, item.vendorId)}
                          className="text-gray-600 hover:text-red-500 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between bg-white/30 rounded-lg p-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.foodId, item.vendorId, item.quantity - 1)}
                          className="p-1 hover:bg-white/30 rounded transition-all"
                        >
                          <Minus className="w-4 h-4 text-gray-900" />
                        </button>
                        <span className="font-semibold text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.foodId, item.vendorId, item.quantity + 1)}
                          className="p-1 hover:bg-white/30 rounded transition-all"
                        >
                          <Plus className="w-4 h-4 text-gray-900" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Cart Summary */}
                <div className="space-y-3 border-t border-white/30 pt-6">
                  <div className="flex justify-between text-gray-900">
                    <span>Subtotal</span>
                    <span className="font-bold">₦{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-900">
                    <span>Delivery</span>
                    <span className="font-bold">₦{deliveryFee}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900 bg-white/20 p-3 rounded-xl">
                    <span>Total</span>
                    <span>₦{grandTotal}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button className="w-full mt-6 bg-gradient-to-r from-primary to-accent text-white">
                  Proceed to Checkout
                </Button>
              </Card>
            </motion.div>
          )}
        </div>
      </div>

      {/* Floating Cart Button - Mobile */}
      <AnimatePresence>
        {cartItems.length > 0 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => setShowCart(!showCart)}
            className="fixed bottom-6 right-6 lg:hidden w-16 h-16 bg-gradient-to-r from-primary to-accent text-white rounded-full shadow-2xl flex items-center justify-center font-bold text-lg z-40 hover:scale-110 transition-transform"
          >
            {cartItems.length}
            <ShoppingCart className="w-6 h-6 ml-2" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Cart Modal */}
      <AnimatePresence>
        {showCart && cartItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setShowCart(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-96 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Your Order</h2>
                <button onClick={() => setShowCart(false)} className="text-gray-600 hover:text-gray-900">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <div key={`${item.vendorId}-${item.foodId}`} className="p-4 bg-gray-100 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-xs text-gray-600 font-semibold">{item.vendorName}</p>
                        <p className="font-semibold text-gray-900">{item.foodName}</p>
                        <p className="text-sm text-primary font-bold">₦{item.price}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(item.foodId, item.vendorId)}
                        className="text-gray-600 hover:text-red-500"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between bg-white rounded-lg p-2">
                      <button onClick={() => handleUpdateQuantity(item.foodId, item.vendorId, item.quantity - 1)} className="p-1">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button onClick={() => handleUpdateQuantity(item.foodId, item.vendorId, item.quantity + 1)} className="p-1">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="space-y-3 border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-gray-900">
                  <span>Subtotal</span>
                  <span className="font-bold">₦{cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-900">
                  <span>Delivery</span>
                  <span className="font-bold">₦{deliveryFee}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 bg-gray-100 p-3 rounded-xl">
                  <span>Total</span>
                  <span>₦{grandTotal}</span>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-primary to-accent text-white">
                Proceed to Checkout
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Food Detail Modal */}
      <AnimatePresence>
        {selectedFood && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedFood(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-md w-full"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-4xl">{selectedFood.image}</h2>
                <button onClick={() => setSelectedFood(null)} className="text-gray-600 hover:text-gray-900">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-2">{selectedFood.name}</h3>
              <p className="text-gray-600 mb-2">{selectedFood.description}</p>
              <p className="text-gray-600 text-sm mb-6">from <span className="font-bold">{selectedFood.vendor.name}</span></p>

              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 mb-6">
                <p className="text-gray-600 text-sm mb-2">Price</p>
                <p className="text-4xl font-bold text-primary">₦{selectedFood.price}</p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <p className="text-gray-900 font-semibold mb-3">Quantity</p>
                <div className="flex items-center justify-center gap-4 bg-white/40 backdrop-blur-lg border border-white/30 rounded-2xl p-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-white/30 rounded-lg transition-all"
                  >
                    <Minus className="w-6 h-6 text-gray-900" />
                  </button>
                  <span className="text-3xl font-bold text-gray-900 w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-white/30 rounded-lg transition-all"
                  >
                    <Plus className="w-6 h-6 text-gray-900" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={() => handleAddToCart(selectedFood, selectedFood.vendor)}
                className="w-full bg-gradient-to-r from-primary to-accent text-white mb-3"
              >
                Add to Cart (₦{selectedFood.price * quantity})
              </Button>

              <button
                onClick={() => setSelectedFood(null)}
                className="w-full py-3 text-gray-900 font-semibold hover:bg-gray-100 rounded-xl transition-colors"
              >
                Continue Shopping
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default StudentOrder
