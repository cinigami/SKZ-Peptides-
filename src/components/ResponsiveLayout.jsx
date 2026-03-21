import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import MobileHeader from './mobile/MobileHeader'
import Footer from './Footer'
import WhatsAppFloatingButton from './WhatsAppFloatingButton'

const ResponsiveLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()

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
    </div>
  )
}

export default ResponsiveLayout