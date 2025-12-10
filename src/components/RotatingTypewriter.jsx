import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const RotatingTypewriter = ({ messages, speed = 50, delayBetweenMessages = 3000 }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const currentMessage = messages[currentMessageIndex]

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, delayBetweenMessages)
      return () => clearTimeout(pauseTimer)
    }

    if (isDeleting) {
      if (displayedText.length > 0) {
        const deleteTimer = setTimeout(() => {
          setDisplayedText(prev => prev.slice(0, -1))
        }, speed / 2)
        return () => clearTimeout(deleteTimer)
      } else {
        setIsDeleting(false)
        setCurrentMessageIndex(prev => (prev + 1) % messages.length)
        setCurrentIndex(0)
      }
    } else {
      if (currentIndex < currentMessage.length) {
        const typeTimer = setTimeout(() => {
          setDisplayedText(prev => prev + currentMessage[currentIndex])
          setCurrentIndex(prev => prev + 1)
        }, speed)
        return () => clearTimeout(typeTimer)
      } else {
        setIsPaused(true)
      }
    }
  }, [currentMessageIndex, currentIndex, displayedText, isDeleting, isPaused, messages, speed, delayBetweenMessages])

  return (
    <span className="inline-block">
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-0.5 h-full bg-gray-900 ml-1"
      />
    </span>
  )
}

export default RotatingTypewriter



