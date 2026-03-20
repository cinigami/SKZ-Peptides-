import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Plus, Minus, ShoppingCart, Shield, Truck, Info, Download, FileText, Package } from 'lucide-react'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import { motion } from 'framer-motion'
import ProductBenefits from '../components/ProductBenefits'
import MobileProductDetail from './mobile/MobileProductDetail'

const ProductDetail = () => {
  const { id } = useParams()
  const product = products.find(p => p.id === id)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [isMobile, setIsMobile] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Return mobile version if on mobile
  if (isMobile) {
    return <MobileProductDetail />
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link to="/products" className="btn-primary">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    // Could add a toast notification here
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary-600">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary-600">Products</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/500x400/f3f4f6/9ca3af?text=${encodeURIComponent(product.name)}`
                }}
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Title and Rating */}
            <div>
              <span className="inline-block px-3 py-1 text-sm font-medium bg-primary-100 text-primary-800 rounded-full mb-4">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

            </div>

            {/* Price */}
            <div className="border-b border-gray-200 pb-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                MYR {product.price.toFixed(2)}
              </div>
              <p className="text-gray-600">Storage: {product.storage}</p>
              
              {/* Free Essential Kit - only for peptides, not supplies */}
              {product.category !== 'Supplies' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Package className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800 mb-1">
                        FREE Essential Kit Included
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-green-700">
                        <span>• Bacteriostatic Water</span>
                        <span>• Insulin Syringe</span>
                        <span>• Alcohol Swab</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Free Shipping Promotion */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                <div className="flex items-center">
                  <Truck className="w-5 h-5 text-blue-600 mr-2" />
                  <div className="text-sm">
                    <span className="font-medium text-blue-800">
                      FREE shipping on orders above RM100
                    </span>
                    <span className="text-blue-600 ml-1">
                      • Fast delivery across Malaysia
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                product.inStock > 10 ? 'bg-green-500 dark:bg-purple-500' : 
                product.inStock > 0 ? 'bg-yellow-500 dark:bg-purple-400' : 'bg-red-500'
              }`}></div>
              <span className={`font-medium ${
                product.inStock > 0 ? 'text-green-700 dark:text-purple-400' : 'text-red-700'
              }`}>
                {product.inStock > 0 ? `${product.inStock} in stock` : 'Out of stock'}
              </span>
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-700 text-lg">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-900">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-gray-600 hover:text-gray-900"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-gray-600 hover:text-gray-900"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.inStock === 0}
                className={`w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-lg font-medium transition-colors ${
                  product.inStock > 0
                    ? 'bg-primary-600 hover:bg-primary-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{product.inStock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Shield className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Secure Payment</p>
              </div>
              <div className="text-center">
                <Truck className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Fast Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Quality Documentation</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="mt-16 bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'description', name: 'Description' },
                { id: 'benefits', name: 'Benefits' },
                { id: 'usage', name: 'Usage' },
                { id: 'disclaimer', name: 'Disclaimer' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {product.description}
                </p>
                <h4 className="text-lg font-semibold mt-6 mb-3">Specifications</h4>
                <ul className="space-y-2">
                  <li><strong>Purity:</strong> ≥98% (HPLC)</li>
                  <li><strong>Form:</strong> Lyophilized powder</li>
                  <li><strong>Storage:</strong> {product.storage}</li>
                  <li><strong>Shelf Life:</strong> 2 years when stored properly</li>
                </ul>
              </div>
            )}

            {activeTab === 'benefits' && (
              <ProductBenefits product={product} />
            )}

            {activeTab === 'usage' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-4">Research Guidelines</h4>
                  <div className="space-y-4 text-gray-700">
                    <p><strong>Recommended Dosage:</strong> {product.dosage}</p>
                    <p><strong>Reconstitution:</strong> Use bacteriostatic water for injection</p>
                    <p><strong>Administration:</strong> For research purposes only</p>
                    <p><strong>Storage:</strong> {product.storage}</p>
                  </div>
                </div>

                {/* Research Protocol Section */}
                {product.protocol && (
                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
                    <div className="flex items-start space-x-4">
                      <FileText className="w-8 h-8 text-primary-600 mt-1" />
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-primary-900 mb-2">
                          📋 Complete Research Protocol
                        </h4>
                        <p className="text-primary-800 mb-4">
                          Access our comprehensive research protocol with detailed reconstitution instructions, 
                          dosing schedules, safety monitoring guidelines, and scientific methodology.
                        </p>
                        <div className="space-y-2 mb-4 text-sm text-primary-700">
                          <div className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                            <span>Step-by-step reconstitution guide</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                            <span>Beginner to advanced dosing schedules</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                            <span>Safety monitoring and research tracking</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                            <span>Scientific background and mechanisms</span>
                          </div>
                        </div>
                        <a
                          href={product.protocol}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                        >
                          <FileText className="w-5 h-5" />
                          <span>View Complete Protocol</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'disclaimer' && (
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Info className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-semibold mb-2">Important Disclaimer</p>
                    <p>
                      This product is intended for research purposes only and is not for human consumption. 
                      It has not been evaluated by the FDA and is not intended to diagnose, treat, cure, 
                      or prevent any disease. Please consult with a healthcare professional before use.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="card text-center">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/300x200/f3f4f6/9ca3af?text=${encodeURIComponent(relatedProduct.name)}`
                    }}
                  />
                  <h3 className="font-semibold text-gray-900 mb-2">{relatedProduct.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{relatedProduct.description}</p>
                  <div className="text-lg font-bold text-gray-900 mb-4">
                    MYR {relatedProduct.price.toFixed(2)}
                  </div>
                  <Link
                    to={`/product/${relatedProduct.id}`}
                    className="btn-primary w-full"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetail