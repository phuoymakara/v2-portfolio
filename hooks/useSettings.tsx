"use client"

import { Mode } from "@/contexts/settingsContext"
import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"


export interface ThemeStyles {
  light?: Record<string, any>
  dark?: Record<string, any>
}

export interface Settings {
  mode: Mode
  theme: {
    styles?: ThemeStyles
  }
}

interface SettingsContextType {
  settings: Settings
  updateSettings: (newSettings: Settings) => void
}

const defaultSettings: Settings = {
  mode: "system",
  theme: {
    styles: {
      light: {},
      dark: {},
    },
  },
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem("app-settings")
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings)
        setSettings({ ...defaultSettings, ...parsed })
      }
    } catch (error) {
      console.error("Failed to load settings from localStorage:", error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("app-settings", JSON.stringify(settings))
      } catch (error) {
        console.error("Failed to save settings to localStorage:", error)
      }
    }
  }, [settings, isLoaded])

  // Apply theme mode to document
  useEffect(() => {
    if (!isLoaded) return

    const root = document.documentElement
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    let effectiveMode: "light" | "dark"
    if (settings.mode === "system") {
      effectiveMode = systemPrefersDark ? "dark" : "light"
    } else {
      effectiveMode = settings.mode
    }

    root.classList.remove("light", "dark")
    root.classList.add(effectiveMode)
  }, [settings.mode, isLoaded])

  const updateSettings = (newSettings: Settings) => {
    setSettings(newSettings)
  }

  const value: SettingsContextType = {
    settings,
    updateSettings,
  }

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettingsContext() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettingsContext must be used within a SettingsProvider")
  }
  return context
}

export function useSettings() {
  return useSettingsContext()
}
