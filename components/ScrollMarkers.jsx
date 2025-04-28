"use client"

import React, { useEffect } from 'react';

// This component is for development only - it shows ScrollTrigger markers
const ScrollMarkers = ({ enabled = false }) => {
  useEffect(() => {
    if (!enabled) return;
    
    const initMarkers = async () => {
      try {
        // Dynamically import GSAP and ScrollTrigger
        const gsapModule = await import('gsap');
        const gsap = gsapModule.default;
        
        const scrollTriggerModule = await import('gsap/ScrollTrigger');
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
        
        // Register ScrollTrigger plugin
        if (gsap.registerPlugin) {
          gsap.registerPlugin(ScrollTrigger);
        }
        
        // Enable markers for all ScrollTrigger instances
        ScrollTrigger.defaults({ markers: true });
        
        console.log("ScrollTrigger markers enabled for development");
      } catch (error) {
        console.error("Failed to initialize ScrollTrigger markers:", error);
      }
    };
    
    initMarkers();
    
    // Cleanup function
    return () => {
      // Nothing to clean up here
    };
  }, [enabled]);
  
  // This component doesn't render anything visible
  return null;
};

export default ScrollMarkers;
