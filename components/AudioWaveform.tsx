"use client"

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface AudioWaveformProps {
  barCount?: number
  minHeight?: number
  maxHeight?: number
  barWidth?: number
  gap?: number
  color?: string
  activeColor?: string
  isActive?: boolean
}

export default function AudioWaveform({
  barCount = 50,
  minHeight = 10,
  maxHeight = 100,
  barWidth = 3,
  gap = 2,
  color = "#1E90FF",
  activeColor = "#FF2D95",
  isActive = true
}: AudioWaveformProps) {
  const [heights, setHeights] = useState<number[]>([])
  const animationRef = useRef<number | null>(null)
  const lastUpdateTimeRef = useRef<number>(0)
  const updateIntervalRef = useRef<number>(100) // ms between updates

  // Helper function to generate initial heights
  const getInitialHeights = () => {
    if (typeof window === 'undefined') return [];

    return Array.from({ length: barCount }, () => {
      // Use a sine wave with some randomness for more natural looking audio visualization
      const randomFactor = Math.random() * 0.5 + 0.5
      return Math.floor(Math.sin(Math.random() * Math.PI) * (maxHeight - minHeight) * randomFactor + minHeight)
    })
  }

  // Initial setup - run once
  useEffect(() => {
    // Skip during SSR
    if (typeof window === 'undefined') {
      return;
    }

    // Initialize heights only once
    if (heights.length === 0) {
      setHeights(getInitialHeights())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty dependency array means this runs once on mount

  // Handle animation updates
  useEffect(() => {
    // Skip during SSR
    if (typeof window === 'undefined') {
      return;
    }

    // Store the current values in refs to avoid dependency issues
    const currentBarCount = barCount;
    const currentMinHeight = minHeight;
    const currentMaxHeight = maxHeight;

    // Animation loop for active waveform
    const updateWaveform = (time: number) => {
      if (isActive && time - lastUpdateTimeRef.current > updateIntervalRef.current) {
        lastUpdateTimeRef.current = time

        // Generate new heights using the current values
        const newHeights = Array.from({ length: currentBarCount }, () => {
          const randomFactor = Math.random() * 0.5 + 0.5
          return Math.floor(Math.sin(Math.random() * Math.PI) *
            (currentMaxHeight - currentMinHeight) * randomFactor + currentMinHeight)
        });

        setHeights(newHeights)
      }
      animationRef.current = requestAnimationFrame(updateWaveform)
    }

    // Start animation only if active
    if (isActive) {
      // Cancel any existing animation before starting a new one
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      animationRef.current = requestAnimationFrame(updateWaveform)
    }

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [isActive, barCount, minHeight, maxHeight]) // Include all dependencies

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex items-center gap-[2px]">
        {heights.map((height, index) => (
          <motion.div
            key={index}
            className="rounded-full"
            style={{
              width: barWidth,
              backgroundColor: isActive ?
                // Color gradient from blue to pink based on height
                `rgba(${30 + (height / maxHeight) * 225}, ${144 - (height / maxHeight) * 100}, ${255 - (height / maxHeight) * 160}, 0.8)`
                : color,
              height: 0
            }}
            animate={{ height }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              mass: 0.5
            }}
          />
        ))}
      </div>
    </div>
  )
}
