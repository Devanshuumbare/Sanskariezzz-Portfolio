"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, ArrowRight, RefreshCw, Lightbulb, CuboidIcon as Cube, ExternalLink, Camera, Mail, Github } from "lucide-react"
import { BarChart2, PenTool, Users, Target, PieChart, Star } from "lucide-react"
import dynamic from "next/dynamic"
import ParticleBackground from "@/components/ParticleBackground"
import EnhancedScrollAnimation from "@/components/EnhancedScrollAnimation"
import FloatingActionButton from "@/components/FloatingActionButton"
import AudioReactiveHero from "@/components/AudioReactiveHero"

// Import components with dynamic import to avoid SSR issues
const AnimeScrollAnimatedText = dynamic(() => import("@/components/AnimeScrollAnimatedText"), {
  ssr: false,
  loading: () => (
    <div className="text-8xl md:text-9xl font-black tracking-tighter text-white opacity-30">
      SANSKARIEZZZ
    </div>
  )
})

// No splash screen needed

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Ensure scrolling is always enabled
  useEffect(() => {
    document.body.style.overflow = 'auto'
    document.documentElement.style.overflow = 'auto'
    document.body.style.height = 'auto'
    document.documentElement.style.height = 'auto'

    return () => {
      document.body.style.overflow = 'auto'
      document.documentElement.style.overflow = 'auto'
      document.body.style.height = 'auto'
      document.documentElement.style.height = 'auto'
    }
  }, [])

  // Transform values for scroll animations are used in the component

  // Add mouse position tracking for 3D model and custom cursor
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorText, setCursorText] = useState("")
  const [cursorVariant, setCursorVariant] = useState("default")

  // Use a ref for smoother cursor movement
  const mousePositionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Throttled mouse move handler for better performance
    let rafId: number | null = null

    const handleMouseMove = (e: MouseEvent): void => {
      // Store position in ref for immediate access
      mousePositionRef.current = {
        x: e.clientX,
        y: e.clientY,
      }

      // Use requestAnimationFrame to limit state updates
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          setMousePosition(mousePositionRef.current)
          rafId = null
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  // Simplified cursor variants - we'll use direct style props instead

  // Calculate 3D model movement based on mouse position
  const calculateMovement = (x: number, y: number) => {
    // Use default values if window is not defined (SSR)
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800

    const moveX = (x - windowWidth / 2) / 50
    const moveY = (y - windowHeight / 2) / 50
    return { x: moveX, y: -moveY }
  }

  // Calculate model movement in useEffect to avoid SSR issues
  const [modelMovement, setModelMovement] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setModelMovement(calculateMovement(mousePosition.x, mousePosition.y))
    }
  }, [mousePosition.x, mousePosition.y])

  // Simplified cursor handlers
  const handleLinkHoverEnter = (text = "") => {
    setCursorVariant("text")
    setCursorText(text)
  }

  const handleLinkHoverLeave = () => {
    setCursorVariant("default")
    setCursorText("")
  }

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* Simplified Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 will-change-transform"
        style={{
          x: mousePosition.x - (cursorVariant === "text" ? 24 : 16),
          y: mousePosition.y - (cursorVariant === "text" ? 24 : 16),
          scale: cursorVariant === "text" ? 1.2 : 1,
        }}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.15,
        }}
      >
        <div className="relative w-8 h-8">
          {/* Main cursor dot */}
          <div
            className="absolute rounded-full bg-white/80"
            style={{
              width: '8px',
              height: '8px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
            }}
          />

          {/* Static outer ring */}
          <div
            className="absolute inset-0 rounded-full border border-white/30"
          />

          {/* Cursor text */}
          {cursorText && (
            <motion.span
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xs whitespace-nowrap"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
            >
              {cursorText}
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* Creative Navbar */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
      >
        <div className="relative">
          <div className="mx-auto max-w-7xl">
            <div className="backdrop-blur-lg bg-black/10 rounded-full border border-white/10 px-8 py-3 flex items-center justify-between hover:border-white/20 transition-all duration-500 shadow-lg shadow-purple-500/5">
              {/* Empty div for spacing */}
              <div className="w-[120px]" /> {/* Adjust width to match the button */}

              {/* Centered Navigation Links */}
              <nav className="hidden md:flex items-center justify-center gap-8">
                {[
                  { name: "Home", href: "/" },
                  { name: "About Us", href: "/about" },
                  { name: "Services", href: "#services" },
                  { name: "Blog", href: "/blog" },
                ].map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      className="relative group px-4 py-2 rounded-full transition-all duration-300"
                      onMouseEnter={() => handleLinkHoverEnter(item.name)}
                      onMouseLeave={handleLinkHoverLeave}
                    >
                      {/* Animated background gradient */}
                      <motion.span
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: "radial-gradient(circle at center, rgba(147,51,234,0.2) 0%, rgba(59,130,246,0.2) 50%, transparent 70%)",
                        }}
                        initial={{ scale: 0.5 }}
                        whileHover={{
                          scale: 1.5,
                          rotate: 360,
                        }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />

                      {/* Glowing border effect */}
                      <motion.span
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                        style={{
                          border: "1px solid rgba(255,255,255,0.2)",
                          boxShadow: "0 0 10px rgba(147,51,234,0.3), inset 0 0 10px rgba(59,130,246,0.3)",
                        }}
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />

                      {/* Text with hover effect */}
                      <span className="relative z-10 text-white/80 group-hover:text-white transition-colors duration-300">
                        {item.name}
                        <motion.span
                          className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400"
                          initial={{ scaleX: 0, opacity: 0 }}
                          whileHover={{ scaleX: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Connect Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-[150px]" // Increased width for "Let's Connect"
              >
                <Button
                  className="relative group px-5 py-2 rounded-full overflow-hidden bg-transparent border border-white/20 w-full hover:bg-white transition-colors duration-300"
                  onMouseEnter={() => handleLinkHoverEnter("Let's Connect")}
                  onMouseLeave={handleLinkHoverLeave}
                >
                  {/* White background on hover */}
                  <motion.div
                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                  />

                  {/* Glowing border effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-full"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    style={{
                      boxShadow: "0 0 15px rgba(255, 255, 255, 0.5), inset 0 0 15px rgba(255, 255, 255, 0.3)",
                    }}
                  />

                  {/* Button content */}
                  <span className="relative z-10 flex items-center justify-center gap-2 font-medium text-white/90 group-hover:text-black transition-colors duration-300">
                    Let's Connect
                    <motion.span
                      animate={{
                        x: [0, 5, 0],
                        opacity: [1, 0.7, 1]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut"
                      }}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    >
                      →
                    </motion.span>
                  </span>
                </Button>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.div
                className="md:hidden"
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  className="relative w-10 h-10 rounded-lg border border-white/20"
                  onClick={() => {/* Add your mobile menu handler */}}
                >
                  <span className="sr-only">Open menu</span>
                  <div className="flex flex-col gap-1.5 items-center justify-center">
                    <span className="w-5 h-0.5 bg-white rounded-full" />
                    <span className="w-4 h-0.5 bg-white rounded-full" />
                    <span className="w-5 h-0.5 bg-white rounded-full" />
                  </div>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden pt-20">
        {/* Audio-Reactive Waveform + 3D Glitch Logo Hero */}
        <AudioReactiveHero />

        {/* Magnetic cursor effect wrapper */}
        <div
          className="absolute inset-0 pointer-events-none z-20 magnetic-cursor"
          style={{
            background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
            willChange: 'background'
          }}
        />

        {/* Optional: Add a subtle grain texture overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-50"
          style={{
            backgroundImage: `url('/images/noise.png')`,
            backgroundRepeat: 'repeat',
            mixBlendMode: 'overlay'
          }}
        />

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            opacity: useTransform(scrollYProgress,
              [0, 0.2],
              [1, 0]
            )
          }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-center justify-center">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-white"
              animate={{
                y: [0, 12, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-32 bg-black overflow-hidden">
        {/* Parallax Background Elements */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, 300]),
          }}
        >
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full filter blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full filter blur-[100px]" />
        </motion.div>

        <div className="container mx-auto px-4 relative">
          <EnhancedScrollAnimation className="text-center mb-20" threshold={0.1}>
            <div
              className="relative inline-block"
              onMouseEnter={() => handleLinkHoverEnter("")}
              onMouseLeave={handleLinkHoverLeave}
            >
              <motion.h2
                className="text-8xl font-bold tracking-tighter mb-6 relative z-10"
                style={{
                  y: useTransform(scrollYProgress, [0, 1], [0, -50]),
                }}
              >
                SERVICES
              </motion.h2>

              {/* Animated gradient underline */}
              <motion.div
                className="h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 rounded-full mx-auto"
                initial={{ width: 0 }}
                whileInView={{ width: '80%' }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
                style={{ maxWidth: '300px' }}
              />
            </div>

            <EnhancedScrollAnimation direction="up" delay={0.2} className="mt-6">
              <p className="text-zinc-400 max-w-2xl mx-auto">
                We offer a comprehensive range of creative services to help your brand stand out
              </p>
            </EnhancedScrollAnimation>
          </EnhancedScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <PenTool className="w-8 h-8" />,
                title: "Design",
                description: "Creative design solutions that capture attention and deliver results",
                features: ["UI/UX Design", "Brand Identity", "Print Design", "Packaging"],
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Development",
                description: "Custom development solutions for web and mobile platforms",
                features: ["Web Development", "Mobile Apps", "E-commerce", "CMS"],
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: <BarChart2 className="w-8 h-8" />,
                title: "Marketing",
                description: "Strategic marketing services to grow your business",
                features: ["Social Media", "SEO", "Content Strategy", "Analytics"],
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Consulting",
                description: "Expert guidance for your digital transformation journey",
                features: ["Strategy", "Innovation", "Technology", "Growth"],
                color: "from-orange-500 to-yellow-500"
              },
              {
                icon: <PieChart className="w-8 h-8" />,
                title: "Analytics",
                description: "Data-driven insights to optimize your performance",
                features: ["Reporting", "Optimization", "Research", "Testing"],
                color: "from-red-500 to-pink-500"
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Support",
                description: "Ongoing support and maintenance services",
                features: ["24/7 Support", "Maintenance", "Updates", "Training"],
                color: "from-indigo-500 to-purple-500"
              }
            ].map((service, index) => (
              <EnhancedScrollAnimation
                key={index}
                direction={index % 2 === 0 ? 'up' : 'down'}
                delay={index * 0.1}
                className="relative"
              >
                <motion.div
                  className="relative group cursor-pointer"
                  onMouseEnter={() => handleLinkHoverEnter(service.title)}
                  onMouseLeave={handleLinkHoverLeave}
                >
                  <Link href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`} className="block">
                    <div className="relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-8 h-full border border-white/5 overflow-hidden">
                    {/* Static Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5`}
                    />





                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon Container */}
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} p-0.5 mb-6`}
                    >
                      <div className="w-full h-full bg-zinc-900 rounded-xl flex items-center justify-center">
                        {service.icon}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="text-zinc-400 mb-6">{service.description}</p>

                    {/* Features List */}
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center gap-2 text-zinc-300"
                        >
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`} />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>

                    {/* Hover Arrow */}
                    <motion.div
                      className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{
                        x: [0, 5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    >
                      <ArrowRight className="w-6 h-6" />
                    </motion.div>
                  </div>
                </div>
                  </Link>
              </motion.div>
            </EnhancedScrollAnimation>
            ))}
          </div>
        </div>

        {/* Floating 3D Elements */}
        <motion.div
          className="absolute top-1/4 left-0 w-64 h-64 pointer-events-none"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, 200]),
            rotate: useTransform(scrollYProgress, [0, 1], [0, 360]),
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-purple-500/10 to-transparent rounded-full filter blur-3xl" />
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 right-0 w-96 h-96 pointer-events-none"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -200]),
            rotate: useTransform(scrollYProgress, [0, 1], [0, -360]),
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-500/10 to-transparent rounded-full filter blur-3xl" />
        </motion.div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
            onMouseEnter={() => handleLinkHoverEnter("")}
            onMouseLeave={handleLinkHoverLeave}
          >
            <p className="text-blue-400 mb-2">Website Design</p>
            <h2 className="text-5xl font-bold mb-4">Impress, Engage, and Perform.</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              We design responsive websites using no-code platforms like Wix, WordPress, and Framer—ideal for
              portfolios, e-commerce, and blogs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "My Portfolio",
                year: "2025",
                category: "Currently Viewing",
                image: "portfolio-website-dark-modern-creative-designer-showcase",
              },
              {
                title: "School Website",
                year: "2024",
                category: "Education",
                image: "education-website-school-university-learning-platform",
              },
              {
                title: "Green Earth Blog",
                year: "2025",
                category: "Environment",
                image: "environmental-blog-nature-conservation-green-living",
              },
              {
                title: "Luxury Watches",
                year: "2024",
                category: "E-commerce",
                image: "luxury-watch-ecommerce-store-premium-timepieces",
              },
              {
                title: "Tech Startup",
                year: "2023",
                category: "Corporate",
                image: "tech-startup-website-modern-innovation-company",
              },
              {
                title: "Food Delivery",
                year: "2023",
                category: "Service",
                image: "food-delivery-app-restaurant-ordering-service",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
                onMouseEnter={() => handleLinkHoverEnter("View")}
                onMouseLeave={handleLinkHoverLeave}
              >
                <Link href={`/portfolio/${project.title.toLowerCase().replace(/\s+/g, '-')}`} className="block">
                  <div className="bg-zinc-900 rounded-lg overflow-hidden h-full">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=200&width=300&text=${project.image}`}
                        alt={project.title}
                        width={300}
                        height={200}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 w-full">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-white/80">{project.category}</span>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="text-sm text-zinc-500">{project.year}</div>
                      <h3 className="font-medium group-hover:text-blue-400 transition-colors">{project.title}</h3>
                      <div className="mt-2 text-xs text-zinc-400">{project.category}</div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <Link
              href="#"
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              onMouseEnter={() => handleLinkHoverEnter("")}
              onMouseLeave={handleLinkHoverLeave}
            >
              All Sites <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
            onMouseEnter={() => handleLinkHoverEnter("")}
            onMouseLeave={handleLinkHoverLeave}
          >
            <p className="text-green-400 mb-2">Graphics Design</p>
            <h2 className="text-5xl font-bold mb-4">Showcase of Clients Work</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              We're proud to work with innovative companies across various industries, delivering exceptional results and building lasting partnerships.
            </p>
          </motion.div>

          {/* Tech Companies */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 text-green-400"> Our Clients</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "TechCorp", logo: "tech-corp-logo", instagram: "https://instagram.com/techcorp", description: "Leading innovation in cloud computing" },
                { name: "DataFlow", logo: "data-flow-logo", instagram: "https://instagram.com/dataflow", description: "Big data solutions provider" },
                { name: "SmartSys", logo: "smart-sys-logo", instagram: "https://instagram.com/smartsys", description: "AI-powered systems" },
              ].map((client, idx) => (
                <motion.a
                  key={idx}
                  href={client.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  onMouseEnter={() => handleLinkHoverEnter("Visit Instagram")}
                  onMouseLeave={handleLinkHoverLeave}
                >
                  <div className="bg-zinc-900/50 rounded-lg overflow-hidden">
                    <div className="aspect-video relative">
                      <Image
                        src={`/placeholder.svg?height=300&width=400&text=${client.logo}`}
                        alt={client.name}
                        width={400}
                        height={300}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                        <span className="text-white font-medium">{client.name}</span>
                        <ExternalLink className="text-white w-5 h-5" />
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-zinc-400 text-sm">{client.description}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* E-commerce Brands */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 text-purple-400">Our Clients </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "FashionHub", logo: "fashion-hub-logo", instagram: "https://instagram.com/fashionhub", description: "Premium fashion retailer" },
                { name: "GreenCart", logo: "green-cart-logo", instagram: "https://instagram.com/greencart", description: "Sustainable shopping platform" },
              ].map((client, idx) => (
                <motion.a
                  key={idx}
                  href={client.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  onMouseEnter={() => handleLinkHoverEnter("Visit Instagram")}
                  onMouseLeave={handleLinkHoverLeave}
                >
                  <div className="bg-zinc-900/50 rounded-lg overflow-hidden">
                    <div className="aspect-video relative">
                      <Image
                        src={`/placeholder.svg?height=300&width=400&text=${client.logo}`}
                        alt={client.name}
                        width={400}
                        height={300}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                        <span className="text-white font-medium">{client.name}</span>
                        <ExternalLink className="text-white w-5 h-5" />
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-zinc-400 text-sm">{client.description}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Add more client groups here */}
          {/* Entertainment */}
          {/* Healthcare */}
          {/* Financial Services */}

          {/* Example of another group */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 text-blue-400">Our Clients</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "StreamFlix", logo: "stream-flix-logo", instagram: "https://instagram.com/streamflix", description: "Digital streaming platform" },
                { name: "GameVerse", logo: "game-verse-logo", instagram: "https://instagram.com/gameverse", description: "Gaming entertainment" },
                { name: "MediaPro", logo: "media-pro-logo", instagram: "https://instagram.com/mediapro", description: "Content production house" },
              ].map((client, idx) => (
                <motion.a
                  key={idx}
                  href={client.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  onMouseEnter={() => handleLinkHoverEnter("Visit Instagram")}
                  onMouseLeave={handleLinkHoverLeave}
                >
                  <div className="bg-zinc-900/50 rounded-lg overflow-hidden">
                    <div className="aspect-video relative">
                      <Image
                        src={`/placeholder.svg?height=300&width=400&text=${client.logo}`}
                        alt={client.name}
                        width={400}
                        height={300}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                        <span className="text-white font-medium">{client.name}</span>
                        <ExternalLink className="text-white w-5 h-5" />
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-zinc-400 text-sm">{client.description}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3D Modeling Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
            onMouseEnter={() => handleLinkHoverEnter("")}
            onMouseLeave={handleLinkHoverLeave}
          >
            <p className="text-blue-400 mb-2">3D Modeling</p>
            <h2 className="text-5xl font-bold mb-4">Design, Visualize, and Showcase.</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              We bring product concepts to life with detailed 3D models, ideal for product showcases, prototypes, and
              more.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Product Packaging", image: "3d-product-packaging-box-container-design" },
              { name: "Wireless Earbuds", image: "3d-wireless-earbuds-headphones-audio-device" },
              { name: "Smart Watch", image: "3d-smartwatch-wearable-tech-device-model" },
              { name: "Water Bottle", image: "3d-water-bottle-container-product-design" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-lg overflow-hidden aspect-square relative group cursor-pointer"
                onMouseEnter={() => handleLinkHoverEnter("Design")}
                onMouseLeave={handleLinkHoverLeave}
              >
                <Link href={`/3d-models/${item.name.toLowerCase().replace(/\s+/g, '-')}`} className="block">
                  <Image
                    src={`/placeholder.svg?height=300&width=300&text=${item.image}`}
                    alt={`3D Model ${item.name}`}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <h3 className="text-white font-medium">{item.name}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <Link
              href="#"
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              onMouseEnter={() => handleLinkHoverEnter("Video")}
              onMouseLeave={handleLinkHoverLeave}
            >
              All Models <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
            onMouseEnter={() => handleLinkHoverEnter("")}
            onMouseLeave={handleLinkHoverLeave}
          >
            <p className="text-yellow-400 mb-2">Video Editing</p>
            <h2 className="text-5xl font-bold mb-4">Create, Captivate, and Convert.</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              We produce high-quality videos that engage your audience and tell your brand story, from marketing
              campaigns to product showcases.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Presentational Video",
                category: "Corporate",
                image: "corporate-presentation-video-business-showcase",
              },
              { title: "Intro Video", category: "Brand", image: "brand-intro-video-company-animation-logo" },
              {
                title: "Promotional Video",
                category: "Marketing",
                image: "marketing-promotional-video-product-advertisement",
              },
              { title: "Product Demo", category: "E-commerce", image: "product-demonstration-video-features-tutorial" },
              { title: "Event Highlights", category: "Social", image: "event-highlights-video-conference-ceremony" },
              { title: "Tutorial", category: "Educational", image: "educational-tutorial-video-how-to-guide" },
              { title: "Social Media Ad", category: "Advertising", image: "social-media-advertisement-short-promo" },
              {
                title: "Customer Testimonial",
                category: "Marketing",
                image: "customer-testimonial-video-review-feedback",
              },
              {
                title: "Explainer Video",
                category: "Educational",
                image: "explainer-video-concept-visualization-animation",
              },
            ].map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
                onMouseEnter={() => handleLinkHoverEnter("Video")}
                onMouseLeave={handleLinkHoverLeave}
              >
                <Link href={`/videos/${video.title.toLowerCase().replace(/\s+/g, '-')}`} className="block">
                  <div className="bg-zinc-900 rounded-lg overflow-hidden">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=200&width=350&text=${video.image}`}
                        alt={video.title}
                        width={350}
                        height={200}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Play className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="absolute top-2 left-2 right-2 flex justify-between">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 text-center">
                      <h3 className="font-medium">{video.title}</h3>
                      <p className="text-xs text-zinc-400 mt-1">{video.category}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <Link
              href="#"
              className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
              onMouseEnter={() => handleLinkHoverEnter("All Videos")}
              onMouseLeave={handleLinkHoverLeave}
            >
              All Videos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-zinc-900/50 rounded-lg p-8"
              onMouseEnter={() => handleLinkHoverEnter("")}
              onMouseLeave={handleLinkHoverLeave}
            >
              <h2 className="text-2xl font-bold mb-6">Connect with us</h2>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm mb-1">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-full px-3 py-2 bg-zinc-800 rounded-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Last name</label>
                  <input
                    type="text"
                    placeholder="Last name"
                    className="w-full px-3 py-2 bg-zinc-800 rounded-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-3 py-2 bg-zinc-800 rounded-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Phone</label>
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full px-3 py-2 bg-zinc-800 rounded-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-1">Your Requirement</label>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded-full text-sm transition-colors">
                    Tech Solution
                  </button>
                  <button className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded-full text-sm transition-colors">
                    Social Media Marketing
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm mb-1">How can we help?</label>
                <textarea
                  placeholder="Feel free to outline your ideas or needs..."
                  rows={4}
                  className="w-full px-3 py-2 bg-zinc-800 rounded-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
              </div>

              <Button className="w-full bg-white text-black hover:bg-zinc-200">Submit</Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center justify-center relative"
              onMouseEnter={() => handleLinkHoverEnter("")}
              onMouseLeave={handleLinkHoverLeave}
            >
              {/* Portfolio-related 3D Model */}
              <div className="relative w-full h-[700px] perspective-[1200px]">
                {/* Main 3D scene container */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    rotateX: modelMovement.y,
                    rotateY: modelMovement.x,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Portfolio Book */}
                  <motion.div
                    className="relative w-64 h-80"
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Book Cover */}
                    <motion.div
                      className="absolute w-full h-full bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg shadow-xl"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: "translateZ(10px)",
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                      }}
                      animate={{
                        rotateY: [0, 10, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    >
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2">Portfolio</h3>
                        <p className="text-sm text-center">Creative Works & Designs</p>
                        <div className="mt-4 w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                          <span className="text-2xl">S</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Floating Design Elements */}
                    <motion.div
                      className="absolute w-50 h-40 rounded-lg bg-pink-500/30 backdrop-blur-sm"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: "translateZ(60px) translateX(-80px) translateY(-40px)",
                      }}
                      animate={{
                        rotateZ: [0, 360],
                        y: [0, -10, 0],
                      }}
                      transition={{
                        rotateZ: {
                          duration: 20,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        },
                        y: {
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        },
                      }}
                    />

                    {/* Camera Icon */}
                    <motion.div
                      className="absolute w-16 h-16 rounded-full bg-cyan-500/30 backdrop-blur-sm flex items-center justify-center"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: "translateZ(40px) translateX(70px) translateY(30px)",
                      }}
                      animate={{
                        y: [0, 15, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    >
                      <div className="w-8 h-8 rounded-full border-2 border-white/70 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-white/70"></div>
                      </div>
                    </motion.div>

                    {/* Pen Tool */}
                    <motion.div
                      className="absolute w-12 h-12 rounded-lg bg-yellow-500/30 backdrop-blur-sm"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: "translateZ(50px) translateX(-60px) translateY(60px)",
                      }}
                      animate={{
                        rotateZ: [0, -360],
                        x: [0, 10, 0],
                      }}
                      transition={{
                        rotateZ: {
                          duration: 15,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        },
                        x: {
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        },
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-0.5 h-8 bg-white/70 transform rotate-45"></div>
                      </div>
                    </motion.div>

                    {/* Color Palette */}
                    <motion.div
                      className="absolute w-24 h-8 rounded-full overflow-hidden"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: "translateZ(30px) translateX(50px) translateY(-70px)",
                      }}
                      animate={{
                        rotateZ: [0, 360],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    >
                      <div className="flex h-full">
                        <div className="flex-1 bg-red-500"></div>
                        <div className="flex-1 bg-yellow-500"></div>
                        <div className="flex-1 bg-green-500"></div>
                        <div className="flex-1 bg-blue-500"></div>
                        <div className="flex-1 bg-purple-500"></div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Background glow */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                  <div className="w-full h-full max-w-xs max-h-xs">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#8B5CF6" />
                          <stop offset="100%" stopColor="#3B82F6" />
                        </linearGradient>
                      </defs>
                      <path
                        fill="url(#gradient)"
                        d="M45.3,-51.2C58.3,-42.9,68.5,-28.4,71.8,-12.2C75.1,4,71.5,21.7,62.4,35.3C53.3,48.9,38.7,58.5,22.7,64.2C6.7,69.9,-10.6,71.8,-25.4,66.5C-40.2,61.2,-52.5,48.7,-60.2,34C-67.9,19.3,-71,2.3,-67.8,-13.1C-64.6,-28.5,-55.1,-42.3,-42.5,-50.6C-29.9,-58.9,-15,-61.7,0.5,-62.3C15.9,-62.9,32.3,-59.4,45.3,-51.2Z"
                        transform="translate(100 100)"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Collaborate</h3>
              <p className="text-zinc-400 text-sm mb-4">Designing spaces where ideas meet and collaboration thrives.</p>
              <div className="flex items-center gap-3 mt-2">
                <Link href="#contact" className="relative group bg-transparent border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium hover:text-black transition-colors duration-300 overflow-hidden">
                  {/* White background on hover */}
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                  {/* Text content */}
                  <span className="relative z-10">Get in Touch</span>
                </Link>
                <div className="h-8 w-[1px] bg-zinc-700"></div>
                <div className="flex gap-2">
                  <Link href="#" className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors">
                    <Mail className="w-4 h-4" />
                  </Link>
                  <Link href="#" className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Navigation</h3>
              <nav className="flex flex-col items-start">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-zinc-400">
                  <Link href="/" className="hover:text-white transition-colors flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-purple-500"></div>
                    Home
                  </Link>
                  <Link href="/about" className="hover:text-white transition-colors flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                    About Us
                  </Link>
                  <Link href="#portfolio" className="hover:text-white transition-colors flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-green-500"></div>
                    Portfolio
                  </Link>
                  <Link href="#services" className="hover:text-white transition-colors flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-orange-500"></div>
                    Services
                  </Link>
                  <Link href="/blog" className="hover:text-white transition-colors flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-pink-500"></div>
                    Blogs
                  </Link>
                  <Link href="#contact" className="hover:text-white transition-colors flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-indigo-500"></div>
                    Contact
                  </Link>
                </div>
              </nav>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Connect</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-zinc-400">hello@sanskariezzz.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-zinc-400">Follow our channel</span>
                </div>
                <div className="mt-2">
                  <Link href="#contact" className="relative group bg-transparent border border-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium hover:text-black transition-colors duration-300 overflow-hidden inline-flex items-center gap-2">
                    {/* White background on hover */}
                    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                    {/* Text content */}
                    <span className="relative z-10">Contact Us</span>
                    <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:text-black transition-colors duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800 mt-10 pt-6 text-center text-sm text-zinc-500">
            <p>© 2025 Sanskariezzz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}



























