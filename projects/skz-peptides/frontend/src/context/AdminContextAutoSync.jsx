import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { products as defaultProducts } from '../data/products'
import { supabase } from '../lib/supabase-clean'

const AdminContext = createContext()

const STORAGE_KEYS = {
  PRODUCTS: 'skz_admin_products',
  ORDERS: 'skz_admin_orders',
  AUTH: 'skz_admin_auth',
}

const PASSWORD = 'skz2026'

// Helper functions
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

  // Products (keep localStorage)
  const [products, setProducts] = useState(() => {
    const saved = loadFromStorage(STORAGE_KEYS.PRODUCTS, null)
    if (saved) return saved
    return defaultProducts.map(p => ({ ...p }))
  })

  // Orders with auto-sync
  const [orders, setOrders] = useState(() => {
    return loadFromStorage(STORAGE_KEYS.ORDERS, [])
  })
  
  const [syncStatus, setSyncStatus] = useState('disconnected')
  const [lastSync, setLastSync] = useState(null)

  // Auto-sync: Pull from Supabase on load and periodically
  const pullFromSupabase = useCallback(async () => {
    try {
      setSyncStatus('syncing')
      
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      // Convert to app format
      const formattedOrders = (data || []).map(order => ({
        id: order.id,
        customerName: order.customer_name,
        customerPhone: order.customer_phone,
        notes: order.notes,
        items: order.items || [],
        total: parseFloat(order.total || 0),
        status: order.status,
        createdAt: order.created_at,
      }))

      setOrders(formattedOrders)
      saveToStorage(STORAGE_KEYS.ORDERS, formattedOrders)
      setSyncStatus('synced')
      setLastSync(new Date().toLocaleTimeString())
      
    } catch (error) {
      console.error('Auto-pull failed:', error)
      setSyncStatus('error')
    }
  }, [])

  // Auto-sync: Push to Supabase
  const pushToSupabase = useCallback(async (ordersToSync) => {
    try {
      setSyncStatus('syncing')
      
      // Clear and insert all orders
      await supabase.from('orders').delete().neq('id', 'dummy-never-exists')
      
      if (ordersToSync.length > 0) {
        const supabaseOrders = ordersToSync.map(order => ({
          id: order.id,
          customer_name: order.customerName,
          customer_phone: order.customerPhone || '',
          notes: order.notes || '',
          items: order.items || [],
          total: order.total || 0,
          status: order.status || 'Pending',
          created_at: order.createdAt || new Date().toISOString(),
        }))

        const { error } = await supabase.from('orders').insert(supabaseOrders)
        if (error) throw error
      }
      
      setSyncStatus('synced')
      setLastSync(new Date().toLocaleTimeString())
      
    } catch (error) {
      console.error('Auto-push failed:', error)
      setSyncStatus('error')
    }
  }, [])

  // Auto-sync on orders change
  useEffect(() => {
    if (isAuthenticated && orders.length >= 0) {
      const timeoutId = setTimeout(() => {
        pushToSupabase(orders)
      }, 1000) // Debounce for 1 second
      
      return () => clearTimeout(timeoutId)
    }
  }, [orders, isAuthenticated, pushToSupabase])

  // Auto-pull on mount and every 30 seconds
  useEffect(() => {
    if (isAuthenticated) {
      pullFromSupabase() // Initial load
      
      const interval = setInterval(() => {
        pullFromSupabase()
      }, 30000) // Every 30 seconds
      
      return () => clearInterval(interval)
    }
  }, [isAuthenticated, pullFromSupabase])

  // Auth functions
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
    setOrders([])
  }, [])

  // Product management (keep existing localStorage logic)
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

  const adjustStock = useCallback((id, delta) => {
    setProducts(prev => prev.map(p => {
      if (p.id !== id) return p
      return { ...p, inStock: Math.max(0, p.inStock + delta) }
    }))
  }, [])

  // Order management with auto-sync
  const addOrder = useCallback(async (order) => {
    const newOrder = {
      ...order,
      id: `ORD-${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    }

    // Update state (will trigger auto-push)
    setOrders(prev => [newOrder, ...prev])

    // Deduct stock
    if (order.items && Array.isArray(order.items)) {
      order.items.forEach(item => {
        adjustStock(item.id, -item.qty)
      })
    }
  }, [adjustStock])

  const updateOrderStatus = useCallback(async (orderId, status) => {
    // Update state (will trigger auto-push)
    setOrders(prev => prev.map(o =>
      o.id === orderId ? { ...o, status } : o
    ))
  }, [])

  const deleteOrder = useCallback(async (orderId) => {
    // Update state (will trigger auto-push)
    setOrders(prev => prev.filter(o => o.id !== orderId))
  }, [])

  // Manual sync functions
  const forceSync = useCallback(async () => {
    await pullFromSupabase()
  }, [pullFromSupabase])

  // Export/Import
  const exportData = useCallback(() => {
    const data = { 
      products, 
      orders, 
      exportedAt: new Date().toISOString(),
      syncStatus,
      lastSync,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `skz-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [products, orders, syncStatus, lastSync])

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

  // Persist products to localStorage
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PRODUCTS, products)
  }, [products])

  // Persist orders to localStorage
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.ORDERS, orders)
  }, [orders])

  // Stats
  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'Pending').length,
    totalRevenue: orders.reduce((sum, order) => sum + (order.total || 0), 0),
    totalProfit: orders.reduce((sum, order) => {
      if (!order.items) return sum
      return sum + order.items.reduce((orderProfit, item) => {
        const product = products.find(p => p.id === item.id)
        return orderProfit + (product?.profit || 0) * item.qty
      }, 0)
    }, 0),
  }

  return (
    <AdminContext.Provider value={{
      // Auth
      isAuthenticated, login, logout,
      
      // Products
      products, updateProduct, addProduct, deleteProduct, resetProducts, adjustStock,
      
      // Orders
      orders, addOrder, updateOrderStatus, deleteOrder, forceSync,
      
      // Sync state
      syncStatus, lastSync,
      
      // Utilities
      stats, exportData, importData,
    }}>
      {children}
    </AdminContext.Provider>
  )
}