"use client"

import React, { useEffect, useRef, useState } from 'react';

const AnimeScrollText = ({ text = "SANSKARIEZZZ", className = "" }) => {
  const containerRef = useRef(null);
  const lettersRef = useRef([]);
  const textRef = useRef(null);
  const hasInitialized = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const animeInstancesRef = useRef([]);

  useEffect(() => {
    // Only run once
    if (hasInitialized.current) return;
    
    const initAnimation = async () => {
      try {
        // Dynamically import Anime.js
        const anime = (await import('animejs')).default;
        
        // Set initial visibility
        setIsVisible(true);
        
        // Get all letter elements
        const letters = lettersRef.current;
        
        // Initial animation - letters come in from below with a stagger
        const initialAnimation = anime({
          targets: letters,
          translateY: [100, 0],
          translateZ: [50, 0],
          opacity: [0, 1],
          rotateX: [-90, 0],
          delay: anime.stagger(40, {from: 'center'}),
          duration: 1200,
          easing: 'easeOutElastic(1, .6)',
          complete: () => {
            // Start the floating animation after the initial animation completes
            startFloatingAnimation(anime, letters);
          }
        });
        
        animeInstancesRef.current.push(initialAnimation);
        
        // Setup scroll event listener for scroll-based animations
        const handleScroll = () => {
          if (!containerRef.current) return;
          
          const rect = containerRef.current.getBoundingClientRect();
          const scrollProgress = 1 - Math.max(0, Math.min(1, rect.top / window.innerHeight));
          
          // Apply scroll-based animations
          applyScrollAnimations(anime, letters, scrollProgress);
        };
        
        window.addEventListener('scroll', handleScroll);
        
        // Mark as initialized
        hasInitialized.current = true;
        
        // Cleanup function
        return () => {
          window.removeEventListener('scroll', handleScroll);
          animeInstancesRef.current.forEach(instance => {
            if (instance && instance.pause) {
              instance.pause();
            }
          });
        };
      } catch (error) {
        console.error("Failed to initialize Anime.js animation:", error);
        setIsVisible(true); // Show text even if animation fails
      }
    };
    
    // Start the floating animation for continuous movement
    const startFloatingAnimation = (anime, letters) => {
      letters.forEach((letter, index) => {
        // Create a unique floating animation for each letter
        const isEven = index % 2 === 0;
        const direction = isEven ? 1 : -1;
        const delay = index * 120;
        const duration = 2000 + Math.random() * 1000;
        
        const floatingAnimation = anime({
          targets: letter,
          translateY: [0, direction * 15, 0],
          translateX: [0, direction * (Math.random() * 5), 0],
          rotateZ: [0, direction * (Math.random() * 5), 0],
          easing: 'easeInOutSine',
          duration: duration,
          delay: delay,
          loop: true
        });
        
        animeInstancesRef.current.push(floatingAnimation);
      });
    };
    
    // Apply animations based on scroll position
    const applyScrollAnimations = (anime, letters, progress) => {
      if (progress <= 0) return;
      
      // Scale and opacity animation based on scroll
      anime({
        targets: textRef.current,
        scale: 1 - (progress * 0.2),
        opacity: 1 - (progress * 0.5),
        easing: 'easeOutSine',
        duration: 300
      });
      
      // Letter rotation based on scroll
      letters.forEach((letter, index) => {
        const isEven = index % 2 === 0;
        const rotationDirection = isEven ? 1 : -1;
        
        anime({
          targets: letter,
          rotateY: rotationDirection * (progress * 30),
          easing: 'easeOutSine',
          duration: 300
        });
      });
      
      // Color change based on scroll
      const hue1 = 240; // Blue
      const hue2 = 280; // Purple
      const currentHue = Math.floor(hue1 + ((hue2 - hue1) * progress));
      
      anime({
        targets: letters,
        color: `hsl(${currentHue}, 70%, 70%)`,
        textShadow: `0 0 ${5 + (progress * 10)}px rgba(${currentHue/360*255}, ${100 + (progress * 155)}, 255, ${0.5 + (progress * 0.5)})`,
        delay: anime.stagger(30, {from: 'center'}),
        easing: 'easeOutSine',
        duration: 300
      });
    };
    
    // Initialize animation after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      initAnimation();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <div 
      ref={containerRef} 
      className="overflow-hidden"
      style={{ minHeight: "1.5em" }}
    >
      <div 
        ref={textRef}
        className={`flex flex-wrap justify-center ${className} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          transition: "opacity 0.3s ease",
          willChange: "transform, opacity"
        }}
      >
        {text.split('').map((char, index) => (
          <span
            key={index}
            ref={el => {
              if (el && !lettersRef.current.includes(el)) {
                lettersRef.current[index] = el;
              }
            }}
            className="inline-block relative text-white"
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              willChange: 'transform, opacity, color, text-shadow',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnimeScrollText;
