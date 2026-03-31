import { Wifi, WifiOff, RotateCw, Check, AlertTriangle } from 'lucide-react'

const AutoSyncStatus = ({ status, lastSync, onForceSync }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'synced':
        return {
          icon: Check,
          color: 'text-green-600 dark:text-green-400',
          bg: 'bg-green-100 dark:bg-green-900/30',
          text: 'Auto-Synced',
          description: lastSync ? `Last: ${lastSync}` : 'All devices synchronized'
        }
      case 'syncing':
        return {
          icon: RotateCw,
          color: 'text-blue-600 dark:text-blue-400',
          bg: 'bg-blue-100 dark:bg-blue-900/30',
          text: 'Syncing...',
          description: 'Updating cloud database'
        }
      case 'error':
        return {
          icon: AlertTriangle,
          color: 'text-red-600 dark:text-red-400',
          bg: 'bg-red-100 dark:bg-red-900/30',
          text: 'Sync Error',
          description: 'Using local data only'
        }
      case 'disconnected':
      default:
        return {
          icon: WifiOff,
          color: 'text-gray-600 dark:text-gray-400',
          bg: 'bg-gray-100 dark:bg-gray-900/30',
          text: 'Offline',
          description: 'No cloud connection'
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${config.bg}`}>
      <Icon 
        className={`w-4 h-4 ${config.color} ${status === 'syncing' ? 'animate-spin' : ''}`} 
      />
      
      <div className="flex flex-col">
        <span className={`text-xs font-medium ${config.color}`}>
          {config.text}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {config.description}
        </span>
      </div>

      {(status === 'error' || status === 'disconnected') && onForceSync && (
        <button
          onClick={onForceSync}
          className="text-xs px-2 py-1 bg-white dark:bg-gray-800 rounded border hover:bg-gray-50 dark:hover:bg-gray-700 ml-2"
        >
          Retry
        </button>
      )}
    </div>
  )
}

export default AutoSyncStatus