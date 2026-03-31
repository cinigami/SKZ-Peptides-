import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { products as defaultProducts } from '../data/products'
import { supabase } from '../lib/supabase'

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

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [syncStatus, setSyncStatus] = useState('disconnected') // 'disconnected', 'syncing', 'synced', 'error'

  // Load orders from Supabase on init
  const loadOrders = useCallback(async () => {
    if (!supabase) {
      // Fallback to localStorage
      setOrders(loadFromStorage(STORAGE_KEYS.ORDERS, []))
      setSyncStatus('disconnected')
      return
    }

    setLoading(true)
    setSyncStatus('syncing')
    
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      // Convert Supabase format back to app format
      const formattedOrders = data.map(order => ({
        id: order.id,
        customerName: order.customer_name,
        customerPhone: order.customer_phone,
        notes: order.notes,
        items: order.items,
        total: parseFloat(order.total),
        status: order.status,
        createdAt: order.created_at,
      }))

      setOrders(formattedOrders)
      setSyncStatus('synced')
      
      // Also save to localStorage as backup
      saveToStorage(STORAGE_KEYS.ORDERS, formattedOrders)
      
    } catch (error) {
      console.error('Error loading orders:', error)
      // Fallback to localStorage
      setOrders(loadFromStorage(STORAGE_KEYS.ORDERS, []))
      setSyncStatus('error')
    } finally {
      setLoading(false)
    }
  }, [])

  // Load orders on mount and when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadOrders()
    }
  }, [isAuthenticated, loadOrders])

  // Persist products (keep localStorage for now)
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PRODUCTS, products)
  }, [products])

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
    setOrders([])
  }, [])

  // Product CRUD (keep existing localStorage logic)
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

  // Orders with Supabase sync
  const addOrder = useCallback(async (order) => {
    const newOrder = {
      ...order,
      id: `ORD-${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    }

    // Optimistic update
    setOrders(prev => [newOrder, ...prev])
    
    // Deduct stock for each product in the order
    if (order.items && Array.isArray(order.items)) {
      order.items.forEach(item => {
        setProducts(prev => prev.map(p => {
          if (p.id !== item.id) return p
          return { ...p, inStock: Math.max(0, p.inStock - item.qty) }
        }))
      })
    }

    // Sync to Supabase
    if (supabase) {
      setSyncStatus('syncing')
      try {
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

        if (error) throw error
        setSyncStatus('synced')
        
        // Update localStorage backup
        const updatedOrders = [newOrder, ...orders]
        saveToStorage(STORAGE_KEYS.ORDERS, updatedOrders)
        
      } catch (error) {
        console.error('Error syncing order to Supabase:', error)
        setSyncStatus('error')
        // Keep the optimistic update, but save to localStorage
        const updatedOrders = [newOrder, ...orders]
        saveToStorage(STORAGE_KEYS.ORDERS, updatedOrders)
      }
    } else {
      // Fallback to localStorage
      const updatedOrders = [newOrder, ...orders]
      saveToStorage(STORAGE_KEYS.ORDERS, updatedOrders)
    }
  }, [orders])

  const updateOrderStatus = useCallback(async (orderId, status) => {
    // Optimistic update
    setOrders(prev => prev.map(o =>
      o.id === orderId ? { ...o, status } : o
    ))

    // Sync to Supabase
    if (supabase) {
      setSyncStatus('syncing')
      try {
        const { error } = await supabase
          .from('orders')
          .update({ 
            status,
            updated_at: new Date().toISOString()
          })
          .eq('id', orderId)

        if (error) throw error
        setSyncStatus('synced')
        
      } catch (error) {
        console.error('Error updating order status:', error)
        setSyncStatus('error')
      }
    }

    // Always update localStorage backup
    const updatedOrders = orders.map(o => o.id === orderId ? { ...o, status } : o)
    saveToStorage(STORAGE_KEYS.ORDERS, updatedOrders)
  }, [orders])

  const deleteOrder = useCallback(async (orderId) => {
    // Optimistic update
    setOrders(prev => prev.filter(o => o.id !== orderId))

    // Sync to Supabase
    if (supabase) {
      setSyncStatus('syncing')
      try {
        const { error } = await supabase
          .from('orders')
          .delete()
          .eq('id', orderId)

        if (error) throw error
        setSyncStatus('synced')
        
      } catch (error) {
        console.error('Error deleting order:', error)
        setSyncStatus('error')
      }
    }

    // Always update localStorage backup
    const updatedOrders = orders.filter(o => o.id !== orderId)
    saveToStorage(STORAGE_KEYS.ORDERS, updatedOrders)
  }, [orders])

  // Force sync from Supabase
  const forceSync = useCallback(async () => {
    await loadOrders()
  }, [loadOrders])

  // Export/Import (enhanced with sync status)
  const exportData = useCallback(() => {
    const data = { 
      products, 
      orders, 
      exportedAt: new Date().toISOString(),
      syncStatus,
      supabaseEnabled: !!supabase
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
      isAuthenticated, login, logout,
      products, updateProduct, addProduct, deleteProduct, resetProducts, adjustStock,
      orders, addOrder, updateOrderStatus, deleteOrder, forceSync,
      loading, syncStatus,
      stats, exportData, importData,
    }}>
      {children}
    </AdminContext.Provider>
  )
}