import { X } from 'lucide-react'

interface ConfirmModalProps {
  title: string
  message: string
  confirmLabel: string
  confirmStyle?: 'danger' | 'success' | 'primary'
  onConfirm: () => void
  onCancel: () => void
}

const STYLE_MAP = {
  danger: 'bg-red-600 hover:bg-red-700',
  success: 'bg-emerald-600 hover:bg-emerald-700',
  primary: 'bg-blue-600 hover:bg-blue-700',
}

export default function ConfirmModal({
  title,
  message,
  confirmLabel,
  confirmStyle = 'primary',
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl max-w-sm w-full shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            <button onClick={onCancel} className="p-1 rounded-lg hover:bg-gray-100 text-gray-400">
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-gray-600">{message}</p>
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 px-4 py-2.5 text-white rounded-lg text-sm font-medium transition-colors ${STYLE_MAP[confirmStyle]}`}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
