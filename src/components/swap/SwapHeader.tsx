import { ArrowLeftRight } from 'lucide-react'
import { RESTAURANT_NAME, CURRENT_USER_ID, getEmployeeById, ROLE_LABELS } from '@/lib/swap-data'

export default function SwapHeader() {
  const user = getEmployeeById(CURRENT_USER_ID)!

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <ArrowLeftRight className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Shift Swap</h1>
              <p className="text-sm text-gray-500">{RESTAURANT_NAME}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{ROLE_LABELS[user.role]}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-semibold">
              {user.avatar}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
