import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Menu, X, Search, Home, Package, Info } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { motion, AnimatePresence } from 'framer-motion'

const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { itemCount } = useCart()
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Products', href: '/products', icon: Package },
    { name: 'About', href: '/about', icon: Info },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Mobile Header - Frosted Glass */}
      <header
        className="lg:hidden sticky top-0 z-50 border-b border-white/10"
        style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
      >
        <div className="px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-white p-2 rounded-lg font-bold text-sm" style={{ backgroundColor: '#7C3AED' }}>
                SKZ
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">Peptides</span>
            </Link>

            {/* Right side controls */}
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white" style={{ minWidth: '44px', minHeight: '44px' }}>
                <Search className="w-5 h-5" />
              </button>

              <Link to="/cart" className="relative p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white" style={{ minWidth: '44px', minHeight: '44px' }}>
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold" style={{ backgroundColor: '#7C3AED' }}>
                    {itemCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white"
                style={{ minWidth: '44px', minHeight: '44px' }}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Animated slide from right */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setIsMenuOpen(false)}
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed top-0 right-0 bottom-0 w-72 z-50 border-l border-white/10"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)'
                }}
              >
                <div className="p-4 flex justify-end">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                    style={{ minWidth: '44px', minHeight: '44px' }}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="px-4 space-y-1">
                  {navigation.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 }}
                      >
                        <Link
                          to={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center space-x-3 px-4 py-4 rounded-xl transition-colors ${
                            isActive(item.href)
                              ? 'text-white'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                          style={isActive(item.href) ? { backgroundColor: '#7C3AED' } : {}}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium text-base">{item.name}</span>
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Bottom Navigation - Frosted Glass */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-white/10"
        style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
      >
        <div className="flex items-center justify-around py-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.name}
                to={item.href}
                style={{
                  color: active ? '#7C3AED' : '#6B7280',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '8px 12px',
                  minWidth: '44px',
                  minHeight: '44px',
                  flex: '1'
                }}
              >
                <Icon className={`w-5 h-5 mb-1 ${active ? 'scale-110' : ''} transition-transform`} />
                <span
                  className={`text-xs ${active ? 'font-bold' : 'font-medium'}`}
                  style={{ color: active ? '#7C3AED' : '#6B7280' }}
                >
                  {item.name}
                </span>
              </Link>
            )
          })}

          <Link
            to="/cart"
            style={{
              color: location.pathname === '/cart' ? '#7C3AED' : '#6B7280',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '8px 12px',
              minWidth: '44px',
              minHeight: '44px',
              flex: '1',
              position: 'relative'
            }}
          >
            <div className="relative">
              <ShoppingCart className={`w-5 h-5 mb-1 ${location.pathname === '/cart' ? 'scale-110' : ''} transition-transform`} />
              {itemCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold text-[10px]"
                  style={{ backgroundColor: '#7C3AED' }}
                >
                  {itemCount}
                </span>
              )}
            </div>
            <span
              className={`text-xs ${location.pathname === '/cart' ? 'font-bold' : 'font-medium'}`}
              style={{ color: location.pathname === '/cart' ? '#7C3AED' : '#6B7280' }}
            >
              Cart
            </span>
          </Link>
        </div>
      </nav>
    </>
  )
}

export default MobileHeader
