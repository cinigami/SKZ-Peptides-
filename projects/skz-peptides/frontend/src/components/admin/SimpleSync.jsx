import { useState } from 'react'
import { Upload, Download, RefreshCw, Wifi } from 'lucide-react'
import { supabase } from '../../lib/supabase-clean'

const SimpleSync = ({ orders, onSyncComplete }) => {
  const [syncing, setSyncing] = useState(false)
  const [lastSync, setLastSync] = useState(null)

  // Push orders to Supabase
  const pushToSupabase = async () => {
    setSyncing(true)
    try {
      // Clear existing orders first
      await supabase.from('orders').delete().neq('id', 'dummy-never-exists')
      
      // Insert all current orders
      if (orders.length > 0) {
        const supabaseOrders = orders.map(order => ({
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
      
      setLastSync(new Date().toLocaleString())
      onSyncComplete?.('success', `✅ Pushed ${orders.length} orders to cloud`)
      
    } catch (error) {
      console.error('Push error:', error)
      onSyncComplete?.('error', `❌ Push failed: ${error.message}`)
    }
    setSyncing(false)
  }

  // Pull orders from Supabase (updates localStorage, requires page refresh)
  const pullFromSupabase = async () => {
    setSyncing(true)
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      // Convert to app format and save to localStorage
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
      
      setLastSync(new Date().toLocaleString())
      onSyncComplete?.('success', `✅ Pulled ${formattedOrders.length} orders. Refresh page to see them!`)
      
    } catch (error) {
      console.error('Pull error:', error)
      onSyncComplete?.('error', `❌ Pull failed: ${error.message}`)
    }
    setSyncing(false)
  }

  return (
    <div className="flex items-center gap-2 text-xs bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
      <div className="flex items-center gap-1">
        <Wifi className="w-3 h-3 text-blue-500" />
        <span className="text-gray-600 dark:text-gray-400 font-medium">Cloud</span>
      </div>
      
      <button
        onClick={pullFromSupabase}
        disabled={syncing}
        className="flex items-center gap-1 px-2 py-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded"
        title="Download orders from cloud"
      >
        <Download className="w-3 h-3" />
        Pull
      </button>
      
      <button
        onClick={pushToSupabase}
        disabled={syncing}
        className="flex items-center gap-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded"
        title="Upload orders to cloud"
      >
        <Upload className="w-3 h-3" />
        Push
      </button>

      {syncing && (
        <RefreshCw className="w-3 h-3 animate-spin text-blue-500" />
      )}

      {lastSync && (
        <span className="text-xs text-gray-500 ml-2">
          {lastSync.split(' ')[1]}
        </span>
      )}
    </div>
  )
}

export default SimpleSync