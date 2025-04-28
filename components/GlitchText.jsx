"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GlitchText = ({ text, className }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Start the animation after component mounts
  useEffect(() => {
    setIsAnimating(true);
  }, []);
  
  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };
  
  // Animation variants for each letter
  const letterVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      x: -10,
      filter: "blur(10px)",
    },
    visible: { 
      opacity: 1,
      y: 0,
      x: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
  };
  
  // Glitch animation for random letters
  const glitchAnimation = {
    x: [0, -2, 2, -1, 1, 0],
    y: [0, 1, -1, 1, -1, 0],
    filter: ["blur(0px)", "blur(1px)", "blur(0px)", "blur(2px)", "blur(0px)"],
    opacity: [1, 0.8, 1, 0.9, 1],
    transition: {
      duration: 0.3,
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: Math.random() * 5 + 5,
    },
  };
  
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isAnimating ? "visible" : "hidden"}
    >
      <div className="flex flex-wrap justify-center">
        {text.split('').map((char, index) => {
          // Determine if this letter should have the glitch effect
          // Apply to ~20% of letters randomly
          const hasGlitch = Math.random() < 0.2;
          
          return (
            <motion.span
              key={index}
              className="inline-block relative text-white"
              variants={letterVariants}
              animate={hasGlitch ? glitchAnimation : {}}
              style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          );
        })}
      </div>
    </motion.div>
  );
};

export default GlitchText;
