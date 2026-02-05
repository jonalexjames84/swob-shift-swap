import { useState } from 'react'
import type { Shift, ShiftTime, EmployeeRole } from '@/lib/swap-data'
import ShiftCard from './ShiftCard'
import DateGroup from './DateGroup'
import SwapFilters from './SwapFilters'
import { SearchX } from 'lucide-react'

interface BrowseViewProps {
  shifts: Shift[]
  onRequestSwap: (shift: Shift) => void
}

export default function BrowseView({ shifts, onRequestSwap }: BrowseViewProps) {
  const [filterRole, setFilterRole] = useState<EmployeeRole | 'all'>('all')
  const [filterTime, setFilterTime] = useState<ShiftTime | 'all'>('all')

  const filtered = shifts.filter((s) => {
    if (filterRole !== 'all' && s.role !== filterRole) return false
    if (filterTime !== 'all' && s.shiftTime !== filterTime) return false
    return true
  })

  // Group by date
  const grouped = filtered.reduce<Record<string, Shift[]>>((acc, shift) => {
    if (!acc[shift.date]) acc[shift.date] = []
    acc[shift.date].push(shift)
    return acc
  }, {})

  const dates = Object.keys(grouped).sort()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Available Swaps</h2>
        <p className="text-sm text-gray-500 mt-1">
          {filtered.length} shift{filtered.length !== 1 ? 's' : ''} available for swap
        </p>
      </div>

      <SwapFilters
        activeRole={filterRole}
        activeTime={filterTime}
        onRoleChange={setFilterRole}
        onTimeChange={setFilterTime}
      />

      {dates.length === 0 ? (
        <div className="text-center py-16">
          <SearchX className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No swaps available</p>
          <p className="text-sm text-gray-400 mt-1">
            {filterRole !== 'all' || filterTime !== 'all'
              ? 'Try adjusting your filters.'
              : 'Check back later — coworkers post new swaps all the time.'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {dates.map((date) => (
            <DateGroup key={date} date={date}>
              {grouped[date].map((shift) => (
                <ShiftCard
                  key={shift.id}
                  shift={shift}
                  variant="available"
                  onRequestSwap={() => onRequestSwap(shift)}
                />
              ))}
            </DateGroup>
          ))}
        </div>
      )}
    </div>
  )
}
