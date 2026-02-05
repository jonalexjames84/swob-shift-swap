import { Calendar, Globe, MessageSquare } from 'lucide-react'

export type TabId = 'schedule' | 'browse' | 'requests'

interface SwapTabsProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
  pendingCount: number
}

const TABS: { id: TabId; label: string; icon: typeof Calendar }[] = [
  { id: 'schedule', label: 'My Schedule', icon: Calendar },
  { id: 'browse', label: 'Browse Swaps', icon: Globe },
  { id: 'requests', label: 'My Requests', icon: MessageSquare },
]

export default function SwapTabs({ activeTab, onTabChange, pendingCount }: SwapTabsProps) {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex gap-1">
          {TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  isActive
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {tab.id === 'requests' && pendingCount > 0 && (
                  <span className="ml-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-semibold">
                    {pendingCount}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
