import { Link } from 'react-router-dom'
import { ShoppingCart, Eye } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { motion } from 'framer-motion'
import { buildWhatsAppUrl } from '../utils/whatsapp'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const isOutOfStock = product.inStock <= 0
  const isLowStock = product.inStock > 0 && product.inStock <= 3

  const handleAddToCart = (e) => {
    e.preventDefault()
    if (isOutOfStock) {
      // Redirect to WhatsApp for interest registration
      const message = `Hi! I'm interested in ${product.name} (${formatPrice(product.price)}). Please notify me when it's back in stock.`
      const whatsappUrl = buildWhatsAppUrl(message)
      window.open(whatsappUrl, '_blank')
    } else {
      addToCart(product, 1)
    }
  }

  const formatPrice = (price) => `MYR ${price.toFixed(2)}`

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card group cursor-pointer overflow-hidden bg-white dark:bg-slate-800 border dark:border-purple-500/10 dark:hover:border-purple-500/30 transition-colors"
    >
      <Link to={`/product/${product.id}`}>
        {/* Product Image */}
        <div className="relative mb-4 bg-gray-100 dark:bg-slate-700 rounded-lg h-48 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className={`object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ${isOutOfStock ? 'grayscale' : ''}`}
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/300x200/f3f4f6/9ca3af?text=${encodeURIComponent(product.name)}`
            }}
          />
          
          {/* Out of Stock overlay */}
          {isOutOfStock ? (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-lg">OUT OF STOCK</span>
            </div>
          ) : (
            /* Hover overlay */
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Eye className="w-8 h-8 text-white" />
            </div>
          )}
          
          {/* Low Stock badge */}
          {isLowStock && (
            <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md">
              Low Stock
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="mb-3">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            {/* Category badge */}
            <span className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 dark:bg-purple-600/20 dark:text-purple-400 rounded">
              {product.category}
            </span>

            {/* Free Essential Kit - only for peptides, not supplies */}
            {product.category !== 'Supplies' && (
              <span 
                className="inline-block text-[10px] font-medium px-2 py-1 rounded text-center"
                style={{
                  background: 'rgba(34, 197, 94, 0.15)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  color: '#22C55E'
                }}
              >
                Free essential kit
              </span>
            )}
          </div>
        </div>



        {/* Pricing */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xl font-bold text-gray-900 dark:text-purple-400">
              {formatPrice(product.price)}
            </span>
            {product.dosage && <p className="text-xs text-gray-500">{product.dosage}</p>}
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium transition-colors ${isOutOfStock ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'btn-primary hover:bg-primary-700'}`}
      >
        <ShoppingCart className="w-4 h-4" />
        <span>{isOutOfStock ? 'Register your interest' : 'Add to Cart'}</span>
      </button>
    </motion.div>
  )
}

export default ProductCard