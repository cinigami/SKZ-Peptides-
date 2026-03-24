import { useState } from 'react'
import { Plus, X, MessageCircle, ChevronRight } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

const STATUSES = ['Pending', 'Confirmed', 'Shipped', 'Delivered']

const statusColors = {
  Pending: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
  Confirmed: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
  Shipped: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
  Delivered: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
}

const AdminOrders = () => {
  const { orders, addOrder, updateOrderStatus, deleteOrder, products } = useAdmin()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    customerName: '',
    customerPhone: '',
    notes: '',
  })
  const [selectedProducts, setSelectedProducts] = useState([])

  const addProduct = (productId) => {
    const product = products.find(p => p.id === productId)
    if (!product) return
    const existing = selectedProducts.find(sp => sp.id === productId)
    if (existing) {
      setSelectedProducts(selectedProducts.map(sp => 
        sp.id === productId ? { ...sp, qty: sp.qty + 1 } : sp
      ))
    } else {
      setSelectedProducts([...selectedProducts, { id: product.id, name: product.name, price: product.price, qty: 1 }])
    }
  }

  const updateProductQty = (productId, qty) => {
    if (qty <= 0) {
      setSelectedProducts(selectedProducts.filter(sp => sp.id !== productId))
    } else {
      setSelectedProducts(selectedProducts.map(sp => 
        sp.id === productId ? { ...sp, qty } : sp
      ))
    }
  }

  const removeProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter(sp => sp.id !== productId))
  }

  const orderTotal = selectedProducts.reduce((sum, sp) => sum + sp.price * sp.qty, 0)
  const productsText = selectedProducts.map(sp => `${sp.name} x${sp.qty}`).join(', ')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.customerName.trim() || selectedProducts.length === 0) return
    addOrder({
      customerName: form.customerName,
      customerPhone: form.customerPhone,
      products: productsText,
      total: orderTotal,
      notes: form.notes,
    })
    setForm({ customerName: '', customerPhone: '', notes: '' })
    setSelectedProducts([])
    setShowForm(false)
  }

  const nextStatus = (current) => {
    const idx = STATUSES.indexOf(current)
    if (idx < STATUSES.length - 1) return STATUSES[idx + 1]
    return null
  }

  const whatsappLink = (phone, name) => {
    const cleaned = phone.replace(/\D/g, '')
    const msg = encodeURIComponent(`Hi ${name}, this is SKZ Peptides. Just updating you on your order!`)
    return `https://wa.me/${cleaned}?text=${msg}`
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Orders</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{orders.length} orders</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Order
        </button>
      </div>

      {/* New Order Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">New Order</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Customer Name *</label>
                <input
                  type="text"
                  value={form.customerName}
                  onChange={(e) => setForm(f => ({ ...f, customerName: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone (with country code)</label>
                <input
                  type="text"
                  value={form.customerPhone}
                  onChange={(e) => setForm(f => ({ ...f, customerPhone: e.target.value }))}
                  placeholder="60123456789"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Products *</label>
                <select
                  onChange={(e) => { if (e.target.value) { addProduct(e.target.value); e.target.value = '' } }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 text-sm"
                >
                  <option value="">+ Add product...</option>
                  {products.filter(p => p.category !== 'Supplies').map(p => (
                    <option key={p.id} value={p.id}>{p.name} — RM{p.price.toFixed(2)}</option>
                  ))}
                  <optgroup label="Supplies">
                    {products.filter(p => p.category === 'Supplies').map(p => (
                      <option key={p.id} value={p.id}>{p.name} — RM{p.price.toFixed(2)}</option>
                    ))}
                  </optgroup>
                </select>

                {/* Selected Products */}
                {selectedProducts.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {selectedProducts.map(sp => (
                      <div key={sp.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2">
                        <span className="text-sm text-gray-900 dark:text-white font-medium">{sp.name}</span>
                        <div className="flex items-center gap-2">
                          <button type="button" onClick={() => updateProductQty(sp.id, sp.qty - 1)} className="w-6 h-6 flex items-center justify-center bg-gray-200 dark:bg-gray-600 rounded text-xs font-bold text-gray-700 dark:text-gray-200">−</button>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white w-6 text-center">{sp.qty}</span>
                          <button type="button" onClick={() => updateProductQty(sp.id, sp.qty + 1)} className="w-6 h-6 flex items-center justify-center bg-gray-200 dark:bg-gray-600 rounded text-xs font-bold text-gray-700 dark:text-gray-200">+</button>
                          <span className="text-sm text-gray-500 dark:text-gray-400 w-20 text-right">RM{(sp.price * sp.qty).toFixed(2)}</span>
                          <button type="button" onClick={() => removeProduct(sp.id)} className="text-red-400 hover:text-red-600 ml-1">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Auto-calculated Total */}
              <div className="flex items-center justify-between bg-purple-50 dark:bg-purple-900/20 rounded-lg px-4 py-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total</span>
                <span className="text-lg font-bold text-purple-700 dark:text-purple-300">RM {orderTotal.toFixed(2)}</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
                <input
                  type="text"
                  value={form.notes}
                  onChange={(e) => setForm(f => ({ ...f, notes: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors">
                  Create Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">No orders yet. Create your first order above.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map(order => {
            const next = nextStatus(order.status)
            return (
              <div key={order.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">{order.customerName}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{order.id}</p>
                    {order.products && <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{order.products}</p>}
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="font-semibold text-gray-900 dark:text-white">MYR {order.total.toFixed(2)}</span>
                      <span className="text-gray-400 dark:text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                    {order.notes && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 italic">{order.notes}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    {order.customerPhone && (
                      <a
                        href={whatsappLink(order.customerPhone, order.customerName)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                        title="WhatsApp customer"
                      >
                        <MessageCircle className="w-5 h-5" />
                      </a>
                    )}
                    {next && (
                      <button
                        onClick={() => updateOrderStatus(order.id, next)}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                      >
                        {next} <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default AdminOrders
