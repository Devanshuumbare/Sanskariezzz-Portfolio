"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// We'll use Framer Motion for the typing animation since GSAP is still installing
interface TypingAnimationProps {
  phrases: string[]
  typingSpeed?: number
  deleteSpeed?: number
  delayBetweenPhrases?: number
}

export default function TypingAnimation({
  phrases,
  typingSpeed = 100,
  deleteSpeed = 50,
  delayBetweenPhrases = 1000
}: TypingAnimationProps) {
  const textRef = useRef<HTMLSpanElement>(null)
  const phaseRef = useRef<'typing' | 'deleting' | 'pausing'>('typing')
  const currentPhraseIndexRef = useRef(0)
  const currentTextLengthRef = useRef(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const textElement = textRef.current
    if (!textElement) return

    const typeText = () => {
      const currentPhrase = phrases[currentPhraseIndexRef.current]
      
      if (phaseRef.current === 'typing') {
        if (currentTextLengthRef.current < currentPhrase.length) {
          // Still typing the current phrase
          currentTextLengthRef.current++
          textElement.textContent = currentPhrase.substring(0, currentTextLengthRef.current)
          timerRef.current = setTimeout(typeText, typingSpeed)
        } else {
          // Finished typing, pause before deleting
          phaseRef.current = 'pausing'
          timerRef.current = setTimeout(typeText, delayBetweenPhrases)
        }
      } else if (phaseRef.current === 'pausing') {
        // Start deleting
        phaseRef.current = 'deleting'
        timerRef.current = setTimeout(typeText, deleteSpeed)
      } else if (phaseRef.current === 'deleting') {
        if (currentTextLengthRef.current > 0) {
          // Still deleting
          currentTextLengthRef.current--
          textElement.textContent = currentPhrase.substring(0, currentTextLengthRef.current)
          timerRef.current = setTimeout(typeText, deleteSpeed)
        } else {
          // Move to next phrase
          currentPhraseIndexRef.current = (currentPhraseIndexRef.current + 1) % phrases.length
          phaseRef.current = 'typing'
          timerRef.current = setTimeout(typeText, typingSpeed)
        }
      }
    }

    // Start the typing animation
    timerRef.current = setTimeout(typeText, typingSpeed)

    // Cleanup
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [phrases, typingSpeed, deleteSpeed, delayBetweenPhrases])

  return (
    <div className="flex flex-col items-start">
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white flex items-center">
        <span ref={textRef} className="mr-1"></span>
        <motion.span 
          className="inline-block w-[3px] h-[1em] bg-blue-500"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </div>
    </div>
  )
}
