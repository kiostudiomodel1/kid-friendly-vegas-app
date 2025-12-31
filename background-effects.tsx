"use client"

import { useEffect, useState } from "react"
import type { AppSettings } from "@/app/page"

interface BackgroundEffectsProps {
  theme: AppSettings["theme"]
  intensity: AppSettings["particleIntensity"]
  confettiEnabled: boolean
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  emoji: string
}

interface ConfettiParticle {
  id: number
  x: number
  y: number
  color: string
  rotation: number
  scale: number
}

export function BackgroundEffects({ theme, intensity, confettiEnabled }: BackgroundEffectsProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [confetti, setConfetti] = useState<ConfettiParticle[]>([])
  const [showConfetti, setShowConfetti] = useState(false)

  const getEmojisForTheme = (theme: AppSettings["theme"]) => {
    switch (theme) {
      case "soft":
        return ["💖", "💕", "💝", "✨", "🌸"]
      case "dreamy":
        return ["⭐", "✨", "💫", "🌙", "☁️"]
      case "nature":
        return ["🌿", "🌸", "🦋", "🌼", "🌺"]
      case "starry":
        return ["⭐", "✨", "💫", "🌟", "⚡"]
      default:
        return ["💖", "✨"]
    }
  }

  const getParticleCount = () => {
    switch (intensity) {
      case "low":
        return 8
      case "high":
        return 25
      default:
        return 15
    }
  }

  useEffect(() => {
    const emojis = getEmojisForTheme(theme)
    const count = getParticleCount()

    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }))

    setParticles(newParticles)
  }, [theme, intensity])

  useEffect(() => {
    if (!confettiEnabled) return

    const triggerConfetti = () => {
      const colors = ["#FF69B4", "#DDA0DD", "#87CEEB", "#FFD700", "#90EE90", "#FF6347"]
      const newConfetti: ConfettiParticle[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5,
      }))

      setConfetti(newConfetti)
      setShowConfetti(true)

      setTimeout(() => {
        setShowConfetti(false)
      }, 4000)
    }

    const interval = setInterval(triggerConfetti, 30000)
    triggerConfetti()

    return () => clearInterval(interval)
  }, [confettiEnabled])

  const getBackgroundGradient = () => {
    switch (theme) {
      case "soft":
        return "from-pink-50 via-purple-50 to-pink-50"
      case "dreamy":
        return "from-blue-50 via-cyan-50 to-blue-50"
      case "nature":
        return "from-green-50 via-emerald-50 to-green-50"
      case "starry":
        return "from-indigo-50 via-purple-50 to-indigo-50"
      default:
        return "from-pink-50 via-purple-50 to-pink-50"
    }
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-gradient-to-br ${getBackgroundGradient()} -z-10 transition-colors duration-1000`}
      />

      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute animate-float opacity-30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              fontSize: `${particle.size}rem`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          >
            {particle.emoji}
          </div>
        ))}

        {showConfetti &&
          confetti.map((piece) => (
            <div
              key={piece.id}
              className="absolute w-2 h-4 animate-confetti-fall"
              style={{
                left: `${piece.x}%`,
                top: `${piece.y}%`,
                backgroundColor: piece.color,
                transform: `rotate(${piece.rotation}deg) scale(${piece.scale})`,
                animationDuration: "4s",
              }}
            />
          ))}
      </div>
    </>
  )
}
