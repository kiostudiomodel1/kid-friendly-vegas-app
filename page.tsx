"use client"

import { useState, useEffect } from "react"
import { HomeScreen } from "@/components/home-screen"
import { SchoolScreen } from "@/components/school-screen"
import { PapaPromiseScreen } from "@/components/papa-promise-screen"
import { PeaceScreen } from "@/components/peace-screen"
import { VegasEditorScreen } from "@/components/vegas-editor-screen"
import { FinalMessageScreen } from "@/components/final-message-screen"
import { SettingsPanel } from "@/components/settings-panel"
import { ProgressTracker } from "@/components/progress-tracker"
import { InteractiveGames } from "@/components/interactive-games"
import { MessageBuilder } from "@/components/message-builder"
import { BackgroundEffects } from "@/components/background-effects"
import { Button } from "@/components/ui/button"
import { Settings, Music, Sparkles } from "lucide-react"
import { MemoriesScreen } from "@/components/memories-screen"
import { StoryTimeScreen } from "@/components/story-time-screen"
import { ReasonsScreen } from "@/components/reasons-screen"
import { FamilyActivitiesScreen } from "@/components/family-activities-screen"
import { PhotoAlbumScreen } from "@/components/photo-album-screen"
import { AchievementsScreen } from "@/components/achievements-screen"

export type Screen =
  | "home"
  | "school"
  | "promise"
  | "peace"
  | "editor"
  | "final"
  | "games"
  | "message-builder"
  | "memories"
  | "story-time"
  | "reasons"
  | "family-activities"
  | "photo-album"
  | "achievements"

export interface AppSettings {
  theme: "soft" | "dreamy" | "nature" | "starry"
  animationsEnabled: boolean
  fontSize: "small" | "medium" | "large"
  soundEnabled: boolean
  backgroundMusic: boolean
  particleIntensity: "low" | "medium" | "high"
  autoSave: boolean
  narrationSpeed: "slow" | "normal" | "fast"
  highlightMode: boolean
  confettiEnabled: boolean
  dailyReminder: boolean
}

export default function PleaseComePage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [showSettings, setShowSettings] = useState(false)
  const [visitedScreens, setVisitedScreens] = useState<Set<Screen>>(new Set(["home"]))
  const [settings, setSettings] = useState<AppSettings>({
    theme: "soft",
    animationsEnabled: true,
    fontSize: "medium",
    soundEnabled: false,
    backgroundMusic: false,
    particleIntensity: "medium",
    autoSave: true,
    narrationSpeed: "normal",
    highlightMode: false,
    confettiEnabled: true,
    dailyReminder: false,
  })

  useEffect(() => {
    setVisitedScreens((prev) => new Set([...prev, currentScreen]))
  }, [currentScreen])

  const playSound = (type: "click" | "success" | "gentle") => {
    if (!settings.soundEnabled) return
    console.log("[v0] Sound effect:", type)
  }

  const navigateToScreen = (screen: Screen) => {
    playSound("click")
    setCurrentScreen(screen)
  }

  const getFontSize = () => {
    switch (settings.fontSize) {
      case "small":
        return "text-sm"
      case "large":
        return "text-lg"
      default:
        return "text-base"
    }
  }

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-1000 ${getFontSize()}`}>
      {settings.animationsEnabled && (
        <BackgroundEffects
          theme={settings.theme}
          intensity={settings.particleIntensity}
          confettiEnabled={settings.confettiEnabled}
        />
      )}

      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-pink-100">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateToScreen("home")}
            className="text-pink-600 hover:text-pink-700 hover:bg-pink-50"
          >
            💖 Home
          </Button>

          <div className="flex items-center gap-2">
            {settings.backgroundMusic && <Music className="w-4 h-4 text-pink-400 animate-pulse" />}
            {settings.animationsEnabled && (
              <Sparkles className="w-4 h-4 text-purple-400 animate-spin" style={{ animationDuration: "3s" }} />
            )}
            {settings.autoSave && <span className="text-xs text-green-600 font-medium">Auto-saved ✓</span>}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(!showSettings)}
              className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="fixed top-16 left-0 right-0 z-40">
        <ProgressTracker visitedScreens={visitedScreens} currentScreen={currentScreen} totalScreens={14} />
      </div>

      {showSettings && (
        <SettingsPanel settings={settings} onSettingsChange={setSettings} onClose={() => setShowSettings(false)} />
      )}

      <main className="pt-24 pb-8">
        {currentScreen === "home" && (
          <HomeScreen onNavigate={navigateToScreen} animationsEnabled={settings.animationsEnabled} />
        )}
        {currentScreen === "school" && (
          <SchoolScreen onNavigate={navigateToScreen} animationsEnabled={settings.animationsEnabled} />
        )}
        {currentScreen === "promise" && (
          <PapaPromiseScreen onNavigate={navigateToScreen} animationsEnabled={settings.animationsEnabled} />
        )}
        {currentScreen === "peace" && (
          <PeaceScreen onNavigate={navigateToScreen} animationsEnabled={settings.animationsEnabled} />
        )}
        {currentScreen === "editor" && (
          <VegasEditorScreen onNavigate={navigateToScreen} animationsEnabled={settings.animationsEnabled} />
        )}
        {currentScreen === "final" && (
          <FinalMessageScreen onNavigate={navigateToScreen} animationsEnabled={settings.animationsEnabled} />
        )}
        {currentScreen === "games" && (
          <InteractiveGames onNavigate={navigateToScreen} animationsEnabled={settings.animationsEnabled} />
        )}
        {currentScreen === "message-builder" && (
          <MessageBuilder onNavigate={navigateToScreen} animationsEnabled={settings.animationsEnabled} />
        )}
        {currentScreen === "memories" && (
          <MemoriesScreen onNavigate={navigateToScreen} animationsEnabled={settings.animationsEnabled} />
        )}
        {currentScreen === "story-time" && (
          <StoryTimeScreen
            onNavigate={navigateToScreen}
            animationsEnabled={settings.animationsEnabled}
            narrationSpeed={settings.narrationSpeed}
          />
        )}
        {currentScreen === "reasons" && (
          <ReasonsScreen onNavigate={navigateToScreen} animationsEnabled={settings.animationsEnabled} />
        )}
        {currentScreen === "family-activities" && (
          <FamilyActivitiesScreen onNavigate={navigateToScreen} animationsEnabled={settings.animationsEnabled} />
        )}
        {currentScreen === "photo-album" && (
          <PhotoAlbumScreen onNavigate={navigateToScreen} animationsEnabled={settings.animationsEnabled} />
        )}
        {currentScreen === "achievements" && (
          <AchievementsScreen
            onNavigate={navigateToScreen}
            animationsEnabled={settings.animationsEnabled}
            visitedScreens={visitedScreens}
          />
        )}
      </main>
    </div>
  )
}
