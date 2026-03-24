import { useState } from 'react'
import { Minus, Plus, RotateCcw, AlertTriangle } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

const AdminInventory = () => {
  const { products, updateProduct, adjustStock, resetProducts } = useAdmin()
  const [editingCell, setEditingCell] = useState(null) // { id, field }
  const [editValue, setEditValue] = useState('')
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const fmt = (n) => `MYR ${n.toFixed(2)}`

  const startEdit = (id, field, value) => {
    setEditingCell({ id, field })
    setEditValue(String(value))
  }

  const saveEdit = () => {
    if (!editingCell) return
    const num = parseFloat(editValue)
    if (isNaN(num) || num < 0) {
      setEditingCell(null)
      return
    }
    if (editingCell.field === 'inStock') {
      updateProduct(editingCell.id, { inStock: Math.round(num) })
    } else {
      updateProduct(editingCell.id, { [editingCell.field]: +num.toFixed(2) })
    }
    setEditingCell(null)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') saveEdit()
    if (e.key === 'Escape') setEditingCell(null)
  }

  const stockColor = (n) => {
    if (n <= 5) return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30'
    if (n <= 10) return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30'
    return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30'
  }

  const lowStockProducts = products.filter(p => p.inStock <= 5)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Inventory</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Click any stock, price, or cost value to edit</p>
        </div>
        <button
          onClick={() => setShowResetConfirm(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset to Defaults
        </button>
      </div>

      {/* Reset Confirm */}
      {showResetConfirm && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 flex items-center justify-between">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">Reset all products to default values? This cannot be undone.</p>
          <div className="flex gap-2">
            <button onClick={() => setShowResetConfirm(false)} className="px-3 py-1.5 text-sm bg-gray-200 dark:bg-gray-600 rounded-lg">Cancel</button>
            <button onClick={() => { resetProducts(); setShowResetConfirm(false) }} className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg">Reset</button>
          </div>
        </div>
      )}

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
            <span className="text-sm font-semibold text-red-800 dark:text-red-300">Low Stock Alert</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {lowStockProducts.map(p => (
              <span key={p.id} className="text-xs bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-2 py-1 rounded">
                {p.name} ({p.inStock})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-200">Product</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-200 hidden sm:table-cell">Category</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-gray-200">Stock</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-gray-200 hidden md:table-cell">Cost</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-gray-200">Price</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-gray-200 hidden md:table-cell">Profit/Unit</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-gray-200 hidden lg:table-cell">Total Value</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-900 dark:text-white">{product.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 sm:hidden">{product.category}</div>
                </td>
                <td className="py-3 px-4 hidden sm:table-cell">
                  <span className="px-2 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded">
                    {product.category}
                  </span>
                </td>
                {/* Stock - editable with +/- */}
                <td className="py-3 px-4">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => adjustStock(product.id, -1)}
                      className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    {editingCell?.id === product.id && editingCell?.field === 'inStock' ? (
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={saveEdit}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        className="w-14 text-center py-0.5 border rounded text-sm bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
                      />
                    ) : (
                      <span
                        onClick={() => startEdit(product.id, 'inStock', product.inStock)}
                        className={`px-2 py-0.5 rounded font-semibold cursor-pointer min-w-[2.5rem] text-center ${stockColor(product.inStock)}`}
                      >
                        {product.inStock}
                      </span>
                    )}
                    <button
                      onClick={() => adjustStock(product.id, 1)}
                      className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
                {/* Cost - editable */}
                <td className="py-3 px-4 text-right hidden md:table-cell">
                  {editingCell?.id === product.id && editingCell?.field === 'cost' ? (
                    <input
                      type="number"
                      step="0.01"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={saveEdit}
                      onKeyDown={handleKeyDown}
                      autoFocus
                      className="w-24 text-right py-0.5 border rounded text-sm bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                  ) : (
                    <span
                      onClick={() => startEdit(product.id, 'cost', product.cost)}
                      className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                    >
                      {fmt(product.cost)}
                    </span>
                  )}
                </td>
                {/* Price - editable */}
                <td className="py-3 px-4 text-right">
                  {editingCell?.id === product.id && editingCell?.field === 'price' ? (
                    <input
                      type="number"
                      step="0.01"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={saveEdit}
                      onKeyDown={handleKeyDown}
                      autoFocus
                      className="w-24 text-right py-0.5 border rounded text-sm bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                  ) : (
                    <span
                      onClick={() => startEdit(product.id, 'price', product.price)}
                      className="cursor-pointer font-semibold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400"
                    >
                      {fmt(product.price)}
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-right font-semibold text-green-600 dark:text-green-400 hidden md:table-cell">
                  {fmt(product.price - product.cost)}
                </td>
                <td className="py-3 px-4 text-right font-semibold text-gray-900 dark:text-white hidden lg:table-cell">
                  {fmt(product.price * product.inStock)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Footer */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Total Cost</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white">{fmt(products.reduce((s, p) => s + p.cost * p.inStock, 0))}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Revenue Potential</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white">{fmt(products.reduce((s, p) => s + p.price * p.inStock, 0))}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Profit Potential</p>
            <p className="text-sm font-bold text-green-600">{fmt(products.reduce((s, p) => s + (p.price - p.cost) * p.inStock, 0))}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminInventory
