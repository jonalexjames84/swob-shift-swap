import type { Shift } from '@/lib/swap-data'
import ShiftCard from './ShiftCard'
import DateGroup from './DateGroup'
import { CalendarX } from 'lucide-react'

interface ScheduleViewProps {
  shifts: Shift[]
  onTogglePost: (shiftId: string) => void
}

export default function ScheduleView({ shifts, onTogglePost }: ScheduleViewProps) {
  // Group shifts by date
  const grouped = shifts.reduce<Record<string, Shift[]>>((acc, shift) => {
    if (!acc[shift.date]) acc[shift.date] = []
    acc[shift.date].push(shift)
    return acc
  }, {})

  const dates = Object.keys(grouped).sort()

  if (dates.length === 0) {
    return (
      <div className="text-center py-16">
        <CalendarX className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500 font-medium">No upcoming shifts</p>
        <p className="text-sm text-gray-400 mt-1">Check back later for your schedule.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">My Upcoming Shifts</h2>
        <span className="text-sm text-gray-500">{shifts.length} shifts this week</span>
      </div>
      {dates.map((date) => (
        <DateGroup key={date} date={date}>
          {grouped[date].map((shift) => (
            <ShiftCard
              key={shift.id}
              shift={shift}
              variant="own"
              onPostForSwap={() => onTogglePost(shift.id)}
            />
          ))}
        </DateGroup>
      ))}
    </div>
  )
}
