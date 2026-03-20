import { useEffect, useState } from 'react'
import Header from './Header'
import MobileHeader from './mobile/MobileHeader'
import Footer from './Footer'

const ResponsiveLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false)

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
    </div>
  )
}

export default ResponsiveLayout