import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import MobileHeader from './mobile/MobileHeader'
import Footer from './Footer'
import WhatsAppFloatingButton from './WhatsAppFloatingButton'
import { useCart } from '../context/CartContext'
import { ShoppingCart, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const ResponsiveLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()
  const { toast } = useCart()

  // Hide floating WA button on product detail & cart pages (they have their own WA buttons)
  const hideFloatingWA = isMobile && (
    location.pathname.startsWith('/product/') ||
    location.pathname === '/cart' ||
    location.pathname === '/checkout'
  )

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Conditional Header */}
      {isMobile ? <MobileHeader /> : <Header />}

      {/* Main Content */}
      <main className={`${isMobile ? 'pb-16' : ''}`}>
        {children}
      </main>

      {/* Footer - hide on mobile for bottom nav */}
      {!isMobile && <Footer />}

      {/* Floating WhatsApp Button - hidden on pages with their own WA buttons */}
      {!hideFloatingWA && <WhatsAppFloatingButton />}

      {/* Cart Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999]"
          >
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg border border-purple-100" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
              <p className="text-white font-medium text-sm">{toast.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ResponsiveLayout