import { MessageCircle } from 'lucide-react'
import { buildWhatsAppUrl } from '../utils/whatsapp'

const WhatsAppFloatingButton = () => {
  return (
    <a
      href={buildWhatsAppUrl('Hi! I have a question about your products.')}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
      style={{
        backgroundColor: '#25D366',
        bottom: '5rem',
        right: '1.25rem',
      }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  )
}

export default WhatsAppFloatingButton
