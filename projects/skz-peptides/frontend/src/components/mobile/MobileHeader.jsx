import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Menu, X, Search, Home, Package, Info } from 'lucide-react'
import { useCart } from '../../context/CartContext'

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
      {/* Mobile Header */}
      <header className="lg:hidden bg-white dark:bg-gray-900 shadow-sm border-b sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-primary-600 dark:bg-purple-600 text-white p-2 rounded-lg font-bold text-sm">
                SKZ
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">Peptides</span>
            </Link>

            {/* Right side controls */}
            <div className="flex items-center space-x-3">
              {/* Search Button */}
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white">
                <Search className="w-5 h-5" />
              </button>

              {/* Cart */}
              <Link to="/cart" className="relative p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white">
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-600 dark:bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMenuOpen(false)}>
            <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b shadow-lg">
              <div className="px-4 py-4 space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                        isActive(item.href)
                          ? 'bg-primary-50 dark:bg-purple-900/20 text-primary-600 dark:text-purple-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50">
        <div className="flex items-center justify-around py-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.name}
                to={item.href}
                style={{ 
                  color: active ? '#A78BFA' : '#6B7280',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '8px 12px',
                  minWidth: '0',
                  flex: '1'
                }}
              >
                <Icon className={`w-5 h-5 mb-1 ${active ? 'scale-110' : ''} transition-transform`} />
                <span 
                  className="text-xs font-medium"
                  style={{ color: active ? '#A78BFA' : '#6B7280' }}
                >
                  {item.name}
                </span>
              </Link>
            )
          })}
          
          {/* Cart in bottom nav */}
          <Link
            to="/cart"
            style={{ 
              color: location.pathname === '/cart' ? '#A78BFA' : '#6B7280',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '8px 12px',
              minWidth: '0',
              flex: '1',
              position: 'relative'
            }}
          >
            <div className="relative">
              <ShoppingCart className={`w-5 h-5 mb-1 ${location.pathname === '/cart' ? 'scale-110' : ''} transition-transform`} />
              {itemCount > 0 && (
                <span 
                  className="absolute -top-2 -right-2 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold text-[10px]"
                  style={{ backgroundColor: '#A78BFA' }}
                >
                  {itemCount}
                </span>
              )}
            </div>
            <span 
              className="text-xs font-medium"
              style={{ color: location.pathname === '/cart' ? '#A78BFA' : '#6B7280' }}
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