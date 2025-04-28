"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GsapTextAnimation from './GsapTextAnimation';
import GsapScrollText from './GsapScrollText';
import SplitTextReveal from './SplitTextReveal';
import GlitchText from './GlitchText';

const AnimatedHeroText = ({ text = "SANSKARIEZZZ", className = "" }) => {
  const [animationType, setAnimationType] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  // Ensure we're on the client side before rendering animations
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Animation components
  const animations = [
    <GsapTextAnimation key="gsap" text={text} className={className} />,
    <SplitTextReveal key="split" text={text} className={className} />,
    <GlitchText key="glitch" text={text} className={className} />,
    <GsapScrollText key="scroll" text={text} className={className} />
  ];
  
  // Controls for switching animations
  const AnimationControls = () => (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
      {[0, 1, 2, 3].map((index) => (
        <button
          key={index}
          onClick={() => setAnimationType(index)}
          className={`w-3 h-3 rounded-full transition-all ${
            animationType === index 
              ? 'bg-white scale-125' 
              : 'bg-white/30 hover:bg-white/50'
          }`}
          aria-label={`Animation style ${index + 1}`}
        />
      ))}
    </div>
  );
  
  if (!isClient) {
    // Return a simple placeholder while on server
    return (
      <div className={`${className} opacity-0`}>
        {text}
      </div>
    );
  }
  
  return (
    <div className="relative">
      {animations[animationType]}
      <AnimationControls />
    </div>
  );
};

export default AnimatedHeroText;
