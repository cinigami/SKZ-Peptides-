import { useState, useEffect } from 'react'
import { supabase, testConnection } from '../lib/supabase-clean'

const TestSupabase = () => {
  const [status, setStatus] = useState('testing...')
  const [orders, setOrders] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const runTest = async () => {
      try {
        console.log('Testing Supabase connection...')
        
        // Test 1: Basic connection
        const connected = await testConnection()
        if (!connected) {
          setStatus('❌ Connection failed')
          return
        }
        
        setStatus('✅ Connected! Testing orders table...')
        
        // Test 2: Query orders table
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .limit(5)
        
        if (error) {
          console.error('Query error:', error)
          setError(error.message)
          setStatus('❌ Query failed')
          return
        }
        
        console.log('Query successful:', data)
        setOrders(data || [])
        setStatus(`✅ Success! Found ${data?.length || 0} orders`)
        
      } catch (err) {
        console.error('Test error:', err)
        setError(err.message)
        setStatus('❌ Test failed')
      }
    }
    
    runTest()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Supabase Connection Test
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
          <p className="text-lg">{status}</p>
          
          {error && (
            <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>

        {orders.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Orders Found ({orders.length})</h2>
            <div className="space-y-2">
              {orders.map(order => (
                <div key={order.id} className="p-3 border rounded">
                  <p><strong>ID:</strong> {order.id}</p>
                  <p><strong>Customer:</strong> {order.customer_name}</p>
                  <p><strong>Status:</strong> {order.status}</p>
                  <p><strong>Total:</strong> ${order.total}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <a 
            href="/admin" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Go to Admin Panel
          </a>
        </div>
      </div>
    </div>
  )
}

export default TestSupabase