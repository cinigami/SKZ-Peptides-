import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Menu, X, User, Search, Zap } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

const HeaderModern = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { itemCount } = useCart()
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Admin', href: '/admin' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="fixed top-0 left-0 right-0 z-50 nav-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white p-3 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300"
            >
              <Zap className="w-6 h-6" />
            </motion.div>
            <div>
              <span className="text-2xl font-black text-gradient">SKZ</span>
              <span className="text-xl font-light text-gray-700 ml-2">Peptides</span>
              <div className="text-xs text-gray-500 -mt-1">Research Peptides</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-6 py-3 text-sm font-medium transition-all duration-300 rounded-xl group ${
                  isActive(item.href)
                    ? 'text-primary-600 bg-primary-50 shadow-md'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-white/50'
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white rounded-xl shadow-lg border border-primary-200/50"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 text-gray-400 hover:text-gray-600 bg-white/50 hover:bg-white/80 backdrop-blur-sm rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Search className="w-5 h-5" />
            </motion.button>

            {/* Account */}
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 text-gray-400 hover:text-gray-600 bg-white/50 hover:bg-white/80 backdrop-blur-sm rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <User className="w-5 h-5" />
            </motion.button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Cart */}
            <Link to="/cart" className="relative group">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 text-gray-400 hover:text-gray-600 bg-white/50 hover:bg-white/80 backdrop-blur-sm rounded-xl transition-all duration-300 shadow-md hover:shadow-lg group-hover:shadow-xl"
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 text-gray-400 hover:text-gray-600 bg-white/50 hover:bg-white/80 backdrop-blur-sm rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 180 }}
                    exit={{ rotate: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: 180 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-6 border-t border-white/20">
                <nav className="space-y-2">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-6 py-4 text-base font-medium transition-all duration-300 rounded-xl mx-2 ${
                          isActive(item.href)
                            ? 'text-primary-600 bg-white shadow-md'
                            : 'text-gray-700 hover:text-primary-600 hover:bg-white/50'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                
                {/* Mobile Theme Toggle */}
                <div className="mt-6 px-6 pb-4">
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default HeaderModern