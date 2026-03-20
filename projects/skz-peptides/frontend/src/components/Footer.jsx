import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Shield, Truck, Award } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary-600 dark:bg-[#A78BFA] text-white p-2 rounded-lg font-bold text-lg">
                SKZ
              </div>
              <span className="text-xl font-bold">Peptides</span>
            </div>
            <p className="text-gray-400 mb-4">
              Research peptides for scientific purposes. 
              Straightforward ordering, reliable shipping.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="footer-icon w-4 h-4 text-gray-400 dark:text-purple-400" />
                <span>support@skzpeptides.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="footer-icon w-4 h-4 text-gray-400 dark:text-purple-400" />
                <span>+60 12-345 6789</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="footer-icon w-4 h-4 text-gray-400 dark:text-purple-400" />
                <span>Kuala Lumpur, Malaysia</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Info</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/products?category=Growth%20Hormone" className="hover:text-white transition-colors">Growth Hormone</Link></li>
              <li><Link to="/products?category=Healing" className="hover:text-white transition-colors">Healing & Recovery</Link></li>
              <li><Link to="/products?category=Cosmetic" className="hover:text-white transition-colors">Cosmetic</Link></li>
              <li><Link to="/products?category=Supplies" className="hover:text-white transition-colors">Supplies</Link></li>
            </ul>
          </div>

          {/* Trust Badges */}
          <div>
            <h3 className="font-semibold mb-4">Why Choose Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Shield className="footer-icon w-5 h-5 text-primary-500 dark:text-purple-400" />
                <span className="text-sm text-gray-400">Secure Payments</span>
              </div>
              <div className="flex items-center space-x-3">
                <Truck className="footer-icon w-5 h-5 text-primary-500 dark:text-purple-400" />
                <span className="text-sm text-gray-400">Fast Shipping</span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="footer-icon w-5 h-5 text-primary-500 dark:text-purple-400" />
                <span className="text-sm text-gray-400">Documented Quality</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2024 SKZ Peptides. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/disclaimer" className="text-sm text-gray-400 hover:text-white transition-colors">
                Disclaimer
              </Link>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500 text-center">
            <p>
              ⚠️ These products are for research purposes only. Not for human consumption. 
              Consult a healthcare professional before use.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer