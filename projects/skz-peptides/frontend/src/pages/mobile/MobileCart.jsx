import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext'

const MobileCart = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, itemCount } = useCart()

  const formatPrice = (price) => `MYR ${price.toFixed(2)}`

  if (itemCount === 0) {
    return (
      <div className="lg:hidden min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
        {/* Header */}
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
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center px-4 py-16">
          <div className="text-gray-400 dark:text-gray-600 mb-4">
            <ShoppingBag className="w-24 h-24 mx-auto mb-4" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-8 max-w-sm">
            Looks like you haven't added any peptides to your cart yet. Start shopping to fill it up!
          </p>
          <Link
            to="/products"
            className="bg-primary-600 dark:bg-purple-600 hover:bg-primary-700 dark:hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="lg:hidden min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/products"
            className="inline-flex items-center text-primary-600 dark:text-purple-400"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">Continue Shopping</span>
          </Link>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">
            Cart ({itemCount})
          </h1>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Cart Items */}
      <div className="px-4 py-6 space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex space-x-4">
              {/* Product Image */}
              <div className="flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg bg-gray-100 dark:bg-gray-700"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/80x80/f3f4f6/9ca3af?text=${encodeURIComponent(item.name.slice(0, 2))}`
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <Link 
                  to={`/product/${item.id}`}
                  className="block"
                >
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1 truncate">
                    {item.name}
                  </h3>
                </Link>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {item.category}
                </p>

                {/* Quantity and Price */}
                <div className="flex items-center justify-between">
                  {/* Quantity Controls */}
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-1 text-gray-900 dark:text-white font-medium min-w-[3rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Price and Remove */}
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 mt-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary - Fixed at bottom */}
      <div className="fixed bottom-16 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-4">
        {/* Subtotal */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-medium text-gray-900 dark:text-white">
            Subtotal ({itemCount} items)
          </span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {formatPrice(getCartTotal())}
          </span>
        </div>

        {/* Checkout Button */}
        <Link
          to="/checkout"
          className="block w-full bg-primary-600 dark:bg-purple-600 hover:bg-primary-700 dark:hover:bg-purple-700 text-white text-center font-semibold py-4 rounded-xl transition-colors"
        >
          Proceed to Checkout
        </Link>

        {/* Continue Shopping Link */}
        <Link
          to="/products"
          className="block text-center text-primary-600 dark:text-purple-400 font-medium mt-3 py-2"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default MobileCart