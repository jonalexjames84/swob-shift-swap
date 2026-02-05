import type { SwapStatus } from '@/lib/swap-data'

const STATUS_CONFIG: Record<SwapStatus, { label: string; classes: string }> = {
  open: { label: 'Open', classes: 'bg-blue-100 text-blue-700' },
  pending: { label: 'Pending', classes: 'bg-amber-100 text-amber-700' },
  accepted: { label: 'Accepted', classes: 'bg-emerald-100 text-emerald-700' },
  declined: { label: 'Declined', classes: 'bg-red-100 text-red-700' },
  cancelled: { label: 'Cancelled', classes: 'bg-gray-100 text-gray-500' },
  completed: { label: 'Completed', classes: 'bg-emerald-100 text-emerald-700' },
}

export default function StatusBadge({ status }: { status: SwapStatus }) {
  const config = STATUS_CONFIG[status]
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.classes}`}>
      {config.label}
    </span>
  )
}
