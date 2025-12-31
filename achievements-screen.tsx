"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trophy, ArrowLeft, Home, Star, Award, CheckCircle, Lock } from "lucide-react"
import type { Screen } from "@/app/page"

interface AchievementsScreenProps {
  onNavigate: (screen: Screen) => void
  animationsEnabled: boolean
  visitedScreens: Set<Screen>
}

export function AchievementsScreen({ onNavigate, animationsEnabled, visitedScreens }: AchievementsScreenProps) {
  const achievements = [
    {
      id: "explorer",
      title: "Family Explorer",
      description: "Visited the home page and started your journey through our message of love",
      icon: Star,
      unlocked: visitedScreens.has("home"),
      color: "from-yellow-400 to-orange-400",
    },
    {
      id: "scholar",
      title: "Learning Together",
      description: "Read about how you help us with school and learning every day",
      icon: Award,
      unlocked: visitedScreens.has("school"),
      color: "from-blue-400 to-cyan-400",
    },
    {
      id: "promise",
      title: "Promise Keeper",
      description: "Discovered Papa's sincere promise to maintain peace and love",
      icon: CheckCircle,
      unlocked: visitedScreens.has("promise"),
      color: "from-green-400 to-emerald-400",
    },
    {
      id: "peace",
      title: "Peaceful Heart",
      description: "Explored our family's commitment to peace, love, and understanding",
      icon: Trophy,
      unlocked: visitedScreens.has("peace"),
      color: "from-purple-400 to-pink-400",
    },
    {
      id: "creative",
      title: "Creative Spirit",
      description: "Used the Vegas photo editor to create beautiful memories",
      icon: Star,
      unlocked: visitedScreens.has("editor"),
      color: "from-orange-400 to-red-400",
    },
    {
      id: "gamer",
      title: "Family Fun Master",
      description: "Played games and created art expressing love for Mama",
      icon: Award,
      unlocked: visitedScreens.has("games"),
      color: "from-green-400 to-teal-400",
    },
    {
      id: "messenger",
      title: "Message Creator",
      description: "Built personal messages with words straight from the heart",
      icon: CheckCircle,
      unlocked: visitedScreens.has("message-builder"),
      color: "from-pink-400 to-rose-400",
    },
    {
      id: "memory-keeper",
      title: "Memory Keeper",
      description: "Revisited our beautiful memories together as a family",
      icon: Trophy,
      unlocked: visitedScreens.has("memories"),
      color: "from-amber-400 to-yellow-400",
    },
    {
      id: "story-lover",
      title: "Story Time Champion",
      description: "Read heartwarming stories about our family and love",
      icon: Star,
      unlocked: visitedScreens.has("story-time"),
      color: "from-indigo-400 to-purple-400",
    },
    {
      id: "reason-finder",
      title: "Reason Discoverer",
      description: "Explored 100 beautiful reasons why we love and need you",
      icon: Award,
      unlocked: visitedScreens.has("reasons"),
      color: "from-rose-400 to-pink-400",
    },
    {
      id: "adventurer",
      title: "Vegas Adventurer",
      description: "Discovered all the amazing activities we can do together in Vegas",
      icon: CheckCircle,
      unlocked: visitedScreens.has("family-activities"),
      color: "from-orange-400 to-pink-400",
    },
    {
      id: "photographer",
      title: "Memory Photographer",
      description: "Browsed through our cherished family photo album",
      icon: Trophy,
      unlocked: visitedScreens.has("photo-album"),
      color: "from-violet-400 to-purple-400",
    },
    {
      id: "complete",
      title: "Complete Explorer",
      description: "Visited every single page and read all our messages of love",
      icon: Star,
      unlocked: visitedScreens.size >= 13,
      color: "from-pink-500 to-purple-500",
    },
    {
      id: "final-message",
      title: "Heart Reader",
      description: "Read our final message from the heart to yours",
      icon: Award,
      unlocked: visitedScreens.has("final"),
      color: "from-pink-400 to-purple-400",
    },
  ]

  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const totalCount = achievements.length
  const progressPercentage = Math.round((unlockedCount / totalCount) * 100)

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className={`text-center mb-12 ${animationsEnabled ? "animate-fade-in" : ""}`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
          Your Achievement Journey
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-6">
          Every page you visit, every message you read, and every moment you spend with our app is an achievement that
          shows how much you care. Track your journey through all the love we've shared with you.
        </p>

        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-gray-800">Progress</span>
            <span className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              {progressPercentage}%
            </span>
          </div>
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-1000"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-3">
            {unlockedCount} of {totalCount} achievements unlocked
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon
          return (
            <Card
              key={achievement.id}
              className={`p-6 transition-all ${
                achievement.unlocked ? "bg-white hover:shadow-xl" : "bg-gray-50 opacity-60"
              } ${animationsEnabled && achievement.unlocked ? "hover:scale-105 animate-fade-in" : ""}`}
              style={animationsEnabled ? { animationDelay: `${index * 0.05}s` } : {}}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br ${achievement.color} flex items-center justify-center relative`}
                >
                  {achievement.unlocked ? (
                    <Icon
                      className={`w-8 h-8 text-white ${animationsEnabled ? "animate-bounce" : ""}`}
                      style={animationsEnabled ? { animationDuration: "2s" } : {}}
                    />
                  ) : (
                    <Lock className="w-8 h-8 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{achievement.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{achievement.description}</p>
                  {achievement.unlocked && <p className="text-xs text-green-600 font-semibold mt-2">Unlocked!</p>}
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {unlockedCount === totalCount && (
        <Card
          className={`p-8 bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50 border-pink-300 mb-8 ${animationsEnabled ? "animate-scale-in" : ""}`}
        >
          <div className="text-center">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-purple-700 mb-4">Congratulations!</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              You've explored every part of this app and read all our messages of love. This shows how much you care and
              how important you are to us. Thank you for taking the time to experience everything we created for you.
              Now please come to Vegas and let's create real memories together!
            </p>
          </div>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Button
          variant="outline"
          size="lg"
          onClick={() => onNavigate("home")}
          className="border-yellow-300 text-yellow-600 hover:bg-yellow-50"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back Home
        </Button>
        <Button
          size="lg"
          onClick={() => onNavigate("final")}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
        >
          <Home className="w-5 h-5 mr-2" />
          Final Message
        </Button>
      </div>
    </div>
  )
}
