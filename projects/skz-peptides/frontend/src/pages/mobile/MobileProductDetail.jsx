import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Plus, Minus, ShoppingCart, Shield, Truck, Download, FileText } from 'lucide-react'
import { products } from '../../data/products'
import { useCart } from '../../context/CartContext'

const MobileProductDetail = () => {
  const { id } = useParams()
  const product = products.find(p => p.id === id)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const { addToCart } = useCart()

  if (!product) {
    return (
      <div className="lg:hidden min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Product Not Found</h1>
          <Link
            to="/products"
            className="inline-flex items-center bg-primary-600 dark:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  const formatPrice = (price) => `MYR ${price.toFixed(2)}`

  const tabs = [
    { id: 'description', name: 'Description' },
    { id: 'benefits', name: 'Benefits' },
    { id: 'protocol', name: 'Protocol' },
    { id: 'usage', name: 'Usage' },
  ]

  return (
    <div className="lg:hidden min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
        <Link
          to="/products"
          className="inline-flex items-center text-primary-600 dark:text-purple-400 mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-medium">Back to Products</span>
        </Link>
      </div>

      {/* Product Image */}
      <div className="bg-white dark:bg-gray-800">
        <div className="aspect-square bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=${encodeURIComponent(product.name)}`
            }}
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="bg-white dark:bg-gray-800 px-4 py-6">
        {/* Category Badge */}
        <span className="inline-block px-3 py-1 text-sm font-medium bg-primary-100 text-primary-800 dark:bg-purple-900/20 dark:text-purple-400 rounded-full mb-3">
          {product.category}
        </span>

        {/* Product Name */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {product.name}
        </h1>



        {/* Price */}
        <div className="mb-6">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {formatPrice(product.price)}
          </span>
          {product.dosage && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{product.dosage}</p>
          )}
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quantity:</span>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 text-gray-900 dark:text-white font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.inStock === 0}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-colors ${
            product.inStock > 0
              ? 'bg-primary-600 dark:bg-purple-600 hover:bg-primary-700 dark:hover:bg-purple-700 text-white'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="w-5 h-5 mr-2 inline" />
          {product.inStock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>

      {/* Trust Badges */}
      <div className="bg-white dark:bg-gray-800 px-4 py-6 mt-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <Shield className="w-6 h-6 text-primary-600 dark:text-purple-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Secure Payment</p>
          </div>
          <div>
            <Truck className="w-6 h-6 text-primary-600 dark:text-purple-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Fast Shipping</p>
          </div>
          <div>
            <FileText className="w-6 h-6 text-primary-600 dark:text-purple-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Quality Documentation</p>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="bg-white dark:bg-gray-800 mt-4">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex overflow-x-auto px-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-4 text-sm font-medium whitespace-nowrap border-b-2 ${
                  activeTab === tab.id
                    ? 'border-primary-600 dark:border-purple-400 text-primary-600 dark:text-purple-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-4 py-6">
          {activeTab === 'description' && (
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Description</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {activeTab === 'benefits' && (
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Key Benefits</h3>
              {product.benefits ? (
                <ul className="space-y-2">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary-600 dark:text-purple-400 mr-2">•</span>
                      <span className="text-gray-600 dark:text-gray-400">{benefit}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-500">Benefits information not available.</p>
              )}
            </div>
          )}

          {activeTab === 'protocol' && (
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Research Protocol</h3>
              {product.protocol ? (
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    Detailed research protocol available for download.
                  </p>
                  <button className="inline-flex items-center bg-primary-600 dark:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium">
                    <Download className="w-4 h-4 mr-2" />
                    Download Protocol PDF
                  </button>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-500">Protocol not available for this product.</p>
              )}
            </div>
          )}

          {activeTab === 'usage' && (
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Usage Information</h3>
              <div className="space-y-3">
                <p className="text-gray-600 dark:text-gray-400">
                  <strong className="text-gray-900 dark:text-white">Dosage:</strong> {product.dosage || 'Contact for guidance'}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <strong className="text-gray-900 dark:text-white">Storage:</strong> Store in refrigerator (2-8°C)
                </p>
                <p className="text-red-600 dark:text-red-400 text-sm">
                  ⚠️ For research purposes only. Not for human consumption.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MobileProductDetail