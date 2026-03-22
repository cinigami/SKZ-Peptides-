import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Truck, Info, Package, Zap, Beaker, FileText } from 'lucide-react'
import { products } from '../../data/products'
import MobileProductCard from '../../components/mobile/MobileProductCard'
import { motion } from 'framer-motion'

const MobileHome = () => {
  const featuredProducts = products.slice(0, 6)
  const categories = [
    { id: 'Weight Management', name: 'Weight Management', icon: Zap, color: 'bg-blue-500' },
    { id: 'Healing', name: 'Healing & Recovery', icon: Shield, color: 'bg-green-500' },
    { id: 'Anti-Aging', name: 'Anti-Aging', icon: Package, color: 'bg-purple-500' },
    { id: 'Supplies', name: 'Supplies', icon: Package, color: 'bg-gray-500' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <div className="lg:hidden min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Hero Section */}
      <section
        className="relative text-white py-12 px-0 overflow-hidden"
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ paddingLeft: '36px', paddingRight: '16px' }}
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span
              className="uppercase font-medium inline-flex items-center"
              style={{
                fontSize: '0.72rem',
                letterSpacing: '0.15em',
                color: '#5C5775'
              }}
            >
              <span className="w-2 h-[1px] bg-purple-500 mr-2" style={{ background: '#7C3AED' }}></span>
              Malaysia 🇲🇾
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <h1
              className="font-bold leading-tight"
              style={{
                fontSize: '2.2rem',
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
                fontSize: '2.5rem',
                color: '#A78BFA',
                letterSpacing: '-0.03em',
                lineHeight: '1.1'
              }}
            >
              Done Right.
            </h1>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mb-8 leading-relaxed max-w-sm"
            style={{
              fontSize: '0.95rem',
              color: '#8A8599'
            }}
          >
            Because what you put in your body should come from a source you trust. Not a gamble.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col space-y-3 mb-8">
            <Link
              to="/products"
              className="font-semibold py-3 px-6 transition-all duration-300 flex items-center justify-center"
              style={{
                background: '#7C3AED',
                color: '#FFFFFF',
                borderRadius: '12px'
              }}
            >
              <span>Browse Products</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>

            <Link
              to="/about"
              className="font-medium py-3 px-6 transition-all duration-300 flex items-center justify-center"
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
      </section>

      {/* FREE Essential Kit Section */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="px-4 pt-6 pb-2"
      >
        <div
          className="rounded-2xl p-6"
          style={{
            background: '#F0FDF9',
            border: '1px solid #D1FAE5'
          }}
        >
          <div className="text-center mb-5">
            <h2 className="text-lg font-bold text-gray-900 flex items-center justify-center gap-2">
              🧪 FREE Essential Kit with Every Peptide
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Every peptide purchase includes a complete essential research kit at no additional cost
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-xl p-3 text-center shadow-sm">
              <div className="w-16 h-16 mx-auto mb-2 rounded-lg overflow-hidden">
                <img src="/images/icon-bac-water.png" alt="BAC Water" className="w-full h-full object-contain" />
              </div>
              <p className="text-xs font-semibold text-gray-900">Bacteriostatic Water</p>
              <p className="text-[10px] text-gray-500">3ml sterile vial</p>
            </div>
            <div className="bg-white rounded-xl p-3 text-center shadow-sm">
              <div className="w-16 h-16 mx-auto mb-2 rounded-lg overflow-hidden">
                <img src="/images/icon-syringe.png" alt="Syringe" className="w-full h-full object-contain" />
              </div>
              <p className="text-xs font-semibold text-gray-900">Insulin Syringe</p>
              <p className="text-[10px] text-gray-500">Precise measurement tool</p>
            </div>
            <div className="bg-white rounded-xl p-3 text-center shadow-sm">
              <div className="w-16 h-16 mx-auto mb-2 rounded-lg overflow-hidden">
                <img src="/images/icon-swab.png" alt="Alcohol Swab" className="w-full h-full object-contain" />
              </div>
              <p className="text-xs font-semibold text-gray-900">Alcohol Swab</p>
              <p className="text-[10px] text-gray-500">Sterile preparation</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Free Shipping Banner */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="px-4 pt-5 pb-1"
      >
        <div
          className="flex items-center space-x-3 px-4 py-3 rounded-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(59, 130, 246, 0.1))',
            border: '1px solid rgba(124, 58, 237, 0.2)'
          }}
        >
          <Truck className="w-5 h-5 flex-shrink-0" style={{ color: '#7C3AED' }} />
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">FREE Shipping on Orders Above RM100</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Fast delivery across Malaysia</p>
          </div>
        </div>
      </motion.section>

      {/* Categories */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="px-4 py-5"
      >
        <motion.h2 variants={itemVariants} className="text-lg font-bold text-gray-900 dark:text-white mb-4">Shop by Category</motion.h2>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <motion.div key={category.id} variants={itemVariants}>
                <Link
                  to={`/products?category=${encodeURIComponent(category.id)}`}
                  className="block bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm active:scale-[0.98] transition-transform duration-150"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm">{category.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {products.filter(p => p.category === category.id).length} products
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      {/* Free Essential Kit - Compact Horizontal Card */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="px-4 py-2"
      >
        <div
          className="rounded-xl overflow-hidden flex items-center"
          style={{
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(16, 185, 129, 0.08))',
            border: '1px solid rgba(34, 197, 94, 0.2)'
          }}
        >
          <div className="p-4 flex-1">
            <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">FREE Essential Kit</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Included with every peptide purchase</p>
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center text-[10px] font-medium text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">💧 Bac Water</span>
              <span className="inline-flex items-center text-[10px] font-medium text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">💉 Syringe</span>
              <span className="inline-flex items-center text-[10px] font-medium text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">🧽 Swab</span>
            </div>
          </div>
          <div className="pr-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <Package className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Featured Products - 2 Column Grid */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="px-4 py-5"
      >
        <motion.div variants={itemVariants} className="mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Featured Products</h2>
            <Link
              to="/products"
              className="text-primary-600 dark:text-purple-400 text-sm font-medium flex items-center"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Our top picks across weight management, anti-aging, healing, and cellular health — handpicked for every research goal.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3">
          {featuredProducts.map((product, index) => (
            <motion.div key={product.id} variants={itemVariants}>
              <MobileProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Best Sellers */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="px-4 py-5"
      >
        <motion.div variants={itemVariants} className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Best Sellers</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            The ones our customers keep coming back for. Proven quality. Proven results.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3">
          {products.filter(p => ['retatrutide-5mg', 'glow70-bpc-ghk-tb', 'nad-500mg'].includes(p.id)).map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <MobileProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Quick Actions - Redesigned */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="px-4 py-5"
      >
        <motion.h2 variants={itemVariants} className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</motion.h2>
        <div className="grid grid-cols-2 gap-3">
          <motion.div variants={itemVariants}>
            <Link
              to="/about"
              className="block bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm active:scale-[0.98] transition-transform duration-150"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: 'rgba(124, 58, 237, 0.1)' }}>
                <Info className="w-5 h-5" style={{ color: '#7C3AED' }} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">About Us</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Our approach & values</p>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              to="/products"
              className="block bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm active:scale-[0.98] transition-transform duration-150"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
                <Package className="w-5 h-5" style={{ color: '#3B82F6' }} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">All Products</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Browse full catalog</p>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default MobileHome
