import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { ThemeProvider } from './context/ThemeContext'
import HeaderModern from './components/HeaderModern'
import Footer from './components/Footer'
import HomeModern from './pages/HomeModern'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Protocols from './pages/Protocols'
import About from './pages/About'
import Admin from './pages/Admin'

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
              <HeaderModern />
              <main className="flex-1 pt-20 bg-white dark:bg-gray-900">
                <Routes>
                  <Route path="/" element={<HomeModern />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/protocols" element={<Protocols />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/admin" element={<Admin />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App