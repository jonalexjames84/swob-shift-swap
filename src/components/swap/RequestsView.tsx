import type { SwapRequest, Shift } from '@/lib/swap-data'
import SwapRequestCard from './SwapRequestCard'
import { Inbox } from 'lucide-react'

interface RequestsViewProps {
  incomingRequests: SwapRequest[]
  sentRequests: SwapRequest[]
  shifts: Shift[]
  onAccept: (requestId: string) => void
  onDecline: (requestId: string) => void
  onCancel: (requestId: string) => void
}

export default function RequestsView({
  incomingRequests,
  sentRequests,
  shifts,
  onAccept,
  onDecline,
  onCancel,
}: RequestsViewProps) {
  const hasAny = incomingRequests.length > 0 || sentRequests.length > 0

  if (!hasAny) {
    return (
      <div className="text-center py-16">
        <Inbox className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500 font-medium">No swap requests yet</p>
        <p className="text-sm text-gray-400 mt-1">
          Browse available swaps and send a request to get started.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Incoming */}
      {incomingRequests.length > 0 && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Incoming Requests</h2>
            <p className="text-sm text-gray-500">
              {incomingRequests.filter((r) => r.status === 'pending').length} pending
            </p>
          </div>
          {incomingRequests.map((req) => (
            <SwapRequestCard
              key={req.id}
              request={req}
              shifts={shifts}
              direction="incoming"
              onAccept={() => onAccept(req.id)}
              onDecline={() => onDecline(req.id)}
            />
          ))}
        </div>
      )}

      {/* Sent */}
      {sentRequests.length > 0 && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Sent Requests</h2>
            <p className="text-sm text-gray-500">
              {sentRequests.filter((r) => r.status === 'pending').length} pending
            </p>
          </div>
          {sentRequests.map((req) => (
            <SwapRequestCard
              key={req.id}
              request={req}
              shifts={shifts}
              direction="sent"
              onCancel={() => onCancel(req.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
