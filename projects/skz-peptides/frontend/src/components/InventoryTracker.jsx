import { useState } from 'react'
import { Package, TrendingUp, DollarSign, AlertTriangle } from 'lucide-react'
import { products, inventorySummary } from '../data/products'

const InventoryTracker = () => {
  const filteredProducts = products

  const lowStockProducts = products.filter(p => p.inStock <= 5)
  
  const formatPrice = (price) => `MYR ${price.toFixed(2)}`
  const formatNumber = (num) => num.toLocaleString()

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Inventory Management</h2>
        <p className="text-gray-600">Track your peptide stock levels and profitability</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Products</p>
              <p className="text-2xl font-bold text-blue-900">{inventorySummary.totalProducts}</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Total Revenue Potential</p>
              <p className="text-2xl font-bold text-green-900">{formatPrice(inventorySummary.totalValue)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Total Profit Potential</p>
              <p className="text-2xl font-bold text-purple-900">{formatPrice(inventorySummary.totalProfit)}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-orange-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">ROI</p>
              <p className="text-2xl font-bold text-orange-900">{inventorySummary.roiPercent}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <h3 className="font-semibold text-yellow-800">Low Stock Alert</h3>
          </div>
          <p className="text-yellow-700 text-sm mb-3">
            The following products have 5 or fewer units in stock:
          </p>
          <div className="flex flex-wrap gap-2">
            {lowStockProducts.map(product => (
              <span key={product.id} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                {product.name} ({product.inStock} left)
              </span>
            ))}
          </div>
        </div>
      )}



      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Product</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-900">Stock</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900">Cost</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900">Price</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900">Profit/Unit</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900">Total Value</th>

            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div>
                    <div className="font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.description.slice(0, 50)}...</div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded">
                    {product.category}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className={`font-semibold ${
                    product.inStock <= 5 ? 'text-red-600' : 
                    product.inStock <= 10 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {product.inStock}
                  </span>
                </td>
                <td className="py-3 px-4 text-right text-gray-600">
                  {formatPrice(product.cost)}
                </td>
                <td className="py-3 px-4 text-right font-semibold text-gray-900">
                  {formatPrice(product.price)}
                </td>
                <td className="py-3 px-4 text-right font-semibold text-green-600">
                  {formatPrice(product.profit)}
                </td>
                <td className="py-3 px-4 text-right font-semibold text-gray-900">
                  {formatPrice(product.price * product.inStock)}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Footer */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-gray-600 text-sm">Total Investment</p>
            <p className="text-lg font-bold text-gray-900">
              {formatPrice(filteredProducts.reduce((sum, p) => sum + (p.cost * p.inStock), 0))}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Revenue Potential</p>
            <p className="text-lg font-bold text-gray-900">
              {formatPrice(filteredProducts.reduce((sum, p) => sum + (p.price * p.inStock), 0))}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Profit Potential</p>
            <p className="text-lg font-bold text-green-600">
              {formatPrice(filteredProducts.reduce((sum, p) => sum + (p.profit * p.inStock), 0))}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InventoryTracker