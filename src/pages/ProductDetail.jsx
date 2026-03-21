import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Plus, Minus, ShoppingCart, Shield, Truck, Info, Download, FileText, Package, ShieldAlert, MessageCircle } from 'lucide-react'
import { products } from '../data/products'
import { getSafetyData } from '../data/safety'
import { getTimelineData } from '../data/timeline'
import { useCart } from '../context/CartContext'
import { motion } from 'framer-motion'
import ProductBenefits from '../components/ProductBenefits'
import MobileProductDetail from './mobile/MobileProductDetail'
import { buildProductMessage, openWhatsApp } from '../utils/whatsapp'

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
                className="w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-lg font-medium transition-colors bg-primary-600 hover:bg-primary-700 text-white"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={() => openWhatsApp(buildProductMessage(product, quantity))}
                className="w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-lg font-medium transition-colors text-white"
                style={{ backgroundColor: '#25D366' }}
              >
                <MessageCircle className="w-5 h-5" />
                <span>Order via WhatsApp</span>
              </button>
            </div>

            {/* Lab Testing Badge */}
            {product.labTesting?.tested && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-emerald-100 p-2.5 rounded-full">
                    <Shield className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-emerald-900">Third-Party Lab Tested</h4>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-200 text-emerald-800">
                        ✓ VERIFIED
                      </span>
                    </div>
                    <div className="text-sm text-emerald-700 space-y-0.5">
                      <p><strong>Purity:</strong> {product.labTesting.purity} — <strong>{product.labTesting.result}</strong></p>
                      <p>Independently tested by {product.labTesting.lab} • {product.labTesting.testDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

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
                { id: 'timeline', name: 'What to Expect' },
                { id: 'safety', name: 'Safety & Side Effects', icon: ShieldAlert },
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

            {activeTab === 'timeline' && (() => {
              const timeline = getTimelineData(product.id)
              if (!timeline) return (
                <div className="text-center py-8 text-gray-500">
                  <Info className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                  <p>Timeline data not yet available for this product.</p>
                </div>
              )
              const colorMap = {
                blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', dot: 'bg-blue-500', line: 'border-blue-300' },
                indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-800', dot: 'bg-indigo-500', line: 'border-indigo-300' },
                purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-800', dot: 'bg-purple-500', line: 'border-purple-300' },
                orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', dot: 'bg-orange-500', line: 'border-orange-300' },
                yellow: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', dot: 'bg-amber-500', line: 'border-amber-300' }
              }
              return (
                <div className="space-y-6">
                  <p className="text-gray-700 text-lg">{timeline.summary}</p>

                  {/* Timeline */}
                  <div className="relative">
                    {timeline.phases.map((phase, i) => {
                      const colors = colorMap[phase.color] || colorMap.blue
                      return (
                        <div key={i} className="relative pl-10 pb-8 last:pb-0">
                          {/* Vertical line */}
                          {i < timeline.phases.length - 1 && (
                            <div className={`absolute left-[15px] top-8 bottom-0 w-0.5 ${colors.line} border-l-2 border-dashed`}></div>
                          )}
                          {/* Dot */}
                          <div className={`absolute left-0 top-1 w-8 h-8 rounded-full ${colors.dot} flex items-center justify-center text-white text-sm`}>
                            {phase.icon}
                          </div>
                          {/* Content */}
                          <div className={`${colors.bg} ${colors.border} border rounded-lg p-4`}>
                            <div className="flex items-center space-x-3 mb-2">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${colors.bg} ${colors.text} border ${colors.border}`}>
                                {phase.period}
                              </span>
                              <h4 className={`font-semibold ${colors.text}`}>{phase.title}</h4>
                            </div>
                            <ul className="space-y-1.5">
                              {phase.effects.map((effect, j) => (
                                <li key={j} className={`flex items-start space-x-2 text-sm ${colors.text}`}>
                                  <span className={`mt-1.5 w-1.5 h-1.5 ${colors.dot} rounded-full flex-shrink-0`}></span>
                                  <span>{effect}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Note */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-sm text-gray-600">
                      <strong>📌 Note:</strong> {timeline.note}
                    </p>
                  </div>

                  {/* Disclaimer */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-700">
                      <strong>Disclaimer:</strong> These timelines are based on clinical research and literature. Individual results may vary significantly based on dosage, health status, lifestyle, and other factors. This is for informational purposes only and does not constitute medical advice.
                    </p>
                  </div>
                </div>
              )
            })()}

            {activeTab === 'safety' && (() => {
              const safety = getSafetyData(product.id)
              if (!safety) return (
                <div className="text-center py-8 text-gray-500">
                  <ShieldAlert className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                  <p>Safety data not yet available for this product.</p>
                </div>
              )
              return (
                <div className="space-y-6">
                  {/* Common Side Effects */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                      Common Side Effects
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {safety.common.map((item, i) => (
                        <span key={i} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-green-50 text-green-800 border border-green-200">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Less Common */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                      Less Common
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {safety.lessCommon.map((item, i) => (
                        <span key={i} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-yellow-50 text-yellow-800 border border-yellow-200">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Serious (Rare) */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                      Serious (Rare)
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {safety.serious.map((item, i) => (
                        <span key={i} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-red-50 text-red-800 border border-red-200">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contraindications */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-red-900 mb-3 flex items-center">
                      <ShieldAlert className="w-5 h-5 mr-2 text-red-600" />
                      Who Should Avoid This
                    </h4>
                    <ul className="space-y-2">
                      {safety.contraindications.map((item, i) => (
                        <li key={i} className="flex items-start space-x-2 text-red-800">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Safety Tips */}
                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-primary-900 mb-3 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-primary-600" />
                      Safety Tips
                    </h4>
                    <ul className="space-y-2">
                      {safety.safetyTips.map((item, i) => (
                        <li key={i} className="flex items-start space-x-2 text-primary-800">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-primary-500 rounded-full flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Disclaimer */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-sm text-gray-600">
                      <strong>Disclaimer:</strong> This safety information is provided for educational and research purposes only.
                      It does not constitute medical advice. Always consult a qualified healthcare professional before use.
                      Individual responses may vary. Report any adverse reactions to your healthcare provider immediately.
                    </p>
                  </div>
                </div>
              )
            })()}

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