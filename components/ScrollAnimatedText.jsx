"use client"

import React, { useState, useEffect } from 'react';
import ScrollTriggerText from './ScrollTriggerText';
import ScrollTrigger3DText from './ScrollTrigger3DText';
import RevealScrollText from './RevealScrollText';

const ScrollAnimatedText = ({ text = "SANSKARIEZZZ", className = "" }) => {
  const [animationType, setAnimationType] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side before rendering animations
  useEffect(() => {
    setIsClient(true);

    // Preload all animation components to avoid flicker when switching
    const preloadComponents = async () => {
      try {
        // Dynamically import GSAP to ensure it's available
        await import('gsap');
      } catch (error) {
        console.warn("Failed to preload GSAP:", error);
      }
    };

    preloadComponents();
  }, []);

  // Animation components with labels
  const animations = [
    { component: <ScrollTriggerText key="basic" text={text} className={className} />, label: "Float" },
    { component: <ScrollTrigger3DText key="3d" text={text} className={className} />, label: "3D" },
    { component: <RevealScrollText key="reveal" text={text} className={className} />, label: "Reveal" }
  ];

  // Controls for switching animations with labels
  const AnimationControls = () => (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
      {animations.map((animation, index) => (
        <button
          key={index}
          onClick={() => setAnimationType(index)}
          className="group flex flex-col items-center"
          aria-label={`Animation style: ${animation.label}`}
        >
          <span className={`text-xs mb-1 transition-all ${
            animationType === index
              ? 'text-white opacity-100'
              : 'text-white/50 opacity-70 group-hover:opacity-100'
          }`}>
            {animation.label}
          </span>
          <div className={`w-3 h-3 rounded-full transition-all ${
            animationType === index
              ? 'bg-white scale-125'
              : 'bg-white/30 group-hover:bg-white/50'
          }`} />
        </button>
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
      {animations[animationType].component}
      <AnimationControls />
    </div>
  );
};

export default ScrollAnimatedText;
