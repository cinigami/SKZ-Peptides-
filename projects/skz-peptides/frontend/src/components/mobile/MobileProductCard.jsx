import { Link } from 'react-router-dom'
import { ShoppingCart, Package } from 'lucide-react'
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
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
        {/* Product Image */}
        <div className="relative bg-gray-100 dark:bg-gray-700 h-48 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/300x200/f3f4f6/9ca3af?text=${encodeURIComponent(product.name)}`
            }}
          />
          

        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category badge */}
          <span 
            className="inline-block mb-2"
            style={{
              background: 'rgba(167, 139, 250, 0.12)',
              border: '1px solid rgba(167, 139, 250, 0.3)',
              color: '#A78BFA',
              padding: '4px 12px',
              borderRadius: '99px',
              fontSize: '0.75rem',
              fontWeight: '500'
            }}
          >
            {product.category}
          </span>

          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-base line-clamp-1">
            {product.name}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {product.description}
          </p>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              {product.dosage && (
                <span className="text-xs text-gray-500 dark:text-gray-400">{product.dosage}</span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.inStock === 0}
              className={`p-2 rounded-lg font-medium transition-colors ${
                product.inStock > 0
                  ? 'bg-primary-600 dark:bg-purple-600 hover:bg-primary-700 dark:hover:bg-purple-700 text-white'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MobileProductCard