"use client"

import React, { useEffect, useRef } from 'react';

const GsapScrollText = ({ text, className }) => {
  const containerRef = useRef(null);
  const lettersRef = useRef([]);

  useEffect(() => {
    // We'll dynamically import GSAP to avoid SSR issues
    const loadGsap = async () => {
      try {
        // Import GSAP and ScrollTrigger
        const gsapModule = await import('gsap');
        const gsap = gsapModule.default;
        
        // Import ScrollTrigger
        const scrollTriggerModule = await import('gsap/ScrollTrigger');
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
        
        // Register ScrollTrigger plugin
        if (gsap.registerPlugin) {
          gsap.registerPlugin(ScrollTrigger);
        }

        // Get all letter elements
        const letters = lettersRef.current;
        
        // Create the timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          }
        });

        // Animate each letter
        tl.from(letters, {
          opacity: 0,
          y: 100,
          rotateX: -90,
          stagger: 0.05,
          duration: 0.8,
          ease: "back.out(1.7)",
        });

        // Cleanup function
        return () => {
          if (ScrollTrigger) {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
          }
          tl.kill();
        };
      } catch (error) {
        console.error("Failed to load GSAP:", error);
      }
    };

    loadGsap();
  }, [text]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div className="flex flex-wrap justify-center">
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
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default GsapScrollText;
