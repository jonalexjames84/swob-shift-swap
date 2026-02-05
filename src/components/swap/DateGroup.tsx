import { formatDate } from '@/lib/swap-data'

interface DateGroupProps {
  date: string
  children: React.ReactNode
}

export default function DateGroup({ date, children }: DateGroupProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
        {formatDate(date)}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  )
}
