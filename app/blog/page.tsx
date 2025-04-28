"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock, Search, User } from "lucide-react"
import gsap from "gsap"

export default function BlogPage() {
  // Refs for animations
  const cursorRef = useRef<HTMLDivElement | null>(null) // <-- Add type here
  const titleRef = useRef(null)
  const titleLettersRef = useRef([])

  useEffect(() => {
    // Initialize GSAP animations
    const initAnimations = () => {
      // Header title animation - split text and animate letters
      if (titleRef.current) {
        const titleEl = titleRef.current as HTMLElement
        const text = titleEl.innerText
        titleEl.innerHTML = ''
        titleLettersRef.current = [] // Clear previous refs

        // Create span for each letter with opacity 0
        text.split('').forEach((letter, index) => {
          const span = document.createElement('span')
          span.textContent = letter
          span.style.opacity = "0"
          span.style.display = "inline-block"
          titleEl.appendChild(span)
          titleLettersRef.current.push()
        })

        // Animate each letter appearing with blur effect
        gsap.to(titleLettersRef.current, {
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          onStart: () => {
            titleLettersRef.current.forEach(letter => {
              gsap.set(letter, { filter: "blur(10px)" })
            })
          }
        })
      }

      // Animate hero section
      gsap.fromTo(".hero-content", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      )

      // Animate blog articles
      const articles = document.querySelectorAll(".blog-article")
      articles.forEach((article, index) => {
        gsap.fromTo(article,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.5, 
            delay: index * 0.1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: article,
              start: "top bottom-=100",
              toggleActions: "play none none none"
            }
          }
        )
      })

      // Animate newsletter section
      gsap.fromTo(".newsletter-content",
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".newsletter-content",
            start: "top bottom-=50",
            toggleActions: "play none none none"
          }
        }
      )
    }

    // Initialize custom cursor
    const initCursor = () => {
      if (!cursorRef.current) return
      
      // Create custom cursor element if it doesn't exist
      if (!document.querySelector('.custom-cursor')) {
        const cursor = document.createElement('div')
        cursor.classList.add('custom-cursor')
        cursor.style.cssText = `
          position: fixed;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(128,0,255,0.4) 70%, transparent 100%);
          filter: blur(5px);
          opacity: 0;
          transition: transform 0.1s ease;
        `
        document.body.appendChild(cursor)
        cursorRef.current = cursor // <-- Just assign, no need for type assertion
        // Animate cursor appearing
        gsap.to(cursorRef.current, {
          opacity: 1,
          duration: 0.3
        })
      }
      
      // Mouse move handler for custom cursor
      const onMouseMove = (e: MouseEvent) => {
        if (cursorRef.current) {
          gsap.to(cursorRef.current, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.2,
            ease: "power1.out"
          })
        }
      }

      // Add event listeners
      document.addEventListener('mousemove', onMouseMove)
      
      // Return cleanup function
      return () => {
        document.removeEventListener('mousemove', onMouseMove)
        if (cursorRef.current && document.body.contains(cursorRef.current)) {
          document.body.removeChild(cursorRef.current)
        }
      }
    }

    // Run all initializations
    initAnimations()
    const cleanupCursor = initCursor()

    return () => {
      // Cleanup
      if (cleanupCursor) cleanupCursor()
    }
  }, [])

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Profile"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-bold" ref={titleRef}>Sanskariezzz</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Our work", href: "/#designs" },
                { name: "Services", href: "/#services" },
                { name: "Blogs", href: "/blog" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-purple-400 transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>
            <Button className="rounded-full bg-transparent border border-white text-white hover:bg-white hover:text-black transition-all overflow-hidden group relative">
              <span className="relative z-10">
                Let&apos;s Connect
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-20" />
            </Button>
          </div>
        </div>
      </header>

      {/* Blog Hero Section */}
      <section className="pt-32 pb-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 hero-content">
            <h1 className="text-5xl font-bold mb-4">Sanskariezzz Blogs</h1>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Expert insights, industry trends, and creative inspiration from the Sanskariezzz team.
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-4 py-3 pl-12 bg-zinc-900 rounded-lg border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "The Evolution of Web Design: Trends to Watch in 2025",
                excerpt:
                  "Explore the latest web design trends that are shaping the digital landscape and how you can incorporate them into your projects.",
                image: "web-design-trends.jpg",
                date: "April 10, 2025",
                readTime: "5 min read",
                author: "Sanskariezzz Design Team",
                category: "Web Design",
              },
              {
                title: "Social Media Marketing Strategies That Actually Work",
                excerpt:
                  "Discover proven social media marketing approaches that can help your brand cut through the noise and connect with your audience.",
                image: "social-media-marketing.jpg",
                date: "April 2, 2025",
                readTime: "7 min read",
                author: "Sanskariezzz Marketing Team",
                category: "Digital Marketing",
              },
              {
                title: "Podcasting for Business: Building Your Brand Through Audio",
                excerpt:
                  "Learn how to leverage podcasting as a powerful tool for brand building, thought leadership, and audience engagement.",
                image: "podcasting-business.jpg",
                date: "March 25, 2025",
                readTime: "6 min read",
                author: "Sanskariezzz Media Team",
                category: "Podcasting",
              },
              {
                title: "Tech Solutions for Small Businesses: What You Need to Know",
                excerpt:
                  "A comprehensive guide to essential tech solutions that can help small businesses streamline operations and boost growth.",
                image: "tech-solutions.jpg",
                date: "March 18, 2025",
                readTime: "8 min read",
                author: "Sanskariezzz Tech Team",
                category: "Tech Solutions",
              },
              {
                title: "The Art of Typography: Choosing the Right Fonts for Your Brand",
                excerpt:
                  "Understand how typography influences brand perception and learn strategies for selecting fonts that align with your brand identity.",
                image: "typography.jpg",
                date: "March 10, 2025",
                readTime: "4 min read",
                author: "Sanskariezzz Design Team",
                category: "Branding",
              },
            ].map((post, index) => (
              <article
                key={index}
                className="bg-zinc-900 rounded-lg overflow-hidden group blog-article"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="relative aspect-video md:aspect-square overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=300&width=300&text=${post.category}`}
                      alt={post.title}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-2 left-2 bg-purple-500 text-xs text-white px-2 py-1 rounded">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6 md:col-span-2">
                    <h2 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                      <Link href="#">{post.title}</Link>
                    </h2>
                    <p className="text-zinc-400 mb-4">{post.excerpt}</p>
                    <div className="flex items-center text-sm text-zinc-500 mb-4">
                      <div className="flex items-center mr-4">
                        <Calendar className="w-4 h-4 mr-1" />
                        {post.date}
                      </div>
                      <div className="flex items-center mr-4">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
                    </div>
                    <Link href="#">
                      <Button
                        variant="ghost"
                        className="text-purple-400 hover:text-purple-300 p-0 hover:bg-transparent"
                      >
                        Read More <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-zinc-800 rounded-lg p-8">
            <div className="text-center mb-6 newsletter-content">
              <h2 className="text-2xl font-bold mb-2">Subscribe to My Newsletter</h2>
              <p className="text-zinc-400">
                Get the latest articles, tutorials, and design inspiration delivered straight to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 bg-zinc-700 rounded-lg border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-black">
        <div className="container mx-auto px-4 text-center">
          <p className="text-zinc-500">© 2025 Sanskariezzz. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}