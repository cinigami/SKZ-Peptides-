import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { motion } from 'framer-motion'

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart()

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-lg text-gray-600 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/products" className="btn-primary">
            Shop Products
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    )
  }

  const formatPrice = (price) => `MYR ${price.toFixed(2)}`
  const freeShippingThreshold = 100
  const baseShippingFee = 8
  const shippingFee = cartTotal >= freeShippingThreshold ? 0 : baseShippingFee
  const totalWithShipping = cartTotal + shippingFee

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-lg text-gray-600">
            {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Cart Items</h2>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                    >
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = `https://via.placeholder.com/64x64/f3f4f6/9ca3af?text=${encodeURIComponent(item.name.charAt(0))}`
                          }}
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <Link
                          to={`/product/${item.id}`}
                          className="text-lg font-semibold text-gray-900 hover:text-primary-600"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-600">{item.category}</p>
                        <p className="text-sm text-gray-500">{item.dosage}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatPrice(item.price)} each
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-400 hover:text-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shippingFee === 0 ? "text-green-600 font-medium" : ""}>
                    {shippingFee === 0 ? "FREE!" : formatPrice(shippingFee)}
                  </span>
                </div>
                
                {/* Free Shipping Promotion */}
                {cartTotal < freeShippingThreshold && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2">
                    <div className="flex items-center">
                      <div className="text-sm text-blue-800">
                        <span className="font-medium">
                          Add {formatPrice(freeShippingThreshold - cartTotal)} more for FREE shipping!
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                
                {cartTotal >= freeShippingThreshold && shippingFee === 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-2">
                    <div className="flex items-center">
                      <div className="text-sm text-green-800">
                        <span className="font-medium">🎉 You qualify for FREE shipping!</span>
                      </div>
                    </div>
                  </div>
                )}


                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>{formatPrice(totalWithShipping)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="w-full btn-primary flex items-center justify-center"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>

              {/* Continue Shopping */}
              <Link
                to="/products"
                className="w-full mt-3 btn-secondary flex items-center justify-center"
              >
                Continue Shopping
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600 text-center">
                  <p className="mb-2">✅ Secure checkout</p>
                  <p className="mb-2">🚚 Fast shipping</p>
                  <p>💰 Money-back guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recently Viewed or Recommendations */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-gray-600 text-center">
              Recommended products will appear here based on your cart items.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart