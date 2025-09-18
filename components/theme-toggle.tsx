'use client'
import React, { useCallback, useEffect, useState } from "react"
import { useTheme } from 'next-themes'
import { useSettings } from '@/hooks/useSettings'
import { ThemeToggleButton, useThemeTransition } from "@/components/ui/shadcn-io/theme-toggle-button"
import { Mode } from "@/contexts/settingsContext"

export function ThemeToggle() {
  const { setTheme } = useTheme()
  const { settings, updateSettings } = useSettings()
  const { startTransition } = useThemeTransition()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  const handleThemeToggle = useCallback(() => {
    const newMode: Mode = settings.mode === 'dark' ? 'light' : 'dark'
    
    startTransition(() => {
      const updatedSettings = {
        ...settings,
        mode: newMode,
        theme: {
          ...settings.theme,
          styles: {
            light: settings.theme.styles?.light || {},
            dark: settings.theme.styles?.dark || {}
          }
        }
      }
      updateSettings(updatedSettings)
      setTheme(newMode)
    })
  }, [settings, updateSettings, setTheme, startTransition])
  const currentTheme = settings.mode === 'system' ? 'light' : settings.mode as 'light' | 'dark'
  // if (!mounted) {
  //   return null
  // }

  return (
        <ThemeToggleButton 
          theme={currentTheme}
          onClick={handleThemeToggle}
          variant="circle-blur"
          start="top-right"
        />
  )
}
