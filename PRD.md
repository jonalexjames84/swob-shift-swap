# Shift Swap — Product Requirements Document

**Product:** Shift Swap by Swob
**Version:** 1.0 Prototype
**Last Updated:** February 5, 2026
**Live Demo:** [swob-shift-swap.vercel.app](https://swob-shift-swap.vercel.app)
**Repo:** [github.com/jonalexjames84/swob-shift-swap](https://github.com/jonalexjames84/swob-shift-swap)

---

## 1. Problem Statement

Restaurant and hospitality workers frequently need to swap shifts — a doctor's appointment, a family event, a scheduling conflict. Today this happens through group texts, sticky notes on the break room wall, or shouting across the kitchen. Managers get looped in to manually approve and update schedules, creating friction and delays.

Workers need a fast, mobile-friendly way to post shifts for swap, browse what coworkers have available, and lock in a trade — all without calling the manager.

## 2. Target User

**Primary persona:** Sarah Johnson, 24, Server at Taco Town (Downtown Austin)
- Works 4-5 shifts/week across varying times
- Swaps shifts 2-3x/month due to school, social conflicts, or fatigue
- Uses her phone for everything — expects instant, app-like experiences
- Doesn't want to bother her manager unless absolutely necessary

**Secondary personas:**
- Line cooks, bartenders, hosts, dishwashers, baristas at the same location
- Shift managers who want visibility into swaps (future scope)

## 3. Goals

| Goal | Metric | Target |
|------|--------|--------|
| Reduce time-to-swap | Time from "I need to swap" to confirmed trade | < 5 minutes |
| Eliminate manager bottleneck | Swaps completed without manager intervention | 90%+ |
| Increase swap success rate | Posted shifts that get picked up | 60%+ |
| Mobile usability | Task completion on mobile viewport | 100% of flows |

## 4. Scope — V1 Prototype

### In Scope
- View personal upcoming schedule
- Post/unpost individual shifts for swap
- Browse all available swaps from coworkers
- Filter by role and shift time (morning/afternoon/evening)
- Multi-step swap request flow (pick shift to offer, add message, confirm)
- Incoming request management (accept/decline)
- Sent request management (cancel)
- Request history (completed/declined shown with muted styling)
- Confirmation and success modals
- Responsive layout (mobile-first)

### Out of Scope (Future)
- Real authentication and user accounts
- Persistent backend / database
- Manager approval workflow
- Push notifications
- Shift compatibility rules (role matching, overtime limits)
- Calendar integration
- Team/location switching
- Analytics dashboard

## 5. User Flows

### 5.1 View Schedule
1. User lands on `/swap`
2. "My Schedule" tab is active by default
3. Upcoming shifts displayed grouped by date
4. Each shift shows time range, role, shift period (morning/afternoon/evening)
5. "Post for Swap" button on each shift card

### 5.2 Post a Shift for Swap
1. User clicks "Post for Swap" on any of their shifts
2. Button toggles to "Posted" state (emerald green)
3. Shift immediately appears in the Browse Swaps tab for coworkers
4. User can un-post by clicking "Posted" again

### 5.3 Browse & Request a Swap
1. User navigates to "Browse Swaps" tab
2. Available shifts from coworkers displayed, grouped by date
3. User can filter by role (Server, Host, Line Cook, etc.) and time (Morning, Afternoon, Evening)
4. User clicks "Request Swap" on a shift they want
5. **Modal Step 1:** Choose which of their own shifts to offer in exchange
6. **Modal Step 2:** Optionally add a personal message
7. **Modal Step 3:** Review the trade summary and confirm
8. Success overlay confirms the request was sent

### 5.4 Manage Incoming Requests
1. User navigates to "My Requests" tab (badge shows pending count)
2. Incoming section shows requests from coworkers
3. Each card displays: who's requesting, their offered shift vs. your shift, their message
4. User clicks "Accept" → confirmation modal → success overlay
5. User clicks "Decline" → confirmation modal → request marked declined

### 5.5 Manage Sent Requests
1. Sent section shows outgoing requests with status
2. Pending requests can be cancelled
3. Completed/declined/cancelled requests remain visible with muted styling

## 6. Information Architecture

```
/swap
├── [Tab] My Schedule
│   └── Shifts grouped by date → ShiftCard (variant: own)
├── [Tab] Browse Swaps
│   ├── Filter pills (role, shift time)
│   └── Available shifts grouped by date → ShiftCard (variant: available)
└── [Tab] My Requests
    ├── Incoming Requests → SwapRequestCard (accept/decline)
    └── Sent Requests → SwapRequestCard (cancel)

Modals:
├── SwapRequestModal (3-step: pick shift → message → confirm)
├── ConfirmModal (accept/decline/cancel confirmation)
└── SuccessModal (celebration overlay, auto-dismiss)
```

## 7. Data Model

### Employee
| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| name | string | Full name |
| role | EmployeeRole | server, host, line_cook, dishwasher, bartender, barista, manager |
| avatar | string | Two-letter initials |

### Shift
| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| employeeId | string | Owner of this shift |
| date | string | YYYY-MM-DD |
| shiftTime | ShiftTime | morning, afternoon, evening |
| startTime | string | HH:MM (24h) |
| endTime | string | HH:MM (24h) |
| role | EmployeeRole | Role for this shift |
| postedForSwap | boolean | Whether shift is available for swap |

### SwapRequest
| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| fromEmployeeId | string | Who initiated the request |
| toEmployeeId | string | Who owns the desired shift |
| offeredShiftId | string | Shift being offered in exchange |
| requestedShiftId | string | Shift being requested |
| status | SwapStatus | open, pending, accepted, declined, cancelled, completed |
| message | string | Optional personal note |
| createdAt | string | ISO timestamp |

## 8. Visual Design

### Layout
- Full-bleed header (white, bottom border)
- Tab bar directly below header
- Content area: `max-w-4xl mx-auto`, `bg-gray-50` page background
- Cards: `bg-white rounded-xl border border-gray-200`

### Color Palette
| Element | Color |
|---------|-------|
| Primary actions | `blue-600` |
| Success/accept | `emerald-600` |
| Warning/pending | `amber-500` |
| Danger/decline | `red-600` |
| Own shift accent | Blue left border |
| Available shift accent | Emerald left border |
| Muted history items | 70% opacity |

### Shift Time Icons (Lucide)
| Time | Icon |
|------|------|
| Morning | `Sun` |
| Afternoon | `CloudSun` |
| Evening | `Moon` |

### Modals
- Fixed overlay with `backdrop-blur-sm`
- z-index: 100
- Max width: `max-w-lg` (request modal), `max-w-sm` (confirm/success)
- Mobile: slides up from bottom (`rounded-t-2xl`)

## 9. Technical Architecture

### Stack
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Icons:** lucide-react
- **State:** React `useReducer` via custom `useSwapState` hook
- **Data:** Mock data generated with relative dates (always shows "next 7 days")

### File Structure (16 files)
```
src/
├── lib/swap-data.ts          # Types, mock data, helpers
├── hooks/useSwapState.ts     # Reducer + derived state + actions
├── app/swap/page.tsx          # Main page, tab routing, modal state machine
└── components/swap/
    ├── SwapHeader.tsx         # Restaurant name + user identity
    ├── SwapTabs.tsx           # Tab bar with notification badge
    ├── ShiftCard.tsx          # 3 variants: own, available, compact
    ├── DateGroup.tsx          # Date heading wrapper
    ├── StatusBadge.tsx        # Colored status pill
    ├── ScheduleView.tsx       # My Schedule tab content
    ├── SwapFilters.tsx        # Role + time filter pills
    ├── BrowseView.tsx         # Browse Swaps tab content
    ├── SwapRequestCard.tsx    # Request card with shift comparison
    ├── RequestsView.tsx       # My Requests tab content
    ├── SwapRequestModal.tsx   # 3-step request flow
    ├── ConfirmModal.tsx       # Generic confirm dialog
    └── SuccessModal.tsx       # Celebration overlay
```

### State Management
Single `useReducer` with three actions:
- `TOGGLE_POST_FOR_SWAP` — flip a shift's posted state
- `CREATE_REQUEST` — add a new swap request
- `UPDATE_REQUEST_STATUS` — accept, decline, cancel, complete

Derived data (myShifts, availableSwaps, incomingRequests, sentRequests, pendingCount) computed from state on each render.

## 10. Mock Data

| Entity | Count | Notes |
|--------|-------|-------|
| Employees | 8 | Sarah (current user) + 7 coworkers |
| Shifts | 25 | 5 for Sarah, ~3 each for coworkers |
| Posted for swap | 8 | Spread across roles and times |
| Pre-populated requests | 4 | 1 pending sent, 1 pending incoming, 1 completed, 1 declined |

## 11. Success Criteria for Prototype

- [ ] All 3 tabs render with appropriate mock data
- [ ] Posting/unposting a shift toggles state and updates Browse tab
- [ ] Full swap request flow works (pick shift → message → confirm → success)
- [ ] Accept/decline incoming requests with confirmation modals
- [ ] Cancel sent requests
- [ ] Filters in Browse tab narrow results correctly
- [ ] Responsive on mobile widths (375px+)
- [ ] Empty states display when no data matches
- [ ] No build errors, no console warnings

## 12. Future Roadmap

**V2 — Backend Integration**
- Supabase auth + database
- Real-time updates via Supabase Realtime
- Manager approval toggle per restaurant

**V3 — Smart Matching**
- Role compatibility enforcement
- Overtime/labor law guardrails
- Auto-suggest best swaps based on schedule fit

**V4 — Platform Features**
- Push notifications (web + native)
- Calendar sync (Google, Apple)
- Multi-location support
- Swap analytics for managers
