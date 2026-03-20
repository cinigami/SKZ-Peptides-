import { useState } from 'react'
import { BarChart3, Package, Users, TrendingUp } from 'lucide-react'
import InventoryTracker from '../components/InventoryTracker'
import { products } from '../data/products'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('inventory')

  const tabs = [
    { id: 'inventory', name: 'Inventory', icon: Package },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'orders', name: 'Orders', icon: Users },
    { id: 'performance', name: 'Performance', icon: TrendingUp }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-lg text-gray-600">
            Manage your SKZ Peptides business operations
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'inventory' && <InventoryTracker />}
          
          {activeTab === 'analytics' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Business Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-4">Sales by Category</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mitochondrial</span>
                      <span className="font-medium">35 units</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Healing</span>
                      <span className="font-medium">10 units</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Supplies</span>
                      <span className="font-medium">35 units</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-4">Top Products by Profit</h3>
                  <div className="space-y-3">
                    {products
                      .sort((a, b) => (b.profit * b.inStock) - (a.profit * a.inStock))
                      .slice(0, 5)
                      .map(product => (
                        <div key={product.id} className="flex justify-between">
                          <span className="text-gray-600 text-sm">{product.name}</span>
                          <span className="font-medium">MYR {(product.profit * product.inStock).toFixed(2)}</span>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Orders</h2>
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No orders yet. Start promoting your products!</p>
              </div>
            </div>
          )}
          
          {activeTab === 'performance' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Performance Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">61.48%</div>
                  <div className="text-gray-600">ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">MYR 2,572</div>
                  <div className="text-gray-600">Profit Potential</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">98</div>
                  <div className="text-gray-600">Total Units</div>
                </div>
              </div>
              

            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Admin