"use client"

import { Building2, Star, Target } from "lucide-react"

interface FloorPlanHeroProps {
  stats: {
    totalBooths: number
    premiumBooths: number
    zonesCovered: number
    industriesCovered: number
  }
}

export function FloorPlanHero({ stats }: FloorPlanHeroProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-xl p-4 sm:p-6 lg:p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]">
      <div className="text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6">
          <div className="bg-gradient-to-r from-cyan-500 to-teal-500 p-2 sm:p-3 rounded-full mb-3 sm:mb-0 sm:mr-4 shadow-lg">
            <Building2 className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Event Floor Plan
          </h1>
        </div>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto px-2 sm:px-0">
          Explore the Disrupt Asia 2025 exhibition floor. Find startup booths, networking areas, and key locations.
        </p>
        
        {/* Stats Row */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Building2 className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-600" />
            <span>{stats.totalBooths} booths</span>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Star className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
            <span>{stats.premiumBooths} premium</span>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Target className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
            <span>{stats.zonesCovered} zones</span>
          </div>
        </div>
      </div>
    </div>
  )
} 