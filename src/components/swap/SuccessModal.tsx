import { CheckCircle } from 'lucide-react'
import { useEffect } from 'react'

interface SuccessModalProps {
  title: string
  message: string
  onClose: () => void
}

export default function SuccessModal({ title, message, onClose }: SuccessModalProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl max-w-sm w-full shadow-xl text-center p-8">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4 animate-[bounce_0.5s_ease-in-out]">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{message}</p>
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  )
}
