import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Truck, Award, Star, ChevronRight } from 'lucide-react'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import { motion } from 'framer-motion'

const Home = () => {
  const featuredProducts = products.slice(0, 4) // Top 4 products
  const topProfitProducts = products
    .sort((a, b) => b.profit - a.profit)
    .slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6">
              Premium Research Peptides
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Discover high-quality research peptides for fitness, wellness, and recovery. 
              Trusted by researchers worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                Shop Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/about" className="btn-secondary border border-white text-white hover:bg-white hover:text-primary-600">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <Shield className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">All products are research grade with purity certificates</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <Truck className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Same-day dispatch with cold chain delivery</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <Award className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Trusted Results</h3>
              <p className="text-gray-600">Thousands of satisfied researchers worldwide</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our most popular research peptides, trusted by fitness enthusiasts and researchers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/products" className="btn-primary">
              View All Products
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Top Profit Products - Business Focus */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Premium Collection</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our highest-grade research peptides for serious researchers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topProfitProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="card text-center"
              >
                <div className="relative mb-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/300x200/f3f4f6/9ca3af?text=${encodeURIComponent(product.name)}`
                    }}
                  />
                  <div className="absolute -top-2 -right-2 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Best Seller
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <div className="flex items-center justify-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">(4.9)</span>
                </div>

                <div className="text-2xl font-bold text-gray-900 mb-6">
                  MYR {product.price.toFixed(2)}
                </div>

                <Link
                  to={`/product/${product.id}`}
                  className="btn-primary w-full"
                >
                  Learn More
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Research?</h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of researchers who trust SKZ Peptides for premium quality products
          </p>
          <Link to="/products" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
            Shop All Products
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home