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
      {/* Hero Section - New Structure */}
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
        
        {/* Content with left padding */}
        <div style={{ paddingLeft: '36px', paddingRight: '16px' }}>
          {/* Origin label */}
          <div className="mb-4">
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
          </div>
          
          {/* Main heading */}
          <div className="mb-6">
            <h1 
              className="font-bold leading-tight"
              style={{
                fontSize: '2.2rem',
                color: '#FFFFFF',
                letterSpacing: '-0.03em',
                lineHeight: '1.1'
              }}
            >
              Research
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
              Peptides.
            </h1>
          </div>
          
          {/* Subtitle */}
          <p 
            className="mb-8 leading-relaxed max-w-sm"
            style={{
              fontSize: '0.95rem',
              color: '#8A8599'
            }}
          >
            Quality peptides with <span className="font-bold" style={{ color: '#C4B5FD' }}>real documentation</span> and honest pricing. No middlemen, no mystery sourcing. Just what you need, properly handled.
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col space-y-3 mb-8">
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

      {/* Free Promotions */}
      <section className="px-4 py-6 space-y-4">
        {/* FREE Essential Kit - Professional Design */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4">
            <h3 className="font-bold text-gray-900 text-center mb-2">
              FREE Essential Kit
            </h3>
            <p className="text-xs text-gray-600 text-center mb-3">
              Complete research supplies included with every peptide purchase
            </p>
          </div>
          
          <div className="p-4 bg-white">
            <div className="space-y-3">
              {/* Bacteriostatic Water */}
              <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-4 bg-blue-400 rounded-sm"></div>
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-xs">Bacteriostatic Water</p>
                  <p className="text-gray-500 text-xs">3ml sterile vial</p>
                </div>
              </div>
              
              {/* Insulin Syringe */}
              <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-4 h-1 bg-gray-600 rounded-full"></div>
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-xs">Insulin Syringe</p>
                  <p className="text-gray-500 text-xs">1ml precision dosing</p>
                </div>
              </div>
              
              {/* Alcohol Swab */}
              <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white border border-gray-300 rounded"></div>
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-xs">Alcohol Prep Pad</p>
                  <p className="text-gray-500 text-xs">Sterile 70% isopropyl</p>
                </div>
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