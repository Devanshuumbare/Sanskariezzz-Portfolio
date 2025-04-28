"use client"

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface GlitchLogoProps {
  text: string
  onHover?: () => void
}

export default function GlitchLogo({ text, onHover }: GlitchLogoProps) {
  const [isGlitching, setIsGlitching] = useState(false)
  const [glitchIntensity, setGlitchIntensity] = useState(0)
  const glitchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Random glitch effect - client-side only
  useEffect(() => {
    // Skip during SSR
    if (typeof window === 'undefined') {
      return;
    }

    const randomGlitch = () => {
      // Random chance to glitch
      if (Math.random() > 0.95) {
        setIsGlitching(true)
        setGlitchIntensity(Math.random() * 0.5 + 0.5) // Random intensity

        // Clear any existing timeout
        if (glitchTimeoutRef.current) {
          clearTimeout(glitchTimeoutRef.current)
        }

        // Stop glitching after a short random duration
        glitchTimeoutRef.current = setTimeout(() => {
          setIsGlitching(false)
        }, Math.random() * 200 + 50)
      }
    }

    // Set up interval for random glitches
    const intervalId = setInterval(randomGlitch, 1000)

    return () => {
      clearInterval(intervalId)
      if (glitchTimeoutRef.current) {
        clearTimeout(glitchTimeoutRef.current)
      }
    }
  }, [])

  // Handle manual glitch on hover
  const handleHover = () => {
    setIsGlitching(true)
    setGlitchIntensity(1) // Full intensity on hover

    // Clear any existing timeout
    if (glitchTimeoutRef.current) {
      clearTimeout(glitchTimeoutRef.current)
    }

    // Stop glitching after a short duration
    glitchTimeoutRef.current = setTimeout(() => {
      setIsGlitching(false)
    }, 500)

    // Call the onHover callback if provided
    if (onHover) {
      onHover()
    }
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleHover}
      onTouchStart={handleHover}
    >
      {/* Main text */}
      <motion.h1
        className="text-6xl md:text-8xl font-black tracking-tighter text-white relative z-10"
        animate={{
          x: isGlitching ? [0, -3, 5, -2, 0] : 0,
          y: isGlitching ? [0, 2, -4, 1, 0] : 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {text}
      </motion.h1>

      {/* 3D shadow effect */}
      <div className="absolute -bottom-2 left-1 right-1 h-4 bg-gradient-to-b from-blue-500/30 to-transparent blur-md z-0" />

      {/* Glitch layers */}
      {isGlitching && (
        <>
          {/* Red channel */}
          <motion.h1
            className="text-6xl md:text-8xl font-black tracking-tighter text-red-500/30 absolute top-0 left-0 z-20 mix-blend-screen"
            animate={{
              x: [-2, 1, -3, 0],
              y: [1, -1, 2, 0],
              opacity: [0.5, 0.8, 0.5, 0.8],
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={{ textShadow: '0 0 5px rgba(239, 68, 68, 0.5)' }}
          >
            {text}
          </motion.h1>

          {/* Blue channel */}
          <motion.h1
            className="text-6xl md:text-8xl font-black tracking-tighter text-blue-500/30 absolute top-0 left-0 z-20 mix-blend-screen"
            animate={{
              x: [2, -1, 3, 0],
              y: [-1, 1, -2, 0],
              opacity: [0.5, 0.8, 0.5, 0.8],
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={{ textShadow: '0 0 5px rgba(59, 130, 246, 0.5)' }}
          >
            {text}
          </motion.h1>

          {/* Noise overlay */}
          <motion.div
            className="absolute inset-0 z-30 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
              backgroundSize: 'cover',
              opacity: glitchIntensity * 0.3,
            }}
          />

          {/* Horizontal glitch lines */}
          {[...Array(3)].map((_, i) => {
            // Use fixed positions instead of random for SSR compatibility
            const positions = [25, 50, 75];
            return (
              <motion.div
                key={i}
                className="absolute left-0 right-0 h-[1px] bg-white/80 z-30"
                style={{
                  top: `${positions[i]}%`,
                  opacity: glitchIntensity * 0.7,
                }}
                animate={{
                  scaleX: [0, 1, 0],
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                  delay: i * 0.05,
                }}
              />
            );
          })}
        </>
      )}

      {/* 3D extrusion effect - simplified version */}
      <div className="absolute inset-0 z-0">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute text-6xl md:text-8xl font-black tracking-tighter text-blue-900/5"
            style={{
              top: i * 1,
              left: i * 1,
              transform: `translateZ(-${i * 5}px)`,
            }}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  )
}
