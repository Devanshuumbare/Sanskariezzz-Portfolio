"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, Menu, X, Home, Briefcase, User, Mail, Gamepad2 } from 'lucide-react'

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  // Show button after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setIsOpen(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  
  // Scroll to section function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      })
    }
    setIsOpen(false)
  }
  
  // Menu items
  const menuItems = [
    { icon: <Home size={18} />, label: 'Home', action: () => scrollToTop() },
    { icon: <Briefcase size={18} />, label: 'Services', action: () => scrollToSection('services') },
    { icon: <User size={18} />, label: 'Portfolio', action: () => scrollToSection('portfolio') },
    { icon: <Gamepad2 size={18} />, label: 'Clients', action: () => scrollToSection('clients') },
    { icon: <Mail size={18} />, label: 'Contact', action: () => scrollToSection('contact') }
  ]
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Main button */}
          <motion.button
            className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
          
          {/* Menu items */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="absolute bottom-16 right-0 space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
              >
                {menuItems.map((item, index) => (
                  <motion.button
                    key={index}
                    className="w-auto h-10 px-4 rounded-full bg-zinc-800/90 backdrop-blur-sm text-white shadow-md flex items-center justify-start gap-2 whitespace-nowrap"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: 0.05 * index }}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(79, 70, 229, 0.8)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={item.action}
                  >
                    {item.icon}
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Scroll to top button (always visible) */}
          <motion.button
            className="absolute bottom-16 right-0 w-10 h-10 rounded-full bg-zinc-800/90 backdrop-blur-sm text-white shadow-md flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isOpen ? 0 : 1, y: isOpen ? 20 : 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(79, 70, 229, 0.8)' }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
          >
            <ChevronUp size={20} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
