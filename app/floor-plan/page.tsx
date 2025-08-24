"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { FloorPlanHero } from "@/components/floor-plan/floor-plan-hero"
import { StartupFilters } from "@/components/startups/startup-filters"
import { FloorPlanCanvas } from "@/components/floor-plan/floor-plan-canvas"
import { startups, Startup } from "@/data/startups"
import { ProtectedRoute } from "@/components/auth/protected-route"

// Floor plan data - defining booth locations and zones
interface Booth {
  id: string
  startupId: number
  position: { x: number; y: number }
  size: "small" | "medium" | "large"
  zone: string
  isPremium: boolean
}

interface Zone {
  id: string
  name: string
  color: string
  description: string
}

const zones: Zone[] = [
  { id: "main", name: "Main Hall", color: "bg-blue-500", description: "Primary exhibition area" },
  { id: "tech", name: "Tech Zone", color: "bg-green-500", description: "Technology startups" },
  { id: "fintech", name: "FinTech Hub", color: "bg-purple-500", description: "Financial technology companies" },
  { id: "health", name: "HealthTech Corner", color: "bg-red-500", description: "Healthcare and wellness startups" },
  { id: "sustainability", name: "Sustainability Zone", color: "bg-emerald-500", description: "Green and sustainable solutions" },
  { id: "agritech", name: "AgriTech Pavilion", color: "bg-orange-500", description: "Agriculture technology" },
]

// Generate booth assignments for startups
const generateBooths = (): Booth[] => {
  const boothData: Booth[] = []
  
  startups.forEach((startup, index) => {
    const zoneMap: { [key: string]: string } = {
      "AI/ML": "tech",
      "FinTech": "fintech", 
      "HealthTech": "health",
      "Sustainability": "sustainability",
      "AgriTech": "agritech"
    }
    
    const zone = zoneMap[startup.startupDomain] || "main"
    const isPremium = startup.id <= 10 // First 10 startups get premium booths
    
    boothData.push({
      id: `booth-${startup.id}`,
      startupId: startup.id,
      position: {
        x: 20 + (index % 8) * 80 + Math.random() * 20,
        y: 20 + Math.floor(index / 8) * 60 + Math.random() * 15
      },
      size: isPremium ? "large" : index % 3 === 0 ? "medium" : "small",
      zone,
      isPremium
    })
  })
  
  return boothData
}

const booths = generateBooths()

interface FilterState {
  search: string
  industry: string
  stage: string
  location: string
  quickFilters: string[]
}

export default function FloorPlanPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    industry: "all",
    stage: "all",
    location: "all",
    quickFilters: []
  })
  
  const [showLegend, setShowLegend] = useState(true)

  const filteredBooths = useMemo(() => {
    return booths.filter((booth) => {
      const startup = startups.find(s => s.id === booth.startupId)
      if (!startup) return false

      // Search filter
      if (filters.search && !startup.startupName.toLowerCase().includes(filters.search.toLowerCase()) &&
          !startup.briefDescription.toLowerCase().includes(filters.search.toLowerCase())) {
        return false
      }

      // Industry filter
      if (filters.industry !== "all" && startup.startupDomain !== filters.industry) {
        return false
      }

      // Stage filter
      if (filters.stage !== "all" && startup.designation !== filters.stage) {
        return false
      }

      // Location filter
      if (filters.location !== "all") {
        return false
      }

      // Quick filters
      if (filters.quickFilters.length > 0) {
        const hasQuickFilter = filters.quickFilters.some(filter => {
          switch (filter) {
            case "Top 30":
              return startup.isTop30
            case "Local":
              return startup.isLocal
            case "Foreign":
              return !startup.isLocal
            default:
              return false
          }
        })
        if (!hasQuickFilter) return false
      }

      return true
    })
  }, [filters])

  const stats = useMemo(() => {
    const totalBooths = booths.length
    const premiumBooths = booths.filter(b => b.isPremium).length
    const zonesCovered = new Set(booths.map(b => b.zone)).size
    const industriesCovered = new Set(startups.map(s => s.startupDomain)).size
    
    return { totalBooths, premiumBooths, zonesCovered, industriesCovered }
  }, [])

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters)
  }

  const toggleLegend = () => {
    setShowLegend(!showLegend)
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-white to-orange-100">
        <Header currentPage="floor-plan" />

      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <FloorPlanHero stats={stats} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Filters and Controls */}
          <div className="lg:w-80 lg:flex-shrink-0">
            <StartupFilters 
              onFiltersChange={handleFiltersChange}
              totalResults={filteredBooths.length}
              sticky={true}
            />
          </div>

          {/* Floor Plan */}
          <div className="flex-1">
            <FloorPlanCanvas
              showLegend={showLegend}
              onToggleLegend={toggleLegend}
            />
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  )
}
