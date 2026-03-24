import { Package, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

const fmt = (n) => `MYR ${n.toFixed(2)}`

const AdminDashboard = () => {
  const { stats } = useAdmin()

  const cards = [
    { label: 'Total Units', value: stats.totalUnits, icon: Package, color: 'blue' },
    { label: 'Inventory Value', value: fmt(stats.totalValue), icon: DollarSign, color: 'green' },
    { label: 'Profit Potential', value: fmt(stats.totalProfit), icon: TrendingUp, color: 'purple' },
    { label: 'Low Stock Items', value: stats.lowStockCount, icon: AlertTriangle, color: 'red' },
  ]

  const colorMap = {
    blue: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    green: 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    purple: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    red: 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400',
  }

  const iconColorMap = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    purple: 'text-purple-600 dark:text-purple-400',
    red: 'text-red-600 dark:text-red-400',
  }

  const maxCategoryStock = Math.max(...Object.values(stats.stockByCategory), 1)

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(card => {
          const Icon = card.icon
          return (
            <div key={card.label} className={`${colorMap[card.color]} p-5 rounded-xl`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-80">{card.label}</p>
                  <p className="text-2xl font-bold mt-1">{card.value}</p>
                </div>
                <Icon className={`w-8 h-8 ${iconColorMap[card.color]} opacity-60`} />
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock by Category */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Stock by Category</h3>
          <div className="space-y-4">
            {Object.entries(stats.stockByCategory).map(([cat, count]) => (
              <div key={cat}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-300">{cat}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{count} units</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-purple-600 h-2.5 rounded-full transition-all"
                    style={{ width: `${(count / maxCategoryStock) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Low Stock Alerts</h3>
          {stats.lowStockProducts.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">All products are well stocked</p>
          ) : (
            <div className="space-y-3">
              {stats.lowStockProducts.map(p => (
                <div key={p.id} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{p.name}</span>
                  <span className="text-sm font-bold text-red-600 dark:text-red-400">{p.inStock} left</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Financial Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Cost</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{fmt(stats.totalCost)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Revenue Potential</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{fmt(stats.totalValue)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Profit Potential</p>
            <p className="text-lg font-bold text-green-600">{fmt(stats.totalProfit)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">ROI</p>
            <p className="text-lg font-bold text-purple-600">
              {stats.totalCost > 0 ? ((stats.totalProfit / stats.totalCost) * 100).toFixed(1) : 0}%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
