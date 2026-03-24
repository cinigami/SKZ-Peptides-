import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Truck, Award, Star, ChevronRight, Zap, Beaker, Trophy, FileText } from 'lucide-react'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import { motion } from 'framer-motion'

const HomeModern = () => {
  const featuredProducts = products.slice(0, 4)
  const topProfitProducts = products
    .sort((a, b) => b.profit - a.profit)
    .slice(0, 3)

  console.log('Featured Products:', featuredProducts.length)
  console.log('Products:', featuredProducts)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section - New Structure */}
      <section 
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ 
          background: 'linear-gradient(175deg, #150D25 0%, #0C0C10 45%, #0E0B16 100%)'
        }}
      >
        {/* Left accent line */}
        <div 
          className="absolute left-0 top-0 w-[3px] h-full opacity-40"
          style={{
            background: 'linear-gradient(to bottom, #7C3AED, transparent 70%)'
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ paddingLeft: '36px' }}
          >
            {/* Origin label */}
            <motion.div variants={itemVariants} className="mb-6">
              <span 
                className="uppercase font-medium inline-flex items-center"
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.15em',
                  color: '#5C5775'
                }}
              >
                <span className="w-3 h-[1px] mr-3" style={{ background: '#7C3AED' }}></span>
                Malaysia 🇲🇾
              </span>
            </motion.div>
            
            {/* Main heading */}
            <motion.div variants={itemVariants} className="mb-8">
              <h1 
                className="font-bold leading-tight"
                style={{
                  fontSize: 'clamp(3rem, 8vw, 6rem)',
                  color: '#FFFFFF',
                  letterSpacing: '-0.03em',
                  lineHeight: '1.1'
                }}
              >
                Peptides.
              </h1>
              <h1 
                className="font-bold leading-tight"
                style={{
                  fontSize: 'clamp(3.5rem, 9vw, 7rem)',
                  color: '#A78BFA',
                  letterSpacing: '-0.03em',
                  lineHeight: '1.1'
                }}
              >
                Done Right.
              </h1>
            </motion.div>
            
            {/* Subtitle */}
            <motion.p 
              variants={itemVariants}
              className="mb-10 leading-relaxed max-w-lg"
              style={{
                fontSize: '1.1rem',
                color: '#8A8599'
              }}
            >
              Because what you put in your body should come from a source you trust. Not a gamble.
            </motion.p>
            
            {/* Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                to="/products"
                className="font-semibold px-8 py-4 transition-all duration-300 flex items-center justify-center group"
                style={{ 
                  background: '#7C3AED', 
                  color: '#FFFFFF',
                  borderRadius: '12px'
                }}
              >
                <span>Browse Products</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/about"
                className="font-medium px-8 py-4 transition-all duration-300 flex items-center justify-center"
                style={{ 
                  background: 'transparent', 
                  border: '1px solid rgba(167, 139, 250, 0.25)', 
                  color: '#A78BFA',
                  borderRadius: '12px'
                }}
              >
                <span>About</span>
              </Link>
            </motion.div>
            


          </motion.div>
        </div>

      </section>

      {/* Free Essential Kit Promotion */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-200"
          >
            <div className="text-center max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                🧪 FREE Essential Kit with Every Peptide
              </h3>
              <p className="text-gray-600 mb-6">
                Every peptide purchase includes a complete essential research kit at no additional cost
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="flex flex-col items-center p-6 bg-white rounded-xl border border-green-200">
                  <div className="w-28 h-28 rounded-xl overflow-hidden mb-4">
                    <img src="/images/icon-bac-water.png" alt="BAC Water" className="w-full h-full object-contain" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Bacteriostatic Water</h4>
                  <p className="text-sm text-gray-600 text-center">3ml sterile vial</p>
                </div>
                
                <div className="flex flex-col items-center p-6 bg-white rounded-xl border border-green-200">
                  <div className="w-28 h-28 rounded-xl overflow-hidden mb-4">
                    <img src="/images/icon-syringe.png" alt="Syringe" className="w-full h-full object-contain" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Insulin Syringe</h4>
                  <p className="text-sm text-gray-600 text-center">Precise measurement tool</p>
                </div>
                
                <div className="flex flex-col items-center p-6 bg-white rounded-xl border border-green-200">
                  <div className="w-28 h-28 rounded-xl overflow-hidden mb-4">
                    <img src="/images/icon-swab.png" alt="Alcohol Swab" className="w-full h-full object-contain" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Alcohol Swab</h4>
                  <p className="text-sm text-gray-600 text-center">Sterile preparation</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>



      {/* Featured Products - Modern Grid */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Featured <span className="text-gradient">Products</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our top picks across weight management, anti-aging, healing, and cellular health — handpicked for every research goal.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="neuro-card p-6 group-hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  {/* Product Image */}
                  <div className="relative mb-6 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl h-48 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/300x200/f3f4f6/9ca3af?text=${encodeURIComponent(product.name)}`
                      }}
                    />
                    
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Product Info */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="badge-modern text-xs">{product.category}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="price-display">
                          MYR {product.price.toFixed(2)}
                        </span>
                        <p className="text-xs text-gray-500">{product.dosage}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Link
                        to={`/product/${product.id}`}
                        className="btn-primary w-full group/btn flex items-center justify-center"
                      >
                        <span>View Details</span>
                        <ChevronRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                      

                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link to="/products" className="btn-gradient text-lg px-8 py-4 group inline-flex items-center">
              View All Products
              <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Best <span className="text-gradient">Sellers</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The ones our customers keep coming back for. Proven quality. Proven results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.filter(p => ['retatrutide-5mg', 'glow70-bpc-ghk-tb', 'nad-500mg'].includes(p.id)).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="neuro-card p-6 group-hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  <div className="relative mb-6 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl h-48 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/300x200/f3f4f6/9ca3af?text=${encodeURIComponent(product.name)}`
                      }}
                    />
                  </div>
                  <div className="space-y-3">
                    <span className="badge-modern text-xs">{product.category}</span>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="price-display">MYR {product.price.toFixed(2)}</span>
                    </div>
                    <Link
                      to={`/product/${product.id}`}
                      className="btn-primary w-full group/btn flex items-center justify-center mt-2"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Free Shipping Promotion */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-3 bg-white dark:bg-slate-800 px-8 py-4 rounded-full shadow-lg">
              <Truck className="w-8 h-8 text-blue-600 dark:text-purple-400" />
              <div className="text-left">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  FREE Shipping on Orders Above RM100
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Fast delivery across Malaysia • Secure packaging
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Modern Gradient */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Floating elements */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-5xl font-bold mb-6">
              Your Journey. Our Standards.
            </h2>
            <p className="text-2xl text-primary-100 leading-relaxed max-w-2xl mx-auto">
              Whether you're just starting or scaling up — we've got you covered with verified quality and honest pricing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/products" className="bg-white text-primary-700 hover:bg-gray-50 dark:bg-white dark:text-[#A78BFA] dark:hover:bg-gray-100 font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-lg group">
                <span>Shop All Products</span>
                <ArrowRight className="w-6 h-6 ml-2 inline group-hover:translate-x-1 transition-transform" />
              </Link>
              

            </div>


          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomeModern