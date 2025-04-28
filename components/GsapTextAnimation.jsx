"use client"

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// This component will use Framer Motion for the animation
// We'll implement GSAP as a fallback if needed
const GsapTextAnimation = ({ text, className }) => {
  const containerRef = useRef(null);
  
  // Animation variants for different effects
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex flex-wrap justify-center">
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            custom={index}
            variants={letterVariants}
            className="inline-block relative text-white"
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default GsapTextAnimation;
