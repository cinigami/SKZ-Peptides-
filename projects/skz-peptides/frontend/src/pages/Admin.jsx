import { useState, useRef } from 'react'
import { LayoutDashboard, Package, ShoppingBag, ClipboardList, TrendingUp, LogOut, Download, Upload } from 'lucide-react'
// Switch between old localStorage-only and new Supabase-synced context
// Now using auto-sync version - seamless background sync!
import { AdminProvider, useAdmin } from '../context/AdminContextAutoSync'
import AdminLogin from '../components/admin/AdminLogin'
import AdminDashboard from '../components/admin/AdminDashboard'
import AdminInventory from '../components/admin/AdminInventory'
import AdminProducts from '../components/admin/AdminProducts'
import AdminOrders from '../components/admin/AdminOrders'
import AdminSales from '../components/admin/AdminSales'

const tabs = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'inventory', name: 'Inventory', icon: Package },
  { id: 'products', name: 'Products', icon: ShoppingBag },
  { id: 'orders', name: 'Orders', icon: ClipboardList },
  { id: 'sales', name: 'Sales', icon: TrendingUp },
]

function AdminPanel() {
  const { isAuthenticated, login, logout, exportData, importData } = useAdmin()
  const [activeTab, setActiveTab] = useState('dashboard')
  const fileInputRef = useRef(null)

  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} />
  }

  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const success = importData(ev.target.result)
      if (!success) alert('Invalid backup file')
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">SK</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">SKZ Admin</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={exportData}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Export data"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Import data"
              >
                <Upload className="w-5 h-5" />
              </button>
              <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
              <button
                onClick={logout}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 overflow-x-auto scrollbar-hide -mb-px">
            {tabs.map(tab => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                    isActive
                      ? 'border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && <AdminDashboard />}
        {activeTab === 'inventory' && <AdminInventory />}
        {activeTab === 'products' && <AdminProducts />}
        {activeTab === 'orders' && <AdminOrders />}
        {activeTab === 'sales' && <AdminSales />}
      </div>
    </div>
  )
}

const Admin = () => (
  <AdminProvider>
    <AdminPanel />
  </AdminProvider>
)

export default Admin
