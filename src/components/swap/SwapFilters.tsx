import type { ShiftTime, EmployeeRole } from '@/lib/swap-data'
import { ROLE_LABELS, SHIFT_TIME_LABELS } from '@/lib/swap-data'

interface SwapFiltersProps {
  activeRole: EmployeeRole | 'all'
  activeTime: ShiftTime | 'all'
  onRoleChange: (role: EmployeeRole | 'all') => void
  onTimeChange: (time: ShiftTime | 'all') => void
}

const ROLES: (EmployeeRole | 'all')[] = ['all', 'server', 'host', 'line_cook', 'bartender', 'barista', 'dishwasher']
const TIMES: (ShiftTime | 'all')[] = ['all', 'morning', 'afternoon', 'evening']

export default function SwapFilters({ activeRole, activeTime, onRoleChange, onTimeChange }: SwapFiltersProps) {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Role</p>
        <div className="flex flex-wrap gap-2">
          {ROLES.map((role) => (
            <button
              key={role}
              onClick={() => onRoleChange(role)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeRole === role
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {role === 'all' ? 'All Roles' : ROLE_LABELS[role]}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Shift Time</p>
        <div className="flex flex-wrap gap-2">
          {TIMES.map((time) => (
            <button
              key={time}
              onClick={() => onTimeChange(time)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeTime === time
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {time === 'all' ? 'All Times' : SHIFT_TIME_LABELS[time]}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
