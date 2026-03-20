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
      {/* Hero Section - Glassmorphism Design */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-300/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary-200/20 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-black tracking-tight">
                <span className="text-gradient-hero">SKZ</span>{' '}
                <span className="text-gray-900 dark:text-white">Peptides</span>
              </h1>
              
              <p className="text-2xl md:text-3xl text-gray-600 dark:text-[#A0AAB8] font-light max-w-4xl mx-auto leading-relaxed">
                Research peptides for 
                <span className="accent-text font-semibold"> scientific studies and research</span>
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/products" className="btn-gradient text-lg px-8 py-4 group">
                Explore Products
                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about" className="btn-secondary text-lg px-8 py-4 group">
                Learn More
                <Beaker className="w-6 h-6 ml-2 group-hover:rotate-12 transition-transform" />
              </Link>
            </motion.div>


          </motion.div>
        </div>


      </section>

      {/* Free Gift Promotion */}
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
                🎁 FREE Gift with Every Peptide
              </h3>
              <p className="text-gray-600 mb-6">
                Every peptide purchase includes essential research supplies as a complimentary gift
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="flex flex-col items-center p-4 bg-white rounded-xl border border-green-200">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <span className="text-2xl">💧</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Bacteriostatic Water</h4>
                  <p className="text-sm text-gray-600 text-center">Sterile mixing solution</p>
                </div>
                
                <div className="flex flex-col items-center p-4 bg-white rounded-xl border border-green-200">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <span className="text-2xl">💉</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Insulin Syringe</h4>
                  <p className="text-sm text-gray-600 text-center">Precise measurement tool</p>
                </div>
                
                <div className="flex flex-col items-center p-4 bg-white rounded-xl border border-green-200">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <span className="text-2xl">🧽</span>
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
              Discover our most popular research peptides, trusted by fitness enthusiasts 
              and researchers worldwide for their exceptional quality and results.
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
                    
                    {/* Floating badge */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary-700 shadow-lg">
                      {product.inStock} in stock
                    </div>

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
                      
                      {product.protocol && (
                        <a
                          href={product.protocol}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg text-sm font-medium text-primary-600 bg-primary-50 border border-primary-200 hover:bg-primary-100 transition-colors"
                        >
                          <FileText className="w-4 h-4" />
                          <span>📋 Protocol</span>
                        </a>
                      )}
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

      {/* Premium Collection - Glassmorphism Cards */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-50 via-white to-primary-50"></div>
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-primary-300/30 to-secondary-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-secondary-300/20 to-primary-300/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Research <span className="text-gradient">Collection</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our research peptides for scientific studies with 
              proper documentation and consistent quality.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topProfitProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -15, scale: 1.02 }}
                className="relative group"
              >
                <div className="glass rounded-2xl p-8 text-center group-hover:shadow-2xl transition-all duration-500">
                  {/* Floating "Best Seller" badge */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    Best Seller
                  </div>

                  {/* Product Image */}
                  <div className="relative mb-8 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl h-48 flex items-center justify-center overflow-hidden mx-auto">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/300x200/f3f4f6/9ca3af?text=${encodeURIComponent(product.name)}`
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                    


                    <div className="price-display text-4xl mb-6">
                      MYR {product.price.toFixed(2)}
                    </div>



                    <Link
                      to={`/product/${product.id}`}
                      className="btn-gradient w-full text-lg py-4 group/btn inline-flex items-center justify-center"
                    >
                      <span>Discover More</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
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
                  Fast delivery across Malaysia • Secure packaging • Track your order
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
              Ready to Start Your Research Journey?
            </h2>
            <p className="text-2xl text-primary-100 leading-relaxed max-w-2xl mx-auto">
              Research peptides with proper documentation and 
              straightforward ordering process.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/products" className="bg-white text-primary-700 hover:bg-gray-50 dark:bg-white dark:text-[#A78BFA] dark:hover:bg-gray-100 font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-lg group">
                <span>Shop All Products</span>
                <ArrowRight className="w-6 h-6 ml-2 inline group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link to="/admin" className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold py-4 px-8 rounded-xl backdrop-blur-sm transition-all duration-300 text-lg">
                View Analytics
              </Link>
            </div>


          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomeModern