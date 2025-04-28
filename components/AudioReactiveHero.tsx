"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import GlitchLogo from './GlitchLogo'
import ClientOnly from './ClientOnly'

export default function AudioReactiveHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Transform values for scroll animations
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  // Handle logo hover/glitch
  const handleLogoHover = () => {
    // Simple glitch effect when logo is hovered
    // No action needed since we removed the audio waveform
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black z-0" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-10 z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Content container */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center gap-12 px-4"
        style={{ opacity, scale, y }}
      >
        {/* 3D Glitch Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ClientOnly>
            <GlitchLogo text="SANSKARIEZZZ" onHover={handleLogoHover} />
          </ClientOnly>
        </motion.div>
      </motion.div>

      {/* Floating particles */}
      <ClientOnly>
        <Particles />
      </ClientOnly>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-center justify-center">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-white"
            animate={{
              y: [0, 12, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </div>
  )
}

// Floating particles component
function Particles() {
  // Use useState and useEffect to ensure this only runs on the client side
  const [particles, setParticles] = useState<Array<{
    width: number;
    height: number;
    top: number;
    left: number;
    boxShadow: string;
    yOffset: number;
    duration: number;
    delay: number;
  }>>([]);

  // Generate particles only on the client side
  useEffect(() => {
    const newParticles = [...Array(30)].map(() => ({
      width: Math.random() * 4 + 2,
      height: Math.random() * 4 + 2,
      top: Math.random() * 100,
      left: Math.random() * 100,
      boxShadow: Math.random() * 10 + 5,
      yOffset: Math.random() * 100 + 50,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 10
    }));

    setParticles(newParticles);
  }, []);

  // Don't render anything during SSR
  if (particles.length === 0) {
    return null;
  }

  return (
    <>
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/80 z-0"
          style={{
            width: `${particle.width}px`,
            height: `${particle.height}px`,
            top: `${particle.top}%`,
            left: `${particle.left}%`,
            boxShadow: `0 0 ${particle.boxShadow}px rgba(255, 255, 255, 0.3)`,
          }}
          animate={{
            y: [0, -particle.yOffset],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: particle.delay,
          }}
        />
      ))}
    </>
  )
}
