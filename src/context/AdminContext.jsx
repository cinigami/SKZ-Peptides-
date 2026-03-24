import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { products as defaultProducts } from '../data/products'

const AdminContext = createContext()

const STORAGE_KEYS = {
  PRODUCTS: 'skz_admin_products',
  ORDERS: 'skz_admin_orders',
  AUTH: 'skz_admin_auth',
}

const PASSWORD = 'skz2026'

function loadFromStorage(key, fallback) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : fallback
  } catch {
    return fallback
  }
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    console.error('Failed to save to localStorage:', e)
  }
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) throw new Error('useAdmin must be used within AdminProvider')
  return context
}

export function AdminProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(STORAGE_KEYS.AUTH) === 'true'
  })

  const [products, setProducts] = useState(() => {
    const saved = loadFromStorage(STORAGE_KEYS.PRODUCTS, null)
    if (saved) return saved
    return defaultProducts.map(p => ({ ...p }))
  })

  const [orders, setOrders] = useState(() => {
    return loadFromStorage(STORAGE_KEYS.ORDERS, [])
  })

  // Persist products
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PRODUCTS, products)
  }, [products])

  // Persist orders
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.ORDERS, orders)
  }, [orders])

  // Auth
  const login = useCallback((password) => {
    if (password === PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem(STORAGE_KEYS.AUTH, 'true')
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    sessionStorage.removeItem(STORAGE_KEYS.AUTH)
  }, [])

  // Product CRUD
  const updateProduct = useCallback((id, updates) => {
    setProducts(prev => prev.map(p => {
      if (p.id !== id) return p
      const updated = { ...p, ...updates }
      updated.profit = +(updated.price - updated.cost).toFixed(2)
      return updated
    }))
  }, [])

  const addProduct = useCallback((product) => {
    const id = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const newProduct = {
      ...product,
      id,
      profit: +(product.price - product.cost).toFixed(2),
      features: product.features || [],
      benefits: product.benefits || [],
      image: product.image || '/images/placeholder.png',
    }
    setProducts(prev => [...prev, newProduct])
  }, [])

  const deleteProduct = useCallback((id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }, [])

  const resetProducts = useCallback(() => {
    const fresh = defaultProducts.map(p => ({ ...p }))
    setProducts(fresh)
    saveToStorage(STORAGE_KEYS.PRODUCTS, fresh)
  }, [])

  // Stock helpers
  const adjustStock = useCallback((id, delta) => {
    setProducts(prev => prev.map(p => {
      if (p.id !== id) return p
      return { ...p, inStock: Math.max(0, p.inStock + delta) }
    }))
  }, [])

  // Orders
  const addOrder = useCallback((order) => {
    const newOrder = {
      ...order,
      id: `ORD-${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    }
    setOrders(prev => [newOrder, ...prev])
  }, [])

  const updateOrderStatus = useCallback((orderId, status) => {
    setOrders(prev => prev.map(o =>
      o.id === orderId ? { ...o, status } : o
    ))
  }, [])

  const deleteOrder = useCallback((orderId) => {
    setOrders(prev => prev.filter(o => o.id !== orderId))
  }, [])

  // Export/Import
  const exportData = useCallback(() => {
    const data = { products, orders, exportedAt: new Date().toISOString() }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `skz-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [products, orders])

  const importData = useCallback((jsonString) => {
    try {
      const data = JSON.parse(jsonString)
      if (data.products) setProducts(data.products)
      if (data.orders) setOrders(data.orders)
      return true
    } catch {
      return false
    }
  }, [])

  // Computed stats
  const stats = {
    totalProducts: products.length,
    totalUnits: products.reduce((s, p) => s + p.inStock, 0),
    totalValue: products.reduce((s, p) => s + p.price * p.inStock, 0),
    totalCost: products.reduce((s, p) => s + p.cost * p.inStock, 0),
    totalProfit: products.reduce((s, p) => s + (p.price - p.cost) * p.inStock, 0),
    lowStockCount: products.filter(p => p.inStock <= 5).length,
    lowStockProducts: products.filter(p => p.inStock <= 5),
    categories: [...new Set(products.map(p => p.category))],
    stockByCategory: products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + p.inStock
      return acc
    }, {}),
    orderCount: orders.length,
    pendingOrders: orders.filter(o => o.status === 'Pending').length,
  }

  return (
    <AdminContext.Provider value={{
      isAuthenticated, login, logout,
      products, updateProduct, addProduct, deleteProduct, resetProducts, adjustStock,
      orders, addOrder, updateOrderStatus, deleteOrder,
      stats, exportData, importData,
    }}>
      {children}
    </AdminContext.Provider>
  )
}
