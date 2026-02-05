import { useState } from 'react'
import { X, ArrowLeftRight, ArrowRight } from 'lucide-react'
import type { Shift } from '@/lib/swap-data'
import { getEmployeeById, formatDate, formatTime, ROLE_LABELS } from '@/lib/swap-data'
import ShiftCard from './ShiftCard'

type Step = 'pick-shift' | 'message' | 'confirm'

interface SwapRequestModalProps {
  targetShift: Shift
  myShifts: Shift[]
  onSubmit: (offeredShiftId: string, message: string) => void
  onClose: () => void
}

export default function SwapRequestModal({ targetShift, myShifts, onSubmit, onClose }: SwapRequestModalProps) {
  const [step, setStep] = useState<Step>('pick-shift')
  const [selectedShiftId, setSelectedShiftId] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  const targetEmployee = getEmployeeById(targetShift.employeeId)
  const selectedShift = myShifts.find((s) => s.id === selectedShiftId)

  const handleSubmit = () => {
    if (selectedShiftId) {
      onSubmit(selectedShiftId, message)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl max-w-lg w-full shadow-xl max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Request Swap</h3>
            <p className="text-sm text-gray-500">
              {step === 'pick-shift' && 'Step 1: Choose your shift to offer'}
              {step === 'message' && 'Step 2: Add a message (optional)'}
              {step === 'confirm' && 'Step 3: Confirm your request'}
            </p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target shift preview */}
        <div className="px-4 pt-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            Requesting {targetEmployee?.name}&apos;s shift
          </p>
          <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-semibold">
              {targetEmployee?.avatar}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {formatDate(targetShift.date)} · {formatTime(targetShift.startTime)} – {formatTime(targetShift.endTime)}
              </p>
              <p className="text-xs text-gray-600">{ROLE_LABELS[targetShift.role]}</p>
            </div>
          </div>
        </div>

        {/* Step content */}
        <div className="flex-1 overflow-y-auto p-4">
          {step === 'pick-shift' && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">Which of your shifts do you want to offer?</p>
              {myShifts.length === 0 ? (
                <p className="text-sm text-gray-500 py-4 text-center">You have no upcoming shifts to offer.</p>
              ) : (
                myShifts.map((shift) => (
                  <button
                    key={shift.id}
                    onClick={() => setSelectedShiftId(shift.id)}
                    className={`w-full text-left transition-all ${
                      selectedShiftId === shift.id ? 'ring-2 ring-blue-500 rounded-lg' : ''
                    }`}
                  >
                    <ShiftCard shift={shift} variant="compact" />
                  </button>
                ))
              )}
            </div>
          )}

          {step === 'message' && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">Add a message to {targetEmployee?.name}</p>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hey! Would you be up for a swap?"
                className="w-full h-24 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          {step === 'confirm' && selectedShift && (
            <div className="space-y-4">
              <p className="text-sm font-medium text-gray-700">Review your swap request</p>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium mb-1">You offer</p>
                  <p className="text-sm font-semibold text-gray-900">{formatDate(selectedShift.date)}</p>
                  <p className="text-xs text-gray-600">
                    {formatTime(selectedShift.startTime)} – {formatTime(selectedShift.endTime)}
                  </p>
                </div>
                <ArrowLeftRight className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium mb-1">You get</p>
                  <p className="text-sm font-semibold text-gray-900">{formatDate(targetShift.date)}</p>
                  <p className="text-xs text-gray-600">
                    {formatTime(targetShift.startTime)} – {formatTime(targetShift.endTime)}
                  </p>
                </div>
              </div>
              {message && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Your message</p>
                  <p className="text-sm text-gray-700 italic">&ldquo;{message}&rdquo;</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 flex items-center gap-3">
          {step === 'pick-shift' && (
            <>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setStep('message')}
                disabled={!selectedShiftId}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
          {step === 'message' && (
            <>
              <button
                onClick={() => setStep('pick-shift')}
                className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep('confirm')}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
          {step === 'confirm' && (
            <>
              <button
                onClick={() => setStep('message')}
                className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
              >
                <ArrowLeftRight className="w-4 h-4" />
                Send Request
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
