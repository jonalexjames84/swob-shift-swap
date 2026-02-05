import { Sun, CloudSun, Moon, ArrowLeftRight } from 'lucide-react'
import type { Shift, ShiftTime } from '@/lib/swap-data'
import { getEmployeeById, formatTime, ROLE_LABELS, SHIFT_TIME_LABELS } from '@/lib/swap-data'

const TIME_ICONS: Record<ShiftTime, typeof Sun> = {
  morning: Sun,
  afternoon: CloudSun,
  evening: Moon,
}

const TIME_COLORS: Record<ShiftTime, string> = {
  morning: 'text-amber-500',
  afternoon: 'text-orange-500',
  evening: 'text-indigo-500',
}

type ShiftCardVariant = 'own' | 'available' | 'compact'

interface ShiftCardProps {
  shift: Shift
  variant: ShiftCardVariant
  onPostForSwap?: () => void
  onRequestSwap?: () => void
}

export default function ShiftCard({ shift, variant, onPostForSwap, onRequestSwap }: ShiftCardProps) {
  const employee = getEmployeeById(shift.employeeId)
  const TimeIcon = TIME_ICONS[shift.shiftTime]

  const borderColor = variant === 'available' ? 'border-l-emerald-500' : 'border-l-blue-500'
  const isCompact = variant === 'compact'

  if (isCompact) {
    return (
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
        <TimeIcon className={`w-4 h-4 ${TIME_COLORS[shift.shiftTime]}`} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">
            {formatTime(shift.startTime)} – {formatTime(shift.endTime)}
          </p>
          <p className="text-xs text-gray-500">{ROLE_LABELS[shift.role]} · {SHIFT_TIME_LABELS[shift.shiftTime]}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-xl border border-gray-100 card-shadow border-l-4 ${borderColor} overflow-hidden`}>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className={`mt-0.5 ${TIME_COLORS[shift.shiftTime]}`}>
              <TimeIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-base font-semibold text-gray-900">
                {formatTime(shift.startTime)} – {formatTime(shift.endTime)}
              </p>
              <p className="text-sm text-gray-500 mt-0.5">
                {ROLE_LABELS[shift.role]} · {SHIFT_TIME_LABELS[shift.shiftTime]} shift
              </p>
              {variant === 'available' && employee && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-semibold">
                    {employee.avatar}
                  </div>
                  <span className="text-sm text-gray-600">{employee.name}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {variant === 'own' && (
              <button
                onClick={onPostForSwap}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  shift.postedForSwap
                    ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
                {shift.postedForSwap ? 'Posted' : 'Post for Swap'}
              </button>
            )}
            {variant === 'available' && (
              <button
                onClick={onRequestSwap}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
                Request Swap
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
