'use client'

import { useState } from 'react'
import { isPreviewMode } from '@/lib/sanity-preview'

export function PreviewBanner() {
  const [isVisible, setIsVisible] = useState(true)
  
  // Only show if we're in preview mode
  if (!isPreviewMode() || !isVisible) {
    return null
  }

  const exitPreview = async () => {
    try {
      await fetch('/api/preview', { method: 'POST' })
      window.location.reload()
    } catch (error) {
      console.error('Failed to exit preview mode:', error)
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-black px-4 py-2 flex items-center justify-between shadow-lg">
      <div className="flex items-center space-x-2">
        <span className="font-semibold">Preview Mode</span>
        <span className="text-sm">You are viewing unpublished content</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={exitPreview}
          className="bg-black text-yellow-500 px-3 py-1 rounded text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Exit Preview
        </button>
        
        <button
          onClick={() => setIsVisible(false)}
          className="text-black hover:text-gray-700 p-1"
          aria-label="Close banner"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

// Hook to check if we're in preview mode
export function usePreview() {
  if (typeof window === 'undefined') return false
  return isPreviewMode()
}