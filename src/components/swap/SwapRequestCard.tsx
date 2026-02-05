import type { SwapRequest, Shift } from '@/lib/swap-data'
import { getEmployeeById, getShiftById, formatDate, formatTime, ROLE_LABELS } from '@/lib/swap-data'
import StatusBadge from './StatusBadge'
import { ArrowLeftRight, X, Check } from 'lucide-react'

interface SwapRequestCardProps {
  request: SwapRequest
  shifts: Shift[]
  direction: 'incoming' | 'sent'
  onAccept?: () => void
  onDecline?: () => void
  onCancel?: () => void
}

export default function SwapRequestCard({
  request,
  shifts,
  direction,
  onAccept,
  onDecline,
  onCancel,
}: SwapRequestCardProps) {
  const fromEmployee = getEmployeeById(request.fromEmployeeId)
  const toEmployee = getEmployeeById(request.toEmployeeId)
  const offeredShift = getShiftById(request.offeredShiftId, shifts)
  const requestedShift = getShiftById(request.requestedShiftId, shifts)
  const otherPerson = direction === 'incoming' ? fromEmployee : toEmployee

  const isMuted = request.status === 'declined' || request.status === 'cancelled' || request.status === 'completed'

  return (
    <div className={`bg-white rounded-xl border border-gray-200 overflow-hidden ${isMuted ? 'opacity-70' : ''}`}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
              direction === 'incoming' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
            }`}>
              {otherPerson?.avatar}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{otherPerson?.name}</p>
              <p className="text-xs text-gray-500">
                {direction === 'incoming' ? 'wants to swap with you' : 'swap request sent'}
              </p>
            </div>
          </div>
          <StatusBadge status={request.status} />
        </div>

        {/* Shift comparison */}
        <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
          {offeredShift && (
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 font-medium mb-1">
                {direction === 'incoming' ? 'They offer' : 'You offer'}
              </p>
              <p className="text-sm font-medium text-gray-900">
                {formatDate(offeredShift.date)}
              </p>
              <p className="text-xs text-gray-600">
                {formatTime(offeredShift.startTime)} – {formatTime(offeredShift.endTime)}
              </p>
              <p className="text-xs text-gray-500">{ROLE_LABELS[offeredShift.role]}</p>
            </div>
          )}
          <ArrowLeftRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
          {requestedShift && (
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 font-medium mb-1">
                {direction === 'incoming' ? 'Your shift' : 'Their shift'}
              </p>
              <p className="text-sm font-medium text-gray-900">
                {formatDate(requestedShift.date)}
              </p>
              <p className="text-xs text-gray-600">
                {formatTime(requestedShift.startTime)} – {formatTime(requestedShift.endTime)}
              </p>
              <p className="text-xs text-gray-500">{ROLE_LABELS[requestedShift.role]}</p>
            </div>
          )}
        </div>

        {/* Message */}
        {request.message && (
          <p className="text-sm text-gray-600 mt-3 italic">&ldquo;{request.message}&rdquo;</p>
        )}

        {/* Actions */}
        {request.status === 'pending' && (
          <div className="flex items-center gap-2 mt-4">
            {direction === 'incoming' && (
              <>
                <button
                  onClick={onAccept}
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
                >
                  <Check className="w-4 h-4" />
                  Accept
                </button>
                <button
                  onClick={onDecline}
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Decline
                </button>
              </>
            )}
            {direction === 'sent' && (
              <button
                onClick={onCancel}
                className="flex items-center justify-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4" />
                Cancel Request
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
