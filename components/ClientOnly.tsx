"use client"

import { useEffect, useState, ReactNode } from 'react'

interface ClientOnlyProps {
  children: ReactNode
  fallback?: ReactNode
}

/**
 * Component that only renders its children on the client side
 * This helps prevent hydration errors with components that use browser-specific APIs
 */
export default function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  // Return fallback (or null) during SSR
  if (!isClient) {
    return fallback
  }
  
  // Return children on client
  return <>{children}</>
}
