import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Plus, Minus, ShoppingCart, Shield, Truck, Download, FileText, Package, Info } from 'lucide-react'
import { products } from '../../data/products'
import { useCart } from '../../context/CartContext'

// Mobile-optimized benefits function
const getBenefitsForProduct = (productId) => {
  switch (productId) {
    case 'retatrutide-5mg':
    case 'retatrutide-15mg':
      return [
        {
          title: 'Weight Management Research',
          description: 'Studies show 15-25% body weight reduction with significant appetite suppression.',
          metrics: ['15-25% weight reduction', '70-85% appetite suppression']
        },
        {
          title: 'Glucose Homeostasis',
          description: 'Enhanced insulin sensitivity with improved glucose levels.',
          metrics: ['15-30% glucose improvement', '40-60% insulin sensitivity boost']
        },
        {
          title: 'Cardiovascular Benefits',
          description: 'Comprehensive cardiovascular improvements including lipid optimization.',
          metrics: ['20-35% LDL reduction', '30-50% triglyceride improvement']
        }
      ]
    case 'motsc-40mg':
      return [
        {
          title: 'Enhanced Exercise Performance',
          description: '15-25% increase in VO2 max with improved exercise duration.',
          metrics: ['15-25% VO2 max increase', '30-50% endurance improvement']
        },
        {
          title: 'Metabolic Optimization',
          description: 'Improved glucose tolerance and enhanced fat oxidation.',
          metrics: ['25-40% glucose improvement', '35-55% fat oxidation increase']
        },
        {
          title: 'Cellular Energy Enhancement',
          description: 'Increased ATP production with improved mitochondrial function.',
          metrics: ['20-35% ATP increase', '15-25% mitochondrial density']
        }
      ]
    case 'ss31-elamipretide-10mg':
      return [
        {
          title: 'Cardiovascular Function',
          description: 'Improved exercise tolerance with enhanced cardiac efficiency.',
          metrics: ['20-35% exercise improvement', '25-40% vascular reactivity']
        },
        {
          title: 'Mitochondrial Protection',
          description: 'Increased ATP production with improved cellular efficiency.',
          metrics: ['25-45% ATP increase', 'Enhanced respiratory rates']
        },
        {
          title: 'Exercise Performance',
          description: 'Improved endurance with faster recovery times.',
          metrics: ['15-30% endurance boost', '40-60% faster recovery']
        }
      ]
    default:
      return [
        {
          title: 'Research Applications',
          description: 'Professional research applications for scientific studies.',
          metrics: ['Research grade purity', 'Professional support']
        }
      ]
  }
}

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
        <span 
          className="inline-block mb-3"
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

        {/* Free Promotions - only for peptides, not supplies */}
        {product.category !== 'Supplies' && (
          <div className="mb-6 space-y-3">
            {/* FREE Essential Kit - Professional Design */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600 overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-3">
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                  FREE Essential Kit Included
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Complete research supplies included at no additional cost
                </p>
              </div>
              
              <div className="p-3 space-y-2">
                <div className="flex items-center space-x-2 text-xs">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Bacteriostatic Water (3ml vial)</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Insulin Syringe (1ml precision)</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Alcohol Prep Pad (70% sterile)</span>
                </div>
                

              </div>
            </div>


          </div>
        )}

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
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Description</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {product.description}
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Specifications</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Purity</span>
                    <span className="font-medium text-gray-900 dark:text-white text-sm">≥98% (HPLC)</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Form</span>
                    <span className="font-medium text-gray-900 dark:text-white text-sm">Lyophilized powder</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Storage</span>
                    <span className="font-medium text-gray-900 dark:text-white text-sm">{product.storage || '2-8°C'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Shelf Life</span>
                    <span className="font-medium text-gray-900 dark:text-white text-sm">2 years when stored properly</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'benefits' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Research Benefits</h3>
              {getBenefitsForProduct(product.id).map((benefit, index) => (
                <div key={index} className="p-4 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 dark:text-purple-400 text-lg">•</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">{benefit.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{benefit.description}</p>
                      {benefit.metrics && (
                        <div className="space-y-1">
                          {benefit.metrics.map((metric, metricIndex) => (
                            <div key={metricIndex} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                              <span className="text-xs text-gray-500 dark:text-gray-400">{metric}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Research disclaimer */}
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  🔬 Based on current scientific literature and clinical research. Individual outcomes may vary.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'protocol' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Research Protocol</h3>
              {product.protocol ? (
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="bg-purple-100 dark:bg-purple-800/50 p-2 rounded-full">
                        <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-purple-900 dark:text-purple-300 mb-2">
                          📋 Complete Research Protocol
                        </h4>
                        <p className="text-sm text-purple-800 dark:text-purple-400 mb-3">
                          Access comprehensive research protocol with detailed instructions, safety monitoring, and scientific methodology.
                        </p>
                        <div className="space-y-2 mb-4 text-xs text-purple-700 dark:text-purple-400">
                          <div className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                            <span>Step-by-step reconstitution guide</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                            <span>Beginner to advanced dosing schedules</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                            <span>Safety monitoring and research tracking</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                            <span>Scientific background and mechanisms</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => window.open(product.protocol, '_blank')}
                          className="inline-flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg font-medium text-sm"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          View Complete Protocol
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Protocol documentation coming soon.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'usage' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Research Guidelines</h3>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3 text-sm">Research Parameters</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Recommended Dosage</span>
                    <span className="font-medium text-gray-900 dark:text-white text-sm">{product.dosage || 'See protocol'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Reconstitution</span>
                    <span className="font-medium text-gray-900 dark:text-white text-sm">Bacteriostatic water</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Administration</span>
                    <span className="font-medium text-gray-900 dark:text-white text-sm">Research use only</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Storage Temperature</span>
                    <span className="font-medium text-gray-900 dark:text-white text-sm">{product.storage || '2-8°C'}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-red-800 dark:text-red-300 mb-1 text-sm">Important Research Disclaimer</h4>
                    <p className="text-xs text-red-700 dark:text-red-400 leading-relaxed">
                      This product is intended for research purposes only. Not for human consumption. 
                      Must be handled by qualified researchers in appropriate laboratory settings with proper safety protocols.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MobileProductDetail