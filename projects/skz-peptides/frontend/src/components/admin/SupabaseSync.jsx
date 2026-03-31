import { useState } from 'react'
import { Upload, Download, RefreshCw, Wifi } from 'lucide-react'
import { supabase } from '../../lib/supabase-clean'

const SupabaseSync = ({ orders, setOrders, onSyncComplete }) => {
  const [syncing, setSyncing] = useState(false)
  const [lastSync, setLastSync] = useState(null)

  // Push orders to Supabase
  const pushToSupabase = async () => {
    setSyncing(true)
    try {
      // Clear existing orders
      await supabase.from('orders').delete().neq('id', 'dummy')
      
      // Insert all current orders
      const supabaseOrders = orders.map(order => ({
        id: order.id,
        customer_name: order.customerName,
        customer_phone: order.customerPhone,
        notes: order.notes,
        items: order.items,
        total: order.total,
        status: order.status,
        created_at: order.createdAt,
      }))

      const { error } = await supabase.from('orders').insert(supabaseOrders)
      
      if (error) throw error
      
      setLastSync(new Date().toLocaleString())
      onSyncComplete?.('success', `Pushed ${orders.length} orders to cloud`)
      
    } catch (error) {
      console.error('Push error:', error)
      onSyncComplete?.('error', `Push failed: ${error.message}`)
    }
    setSyncing(false)
  }

  // Pull orders from Supabase (manual refresh required)
  const pullFromSupabase = async () => {
    setSyncing(true)
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      // For now, just show success and ask user to refresh
      const count = (data || []).length
      setLastSync(new Date().toLocaleString())
      onSyncComplete?.('success', `Found ${count} orders in cloud. Please refresh page to see them.`)
      
      // Store in localStorage as backup
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
      
      localStorage.setItem('skz_admin_orders', JSON.stringify(formattedOrders))
      
    } catch (error) {
      console.error('Pull error:', error)
      onSyncComplete?.('error', `Pull failed: ${error.message}`)
    }
    setSyncing(false)
  }

  return (
    <div className="flex items-center gap-2 text-xs">
      <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
        <Wifi className="w-3 h-3 text-blue-500" />
        <span className="text-gray-600 dark:text-gray-400">Cloud Sync</span>
      </div>
      
      <button
        onClick={pullFromSupabase}
        disabled={syncing}
        className="flex items-center gap-1 px-2 py-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded text-xs"
        title="Pull orders from cloud"
      >
        <Download className="w-3 h-3" />
        Pull
      </button>
      
      <button
        onClick={pushToSupabase}
        disabled={syncing}
        className="flex items-center gap-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded text-xs"
        title="Push orders to cloud"
      >
        <Upload className="w-3 h-3" />
        Push
      </button>

      {syncing && (
        <RefreshCw className="w-3 h-3 animate-spin text-blue-500" />
      )}

      {lastSync && (
        <span className="text-xs text-gray-500">
          {lastSync}
        </span>
      )}
    </div>
  )
}

export default SupabaseSync