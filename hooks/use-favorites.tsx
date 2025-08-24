"use client"

import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react'
import { startups } from '@/data/startups'

export type FavoriteStartup = {
  id: number
  fullName: string
  designation: string
  contactNumber: string
  emailAddress: string
  startupName: string
  startupLogo: string
  startupDomain: string
  websiteUrl: string
  briefDescription: string
  addedDate: string
  timestamp: number
}

const STORAGE_KEY = 'disrupt-asia-favorites'
const EXPIRATION_DAYS = 30

// Helper function to safely access localStorage
const getLocalStorage = (key: string) => {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem(key)
  } catch (error) {
    console.error('Error accessing localStorage:', error)
    return null
  }
}

const setLocalStorage = (key: string, value: string) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, value)
  } catch (error) {
    console.error('Error setting localStorage:', error)
  }
}

// Helper function to check if a favorite has expired
const isExpired = (timestamp: number) => {
  const now = Date.now()
  const expirationTime = timestamp + (EXPIRATION_DAYS * 24 * 60 * 60 * 1000)
  return now > expirationTime
}

// Helper function to filter out expired favorites
const filterExpiredFavorites = (favorites: FavoriteStartup[]) => {
  return favorites.filter(fav => !isExpired(fav.timestamp))
}

// Load favorites from localStorage
const loadFavoritesFromStorage = (): FavoriteStartup[] => {
  const stored = getLocalStorage(STORAGE_KEY)
  
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) {
        const validFavorites = filterExpiredFavorites(parsed)
        
        // If some favorites were expired, update localStorage
        if (validFavorites.length !== parsed.length) {
          setLocalStorage(STORAGE_KEY, JSON.stringify(validFavorites))
        }
        
        return validFavorites
      } else {
        console.error('Stored data is not an array:', parsed)
        return []
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error)
      return []
    }
  }
  return []
}

// Create context for favorites
interface FavoritesContextType {
  favorites: FavoriteStartup[]
  addToFavorites: (startupId: number) => void
  removeFromFavorites: (startupId: number) => void
  isFavorite: (startupId: number) => boolean
  clearFavorites: () => void
  isLoaded: boolean
  getDaysRemaining: (timestamp: number) => number
  EXPIRATION_DAYS: number
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

// Provider component
interface FavoritesProviderProps {
  children: ReactNode
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<FavoriteStartup[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load favorites from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loadedFavorites = loadFavoritesFromStorage()
      setFavorites(loadedFavorites)
      setIsLoaded(true)
    } else {
      setIsLoaded(true)
    }
  }, [])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      setLocalStorage(STORAGE_KEY, JSON.stringify(favorites))
    }
  }, [favorites, isLoaded])

  const addToFavorites = useCallback((startupId: number) => {
    const startup = startups.find(s => s.id === startupId)
    if (!startup) {
      console.error('Startup not found:', startupId)
      return
    }

    setFavorites(prevFavorites => {
      // Check if already in favorites
      if (prevFavorites.some(fav => fav.id === startupId)) {
        console.log('Startup already in favorites:', startupId)
        return prevFavorites
      }

      const favoriteStartup: FavoriteStartup = {
        id: startup.id,
        fullName: startup.fullName,
        designation: startup.designation,
        contactNumber: startup.contactNumber,
        emailAddress: startup.emailAddress,
        startupName: startup.startupName,
        startupLogo: startup.startupLogo,
        startupDomain: startup.startupDomain,
        websiteUrl: startup.websiteUrl,
        briefDescription: startup.briefDescription,
        addedDate: new Date().toLocaleDateString(),
        timestamp: Date.now(),
      }

      console.log('Adding startup to favorites:', startupId, 'Current count:', prevFavorites.length, 'New count:', prevFavorites.length + 1)
      return [...prevFavorites, favoriteStartup]
    })
  }, [])

  const removeFromFavorites = useCallback((startupId: number) => {
    setFavorites(prevFavorites => {
      const filtered = prevFavorites.filter(fav => fav.id !== startupId)
      console.log('Removing startup from favorites:', startupId, 'New count:', filtered.length)
      return filtered
    })
  }, [])

  const isFavorite = useCallback((startupId: number) => {
    return favorites.some(fav => fav.id === startupId)
  }, [favorites])

  const clearFavorites = useCallback(() => {
    setFavorites([])
  }, [])

  // Helper function to get days remaining for a favorite
  const getDaysRemaining = useCallback((timestamp: number) => {
    const now = Date.now()
    const expirationTime = timestamp + (EXPIRATION_DAYS * 24 * 60 * 60 * 1000)
    const remainingMs = expirationTime - now
    const remainingDays = Math.ceil(remainingMs / (24 * 60 * 60 * 1000))
    return Math.max(0, remainingDays)
  }, [])

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    clearFavorites,
    isLoaded,
    getDaysRemaining,
    EXPIRATION_DAYS,
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

// Hook to use favorites
export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
} 