import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { ThemeProvider } from './context/ThemeContext'
import ResponsiveLayout from './components/ResponsiveLayout'
import HomeModern from './pages/HomeModern'
import MobileHome from './pages/mobile/MobileHome'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Protocols from './pages/Protocols'
import About from './pages/About'
import Admin from './pages/Admin'
import { useEffect, useState } from 'react'

function App() {
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
    <ThemeProvider>
      <CartProvider>
          <Router>
            <ResponsiveLayout>
              <Routes>
                <Route path="/" element={isMobile ? <MobileHome /> : <HomeModern />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/protocols" element={<Protocols />} />
                <Route path="/about" element={<About />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </ResponsiveLayout>
          </Router>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App