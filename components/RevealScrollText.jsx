"use client"

import React, { useEffect, useRef, useState } from 'react';

const RevealScrollText = ({ text = "SANSKARIEZZZ", className = "" }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const maskRef = useRef(null);
  const hasInitialized = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run once
    if (hasInitialized.current) return;
    
    const initAnimation = async () => {
      try {
        // Dynamically import GSAP and ScrollTrigger to avoid SSR issues
        const gsapModule = await import('gsap');
        const gsap = gsapModule.default;
        
        const scrollTriggerModule = await import('gsap/ScrollTrigger');
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
        
        // Register ScrollTrigger plugin
        if (gsap.registerPlugin) {
          gsap.registerPlugin(ScrollTrigger);
        }
        
        // Create a timeline for the initial animation
        const tl = gsap.timeline({
          onComplete: () => setIsVisible(true)
        });
        
        // Initial reveal animation
        tl.fromTo(maskRef.current, 
          { width: "0%" },
          { 
            width: "100%", 
            duration: 1.5, 
            ease: "power4.inOut" 
          }
        );
        
        tl.fromTo(textRef.current,
          { 
            y: 50,
            opacity: 0
          },
          { 
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
          },
          "-=0.5" // Start slightly before the mask animation completes
        );
        
        // Create ScrollTrigger animations
        
        // 1. Parallax effect - text moves slower than scroll
        gsap.to(textRef.current, {
          y: -50,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            ease: "none",
          }
        });
        
        // 2. Mask reveal effect on scroll
        const maskTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "center 30%",
            scrub: 1,
          }
        });
        
        // Create a reveal effect that follows scroll
        maskTimeline.to(maskRef.current, {
          backgroundPosition: "200% 0%",
          duration: 1,
          ease: "power2.inOut",
        });
        
        // 3. Text scale and blur effect
        gsap.to(textRef.current, {
          scale: 1.1,
          filter: "blur(2px)",
          opacity: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "center 40%",
            end: "bottom top",
            scrub: true,
          }
        });
        
        // 4. Add a highlight effect that moves across the text
        const highlightTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 20%",
            scrub: 2,
          }
        });
        
        highlightTimeline.fromTo(
          ".highlight-overlay",
          {
            x: "-100%",
          },
          {
            x: "100%",
            duration: 2,
            ease: "power1.inOut",
          }
        );
        
        // Mark as initialized
        hasInitialized.current = true;
        
        // Cleanup function
        return () => {
          if (ScrollTrigger) {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
          }
          tl.kill();
        };
      } catch (error) {
        console.error("Failed to initialize GSAP animation:", error);
        setIsVisible(true); // Show text even if animation fails
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
      className="overflow-hidden relative"
      style={{ minHeight: "1.5em" }}
    >
      {/* Mask element for reveal effect */}
      <div 
        ref={maskRef}
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          backgroundSize: "200% 100%",
          backgroundPosition: "0% 0%",
          width: "0%",
          height: "100%",
        }}
      />
      
      {/* Highlight overlay that moves across the text */}
      <div 
        className="highlight-overlay absolute inset-0 z-20 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
          backgroundSize: "50% 100%",
          backgroundPosition: "center",
        }}
      />
      
      {/* Main text element */}
      <div 
        ref={textRef}
        className={`flex flex-wrap justify-center ${className} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          transition: "opacity 0.3s ease",
          willChange: "transform, opacity, filter",
          position: "relative",
          zIndex: 5,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          background: "linear-gradient(135deg, #ffffff, #a855f7, #4a4ab1)",
          backgroundSize: "300% 300%",
          color: "transparent",
          animation: "gradientFlow 8s ease infinite",
        }}
      >
        {text}
      </div>
      
      {/* Add a style tag for the gradient animation */}
      <style jsx>{`
        @keyframes gradientFlow {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
      `}</style>
    </div>
  );
};

export default RevealScrollText;
