import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../../context/CartContext'

const MobileProductCard = ({ product }) => {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
  }

  const formatPrice = (price) => `MYR ${price.toFixed(2)}`

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        {/* Product Image - aspect-ratio based */}
        <div className="relative bg-gray-100 dark:bg-gray-700" style={{ aspectRatio: '1 / 1' }}>
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/300x300/f3f4f6/9ca3af?text=${encodeURIComponent(product.name)}`
            }}
          />
          {/* Category badge overlay */}
          <span
            className="absolute top-2 left-2 inline-block"
            style={{
              background: 'rgba(0, 0, 0, 0.55)',
              backdropFilter: 'blur(4px)',
              color: '#FFFFFF',
              padding: '2px 8px',
              borderRadius: '6px',
              fontSize: '0.65rem',
              fontWeight: '500'
            }}
          >
            {product.category}
          </span>
        </div>

        {/* Product Info - tight padding */}
        <div className="p-3">
          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1 mb-1">
            {product.name}
          </h3>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {formatPrice(product.price)}
            </span>

            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center rounded-lg font-medium transition-colors text-white"
              style={{
                backgroundColor: '#7C3AED',
                minWidth: '44px',
                minHeight: '44px'
              }}
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MobileProductCard
