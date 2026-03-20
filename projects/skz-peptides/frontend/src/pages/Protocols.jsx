import { FileText, Download, Zap, Shield, Beaker } from 'lucide-react'
import { products } from '../data/products'
import { motion } from 'framer-motion'

const Protocols = () => {
  const productsWithProtocols = products.filter(product => product.protocol)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Research <span className="text-gradient">Protocols</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive research protocols for our premium peptides. 
            Professional documentation to guide your research journey.
          </p>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <Beaker className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Scientific Accuracy</h3>
            <p className="text-gray-600">Research-grade protocols based on current scientific literature</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <Shield className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Safety First</h3>
            <p className="text-gray-600">Comprehensive safety guidelines and monitoring recommendations</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <Zap className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Optimized Results</h3>
            <p className="text-gray-600">Proven dosing schedules and administration protocols</p>
          </div>
        </motion.div>

        {/* Protocols Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {productsWithProtocols.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Product Image */}
              <div className="h-48 bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-32 w-32 object-contain"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/200x150/f3f4f6/9ca3af?text=${encodeURIComponent(product.name)}`
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mb-2">
                    {product.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {product.protocolTitle || `${product.name} Protocol`}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {product.description}
                  </p>
                </div>

                {/* Protocol Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Protocol Includes:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Complete reconstitution guide</li>
                    <li>• Detailed dosing schedules</li>
                    <li>• Safety monitoring guidelines</li>
                    <li>• Research tracking methods</li>
                    <li>• Storage & handling instructions</li>
                  </ul>
                </div>

                {/* View Protocol Button */}
                <a
                  href={product.protocol}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  <FileText className="w-5 h-5" />
                  <span>View Protocol</span>
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg p-8 mt-12"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Research Support</h2>
            <p className="text-gray-600 mb-6">
              Our research protocols are developed by experienced researchers and updated regularly 
              based on the latest scientific findings. Each protocol provides comprehensive guidance 
              for safe and effective peptide research.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">📋 Detailed Protocols</h4>
                <p className="text-gray-600">Step-by-step instructions for every aspect of peptide research</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">🔬 Research Grade</h4>
                <p className="text-gray-600">Protocols designed for serious research applications</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">💬 Expert Support</h4>
                <p className="text-gray-600">Contact our team for protocol questions and guidance</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8"
        >
          <div className="text-center">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ Research Use Only</h3>
            <p className="text-yellow-700 text-sm">
              These protocols are for research purposes only. Not intended for human consumption. 
              Consult qualified professionals for research guidance. SKZ Peptides provides research materials only.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Protocols