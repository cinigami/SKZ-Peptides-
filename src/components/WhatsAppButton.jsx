import { MessageCircle } from 'lucide-react'

const WhatsAppButton = ({ onClick, children, className = '', small = false }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center font-semibold text-white rounded-xl transition-colors hover:opacity-90 ${
        small ? 'px-4 py-2 text-sm' : 'w-full py-3.5'
      } ${className}`}
      style={{ backgroundColor: '#25D366' }}
    >
      <MessageCircle className={`${small ? 'w-4 h-4' : 'w-5 h-5'} mr-2`} />
      {children || 'Order via WhatsApp'}
    </button>
  )
}

export default WhatsAppButton
