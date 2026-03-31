import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { products as defaultProducts } from '../data/products'
import { supabase, testConnection } from '../lib/supabase-clean'

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

  // Products (keep localStorage for now)
  const [products, setProducts] = useState(() => {
    const saved = loadFromStorage(STORAGE_KEYS.PRODUCTS, null)
    if (saved) return saved
    return defaultProducts.map(p => ({ ...p }))
  })

  // Orders with Supabase
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [syncStatus, setSyncStatus] = useState('disconnected')
  const [connectionTested, setConnectionTested] = useState(false)

  // Test connection on mount
  useEffect(() => {
    if (!connectionTested) {
      testConnection().then(success => {
        setSyncStatus(success ? 'synced' : 'error')
        setConnectionTested(true)
      })
    }
  }, [connectionTested])

  // Load orders from Supabase
  const loadOrders = useCallback(async () => {
    console.log('Loading orders from Supabase...')
    setLoading(true)
    setSyncStatus('syncing')
    
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error loading orders:', error)
        throw error
      }

      console.log('Loaded orders:', data)

      // Convert Supabase format to app format
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
      setSyncStatus('synced')
      
      // Backup to localStorage
      saveToStorage(STORAGE_KEYS.ORDERS, formattedOrders)
      
    } catch (error) {
      console.error('Failed to load orders from Supabase:', error)
      // Fallback to localStorage
      const localOrders = loadFromStorage(STORAGE_KEYS.ORDERS, [])
      setOrders(localOrders)
      setSyncStatus('error')
    } finally {
      setLoading(false)
    }
  }, [])

  // Load orders when authenticated
  useEffect(() => {
    if (isAuthenticated && connectionTested) {
      loadOrders()
    }
  }, [isAuthenticated, connectionTested, loadOrders])

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

  // Order management with Supabase sync
  const addOrder = useCallback(async (order) => {
    console.log('Adding order:', order)
    
    const newOrder = {
      ...order,
      id: `ORD-${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    }

    // Optimistic update
    setOrders(prev => [newOrder, ...prev])

    try {
      setSyncStatus('syncing')
      
      const { error } = await supabase
        .from('orders')
        .insert([{
          id: newOrder.id,
          customer_name: newOrder.customerName,
          customer_phone: newOrder.customerPhone,
          notes: newOrder.notes,
          items: newOrder.items,
          total: newOrder.total,
          status: newOrder.status,
          created_at: newOrder.createdAt,
        }])

      if (error) {
        console.error('Error adding order to Supabase:', error)
        throw error
      }

      console.log('Order added to Supabase successfully')
      setSyncStatus('synced')
      
      // Update localStorage backup
      const updatedOrders = [newOrder, ...orders]
      saveToStorage(STORAGE_KEYS.ORDERS, updatedOrders)
      
    } catch (error) {
      console.error('Failed to sync order to Supabase:', error)
      setSyncStatus('error')
      // Keep optimistic update but save to localStorage
      const updatedOrders = [newOrder, ...orders]
      saveToStorage(STORAGE_KEYS.ORDERS, updatedOrders)
    }

    // Deduct stock
    if (order.items && Array.isArray(order.items)) {
      order.items.forEach(item => {
        adjustStock(item.id, -item.qty)
      })
    }
  }, [orders, adjustStock])

  const updateOrderStatus = useCallback(async (orderId, status) => {
    console.log('Updating order status:', orderId, status)
    
    // Optimistic update
    setOrders(prev => prev.map(o =>
      o.id === orderId ? { ...o, status } : o
    ))

    try {
      setSyncStatus('syncing')
      
      const { error } = await supabase
        .from('orders')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)

      if (error) {
        console.error('Error updating order status:', error)
        throw error
      }

      console.log('Order status updated successfully')
      setSyncStatus('synced')
      
    } catch (error) {
      console.error('Failed to update order status:', error)
      setSyncStatus('error')
    }

    // Always update localStorage
    const updatedOrders = orders.map(o => o.id === orderId ? { ...o, status } : o)
    saveToStorage(STORAGE_KEYS.ORDERS, updatedOrders)
  }, [orders])

  const deleteOrder = useCallback(async (orderId) => {
    console.log('Deleting order:', orderId)
    
    // Optimistic update
    setOrders(prev => prev.filter(o => o.id !== orderId))

    try {
      setSyncStatus('syncing')
      
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId)

      if (error) {
        console.error('Error deleting order:', error)
        throw error
      }

      console.log('Order deleted successfully')
      setSyncStatus('synced')
      
    } catch (error) {
      console.error('Failed to delete order:', error)
      setSyncStatus('error')
    }

    // Always update localStorage
    const updatedOrders = orders.filter(o => o.id !== orderId)
    saveToStorage(STORAGE_KEYS.ORDERS, updatedOrders)
  }, [orders])

  const forceSync = useCallback(async () => {
    await loadOrders()
  }, [loadOrders])

  // Export/Import
  const exportData = useCallback(() => {
    const data = { 
      products, 
      orders, 
      exportedAt: new Date().toISOString(),
      syncStatus,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `skz-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [products, orders, syncStatus])

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
      loading, syncStatus,
      
      // Utilities
      stats, exportData, importData,
    }}>
      {children}
    </AdminContext.Provider>
  )
}