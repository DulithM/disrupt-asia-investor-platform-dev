"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { StartupFilters } from "@/components/startups/startup-filters"
import { StartupCard } from "@/components/startups/startup-card"
import { startups, Startup } from "@/data/startups"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { ChevronLeft, ChevronRight, Search, TrendingUp, Users, MapPin } from "lucide-react"

interface FilterState {
  search: string
  industry: string
  stage: string
  location: string
  quickFilters: string[]
}

export default function StartupsPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    industry: "all",
    stage: "all",
    location: "all",
    quickFilters: []
  })

  const [currentPage, setCurrentPage] = useState(1)
  const startupsPerPage = 10

  const filteredStartups = useMemo(() => {
    return startups.filter((startup) => {
      // Search filter
      if (filters.search && !startup.startupName.toLowerCase().includes(filters.search.toLowerCase()) &&
          !startup.briefDescription.toLowerCase().includes(filters.search.toLowerCase())) {
        return false
      }

      // Industry filter
      if (filters.industry !== "all" && startup.startupDomain !== filters.industry) {
        return false
      }

      // Contact person filter
      if (filters.stage !== "all" && startup.designation !== filters.stage) {
        return false
      }

      // Location filter - removed since we don't have location in new structure
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

  // Calculate pagination
  const totalPages = Math.ceil(filteredStartups.length / startupsPerPage)
  const startIndex = (currentPage - 1) * startupsPerPage
  const endIndex = startIndex + startupsPerPage
  const currentStartups = filteredStartups.slice(startIndex, endIndex)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    setCurrentPage(1) // Reset to first page when filters change
  }

  const goToPage = (page: number) => {
    setCurrentPage(page)
    scrollToTop()
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      scrollToTop()
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      scrollToTop()
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-white to-orange-100">
        <Header currentPage="startups" />

        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-xl p-4 sm:p-6 lg:p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6">
              <div className="bg-gradient-to-r from-cyan-500 to-teal-500 p-2 sm:p-3 rounded-full mb-3 sm:mb-0 sm:mr-4 shadow-lg">
                <Search className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Discover Startups
              </h1>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto px-2 sm:px-0">
              Browse and connect with innovative startups at Disrupt Asia 2025. Discover startups from across Sri Lanka for potential investment opportunities.
            </p>
            
            {/* Simplified Stats Row */}
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-600" />
                <span>{startups.length} startups</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Users className="h-3 w-3 sm:h-4 sm:w-4 text-teal-600" />
                <span>20+ industries</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
                <span>9 provinces</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Filters Section - Always Visible */}
          <div className="lg:w-80 lg:flex-shrink-0">
            <StartupFilters 
              onFiltersChange={handleFiltersChange}
              totalResults={filteredStartups.length}
              sticky={true}
            />
          </div>

          {/* Results Section */}
          <div className="flex-1">
            <div className="space-y-4 sm:space-y-6">
              {currentStartups.map((startup) => (
                <StartupCard 
                  key={startup.id} 
                  startup={startup}
                />
              ))}
            </div>

            {filteredStartups.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <p className="text-gray-600 text-base sm:text-lg">No startups match your current filters.</p>
                <p className="text-gray-500 text-sm mt-2">Try adjusting your search criteria.</p>
              </div>
            )}

            {/* Pagination */}
            {filteredStartups.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 gap-4 sm:gap-0">
                <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredStartups.length)} of {filteredStartups.length} startups
                </div>
                
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="bg-transparent text-xs sm:text-sm"
                  >
                    <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Previous</span>
                  </Button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      const page = i + 1
                      if (totalPages <= 5) {
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => goToPage(page)}
                            className={`text-xs sm:text-sm ${
                              currentPage === page ? "bg-cyan-600 hover:bg-cyan-700" : "bg-transparent"
                            }`}
                          >
                            {page}
                          </Button>
                        )
                      } else {
                        // Show first, last, and current page with ellipsis
                        if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                          return (
                            <Button
                              key={page}
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => goToPage(page)}
                              className={`text-xs sm:text-sm ${
                                currentPage === page ? "bg-cyan-600 hover:bg-cyan-700" : "bg-transparent"
                              }`}
                            >
                              {page}
                            </Button>
                          )
                        } else if (page === 2 && currentPage > 3) {
                          return <span key={page} className="text-gray-400">...</span>
                        } else if (page === totalPages - 1 && currentPage < totalPages - 2) {
                          return <span key={page} className="text-gray-400">...</span>
                        }
                        return null
                      }
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="bg-transparent text-xs sm:text-sm"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  )
}
