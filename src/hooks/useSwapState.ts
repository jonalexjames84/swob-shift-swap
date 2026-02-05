import { useReducer, useCallback } from 'react'
import {
  type Shift,
  type SwapRequest,
  type SwapStatus,
  INITIAL_SHIFTS,
  INITIAL_REQUESTS,
  CURRENT_USER_ID,
} from '@/lib/swap-data'

// ─── State ───────────────────────────────────────────────────────────────────

export interface SwapState {
  shifts: Shift[]
  requests: SwapRequest[]
}

// ─── Actions ─────────────────────────────────────────────────────────────────

type SwapAction =
  | { type: 'TOGGLE_POST_FOR_SWAP'; shiftId: string }
  | { type: 'CREATE_REQUEST'; request: SwapRequest }
  | { type: 'UPDATE_REQUEST_STATUS'; requestId: string; status: SwapStatus }

// ─── Reducer ─────────────────────────────────────────────────────────────────

function swapReducer(state: SwapState, action: SwapAction): SwapState {
  switch (action.type) {
    case 'TOGGLE_POST_FOR_SWAP':
      return {
        ...state,
        shifts: state.shifts.map((s) =>
          s.id === action.shiftId ? { ...s, postedForSwap: !s.postedForSwap } : s
        ),
      }

    case 'CREATE_REQUEST':
      return {
        ...state,
        requests: [...state.requests, action.request],
      }

    case 'UPDATE_REQUEST_STATUS':
      return {
        ...state,
        requests: state.requests.map((r) =>
          r.id === action.requestId ? { ...r, status: action.status } : r
        ),
      }

    default:
      return state
  }
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useSwapState() {
  const [state, dispatch] = useReducer(swapReducer, {
    shifts: INITIAL_SHIFTS,
    requests: INITIAL_REQUESTS,
  })

  const togglePostForSwap = useCallback((shiftId: string) => {
    dispatch({ type: 'TOGGLE_POST_FOR_SWAP', shiftId })
  }, [])

  const createRequest = useCallback(
    (requestedShiftId: string, offeredShiftId: string, message: string) => {
      const requestedShift = state.shifts.find((s) => s.id === requestedShiftId)
      if (!requestedShift) return

      const request: SwapRequest = {
        id: `req-${Date.now()}`,
        fromEmployeeId: CURRENT_USER_ID,
        toEmployeeId: requestedShift.employeeId,
        offeredShiftId,
        requestedShiftId,
        status: 'pending',
        message,
        createdAt: new Date().toISOString(),
      }
      dispatch({ type: 'CREATE_REQUEST', request })
    },
    [state.shifts]
  )

  const acceptRequest = useCallback((requestId: string) => {
    dispatch({ type: 'UPDATE_REQUEST_STATUS', requestId, status: 'accepted' })
    // After a brief moment, mark as completed
    setTimeout(() => {
      dispatch({ type: 'UPDATE_REQUEST_STATUS', requestId, status: 'completed' })
    }, 2000)
  }, [])

  const declineRequest = useCallback((requestId: string) => {
    dispatch({ type: 'UPDATE_REQUEST_STATUS', requestId, status: 'declined' })
  }, [])

  const cancelRequest = useCallback((requestId: string) => {
    dispatch({ type: 'UPDATE_REQUEST_STATUS', requestId, status: 'cancelled' })
  }, [])

  // Derived data
  const myShifts = state.shifts
    .filter((s) => s.employeeId === CURRENT_USER_ID)
    .sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime))

  const availableSwaps = state.shifts
    .filter((s) => s.postedForSwap && s.employeeId !== CURRENT_USER_ID)
    .sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime))

  const incomingRequests = state.requests
    .filter((r) => r.toEmployeeId === CURRENT_USER_ID)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  const sentRequests = state.requests
    .filter((r) => r.fromEmployeeId === CURRENT_USER_ID)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  const pendingIncomingCount = incomingRequests.filter((r) => r.status === 'pending').length

  return {
    shifts: state.shifts,
    requests: state.requests,
    myShifts,
    availableSwaps,
    incomingRequests,
    sentRequests,
    pendingIncomingCount,
    togglePostForSwap,
    createRequest,
    acceptRequest,
    declineRequest,
    cancelRequest,
  }
}
