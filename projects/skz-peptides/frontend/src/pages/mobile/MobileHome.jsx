import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Truck, Info, Package, Zap } from 'lucide-react'
import { products } from '../../data/products'
import MobileProductCard from '../../components/mobile/MobileProductCard'

const MobileHome = () => {
  const featuredProducts = products.slice(0, 6)
  const categories = [
    { id: 'Weight Management', name: 'Weight Management', icon: Zap, color: 'bg-blue-500' },
    { id: 'Healing', name: 'Healing & Recovery', icon: Shield, color: 'bg-green-500' },
    { id: 'Anti-Aging', name: 'Anti-Aging', icon: Package, color: 'bg-purple-500' },
    { id: 'Supplies', name: 'Supplies', icon: Package, color: 'bg-gray-500' },
  ]

  return (
    <div className="lg:hidden min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Hero Section - Mobile Optimized */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white px-4 py-8" style={{ background: 'linear-gradient(135deg, #1E1028 0%, #2D1B69 50%, #1E1028 100%)' }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-3">
            Research Peptides for 
            <span className="block" style={{ color: '#C4B5FD' }}>Scientific Studies</span>
          </h1>
          <p className="mb-6 text-sm leading-relaxed" style={{ color: '#9CA3AF' }}>
            Quality peptides with proper documentation and straightforward ordering.
          </p>
          
          <div className="flex flex-col space-y-3">
            <Link
              to="/products"
              className="font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              style={{ background: '#7C3AED', color: '#FFFFFF' }}
            >
              <span>Browse Products</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            
            <Link
              to="/about"
              className="font-medium py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center"
              style={{ background: 'transparent', border: '1px solid #A78BFA', color: '#A78BFA' }}
            >
              <Info className="w-5 h-5 mr-2" />
              <span>About Us</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="px-4 py-6 bg-white dark:bg-gray-800">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center dark:bg-[rgba(167,139,250,0.08)]">
              <Shield className="w-6 h-6 text-primary-600 dark:text-[#A78BFA]" />
            </div>
            <p className="text-xs font-medium text-gray-600 dark:text-[#9CA3AF]">Documented Quality</p>
          </div>
          <div className="p-3">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center dark:bg-[rgba(167,139,250,0.08)]">
              <Truck className="w-6 h-6 text-primary-600 dark:text-[#A78BFA]" />
            </div>
            <p className="text-xs font-medium text-gray-600 dark:text-[#9CA3AF]">Fast Shipping</p>
          </div>
          <div className="p-3">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center dark:bg-[rgba(167,139,250,0.08)]">
              <Info className="w-6 h-6 text-primary-600 dark:text-[#A78BFA]" />
            </div>
            <p className="text-xs font-medium text-gray-600 dark:text-[#9CA3AF]">Expert Support</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Shop by Category</h2>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.id}
                to={`/products?category=${encodeURIComponent(category.id)}`}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
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
            )
          })}
        </div>
      </section>

      {/* Free Gift Promo */}
      <section className="px-4 py-6">
        <div className="p-4 rounded-xl" style={{ 
          background: 'rgba(34, 197, 94, 0.1)', 
          border: '1px solid rgba(34, 197, 94, 0.2)' 
        }}>
          <div className="text-center">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              🎁 FREE Gift with Every Peptide
            </h3>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full mb-1 flex items-center justify-center" 
                     style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)' }}>
                  <span className="text-xs">💧</span>
                </div>
                <span style={{ color: '#22C55E', fontSize: '0.7rem' }}>BAC Water</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full mb-1 flex items-center justify-center" 
                     style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)' }}>
                  <span className="text-xs">💉</span>
                </div>
                <span style={{ color: '#22C55E', fontSize: '0.7rem' }}>Syringe</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full mb-1 flex items-center justify-center" 
                     style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)' }}>
                  <span className="text-xs">🧽</span>
                </div>
                <span style={{ color: '#22C55E', fontSize: '0.7rem' }}>Alcohol Swab</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Featured Products</h2>
          <Link
            to="/products"
            className="text-primary-600 dark:text-purple-400 text-sm font-medium flex items-center"
          >
            View All
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {featuredProducts.map((product) => (
            <MobileProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-4 py-6 bg-white dark:bg-gray-800">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="space-y-3">
          <Link
            to="/about"
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">About SKZ Peptides</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Learn about our approach</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </Link>
          
          <Link
            to="/products"
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#1E1E2E] rounded-lg"
          >
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Browse All Products</h3>
              <p className="text-sm text-gray-600 dark:text-[#9CA3AF]">View our complete catalog</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default MobileHome