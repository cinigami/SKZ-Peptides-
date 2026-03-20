import { Link } from 'react-router-dom'
import { ShoppingCart, Eye } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { motion } from 'framer-motion'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product, 1)
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
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/300x200/f3f4f6/9ca3af?text=${encodeURIComponent(product.name)}`
            }}
          />
          
          {/* Stock badge */}
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 text-xs font-medium rounded ${
              product.inStock > 10 
                ? 'bg-green-100 text-green-800 dark:bg-purple-100 dark:bg-opacity-15 dark:text-purple-400' 
                : product.inStock > 0 
                ? 'bg-yellow-100 text-yellow-800 dark:bg-purple-100 dark:bg-opacity-15 dark:text-purple-400' 
                : 'bg-red-100 text-red-800'
            }`}>
              {product.inStock > 0 ? `${product.inStock} in stock` : 'Out of stock'}
            </span>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Eye className="w-8 h-8 text-white" />
          </div>
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
                className="inline-block text-[8px] font-medium leading-tight px-1.5 py-1 rounded text-center"
                style={{
                  background: 'rgba(34, 197, 94, 0.15)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  color: '#22C55E'
                }}
              >
                FREE<br/>ESSENTIAL<br/>KIT
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
            <p className="text-xs text-gray-500">{product.dosage}</p>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={product.inStock === 0}
        className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium transition-colors ${
          product.inStock > 0
            ? 'btn-primary hover:bg-primary-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        <ShoppingCart className="w-4 h-4" />
        <span>{product.inStock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
      </button>
    </motion.div>
  )
}

export default ProductCard