'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import EmberChatWindow from '@/components/ember/EmberChatWindow'
import EmberFlameIcon from '@/components/ember/EmberFlameIcon'
import { EmberChatProvider, useEmberChat } from '@/components/ember/EmberChatContext'

function EmberChatWidgetInner() {
  const pathname = usePathname()
  const { isOpen, open, toggle } = useEmberChat()
  const isVelouraShop = pathname?.startsWith('/demo/veloura-shop')

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) toggle()
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, toggle])

  if (isVelouraShop) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {isOpen ? <EmberChatWindow /> : null}
      {!isOpen ? (
        <button
          type="button"
          onClick={open}
          aria-label="Open Ember chat"
          className="pointer-events-auto fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-orange-600/30 transition duration-200 hover:scale-105"
        >
          <EmberFlameIcon className="!h-14 !w-14 !bg-transparent !shadow-none" />
        </button>
      ) : null}
    </div>
  )
}

export default function EmberChatWidget() {
  return (
    <EmberChatProvider>
      <EmberChatWidgetInner />
    </EmberChatProvider>
  )
}
