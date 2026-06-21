import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Menu, X, Search, Home, Package, Info, Calculator } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { motion, AnimatePresence } from 'framer-motion'

const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { itemCount } = useCart()
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Products', href: '/products', icon: Package },
    { name: 'Calc', href: '/calculator', icon: Calculator },
    { name: 'About', href: '/about', icon: Info },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Mobile Header - Frosted Glass */}
      <header
        className="lg:hidden sticky top-0 z-50 border-b border-white/10 dark:border-gray-800 bg-white/80 dark:bg-black/90 backdrop-blur-xl"
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
              <Link to="/calculator" className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white flex items-center justify-center" style={{ minWidth: '44px', minHeight: '44px' }}>
                <Calculator className="w-5 h-5" />
              </Link>

              <Link to="/cart" className="relative p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white flex items-center justify-center" style={{ minWidth: '44px', minHeight: '44px' }}>
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold" style={{ backgroundColor: '#7C3AED' }}>
                    {itemCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white flex items-center justify-center"
                style={{ minWidth: '44px', minHeight: '44px' }}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

      </header>

      {/* Mobile Menu - Full Screen (OUTSIDE header for z-index) */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 overflow-y-auto"
          style={{ background: '#0d1117', zIndex: 99999 }}
        >
              <div className="p-5 flex items-center justify-between border-b border-white/10">
                <span className="text-white font-bold text-xl">Menu</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-white flex items-center justify-center"
                  style={{ minWidth: '44px', minHeight: '44px' }}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="px-5 py-6 space-y-2">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl"
                  style={isActive('/') ? { backgroundColor: '#7C3AED', color: '#FFFFFF' } : { color: '#E5E7EB' }}
                >
                  <Home className="w-6 h-6" />
                  <span className="font-semibold text-lg">Home</span>
                </Link>
                <Link
                  to="/products"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl"
                  style={isActive('/products') ? { backgroundColor: '#7C3AED', color: '#FFFFFF' } : { color: '#E5E7EB' }}
                >
                  <Package className="w-6 h-6" />
                  <span className="font-semibold text-lg">Products</span>
                </Link>
                <Link
                  to="/calculator"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl"
                  style={isActive('/calculator') ? { backgroundColor: '#7C3AED', color: '#FFFFFF' } : { color: '#E5E7EB' }}
                >
                  <Calculator className="w-6 h-6" />
                  <span className="font-semibold text-lg">Calculator</span>
                </Link>
                <Link
                  to="/protocols"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl"
                  style={isActive('/protocols') ? { backgroundColor: '#7C3AED', color: '#FFFFFF' } : { color: '#E5E7EB' }}
                >
                  <Info className="w-6 h-6" />
                  <span className="font-semibold text-lg">Protocols</span>
                </Link>
                <Link
                  to="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl"
                  style={isActive('/about') ? { backgroundColor: '#7C3AED', color: '#FFFFFF' } : { color: '#E5E7EB' }}
                >
                  <Info className="w-6 h-6" />
                  <span className="font-semibold text-lg">About</span>
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl"
                  style={isActive('/cart') ? { backgroundColor: '#7C3AED', color: '#FFFFFF' } : { color: '#E5E7EB' }}
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span className="font-semibold text-lg">Cart</span>
                </Link>
              </div>
          </div>
        )}

      {/* Mobile Bottom Navigation - Frosted Glass */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 dark:border-gray-800 bg-white/85 dark:bg-black/90 backdrop-blur-xl"
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
