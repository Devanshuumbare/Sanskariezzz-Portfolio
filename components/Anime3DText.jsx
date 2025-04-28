"use client"

import React, { useEffect, useRef, useState } from 'react';

const Anime3DText = ({ text = "SANSKARIEZZZ", className = "" }) => {
  const containerRef = useRef(null);
  const lettersRef = useRef([]);
  const textRef = useRef(null);
  const hasInitialized = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const animeInstancesRef = useRef([]);
  const scrollTimelineRef = useRef(null);

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
        
        // Set perspective on container
        if (containerRef.current) {
          containerRef.current.style.perspective = '1200px';
        }
        
        // Initial animation - 3D staggered entrance
        const initialAnimation = anime.timeline({
          easing: 'easeOutExpo',
          complete: () => {
            // Start the floating animation after the initial animation completes
            startPulseAnimation(anime, letters);
          }
        });
        
        // First, scale the container from 0
        initialAnimation.add({
          targets: textRef.current,
          scale: [0, 1],
          opacity: [0, 1],
          duration: 800,
          easing: 'easeOutCubic',
        });
        
        // Then, animate each letter with 3D rotation
        initialAnimation.add({
          targets: letters,
          rotateY: [90, 0],
          rotateX: [40, 0],
          translateZ: [-200, 0],
          opacity: [0, 1],
          duration: 1500,
          delay: anime.stagger(50, {from: 'center'}),
          easing: 'easeOutElastic(1, .6)',
        }, '-=400');
        
        animeInstancesRef.current.push(initialAnimation);
        
        // Setup scroll event listener for scroll-based animations
        const handleScroll = () => {
          if (!containerRef.current) return;
          
          const rect = containerRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          
          // Calculate scroll progress (0 when element enters viewport, 1 when it leaves)
          const scrollProgress = 1 - Math.max(0, Math.min(1, 
            (rect.bottom) / (viewportHeight + rect.height)
          ));
          
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
    
    // Start a subtle pulse animation for continuous movement
    const startPulseAnimation = (anime, letters) => {
      // Subtle pulse for the entire text
      const pulseAnimation = anime({
        targets: textRef.current,
        scale: [1, 1.03, 1],
        duration: 3000,
        easing: 'easeInOutSine',
        loop: true
      });
      
      animeInstancesRef.current.push(pulseAnimation);
      
      // Subtle rotation for each letter
      letters.forEach((letter, index) => {
        const isEven = index % 2 === 0;
        const direction = isEven ? 1 : -1;
        const delay = index * 100;
        
        const letterAnimation = anime({
          targets: letter,
          rotateY: [0, direction * 10, 0],
          rotateX: [0, direction * 5, 0],
          translateZ: [0, 20, 0],
          easing: 'easeInOutSine',
          duration: 4000,
          delay: delay,
          loop: true
        });
        
        animeInstancesRef.current.push(letterAnimation);
      });
    };
    
    // Apply animations based on scroll position
    const applyScrollAnimations = (anime, letters, progress) => {
      if (progress <= 0) return;
      
      // Cancel existing scroll timeline if it exists
      if (scrollTimelineRef.current) {
        scrollTimelineRef.current.pause();
      }
      
      // Create a new timeline for scroll animations
      const scrollTimeline = anime.timeline({
        easing: 'easeOutSine',
        duration: 300,
        autoplay: true
      });
      
      // 3D rotation of the entire text based on scroll
      scrollTimeline.add({
        targets: textRef.current,
        rotateX: progress * 20,
        translateY: progress * -50,
        translateZ: progress * -100,
        scale: 1 - (progress * 0.2),
        opacity: 1 - (progress * 0.5),
      }, 0);
      
      // Letter-specific animations based on scroll
      const centerIndex = Math.floor(text.length / 2);
      
      letters.forEach((letter, index) => {
        // Calculate distance from center (0 to 1)
        const distanceFromCenter = Math.abs(index - centerIndex) / centerIndex;
        const direction = index < centerIndex ? -1 : 1;
        
        // More dramatic rotation for letters further from center
        scrollTimeline.add({
          targets: letter,
          rotateY: direction * (progress * 60) * distanceFromCenter,
          rotateX: direction * (progress * 40) * distanceFromCenter,
          translateZ: progress * -200 * distanceFromCenter,
          opacity: 1 - (progress * distanceFromCenter),
          color: () => {
            // Color shift based on scroll and position
            const hue = 240 + (progress * 60) + (index * 5);
            return `hsl(${hue}, 70%, ${70 - (progress * 20)}%)`;
          },
          textShadow: () => {
            const hue = 240 + (progress * 60) + (index * 5);
            return `0 0 ${5 + (progress * 15)}px rgba(${hue/360*255}, ${100 + (progress * 155)}, 255, ${0.5 + (progress * 0.5)})`;
          }
        }, 0);
      });
      
      scrollTimelineRef.current = scrollTimeline;
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
      style={{ 
        minHeight: "1.5em",
        perspective: "1200px"
      }}
    >
      <div 
        ref={textRef}
        className={`flex flex-wrap justify-center ${className} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          transition: "opacity 0.3s ease",
          willChange: "transform, opacity",
          transformStyle: "preserve-3d"
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

export default Anime3DText;
