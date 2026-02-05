// Shift Swap Prototype — Types & Mock Data

// ─── Types ───────────────────────────────────────────────────────────────────

export type ShiftTime = 'morning' | 'afternoon' | 'evening'
export type EmployeeRole = 'server' | 'host' | 'line_cook' | 'dishwasher' | 'bartender' | 'barista' | 'manager'
export type SwapStatus = 'open' | 'pending' | 'accepted' | 'declined' | 'cancelled' | 'completed'

export interface Employee {
  id: string
  name: string
  role: EmployeeRole
  avatar: string // initials
}

export interface Shift {
  id: string
  employeeId: string
  date: string // YYYY-MM-DD
  shiftTime: ShiftTime
  startTime: string // HH:MM
  endTime: string // HH:MM
  role: EmployeeRole
  postedForSwap: boolean
}

export interface SwapRequest {
  id: string
  fromEmployeeId: string
  toEmployeeId: string
  offeredShiftId: string
  requestedShiftId: string
  status: SwapStatus
  message: string
  createdAt: string // ISO date
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const ROLE_LABELS: Record<EmployeeRole, string> = {
  server: 'Server',
  host: 'Host',
  line_cook: 'Line Cook',
  dishwasher: 'Dishwasher',
  bartender: 'Bartender',
  barista: 'Barista',
  manager: 'Manager',
}

export const SHIFT_TIME_LABELS: Record<ShiftTime, string> = {
  morning: 'Morning',
  afternoon: 'Afternoon',
  evening: 'Evening',
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00')
  const today = new Date()
  today.setHours(12, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  if (date.toDateString() === today.toDateString()) return 'Today'
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow'

  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })
}

export function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`
}

export function getEmployeeById(id: string): Employee | undefined {
  return EMPLOYEES.find((e) => e.id === id)
}

export function getShiftById(id: string, shifts: Shift[]): Shift | undefined {
  return shifts.find((s) => s.id === id)
}

function getDateStr(daysFromNow: number): string {
  const d = new Date()
  d.setDate(d.getDate() + daysFromNow)
  return d.toISOString().split('T')[0]
}

// ─── Current User ────────────────────────────────────────────────────────────

export const CURRENT_USER_ID = 'emp-sarah'

export const RESTAURANT_NAME = 'Taco Town — Downtown Austin'

// ─── Mock Employees ──────────────────────────────────────────────────────────

export const EMPLOYEES: Employee[] = [
  { id: 'emp-sarah', name: 'Sarah Johnson', role: 'server', avatar: 'SJ' },
  { id: 'emp-mike', name: 'Mike Chen', role: 'line_cook', avatar: 'MC' },
  { id: 'emp-alex', name: 'Alex Rivera', role: 'server', avatar: 'AR' },
  { id: 'emp-jordan', name: 'Jordan Lee', role: 'bartender', avatar: 'JL' },
  { id: 'emp-taylor', name: 'Taylor Kim', role: 'host', avatar: 'TK' },
  { id: 'emp-casey', name: 'Casey Nguyen', role: 'server', avatar: 'CN' },
  { id: 'emp-morgan', name: 'Morgan Davis', role: 'dishwasher', avatar: 'MD' },
  { id: 'emp-riley', name: 'Riley Thompson', role: 'barista', avatar: 'RT' },
]

// ─── Mock Shifts ─────────────────────────────────────────────────────────────

export const INITIAL_SHIFTS: Shift[] = [
  // Sarah's shifts (5 shifts over next 7 days)
  { id: 'shift-s1', employeeId: 'emp-sarah', date: getDateStr(0), shiftTime: 'evening', startTime: '17:00', endTime: '23:00', role: 'server', postedForSwap: false },
  { id: 'shift-s2', employeeId: 'emp-sarah', date: getDateStr(1), shiftTime: 'morning', startTime: '07:00', endTime: '14:00', role: 'server', postedForSwap: false },
  { id: 'shift-s3', employeeId: 'emp-sarah', date: getDateStr(3), shiftTime: 'afternoon', startTime: '11:00', endTime: '18:00', role: 'server', postedForSwap: false },
  { id: 'shift-s4', employeeId: 'emp-sarah', date: getDateStr(5), shiftTime: 'evening', startTime: '16:00', endTime: '22:00', role: 'server', postedForSwap: false },
  { id: 'shift-s5', employeeId: 'emp-sarah', date: getDateStr(6), shiftTime: 'morning', startTime: '08:00', endTime: '15:00', role: 'server', postedForSwap: false },

  // Mike Chen — Line Cook
  { id: 'shift-m1', employeeId: 'emp-mike', date: getDateStr(0), shiftTime: 'morning', startTime: '06:00', endTime: '14:00', role: 'line_cook', postedForSwap: true },
  { id: 'shift-m2', employeeId: 'emp-mike', date: getDateStr(2), shiftTime: 'evening', startTime: '16:00', endTime: '23:00', role: 'line_cook', postedForSwap: false },
  { id: 'shift-m3', employeeId: 'emp-mike', date: getDateStr(4), shiftTime: 'morning', startTime: '07:00', endTime: '14:00', role: 'line_cook', postedForSwap: true },

  // Alex Rivera — Server
  { id: 'shift-a1', employeeId: 'emp-alex', date: getDateStr(1), shiftTime: 'evening', startTime: '17:00', endTime: '23:00', role: 'server', postedForSwap: true },
  { id: 'shift-a2', employeeId: 'emp-alex', date: getDateStr(3), shiftTime: 'morning', startTime: '08:00', endTime: '15:00', role: 'server', postedForSwap: false },
  { id: 'shift-a3', employeeId: 'emp-alex', date: getDateStr(5), shiftTime: 'afternoon', startTime: '11:00', endTime: '18:00', role: 'server', postedForSwap: true },

  // Jordan Lee — Bartender
  { id: 'shift-j1', employeeId: 'emp-jordan', date: getDateStr(0), shiftTime: 'evening', startTime: '18:00', endTime: '02:00', role: 'bartender', postedForSwap: true },
  { id: 'shift-j2', employeeId: 'emp-jordan', date: getDateStr(2), shiftTime: 'evening', startTime: '18:00', endTime: '02:00', role: 'bartender', postedForSwap: false },
  { id: 'shift-j3', employeeId: 'emp-jordan', date: getDateStr(4), shiftTime: 'afternoon', startTime: '12:00', endTime: '19:00', role: 'bartender', postedForSwap: true },

  // Taylor Kim — Host
  { id: 'shift-t1', employeeId: 'emp-taylor', date: getDateStr(1), shiftTime: 'morning', startTime: '09:00', endTime: '15:00', role: 'host', postedForSwap: false },
  { id: 'shift-t2', employeeId: 'emp-taylor', date: getDateStr(3), shiftTime: 'evening', startTime: '17:00', endTime: '23:00', role: 'host', postedForSwap: true },

  // Casey Nguyen — Server
  { id: 'shift-c1', employeeId: 'emp-casey', date: getDateStr(0), shiftTime: 'afternoon', startTime: '11:00', endTime: '18:00', role: 'server', postedForSwap: false },
  { id: 'shift-c2', employeeId: 'emp-casey', date: getDateStr(2), shiftTime: 'morning', startTime: '07:00', endTime: '14:00', role: 'server', postedForSwap: true },
  { id: 'shift-c3', employeeId: 'emp-casey', date: getDateStr(5), shiftTime: 'evening', startTime: '16:00', endTime: '23:00', role: 'server', postedForSwap: false },

  // Morgan Davis — Dishwasher
  { id: 'shift-md1', employeeId: 'emp-morgan', date: getDateStr(1), shiftTime: 'afternoon', startTime: '12:00', endTime: '20:00', role: 'dishwasher', postedForSwap: true },
  { id: 'shift-md2', employeeId: 'emp-morgan', date: getDateStr(4), shiftTime: 'morning', startTime: '06:00', endTime: '14:00', role: 'dishwasher', postedForSwap: false },

  // Riley Thompson — Barista
  { id: 'shift-r1', employeeId: 'emp-riley', date: getDateStr(0), shiftTime: 'morning', startTime: '05:00', endTime: '12:00', role: 'barista', postedForSwap: false },
  { id: 'shift-r2', employeeId: 'emp-riley', date: getDateStr(3), shiftTime: 'morning', startTime: '05:00', endTime: '12:00', role: 'barista', postedForSwap: false },
  { id: 'shift-r3', employeeId: 'emp-riley', date: getDateStr(6), shiftTime: 'afternoon', startTime: '10:00', endTime: '17:00', role: 'barista', postedForSwap: true },
]

// ─── Mock Swap Requests ──────────────────────────────────────────────────────

export const INITIAL_REQUESTS: SwapRequest[] = [
  // Pending sent: Sarah sent to Alex
  {
    id: 'req-1',
    fromEmployeeId: 'emp-sarah',
    toEmployeeId: 'emp-alex',
    offeredShiftId: 'shift-s3',
    requestedShiftId: 'shift-a1',
    status: 'pending',
    message: 'Hey Alex! I have a dentist appointment Tuesday evening — would you be able to swap?',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  // Incoming: Jordan sent to Sarah
  {
    id: 'req-2',
    fromEmployeeId: 'emp-jordan',
    toEmployeeId: 'emp-sarah',
    offeredShiftId: 'shift-j1',
    requestedShiftId: 'shift-s1',
    status: 'pending',
    message: "Hey Sarah, my band has a gig tonight. Could we swap shifts? I'll cover your evening!",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  // Completed: Casey and Sarah swapped previously
  {
    id: 'req-3',
    fromEmployeeId: 'emp-casey',
    toEmployeeId: 'emp-sarah',
    offeredShiftId: 'shift-c1',
    requestedShiftId: 'shift-s2',
    status: 'completed',
    message: 'Thanks for swapping with me last week!',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  // Declined: Sarah sent to Taylor, was declined
  {
    id: 'req-4',
    fromEmployeeId: 'emp-sarah',
    toEmployeeId: 'emp-taylor',
    offeredShiftId: 'shift-s4',
    requestedShiftId: 'shift-t2',
    status: 'declined',
    message: 'Would love to swap if you can!',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
]
