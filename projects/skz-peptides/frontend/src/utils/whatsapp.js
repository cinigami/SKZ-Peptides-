const WHATSAPP_NUMBER = '60XXXXXXXXXX'

export const buildWhatsAppUrl = (message) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const buildCartMessage = (cart, total) => {
  const items = cart.map(item =>
    `${item.quantity}x ${item.name} - RM${(item.price * item.quantity).toFixed(2)}`
  ).join('\n')

  return `Hi! I want to order:\n${items}\n\nTotal: RM${total.toFixed(2)}\n\nPlease confirm availability 🙏`
}

export const buildProductMessage = (product, quantity) => {
  return `Hi! I want to order:\n${quantity}x ${product.name} - RM${(product.price * quantity).toFixed(2)}\n\nTotal: RM${(product.price * quantity).toFixed(2)}\n\nPlease confirm availability 🙏`
}

export const openWhatsApp = (message) => {
  window.open(buildWhatsAppUrl(message), '_blank')
}
