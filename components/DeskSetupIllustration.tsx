"use client"

import { motion } from 'framer-motion'

export default function DeskSetupIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-md"
      >
        {/* Desk */}
        <motion.rect
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          x="50"
          y="200"
          width="300"
          height="20"
          rx="2"
          fill="#333"
          stroke="#444"
        />
        
        {/* Desk legs */}
        <motion.rect
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          x="70"
          y="220"
          width="10"
          height="60"
          fill="#222"
          style={{ transformOrigin: 'top' }}
        />
        <motion.rect
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          x="320"
          y="220"
          width="10"
          height="60"
          fill="#222"
          style={{ transformOrigin: 'top' }}
        />
        
        {/* Computer Monitor */}
        <motion.g
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <rect x="150" y="120" width="100" height="70" rx="2" fill="#111" stroke="#444" />
          <rect x="155" y="125" width="90" height="60" rx="1" fill="#0066cc" />
          <rect x="190" y="190" width="20" height="10" fill="#222" />
          <rect x="180" y="190" width="40" height="3" fill="#333" />
        </motion.g>
        
        {/* Microphone */}
        <motion.g
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        >
          <rect x="90" y="130" width="5" height="70" fill="#555" />
          <circle cx="90" cy="120" r="15" fill="#333" stroke="#666" />
          <circle cx="90" cy="120" r="10" fill="#222" stroke="#444" />
          <circle cx="90" cy="120" r="3" fill="#0066cc" />
        </motion.g>
        
        {/* Sketchpad/Tablet */}
        <motion.g
          initial={{ opacity: 0, rotate: -10, x: 20 }}
          animate={{ opacity: 1, rotate: 0, x: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          whileHover={{ rotate: -5, transition: { duration: 0.2 } }}
        >
          <rect x="270" y="160" width="60" height="40" rx="2" fill="#222" stroke="#444" />
          <rect x="275" y="165" width="50" height="30" rx="1" fill="#111" />
          <circle cx="300" cy="180" r="10" fill="#0066cc" opacity="0.3" />
        </motion.g>
        
        {/* Game Controller */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          whileHover={{ y: -5, transition: { duration: 0.2, yoyo: Infinity } }}
        >
          <path
            d="M100 180 C90 175, 80 175, 70 180 C60 185, 60 195, 70 200 C80 205, 90 205, 100 200 C110 195, 110 185, 100 180 Z"
            fill="#333"
            stroke="#444"
          />
          <circle cx="80" cy="185" r="3" fill="#0066cc" />
          <circle cx="90" cy="185" r="3" fill="#cc0066" />
          <rect x="75" y="195" width="20" height="2" fill="#222" />
        </motion.g>
      </svg>
    </div>
  )
}
