import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Plus, Minus, ShoppingCart, Shield, Truck, Download, FileText, Package, Info, ShieldAlert, MessageCircle } from 'lucide-react'
import { products } from '../../data/products'
import { getSafetyData } from '../../data/safety'
import { getTimelineData } from '../../data/timeline'
import { useCart } from '../../context/CartContext'
import { motion } from 'framer-motion'
import { buildProductMessage, openWhatsApp } from '../../utils/whatsapp'

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
  const isOutOfStock = product ? product.inStock <= 0 : false
  const isLowStock = product ? product.inStock > 0 && product.inStock <= 3 : false

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
    { id: 'timeline', name: 'What to Expect' },
    { id: 'safety', name: 'Safety' },
  ]

  return (
    <div className="lg:hidden min-h-screen bg-gray-50 dark:bg-gray-900 pb-32">
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

      {/* Product Image - Full Width */}
      <div className="bg-white dark:bg-gray-800">
        <div className="relative w-full bg-gray-100 dark:bg-gray-700">
          <img
            src={product.image}
            alt={product.name}
            className={`object-cover w-full ${isOutOfStock ? 'grayscale' : ''}`}
            style={{ aspectRatio: '4 / 3' }}
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=${encodeURIComponent(product.name)}`
            }}
          />
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-red-600 text-white font-bold px-5 py-2.5 rounded-xl text-lg">OUT OF STOCK</span>
            </div>
          )}
          {isLowStock && (
            <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg">
              Low Stock
            </span>
          )}
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

        {/* Beginner Badge & Dosage */}
        {product.badge && product.dosage && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg mx-0 mb-4 p-4">
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full flex-shrink-0">
                <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-200">
                    {product.badge}
                  </span>
                </div>
                <p className="text-sm font-medium text-green-800 dark:text-green-200">{product.dosage}</p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">Start low, titrate every 4 weeks. See protocol for details.</p>
              </div>
            </div>
          </div>
        )}

        {/* Free Promotions - only for peptides, not supplies */}
        {product.category !== 'Supplies' && (
          <div className="mb-4">
            <div className="rounded-2xl overflow-hidden shadow-sm border border-purple-100" style={{ background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #ede9fe 100%)' }}>
              <div className="relative h-24 overflow-hidden">
                <img src="/images/essential-kit-light.png" alt="Essential Kit" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 30%, #faf5ff 100%)' }} />
                <div className="absolute top-2.5 left-3">
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-bold text-white shadow" style={{ background: '#7C3AED' }}>FREE WITH PURCHASE</span>
                </div>
              </div>
              <div className="px-4 pb-4 -mt-2 relative">
                <h4 className="text-gray-900 font-bold text-sm mb-1">Essential Research Kit</h4>
                <p className="text-gray-500 text-[11px] mb-3">Everything you need — included free.</p>
                <div className="grid grid-cols-3 gap-1.5">
                  <div className="bg-white rounded-lg p-2 text-center border border-purple-100 shadow-sm">
                    <div className="text-sm mb-0.5">💧</div>
                    <p className="text-gray-900 text-[10px] font-semibold">BAC Water</p>
                  </div>
                  <div className="bg-white rounded-lg p-2 text-center border border-purple-100 shadow-sm">
                    <div className="text-sm mb-0.5">💉</div>
                    <p className="text-gray-900 text-[10px] font-semibold">Syringe</p>
                  </div>
                  <div className="bg-white rounded-lg p-2 text-center border border-purple-100 shadow-sm">
                    <div className="text-sm mb-0.5">🧴</div>
                    <p className="text-gray-900 text-[10px] font-semibold">Swab</p>
                  </div>
                </div>
              </div>
              <div className="px-4 py-2.5 flex items-center gap-2 border-t border-purple-100">
                <Truck className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#7C3AED' }} />
                <p className="text-[11px] text-gray-500"><strong className="text-gray-900">FREE shipping</strong> above RM100</p>
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
                style={{ minWidth: '44px', minHeight: '44px' }}
              >
                <Minus className="w-4 h-4 mx-auto" />
              </button>
              <span className="px-4 py-2 text-gray-900 dark:text-white font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                style={{ minWidth: '44px', minHeight: '44px' }}
              >
                <Plus className="w-4 h-4 mx-auto" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stack Recommendation */}
      {product.stacksWith && (
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg mx-4 mt-4 p-4">
          <div className="flex items-start space-x-3">
            <div className="bg-indigo-100 dark:bg-indigo-800 p-2 rounded-full flex-shrink-0">
              <span className="text-lg">{product.stacksWith.emoji}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center flex-wrap gap-2 mb-1">
                <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 text-sm">Pairs With: {product.stacksWith.name}</h4>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-bold bg-indigo-200 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-200">
                  {product.stacksWith.stackName}
                </span>
              </div>
              <p className="text-xs text-indigo-700 dark:text-indigo-300 mb-2">{product.stacksWith.description}</p>
              <Link
                to={`/product/${product.stacksWith.productId}`}
                className="inline-flex items-center text-xs font-medium text-indigo-600 dark:text-indigo-400"
              >
                View {product.stacksWith.name} →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Lab Testing Badge */}
      {product.labTesting?.tested && (
        <div className="mx-4 mt-4 relative overflow-hidden rounded-2xl border border-emerald-200/60 dark:border-emerald-700/40" style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%)' }}>
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-300/20 rounded-full blur-2xl -translate-y-6 translate-x-6" />
          <div className="relative p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}>
                  <Shield className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-1.5 mb-1.5">
                  <h4 className="text-sm font-bold text-emerald-950 tracking-tight">Third-Party Lab Tested</h4>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white">
                    ✓ VERIFIED
                  </span>
                </div>
                <p className="text-xs font-semibold text-emerald-800 mb-0.5">
                  Purity: {product.labTesting.purity} — {product.labTesting.result}
                </p>
                <p className="text-[11px] text-emerald-600/80">
                  {product.labTesting.lab} • {product.labTesting.testDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trust Badges */}
      <div className="bg-white dark:bg-gray-800 px-4 py-6 mt-2">
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
      <div className="bg-white dark:bg-gray-800 mt-2">
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
                style={{ minHeight: '44px' }}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content - Better spacing */}
        <div className="px-5 py-8">
          {activeTab === 'description' && (
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Description</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-[15px]">
                  {product.description}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Specifications</h4>
                <div className="space-y-0">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Purity</span>
                    <span className="font-medium text-gray-900 dark:text-white text-sm">≥98% (HPLC)</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Form</span>
                    <span className="font-medium text-gray-900 dark:text-white text-sm">Lyophilized powder</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Storage</span>
                    <span className="font-medium text-gray-900 dark:text-white text-sm">{product.storage || '2-8°C'}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Shelf Life</span>
                    <span className="font-medium text-gray-900 dark:text-white text-sm">2 years when stored properly</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'benefits' && (
            <div className="space-y-5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Research Benefits</h3>
              {getBenefitsForProduct(product.id).map((benefit, index) => (
                <div key={index} className="p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 dark:text-purple-400 text-lg">•</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">{benefit.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">{benefit.description}</p>
                      {benefit.metrics && (
                        <div className="space-y-2">
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

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
                <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
                  Based on current scientific literature and clinical research. Individual outcomes may vary.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'protocol' && (
            <div className="space-y-5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Research Protocol</h3>
              {product.protocol ? (
                <div className="space-y-4">
                  <div className="p-5 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl">
                    <div className="flex items-start space-x-3">
                      <div className="bg-purple-100 dark:bg-purple-800/50 p-2 rounded-full">
                        <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-purple-900 dark:text-purple-300 mb-2">
                          Complete Research Protocol
                        </h4>
                        <p className="text-sm text-purple-800 dark:text-purple-400 mb-4 leading-relaxed">
                          Access comprehensive research protocol with detailed instructions, safety monitoring, and scientific methodology.
                        </p>
                        <div className="space-y-2.5 mb-5 text-xs text-purple-700 dark:text-purple-400">
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
                          className="inline-flex items-center bg-purple-600 text-white px-4 py-2.5 rounded-lg font-medium text-sm"
                          style={{ minHeight: '44px' }}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          View Complete Protocol
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-5 bg-gray-50 dark:bg-gray-700 rounded-xl text-center">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Protocol documentation coming soon.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'usage' && (
            <div className="space-y-5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Research Guidelines</h3>

              <div className="p-5 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4 text-sm">Research Parameters</h4>
                <div className="space-y-0">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Recommended Dosage</span>
                    <span className="font-medium text-gray-900 dark:text-white text-sm">See research protocol</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Reconstitution</span>
                    <span className="font-medium text-gray-900 dark:text-white text-sm">Bacteriostatic water</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Administration</span>
                    <span className="font-medium text-gray-900 dark:text-white text-sm">Research use only</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Storage Temperature</span>
                    <span className="font-medium text-gray-900 dark:text-white text-sm">{product.storage || '2-8°C'}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-red-800 dark:text-red-300 mb-1 text-sm">Important Research Disclaimer</h4>
                    <p className="text-xs text-red-700 dark:text-red-400 leading-relaxed">
                      This product is intended for research purposes only. 
                      Consult with a healthcare professional before use. Please review the full protocol for safety guidelines.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (() => {
            const timeline = getTimelineData(product.id)
            if (!timeline) return (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Info className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                <p>Timeline data not yet available for this product.</p>
              </div>
            )
            const colorMap = {
              blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800', text: 'text-blue-800 dark:text-blue-200', dot: 'bg-blue-500', line: 'border-blue-300 dark:border-blue-700' },
              indigo: { bg: 'bg-indigo-50 dark:bg-indigo-900/20', border: 'border-indigo-200 dark:border-indigo-800', text: 'text-indigo-800 dark:text-indigo-200', dot: 'bg-indigo-500', line: 'border-indigo-300 dark:border-indigo-700' },
              purple: { bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-200 dark:border-purple-800', text: 'text-purple-800 dark:text-purple-200', dot: 'bg-purple-500', line: 'border-purple-300 dark:border-purple-700' },
              orange: { bg: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-200 dark:border-orange-800', text: 'text-orange-800 dark:text-orange-200', dot: 'bg-orange-500', line: 'border-orange-300 dark:border-orange-700' },
              yellow: { bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800', text: 'text-amber-800 dark:text-amber-200', dot: 'bg-amber-500', line: 'border-amber-300 dark:border-amber-700' }
            }
            return (
              <div className="space-y-5">
                <p className="text-gray-700 dark:text-gray-300 text-sm">{timeline.summary}</p>

                {/* Timeline */}
                <div className="relative">
                  {timeline.phases.map((phase, i) => {
                    const colors = colorMap[phase.color] || colorMap.blue
                    return (
                      <div key={i} className="relative pl-9 pb-6 last:pb-0">
                        {i < timeline.phases.length - 1 && (
                          <div className={`absolute left-[13px] top-7 bottom-0 w-0.5 ${colors.line} border-l-2 border-dashed`}></div>
                        )}
                        <div className={`absolute left-0 top-0.5 w-7 h-7 rounded-full ${colors.dot} flex items-center justify-center text-white text-xs`}>
                          {phase.icon}
                        </div>
                        <div className={`${colors.bg} ${colors.border} border rounded-lg p-3`}>
                          <div className="flex items-center space-x-2 mb-1.5">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${colors.bg} ${colors.text} border ${colors.border}`}>
                              {phase.period}
                            </span>
                            <h4 className={`font-semibold text-sm ${colors.text}`}>{phase.title}</h4>
                          </div>
                          <ul className="space-y-1">
                            {phase.effects.map((effect, j) => (
                              <li key={j} className={`flex items-start space-x-2 text-xs ${colors.text}`}>
                                <span className={`mt-1 w-1 h-1 ${colors.dot} rounded-full flex-shrink-0`}></span>
                                <span>{effect}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    <strong>📌 Note:</strong> {timeline.note}
                  </p>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                  <p className="text-xs text-yellow-700 dark:text-yellow-300">
                    <strong>Disclaimer:</strong> These timelines are based on clinical research. Individual results may vary. Not medical advice.
                  </p>
                </div>
              </div>
            )
          })()}

          {activeTab === 'safety' && (() => {
            const safety = getSafetyData(product.id)
            if (!safety) return (
              <div className="text-center py-8">
                <ShieldAlert className="w-8 h-8 mx-auto mb-3 text-gray-400 dark:text-gray-500" />
                <p className="text-sm text-gray-500 dark:text-gray-400">Safety data not yet available for this product.</p>
              </div>
            )
            return (
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm flex items-center">
                    <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></span>
                    Common Side Effects
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {safety.common.map((item, i) => (
                      <span key={i} className="inline-flex items-center px-3 py-1.5 rounded-full text-xs bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm flex items-center">
                    <span className="inline-block w-2.5 h-2.5 bg-yellow-500 rounded-full mr-2"></span>
                    Less Common
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {safety.lessCommon.map((item, i) => (
                      <span key={i} className="inline-flex items-center px-3 py-1.5 rounded-full text-xs bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm flex items-center">
                    <span className="inline-block w-2.5 h-2.5 bg-red-500 rounded-full mr-2"></span>
                    Serious (Rare)
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {safety.serious.map((item, i) => (
                      <span key={i} className="inline-flex items-center px-3 py-1.5 rounded-full text-xs bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl p-4">
                  <h4 className="font-semibold text-red-900 dark:text-red-300 mb-3 text-sm flex items-center">
                    <ShieldAlert className="w-4 h-4 mr-2 text-red-600 dark:text-red-400" />
                    Who Should Avoid This
                  </h4>
                  <ul className="space-y-2">
                    {safety.contraindications.map((item, i) => (
                      <li key={i} className="flex items-start space-x-2 text-xs text-red-800 dark:text-red-300">
                        <span className="mt-1 w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl p-4">
                  <h4 className="font-semibold text-purple-900 dark:text-purple-300 mb-3 text-sm flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
                    Safety Tips
                  </h4>
                  <ul className="space-y-2">
                    {safety.safetyTips.map((item, i) => (
                      <li key={i} className="flex items-start space-x-2 text-xs text-purple-800 dark:text-purple-300">
                        <span className="mt-1 w-1.5 h-1.5 bg-purple-500 rounded-full flex-shrink-0"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-4">
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    <strong>Disclaimer:</strong> This safety information is provided for educational and research purposes only.
                    It does not constitute medical advice. Always consult a qualified healthcare professional before use.
                    Individual responses may vary. Report any adverse reactions to your healthcare provider immediately.
                  </p>
                </div>
              </div>
            )
          })()}
        </div>
      </div>

      {/* Sticky Bottom Bar - Price + Add to Cart */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="fixed bottom-16 left-0 right-0 z-40 border-t"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderColor: 'rgba(0,0,0,0.08)'
        }}
      >
        <div className="px-4 py-3 flex items-center gap-2">
          {/* Price */}
          <div className="shrink-0 mr-auto">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {formatPrice(product.price * quantity)}
            </span>
            {quantity > 1 && (
              <p className="text-xs text-gray-500">{quantity} items</p>
            )}
          </div>
          {/* Add to Cart - icon only */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`flex items-center justify-center w-12 h-12 rounded-xl text-white shrink-0 transition-colors ${isOutOfStock ? 'opacity-40 cursor-not-allowed' : ''}`}
            style={{ backgroundColor: isOutOfStock ? '#9CA3AF' : '#7C3AED' }}
            aria-label="Add to Cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
          {/* WhatsApp Order */}
          <button
            onClick={() => openWhatsApp(buildProductMessage(product, quantity))}
            className="flex items-center justify-center h-12 px-5 rounded-xl font-semibold text-white shrink-0 whitespace-nowrap transition-colors"
            style={{ backgroundColor: '#25D366' }}
          >
            <svg className="w-5 h-5 mr-2 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Order
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default MobileProductDetail
