"use client"

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const SplitTextReveal = ({ text, className }) => {
  // Create an array of words from the text
  const words = text.split(' ');
  
  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.04,
      },
    },
  };
  
  // Animation variants for each word
  const wordVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  };
  
  // Animation variants for each letter
  const letterVariants = {
    hidden: { 
      y: 100, 
      opacity: 0,
      rotateX: -90,
    },
    visible: { 
      y: 0, 
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };
  
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-wrap justify-center">
        {words.map((word, wordIndex) => (
          <motion.span
            key={wordIndex}
            className="mr-2 mb-2 overflow-hidden"
            variants={wordVariants}
          >
            {word.split('').map((char, charIndex) => (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                className="inline-block relative text-white"
                variants={letterVariants}
                style={{
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  transform: `translateZ(${charIndex * 2}px)`,
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default SplitTextReveal;
