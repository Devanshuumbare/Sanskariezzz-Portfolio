"use client"

import React, { useEffect, useRef, useState } from 'react';

const AnimeWaveText = ({ text = "SANSKARIEZZZ", className = "" }) => {
  const containerRef = useRef(null);
  const lettersRef = useRef([]);
  const textRef = useRef(null);
  const hasInitialized = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const animeInstancesRef = useRef([]);
  const waveAnimationRef = useRef(null);

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
        
        // Initial animation - wave effect
        const initialAnimation = anime.timeline({
          easing: 'easeOutExpo',
          complete: () => {
            // Start the wave animation after the initial animation completes
            startWaveAnimation(anime, letters);
          }
        });
        
        // Fade in the container
        initialAnimation.add({
          targets: textRef.current,
          opacity: [0, 1],
          duration: 600,
          easing: 'easeOutSine',
        });
        
        // Animate each letter with a wave pattern
        initialAnimation.add({
          targets: letters,
          translateY: (el, i) => [-40 + (i * 5), 0],
          opacity: [0, 1],
          duration: 1200,
          delay: anime.stagger(40),
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
          
          if (waveAnimationRef.current && waveAnimationRef.current.pause) {
            waveAnimationRef.current.pause();
          }
        };
      } catch (error) {
        console.error("Failed to initialize Anime.js animation:", error);
        setIsVisible(true); // Show text even if animation fails
      }
    };
    
    // Start a continuous wave animation
    const startWaveAnimation = (anime, letters) => {
      // Function to create a wave animation
      const createWave = () => {
        if (waveAnimationRef.current) {
          waveAnimationRef.current.pause();
        }
        
        // Create a wave that moves through the letters
        const waveAnimation = anime({
          targets: letters,
          translateY: (el, i) => {
            return [
              0,
              -15,
              0
            ];
          },
          translateX: (el, i) => {
            return [
              0,
              Math.sin(i * 0.3) * 8,
              0
            ];
          },
          scale: (el, i) => {
            return [
              1,
              1 + Math.sin(i * 0.3) * 0.1,
              1
            ];
          },
          color: (el, i) => {
            const hue = 240 + (i * 5);
            return [
              '#ffffff',
              `hsl(${hue}, 80%, 70%)`,
              '#ffffff'
            ];
          },
          textShadow: (el, i) => {
            const hue = 240 + (i * 5);
            return [
              '2px 2px 4px rgba(0,0,0,0.3)',
              `0 0 10px rgba(${hue/360*255}, ${100 + (i * 10)}, 255, 0.8)`,
              '2px 2px 4px rgba(0,0,0,0.3)'
            ];
          },
          delay: anime.stagger(100, {start: 500}),
          duration: 2000,
          easing: 'easeInOutSine',
          complete: createWave,
        });
        
        waveAnimationRef.current = waveAnimation;
      };
      
      // Start the wave animation
      createWave();
    };
    
    // Apply animations based on scroll position
    const applyScrollAnimations = (anime, letters, progress) => {
      if (progress <= 0) return;
      
      // Scale and opacity animation based on scroll
      anime({
        targets: textRef.current,
        translateY: -50 * progress,
        scale: 1 - (progress * 0.15),
        opacity: 1 - (progress * 0.5),
        easing: 'easeOutSine',
        duration: 300
      });
      
      // Increase wave intensity based on scroll
      if (waveAnimationRef.current) {
        // We can't directly modify the running animation,
        // but we can adjust the CSS variables that control the wave
        letters.forEach((letter, i) => {
          anime({
            targets: letter,
            '--wave-intensity': progress * 2,
            easing: 'easeOutSine',
            duration: 300
          });
        });
      }
      
      // Add a scatter effect when scrolling far enough
      if (progress > 0.7) {
        const scatterProgress = (progress - 0.7) / 0.3; // Normalize to 0-1 range
        
        letters.forEach((letter, i) => {
          const angle = Math.random() * 360;
          const distance = 100 + (Math.random() * 200);
          
          anime({
            targets: letter,
            translateX: Math.cos(angle) * distance * scatterProgress,
            translateY: Math.sin(angle) * distance * scatterProgress,
            rotate: (Math.random() - 0.5) * 360 * scatterProgress,
            opacity: 1 - scatterProgress,
            easing: 'easeOutSine',
            duration: 300
          });
        });
      }
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
              '--wave-intensity': 1,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
      
      {/* Add a gradient background that follows the wave */}
      <div 
        className="absolute inset-0 -z-10 opacity-30 bg-gradient-to-b from-purple-500/20 to-blue-500/20 rounded-full filter blur-[50px]"
        style={{
          transform: 'translateY(var(--wave-offset, 0))',
          transition: 'transform 0.5s ease',
        }}
      />
    </div>
  );
};

export default AnimeWaveText;
