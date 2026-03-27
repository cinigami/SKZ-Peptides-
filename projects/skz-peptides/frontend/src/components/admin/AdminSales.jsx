import { useState } from 'react'
import { TrendingUp, DollarSign, Package, Calendar, Users, BarChart3 } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

const AdminSales = () => {
  const { orders, products } = useAdmin()
  const [dateRange, setDateRange] = useState('all') // all, today, week, month

  // Filter orders by date range
  const getFilteredOrders = () => {
    if (dateRange === 'all') return orders
    
    const now = new Date()
    const cutoff = new Date()
    
    switch (dateRange) {
      case 'today':
        cutoff.setHours(0, 0, 0, 0)
        break
      case 'week':
        cutoff.setDate(now.getDate() - 7)
        break
      case 'month':
        cutoff.setMonth(now.getMonth() - 1)
        break
      default:
        return orders
    }
    
    return orders.filter(order => new Date(order.createdAt) >= cutoff)
  }

  const filteredOrders = getFilteredOrders()

  // Calculate metrics
  const metrics = {
    totalRevenue: filteredOrders.reduce((sum, order) => sum + order.total, 0),
    totalOrders: filteredOrders.length,
    averageOrderValue: filteredOrders.length > 0 ? filteredOrders.reduce((sum, order) => sum + order.total, 0) / filteredOrders.length : 0,
    completedOrders: filteredOrders.filter(order => order.status === 'Delivered').length,
    pendingOrders: filteredOrders.filter(order => order.status === 'Pending').length,
  }

  // Product sales analysis
  const productSales = products.map(product => {
    const productOrders = filteredOrders.filter(order => 
      order.products && order.products.includes(product.name)
    )
    const totalSold = productOrders.reduce((sum, order) => {
      // Extract quantity from order products string (basic parsing)
      const match = order.products.match(new RegExp(`${product.name}\\s*x(\\d+)`, 'i'))
      return sum + (match ? parseInt(match[1]) : 0)
    }, 0)
    const revenue = totalSold * product.price
    
    return {
      ...product,
      unitsSold: totalSold,
      revenue: revenue,
      profit: totalSold * (product.price - product.cost),
    }
  }).sort((a, b) => b.revenue - a.revenue)

  // Top customers
  const customerAnalysis = filteredOrders.reduce((acc, order) => {
    if (!acc[order.customerName]) {
      acc[order.customerName] = {
        name: order.customerName,
        orders: 0,
        totalSpent: 0,
        phone: order.customerPhone,
      }
    }
    acc[order.customerName].orders += 1
    acc[order.customerName].totalSpent += order.total
    return acc
  }, {})

  const topCustomers = Object.values(customerAnalysis)
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 10)

  // Monthly trend (last 6 months)
  const monthlyTrend = []
  for (let i = 5; i >= 0; i--) {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    const monthName = date.toLocaleDateString('en', { month: 'short' })
    
    const monthOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt)
      return orderDate.getMonth() === date.getMonth() && orderDate.getFullYear() === date.getFullYear()
    })
    
    monthlyTrend.push({
      month: monthName,
      revenue: monthOrders.reduce((sum, order) => sum + order.total, 0),
      orders: monthOrders.length,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Sales Analytics</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Revenue insights and performance metrics</p>
        </div>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Revenue</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">RM {metrics.totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Orders</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{metrics.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Avg Order Value</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">RM {metrics.averageOrderValue.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Completed</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{metrics.completedOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Users className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Pending</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{metrics.pendingOrders}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Top Products
          </h3>
          <div className="space-y-3">
            {productSales.slice(0, 8).map((product) => (
              <div key={product.id} className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{product.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{product.unitsSold} units sold</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">RM {product.revenue.toFixed(2)}</p>
                  <p className="text-xs text-green-600 dark:text-green-400">+RM {product.profit.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Customers */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Top Customers
          </h3>
          <div className="space-y-3">
            {topCustomers.slice(0, 8).map((customer) => (
              <div key={customer.name} className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{customer.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{customer.orders} orders</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">RM {customer.totalSpent.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          6-Month Revenue Trend
        </h3>
        <div className="grid grid-cols-6 gap-4">
          {monthlyTrend.map((month, index) => {
            const maxRevenue = Math.max(...monthlyTrend.map(m => m.revenue))
            const height = maxRevenue > 0 ? (month.revenue / maxRevenue) * 120 : 0
            
            return (
              <div key={index} className="text-center">
                <div className="flex items-end justify-center h-32 mb-2">
                  <div
                    className="w-8 bg-purple-500 dark:bg-purple-400 rounded-t transition-all"
                    style={{ height: `${Math.max(height, 4)}px` }}
                    title={`RM ${month.revenue.toFixed(2)}`}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{month.month}</p>
                <p className="text-xs text-gray-900 dark:text-white font-semibold">RM {month.revenue.toFixed(0)}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{month.orders} orders</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AdminSales