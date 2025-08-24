"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { StartupFilters } from "@/components/startups/startup-filters"
import { StartupCard } from "@/components/startups/startup-card"
import { Share, Download, Heart, Trash2, Clock, ChevronLeft, ChevronRight, Bookmark, Star, CalendarIcon } from "lucide-react"
import Link from "next/link"
import { useFavorites } from "@/hooks/use-favorites"
import { ProtectedRoute } from "@/components/auth/protected-route"

interface FilterState {
  search: string
  industry: string
  stage: string
  location: string
  quickFilters: string[]
}

export default function FavoritesPage() {
  const { favorites, removeFromFavorites, clearFavorites, EXPIRATION_DAYS } = useFavorites()
  
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    industry: "all",
    stage: "all",
    location: "all",
    quickFilters: []
  })

  const [currentPage, setCurrentPage] = useState(1)
  const favoritesPerPage = 10

  const filteredFavorites = useMemo(() => {
    return favorites.filter((startup) => {
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
  }, [favorites, filters])

  // Calculate pagination
  const totalPages = Math.ceil(filteredFavorites.length / favoritesPerPage)
  const startIndex = (currentPage - 1) * favoritesPerPage
  const endIndex = startIndex + favoritesPerPage
  const currentFavorites = filteredFavorites.slice(startIndex, endIndex)

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
        <Header currentPage="favorites" />

      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-xl p-4 sm:p-6 lg:p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 sm:p-3 rounded-full mb-3 sm:mb-0 sm:mr-4 shadow-lg">
                <Bookmark className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                My Favorites
              </h1>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto px-2 sm:px-0">
              Your curated collection of promising startups for due diligence and potential investment. Track and manage your deal flow efficiently.
            </p>
            
            {/* Simplified Stats Row */}
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                <span>{favorites.length} saved startups</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
                <span>Personal collection</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4 text-orange-500" />
                <span>Expires in {EXPIRATION_DAYS} days</span>
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
              totalResults={filteredFavorites.length}
              sticky={true}
            />
          </div>
          
          {/* Results Section */}
          <div className="flex-1">
            {currentFavorites.length > 0 ? (
              <div className="space-y-4 sm:space-y-6">
                {currentFavorites.map((startup) => (
                  <StartupCard 
                    key={startup.id} 
                    startup={startup} 
                    showFavoriteButton={false} 
                    showRemoveButton={true}
                    onRemove={() => removeFromFavorites(startup.id)}
                  />
                ))}
              </div>
            ) : filteredFavorites.length > 0 ? (
              <div className="text-center py-8 sm:py-12">
                <p className="text-gray-600 text-base sm:text-lg">No favorites match your current filters.</p>
                <p className="text-gray-500 text-sm mt-2">Try adjusting your search criteria.</p>
              </div>
            ) : (
              <div className="lg:sticky lg:top-32 h-fit">
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="text-center py-8 sm:py-12 px-4 sm:px-6 flex flex-col justify-center items-center h-[400px] sm:h-[720px]">
                    <Bookmark className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No favorites yet</h3>
                    <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Start exploring startups and add them to your favorites list</p>
                    <Link href="/startups">
                      <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white text-sm sm:text-base py-2 sm:py-2.5">
                        Browse Startups
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Pagination */}
            {filteredFavorites.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 gap-4 sm:gap-0">
                <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredFavorites.length)} of {filteredFavorites.length} favorites
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
