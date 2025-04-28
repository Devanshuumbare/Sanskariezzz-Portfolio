"use client"

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface WaveformButtonProps {
  text: string
  onClick?: () => void
  onHover?: () => void
}

export default function WaveformButton({ text, onClick, onHover }: WaveformButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  
  // Fill animation on hover
  useEffect(() => {
    if (isHovered) {
      const timer = setTimeout(() => {
        setIsFilled(true)
      }, 300)
      
      return () => clearTimeout(timer)
    } else {
      setIsFilled(false)
    }
  }, [isHovered])
  
  // Handle hover
  const handleHover = () => {
    setIsHovered(true)
    if (onHover) onHover()
  }
  
  return (
    <motion.button
      ref={buttonRef}
      className="relative rounded-full overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={handleHover}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Button container */}
      <div className="relative w-48 h-48 flex items-center justify-center rounded-full border-2 border-white/20 bg-black/50 backdrop-blur-sm z-10">
        {/* Waveform fill background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Waveform bars */}
          <div className="absolute inset-0 flex items-end justify-center">
            {[...Array(30)].map((_, i) => {
              const height = Math.sin((i / 30) * Math.PI) * 100
              const delay = i * 0.02
              
              return (
                <motion.div
                  key={i}
                  className="w-1.5 mx-0.5 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-full"
                  initial={{ height: 0 }}
                  animate={{ height: isFilled ? `${height}%` : 0 }}
                  transition={{
                    duration: 0.5,
                    delay: isFilled ? delay : 0,
                    ease: "easeOut"
                  }}
                />
              )
            })}
          </div>
        </div>
        
        {/* Button content */}
        <div className="relative z-20 text-center">
          <motion.div
            animate={{ y: isHovered ? -10 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-lg font-medium text-white block mb-2">{text}</span>
            <motion.div
              className="flex justify-center"
              animate={{ 
                scale: isHovered ? 1.2 : 1,
                y: isHovered ? 5 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight className="text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ 
          boxShadow: isHovered 
            ? '0 0 20px rgba(79, 70, 229, 0.6), 0 0 40px rgba(79, 70, 229, 0.3)' 
            : '0 0 0px rgba(79, 70, 229, 0)'
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  )
}
