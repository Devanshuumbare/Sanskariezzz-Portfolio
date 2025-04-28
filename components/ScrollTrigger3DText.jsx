"use client"

import React, { useEffect, useRef, useState } from 'react';

const ScrollTrigger3DText = ({ text = "SANSKARIEZZZ", className = "" }) => {
  const containerRef = useRef(null);
  const lettersRef = useRef([]);
  const textRef = useRef(null);
  const hasInitialized = useRef(false);
  const tl = useRef(null);
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

        // Import SplitText for more advanced text animations
        const SplitTextModule = await import('gsap/SplitText');
        let SplitText;

        try {
          SplitText = SplitTextModule.SplitText;
          if (gsap.registerPlugin) {
            gsap.registerPlugin(ScrollTrigger, SplitText);
          }
        } catch (error) {
          console.warn("SplitText plugin not available, using fallback animation");
          if (gsap.registerPlugin) {
            gsap.registerPlugin(ScrollTrigger);
          }
        }

        // Create a timeline for the initial animation
        tl.current = gsap.timeline({
          onComplete: () => setIsVisible(true)
        });

        // Get all letter elements
        const letters = lettersRef.current;

        // Initial animation - 3D perspective reveal with more dramatic effect
        tl.current.set(containerRef.current, {
          perspective: 1200,
          transformStyle: "preserve-3d"
        });

        // Staggered 3D animation for each letter with more dramatic effect
        tl.current.from(letters, {
          opacity: 0,
          y: 150,
          z: -400,
          rotationX: -120,
          scale: 0.8,
          stagger: {
            each: 0.04,
            from: "center",
          },
          duration: 1.5,
          ease: "expo.out",
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

        // 1. Enhanced parallax effect - letters move at different speeds with depth
        letters.forEach((letter, index) => {
          const isEven = index % 2 === 0;
          const isThird = index % 3 === 0;
          const direction = isEven ? 1 : -1;
          const speed = 0.3 + Math.random() * 0.7; // Random speed between 0.3 and 1

          // Create a more complex movement pattern
          gsap.to(letter, {
            y: direction * 60 * speed,
            z: isThird ? 100 : isEven ? 50 : -50,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              ease: "power1.inOut",
            }
          });

          // Add more dramatic rotation based on scroll
          gsap.to(letter, {
            rotateY: direction * (15 + index % 10),
            rotateZ: direction * (isThird ? 8 : 3),
            rotateX: isEven ? 10 : -10,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            }
          });
        });

        // 2. Text scales and gets more 3D as you scroll with better easing
        scrollTl.fromTo(textRef.current,
          { scale: 1, z: 0 },
          {
            scale: 1.15,
            z: 150,
            ease: "power2.inOut",
          }
        );

        // 3. Enhanced color change effect on scroll with glow
        letters.forEach((letter, index) => {
          const colors = ["#4a4ab1", "#6366f1", "#8b5cf6", "#a855f7", "#ffffff"];
          const colorIndex = index % colors.length;

          gsap.fromTo(letter,
            {
              color: "white",
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            },
            {
              color: colors[colorIndex],
              textShadow: `0 0 15px ${colors[colorIndex]}80, 0 0 30px ${colors[colorIndex]}40`,
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                end: "center 20%",
                scrub: 1,
              }
            }
          );
        });

        // 4. Letter spacing and scale changes on scroll
        scrollTl.to(letters, {
          letterSpacing: "0.15em",
          stagger: {
            each: 0.02,
            from: "edges",
          },
          ease: "power1.inOut",
        }, 0);

        // 5. Add a wave effect that travels through the text
        const waveTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 20%",
            scrub: 2,
          }
        });

        letters.forEach((letter, index) => {
          waveTimeline.to(letter, {
            y: (i) => Math.sin(i * 0.5) * 30,
            duration: 0.5,
            ease: "sine.inOut",
          }, index * 0.02);
        });

        // 6. Add a subtle pulse effect to the entire text
        gsap.to(textRef.current, {
          scale: 1.03,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // 7. Add a scroll-triggered blur effect for depth
        scrollTl.to(letters, {
          filter: (i, el) => {
            const depth = parseFloat(el.style.zIndex || 0);
            return `blur(${Math.abs(depth) / 100}px)`;
          },
          stagger: {
            each: 0.02,
            from: "random",
          },
        }, 0);

        // Mark as initialized
        hasInitialized.current = true;

        // Cleanup function
        return () => {
          if (ScrollTrigger) {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
          }
          if (tl.current) {
            tl.current.kill();
          }
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
      style={{
        perspective: "1200px",
        minHeight: "1.5em"
      }}
    >
      <div
        ref={textRef}
        className={`flex flex-wrap justify-center ${className} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
          transition: "opacity 0.3s ease"
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
              transformStyle: "preserve-3d",
              willChange: "transform, color, text-shadow, filter",
              transition: "color 0.3s ease",
              zIndex: index - Math.floor(text.length / 2)
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ScrollTrigger3DText;
