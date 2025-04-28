"use client"

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'

interface EnhancedScrollAnimationProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
  className?: string
  threshold?: number
}

export default function EnhancedScrollAnimation({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
  threshold = 0.2
}: EnhancedScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: threshold })
  
  // Set initial and animate values based on direction
  const getInitialValues = () => {
    switch (direction) {
      case 'up':
        return { y: 50, opacity: 0 }
      case 'down':
        return { y: -50, opacity: 0 }
      case 'left':
        return { x: 50, opacity: 0 }
      case 'right':
        return { x: -50, opacity: 0 }
      default:
        return { y: 50, opacity: 0 }
    }
  }
  
  const getAnimateValues = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { y: 0, opacity: 1 }
      case 'left':
      case 'right':
        return { x: 0, opacity: 1 }
      default:
        return { y: 0, opacity: 1 }
    }
  }
  
  return (
    <motion.div
      ref={ref}
      initial={getInitialValues()}
      animate={isInView ? getAnimateValues() : getInitialValues()}
      transition={{
        type: 'spring',
        damping: 25,
        stiffness: 100,
        delay,
        duration
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
