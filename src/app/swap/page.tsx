'use client'

import { useState, useCallback } from 'react'
import type { Shift } from '@/lib/swap-data'
import { useSwapState } from '@/hooks/useSwapState'
import SwapHeader from '@/components/swap/SwapHeader'
import SwapTabs, { type TabId } from '@/components/swap/SwapTabs'
import ScheduleView from '@/components/swap/ScheduleView'
import BrowseView from '@/components/swap/BrowseView'
import RequestsView from '@/components/swap/RequestsView'
import SwapRequestModal from '@/components/swap/SwapRequestModal'
import ConfirmModal from '@/components/swap/ConfirmModal'
import SuccessModal from '@/components/swap/SuccessModal'

type ModalState =
  | { type: 'none' }
  | { type: 'swap-request'; targetShift: Shift }
  | { type: 'confirm-accept'; requestId: string }
  | { type: 'confirm-decline'; requestId: string }
  | { type: 'confirm-cancel'; requestId: string }
  | { type: 'success'; title: string; message: string }

export default function SwapPage() {
  const [activeTab, setActiveTab] = useState<TabId>('schedule')
  const [modal, setModal] = useState<ModalState>({ type: 'none' })

  const {
    shifts,
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
  } = useSwapState()

  const closeModal = useCallback(() => setModal({ type: 'none' }), [])

  const handleRequestSwap = useCallback((shift: Shift) => {
    setModal({ type: 'swap-request', targetShift: shift })
  }, [])

  const handleSubmitRequest = useCallback(
    (offeredShiftId: string, message: string) => {
      if (modal.type !== 'swap-request') return
      createRequest(modal.targetShift.id, offeredShiftId, message)
      setModal({
        type: 'success',
        title: 'Request Sent!',
        message: 'Your swap request has been sent. You\'ll be notified when they respond.',
      })
    },
    [modal, createRequest]
  )

  const handleAccept = useCallback((requestId: string) => {
    setModal({ type: 'confirm-accept', requestId })
  }, [])

  const handleDecline = useCallback((requestId: string) => {
    setModal({ type: 'confirm-decline', requestId })
  }, [])

  const handleCancel = useCallback((requestId: string) => {
    setModal({ type: 'confirm-cancel', requestId })
  }, [])

  const handleConfirmAccept = useCallback(() => {
    if (modal.type !== 'confirm-accept') return
    acceptRequest(modal.requestId)
    setModal({
      type: 'success',
      title: 'Swap Accepted!',
      message: 'The shift swap has been confirmed. Both schedules have been updated.',
    })
  }, [modal, acceptRequest])

  const handleConfirmDecline = useCallback(() => {
    if (modal.type !== 'confirm-decline') return
    declineRequest(modal.requestId)
    closeModal()
  }, [modal, declineRequest, closeModal])

  const handleConfirmCancel = useCallback(() => {
    if (modal.type !== 'confirm-cancel') return
    cancelRequest(modal.requestId)
    closeModal()
  }, [modal, cancelRequest, closeModal])

  return (
    <div className="min-h-screen bg-gray-50">
      <SwapHeader />
      <SwapTabs activeTab={activeTab} onTabChange={setActiveTab} pendingCount={pendingIncomingCount} />

      <main className="max-w-4xl mx-auto px-4 py-6">
        {activeTab === 'schedule' && (
          <ScheduleView shifts={myShifts} onTogglePost={togglePostForSwap} />
        )}
        {activeTab === 'browse' && (
          <BrowseView shifts={availableSwaps} onRequestSwap={handleRequestSwap} />
        )}
        {activeTab === 'requests' && (
          <RequestsView
            incomingRequests={incomingRequests}
            sentRequests={sentRequests}
            shifts={shifts}
            onAccept={handleAccept}
            onDecline={handleDecline}
            onCancel={handleCancel}
          />
        )}
      </main>

      {/* Modals */}
      {modal.type === 'swap-request' && (
        <SwapRequestModal
          targetShift={modal.targetShift}
          myShifts={myShifts}
          onSubmit={handleSubmitRequest}
          onClose={closeModal}
        />
      )}

      {modal.type === 'confirm-accept' && (
        <ConfirmModal
          title="Accept Swap?"
          message="Both your schedules will be updated immediately. This action can't be undone."
          confirmLabel="Accept Swap"
          confirmStyle="success"
          onConfirm={handleConfirmAccept}
          onCancel={closeModal}
        />
      )}

      {modal.type === 'confirm-decline' && (
        <ConfirmModal
          title="Decline Swap?"
          message="The other person will be notified that you've declined their request."
          confirmLabel="Decline"
          confirmStyle="danger"
          onConfirm={handleConfirmDecline}
          onCancel={closeModal}
        />
      )}

      {modal.type === 'confirm-cancel' && (
        <ConfirmModal
          title="Cancel Request?"
          message="Are you sure you want to withdraw this swap request?"
          confirmLabel="Cancel Request"
          confirmStyle="danger"
          onConfirm={handleConfirmCancel}
          onCancel={closeModal}
        />
      )}

      {modal.type === 'success' && (
        <SuccessModal
          title={modal.title}
          message={modal.message}
          onClose={closeModal}
        />
      )}
    </div>
  )
}
