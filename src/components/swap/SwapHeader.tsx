import { ArrowLeftRight, FileText } from 'lucide-react'
import { RESTAURANT_NAME, CURRENT_USER_ID, getEmployeeById, ROLE_LABELS } from '@/lib/swap-data'

const PRD_URL = 'https://github.com/jonalexjames84/swob-shift-swap/blob/main/PRD.md'

export default function SwapHeader() {
  const user = getEmployeeById(CURRENT_USER_ID)!

  return (
    <header>
      <div className="bg-gray-900 text-gray-300 text-xs">
        <div className="max-w-4xl mx-auto px-4 py-2 flex items-center justify-between">
          <span>Swob Shift Swap — Interactive Prototype</span>
          <a
            href={PRD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            View PRD
          </a>
        </div>
      </div>
      <div className="bg-white border-b border-gray-200">
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
      </div>
    </header>
  )
}
