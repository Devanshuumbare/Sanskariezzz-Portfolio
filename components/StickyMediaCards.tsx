"use client"

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

interface MediaCard {
  id: string
  title: string
  image: string
  color: string
  category: string
}

interface StickyMediaCardsProps {
  cards: MediaCard[]
}

export default function StickyMediaCards({ cards }: StickyMediaCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  return (
    <div ref={containerRef} className="relative h-[200vh]">
      {/* Sticky container */}
      <div className="sticky top-[20vh] left-0 h-[60vh] flex items-center">
        <div className="w-full max-w-xs">
          {cards.map((card, index) => (
            <CardItem 
              key={card.id} 
              card={card} 
              index={index} 
              totalCards={cards.length} 
            />
          ))}
        </div>
      </div>
    </div>
  )
}

interface CardItemProps {
  card: MediaCard
  index: number
  totalCards: number
}

function CardItem({ card, index, totalCards }: CardItemProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: false, amount: 0.5 })
  
  // Calculate when this card should be visible based on scroll position
  const scrollThreshold = index / totalCards
  
  return (
    <motion.div
      ref={cardRef}
      className={`absolute top-0 left-0 w-full rounded-xl overflow-hidden shadow-lg transition-all duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ 
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 50,
        scale: isInView ? 1 : 0.9,
        zIndex: totalCards - index
      }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        transformOrigin: 'center left',
        backgroundColor: card.color,
      }}
    >
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 bg-zinc-900/90">
        <p className="text-xs text-zinc-400">{card.category}</p>
        <h3 className="font-medium text-white">{card.title}</h3>
      </div>
    </motion.div>
  )
}
