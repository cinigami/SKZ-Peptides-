import { useState, useEffect } from 'react'
import { Search, X, Truck } from 'lucide-react'
import { products } from '../../data/products'
import MobileProductCard from '../../components/mobile/MobileProductCard'
import { motion } from 'framer-motion'

const MobileProducts = () => {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const categories = [...new Set(products.map(product => product.category))]

  useEffect(() => {
    let filtered = products

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    setFilteredProducts(filtered)
  }, [searchTerm, selectedCategory])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
  }

  const hasActiveFilters = searchTerm || selectedCategory

  return (
    <div className="lg:hidden min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 px-4 py-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">All Products</h1>
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
            <Truck className="w-3.5 h-3.5" style={{ color: '#7C3AED' }} />
            <span>Free shipping above RM100</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Horizontal Scrolling Category Chips */}
        <div className="flex items-center space-x-1.5 overflow-x-auto -mx-4 px-4 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
          <button
            onClick={() => setSelectedCategory('')}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
            style={{
              backgroundColor: !selectedCategory ? '#7C3AED' : 'transparent',
              color: !selectedCategory ? '#FFFFFF' : '#6B7280',
              border: !selectedCategory ? 'none' : '1px solid #D1D5DB',
              minHeight: '30px'
            }}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(selectedCategory === category ? '' : category)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap"
              style={{
                backgroundColor: selectedCategory === category ? '#7C3AED' : 'transparent',
                color: selectedCategory === category ? '#FFFFFF' : '#6B7280',
                border: selectedCategory === category ? 'none' : '1px solid #D1D5DB',
                minHeight: '30px'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-2">
          <span className="text-xs text-gray-400">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Products Grid - 2 Column */}
      <div className="px-4 py-4">
        {filteredProducts.length > 0 ? (
          <motion.div
            className="grid grid-cols-2 gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <MobileProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <Search className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No products found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Try adjusting your search or category
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="font-medium"
                style={{ color: '#7C3AED' }}
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default MobileProducts
