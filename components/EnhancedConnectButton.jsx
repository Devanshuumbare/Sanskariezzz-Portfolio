"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const EnhancedConnectButton = ({ onMouseEnter, onMouseLeave }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Handle hover state
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onMouseEnter) onMouseEnter("Connect");
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (onMouseLeave) onMouseLeave();
  };
  
  // Generate random particles for the hover effect
  const particles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 0.8 + Math.random() * 0.4,
    delay: Math.random() * 0.2,
  }));

  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Button
        className="relative group px-7 py-6 h-auto rounded-full overflow-hidden border-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 transition-all duration-300"
      >
        {/* Glow effect */}
        <div 
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.5) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 70%)',
            filter: 'blur(10px)',
          }}
        />
        
        {/* Border gradient */}
        <div 
          className="absolute inset-0 rounded-full border border-white/10 group-hover:border-white/30 overflow-hidden transition-colors duration-300"
        >
          {/* Animated border light */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            initial={{ background: 'linear-gradient(90deg, transparent, transparent)' }}
            animate={isHovered ? {
              background: [
                'linear-gradient(90deg, transparent, transparent)',
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                'linear-gradient(90deg, transparent, transparent)'
              ],
              x: ['-100%', '100%', '100%']
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
          />
        </div>
        
        {/* Button content */}
        <div className="relative z-10 flex items-center gap-2 font-medium text-white">
          <span className="relative">
            Connect
            
            {/* Underline effect */}
            <motion.span
              className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={isHovered ? { width: '100%' } : { width: 0 }}
              transition={{ duration: 0.3 }}
            />
          </span>
          
          {/* Arrow with enhanced animation */}
          <motion.div
            className="relative"
            animate={isHovered ? {
              x: [0, 5, 5],
              opacity: [1, 1, 1],
              scale: [1, 1.2, 1.2]
            } : {
              x: [0, 5, 0],
              opacity: [1, 0.7, 1],
              scale: 1
            }}
            transition={isHovered ? {
              duration: 0.3
            } : {
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut"
            }}
          >
            <ArrowRight className="w-4 h-4" />
            
            {/* Sparkle icon that appears on hover */}
            <motion.div
              className="absolute -top-1 -right-1"
              initial={{ opacity: 0, scale: 0 }}
              animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sparkles className="w-3 h-3 text-yellow-300" />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Particle effects on hover */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white pointer-events-none"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: 0,
            }}
            animate={isHovered ? {
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
              x: [0, (Math.random() - 0.5) * 30],
              y: [0, (Math.random() - 0.5) * 30],
            } : {}}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              ease: "easeOut",
            }}
          />
        ))}
      </Button>
    </motion.div>
  );
};

export default EnhancedConnectButton;
