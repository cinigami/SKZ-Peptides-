import { Link } from 'react-router-dom'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { buildCartMessage, openWhatsApp } from '../utils/whatsapp'

const Checkout = () => {
  const { cart, cartTotal } = useCart()

  const formatPrice = (price) => `MYR ${price.toFixed(2)}`

  const freeShippingThreshold = 100
  const baseShippingFee = 8
  const shippingFee = cartTotal >= freeShippingThreshold ? 0 : baseShippingFee
  const totalWithShipping = cartTotal + shippingFee

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-lg text-gray-600 mb-8">
            You need items in your cart to checkout.
          </p>
          <Link to="/products" className="btn-primary">
            Shop Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/cart" className="flex items-center text-primary-600 hover:text-primary-700 mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Order via WhatsApp</h1>
        </div>

        {/* Cart Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-3 mb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <span className="font-medium text-gray-900">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t border-gray-200 pt-4">
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
            <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
              <span>Total</span>
              <span>{formatPrice(totalWithShipping)}</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">How it works</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Click below to send your order via WhatsApp. We will confirm stock and send you a payment link.
          </p>
        </div>

        {/* WhatsApp Button */}
        <button
          onClick={() => openWhatsApp(buildCartMessage(cart, totalWithShipping))}
          className="w-full flex items-center justify-center py-4 px-6 rounded-xl font-semibold text-white text-lg transition-colors hover:opacity-90"
          style={{ backgroundColor: '#25D366' }}
        >
          <MessageCircle className="w-6 h-6 mr-3" />
          Order via WhatsApp
        </button>
      </div>
    </div>
  )
}

export default Checkout
