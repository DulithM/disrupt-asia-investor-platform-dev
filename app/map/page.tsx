"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Globe, Building2, Target, TrendingUp, Heart, Star, CalendarIcon } from "lucide-react"
import { StartupFilters } from "@/components/startups/startup-filters"
import { StartupDetailsPanel } from "@/components/map/startup-details-panel"
import { startups, Startup } from "@/data/startups"
import { ProtectedRoute } from "@/components/auth/protected-route"
import dynamic from "next/dynamic"

// Dynamically import the map component to avoid SSR issues
const SriLankaMap = dynamic(() => import("@/components/map/sri-lanka-map-client"), { 
  ssr: false,
  loading: () => (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
      <CardContent className="flex items-center justify-center h-96">
        <div className="text-center">
          <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading Map...</p>
        </div>
      </CardContent>
    </Card>
  )
})

// Use all startups since we don't have coordinates in the new structure
const startupsWithCoords = startups

interface FilterState {
  search: string
  industry: string
  stage: string
  location: string
  quickFilters: string[]
}

export default function MapPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    industry: "all",
    stage: "all",
    location: "all",
    quickFilters: []
  })
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null)

  // Filter startups based on filters
  const filteredStartups = useMemo(() => {
    return startupsWithCoords.filter((startup) => {
      const matchesSearch = filters.search === "" || 
        startup.startupName.toLowerCase().includes(filters.search.toLowerCase()) ||
        startup.briefDescription.toLowerCase().includes(filters.search.toLowerCase())
      
      const matchesIndustry = filters.industry === "all" || 
        startup.startupDomain === filters.industry
      
      const matchesStage = filters.stage === "all" || 
        startup.designation === filters.stage
      
      const matchesLocation = filters.location === "all" // No location in new structure
      
      return matchesSearch && matchesIndustry && matchesStage && matchesLocation
    })
  }, [filters])

  // Statistics
  const stats = useMemo(() => {
    const totalStartups = startupsWithCoords.length
    const filteredCount = filteredStartups.length
    const provincesCovered = 3 // Fixed number since we have 3 startups
    const industriesCovered = new Set(startupsWithCoords.map(s => s.startupDomain)).size
    
    return { totalStartups, filteredCount, provincesCovered, industriesCovered }
  }, [filteredStartups])

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters)
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-white to-orange-100">
        <Header currentPage="map" />

      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-xl p-4 sm:p-6 lg:p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6">
              <div className="bg-gradient-to-r from-cyan-500 to-teal-500 p-2 sm:p-3 rounded-full mb-3 sm:mb-0 sm:mr-4 shadow-lg">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Sri Lanka Startup Ecosystem Map
              </h1>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto px-2 sm:px-0">
              Explore the vibrant startup ecosystem across Sri Lanka. Discover innovative companies by location, industry, and growth stage.
            </p>
            
            {/* Simplified Stats Row */}
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Globe className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-600" />
                <span>{stats.provincesCovered} provinces covered</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Building2 className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
                <span>{stats.totalStartups} startups mapped</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Target className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                <span>{stats.industriesCovered} industries</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Mobile: Stacked layout, Desktop: Grid layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Filters Sidebar - Full width on mobile */}
          <div className="lg:col-span-1 order-1 lg:order-1">
            <StartupFilters
              onFiltersChange={handleFiltersChange}
              totalResults={filteredStartups.length}
              sticky={true}
            />
          </div>

          {/* Map - Full width on mobile, 2 columns on desktop */}
          <div className="lg:col-span-2 order-2 lg:order-2">
            <SriLankaMap
              startups={filteredStartups}
              selectedStartup={selectedStartup}
              onStartupSelect={setSelectedStartup}
            />
          </div>

          {/* Startup Details Panel - Full width on mobile */}
          <div className="lg:col-span-1 order-3 lg:order-3">
            <StartupDetailsPanel 
              startup={selectedStartup} 
              onClose={() => setSelectedStartup(null)} 
            />
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  )
} 