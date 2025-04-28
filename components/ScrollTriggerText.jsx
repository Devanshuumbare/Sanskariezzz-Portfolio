"use client"

import React, { useEffect, useRef, useState } from 'react';

const ScrollTriggerText = ({ text = "SANSKARIEZZZ", className = "" }) => {
  const containerRef = useRef(null);
  const lettersRef = useRef([]);
  const textRef = useRef(null);
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

        // Try to import additional plugins
        try {
          const TextPlugin = (await import('gsap/TextPlugin')).TextPlugin;
          if (gsap.registerPlugin) {
            gsap.registerPlugin(ScrollTrigger, TextPlugin);
          }
        } catch (error) {
          console.warn("TextPlugin not available, using basic animations");
          if (gsap.registerPlugin) {
            gsap.registerPlugin(ScrollTrigger);
          }
        }

        // Create a timeline for the initial animation
        const tl = gsap.timeline({
          onComplete: () => setIsVisible(true)
        });

        // Get all letter elements
        const letters = lettersRef.current;

        // Initial animation - letters come in from below with a stagger and better easing
        tl.from(letters, {
          y: 120,
          opacity: 0,
          rotateX: -90,
          scale: 0.8,
          stagger: {
            amount: 0.6,
            from: "center"
          },
          duration: 1,
          ease: "elastic.out(0.8, 0.3)",
        });

        // Create ScrollTrigger animations

        // Master timeline for scroll animations
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        });

        // 1. Enhanced floating effect with randomized patterns
        letters.forEach((letter, index) => {
          // Create a more complex floating pattern
          const xOffset = (index % 3 - 1) * 10; // -10, 0, or 10 depending on position
          const amplitude = 10 + Math.random() * 15; // Random amplitude between 10 and 25
          const phase = index * 0.2; // Different phase for each letter

          gsap.to(letter, {
            y: (i) => Math.sin(i * 0.5 + phase) * amplitude,
            x: (i) => Math.cos(i * 0.3 + phase) * (amplitude / 2) + xOffset,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 90%",
              end: "bottom 20%",
              scrub: 2,
              ease: "sine.inOut",
            }
          });
        });

        // 2. Improved scale and opacity animation with better timing
        scrollTl.to(textRef.current, {
          scale: 0.9,
          opacity: 0.7,
          ease: "power2.inOut",
        }, 0.5); // Start halfway through the timeline

        // 3. Enhanced rotation with 3D effect
        letters.forEach((letter, index) => {
          const isEven = index % 2 === 0;
          const isThird = index % 3 === 0;

          gsap.to(letter, {
            rotateY: isEven ? 25 : -25,
            rotateX: isThird ? 15 : -5,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              end: "center 30%",
              scrub: 1.5,
            }
          });
        });

        // 4. Add a magnetic effect where letters attract to the center
        const centerTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "center 60%",
            end: "bottom 20%",
            scrub: 3,
          }
        });

        // Calculate the center index
        const centerIndex = Math.floor(text.length / 2);

        letters.forEach((letter, index) => {
          // Calculate distance from center (0 to 1)
          const distanceFromCenter = Math.abs(index - centerIndex) / centerIndex;

          // Letters move toward center based on distance
          centerTimeline.to(letter, {
            x: () => (index < centerIndex ? 10 : -10) * distanceFromCenter,
            scale: () => 1 + (0.2 * (1 - distanceFromCenter)),
            fontWeight: () => 400 + Math.round(500 * (1 - distanceFromCenter)),
            duration: 1,
            ease: "power2.inOut",
          }, 0);
        });

        // 5. Add a subtle glow effect that intensifies on scroll
        scrollTl.to(letters, {
          textShadow: "0 0 8px rgba(255,255,255,0.8), 0 0 12px rgba(111, 76, 255, 0.5)",
          stagger: {
            each: 0.05,
            from: "center",
          },
          ease: "power1.in",
        }, 0.2);

        // 6. Add a subtle color shift
        const colors = ["#ffffff", "#e9e9ff", "#d8d8ff", "#c4c4ff", "#b0b0ff"];

        letters.forEach((letter, index) => {
          const colorIndex = index % colors.length;

          gsap.to(letter, {
            color: colors[colorIndex],
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 50%",
              end: "bottom 30%",
              scrub: 2,
            }
          });
        });

        // 7. Add a subtle bounce effect when scrolling reaches a certain point
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "center center",
          onEnter: () => {
            gsap.to(letters, {
              keyframes: {
                "0%": { scale: 1 },
                "50%": { scale: 1.2 },
                "100%": { scale: 1 }
              },
              duration: 0.5,
              stagger: {
                each: 0.03,
                from: "center"
              },
              ease: "back.out(2)",
            });
          },
          once: true
        });

        // Mark as initialized
        hasInitialized.current = true;

        // Cleanup function
        return () => {
          if (ScrollTrigger) {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
          }
          tl.kill();
          scrollTl.kill();
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
              transition: "color 0.3s ease, text-shadow 0.3s ease",
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ScrollTriggerText;
