import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, MessageCircle } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { motion, AnimatePresence } from 'framer-motion'
import { buildCartMessage, openWhatsApp } from '../../utils/whatsapp'

const MobileCart = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, itemCount } = useCart()

  const formatPrice = (price) => `MYR ${price.toFixed(2)}`

  if (itemCount === 0) {
    return (
      <div className="lg:hidden min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/products"
              className="inline-flex items-center text-primary-600 dark:text-purple-400"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Continue Shopping</span>
            </Link>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Cart</h1>
            <div className="w-24"></div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center px-4 py-16">
          <ShoppingBag className="w-20 h-20 text-gray-300 dark:text-gray-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-8 max-w-sm text-sm">
            Start shopping to fill it up!
          </p>
          <Link
            to="/products"
            className="text-white font-semibold py-3 px-8 rounded-xl transition-colors"
            style={{ backgroundColor: '#7C3AED' }}
          >
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="lg:hidden min-h-screen bg-gray-50 dark:bg-gray-900 pb-44">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/products"
            className="inline-flex items-center text-primary-600 dark:text-purple-400"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">Shop</span>
          </Link>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">
            Cart ({itemCount})
          </h1>
          <div className="w-16"></div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="px-4 py-4 space-y-3">
        <AnimatePresence>
          {cart.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, x: -100 }}
              transition={{ duration: 0.25 }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3"
            >
              <div className="flex space-x-3">
                <div className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-18 h-18 object-cover rounded-lg bg-gray-100 dark:bg-gray-700"
                    style={{ width: '72px', height: '72px' }}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/72x72/f3f4f6/9ca3af?text=${encodeURIComponent(item.name.slice(0, 2))}`
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`} className="block">
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                      {item.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    {item.category}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="flex items-center justify-center text-gray-500 dark:text-gray-400"
                        style={{ minWidth: '36px', minHeight: '36px' }}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-gray-900 dark:text-white font-medium text-sm min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex items-center justify-center text-gray-500 dark:text-gray-400"
                        style={{ minWidth: '36px', minHeight: '36px' }}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center space-x-3">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center justify-center text-red-500 dark:text-red-400"
                        style={{ minWidth: '36px', minHeight: '36px' }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Order Summary - Fixed at bottom */}
      <div
        className="fixed bottom-16 left-0 right-0 border-t px-4 py-3"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderColor: 'rgba(0,0,0,0.08)'
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Subtotal ({itemCount} items)
          </span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {formatPrice(getCartTotal())}
          </span>
        </div>

        <button
          onClick={() => openWhatsApp(buildCartMessage(cart, getCartTotal()))}
          className="flex items-center justify-center w-full text-white text-center font-semibold py-3.5 rounded-xl transition-colors"
          style={{ backgroundColor: '#25D366' }}
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Order via WhatsApp
        </button>

        <Link
          to="/products"
          className="block text-center font-medium mt-2 py-2 text-sm"
          style={{ color: '#7C3AED' }}
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default MobileCart
