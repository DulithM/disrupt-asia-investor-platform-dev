"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DomainBadge } from "@/components/ui/domain-badge"

import { Heart, MapPin, Users, CalendarIcon, Star, TrendingUp, Eye, Bookmark, Briefcase, Phone } from "lucide-react"
import { useFavorites } from "@/hooks/use-favorites"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { useState } from "react"
import { Square } from 'ldrs/react'
import 'ldrs/react/Square.css'

interface Startup {
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
}

interface FeaturedStartupsProps {
  startups: Startup[]
}

export function FeaturedStartups({ startups }: FeaturedStartupsProps) {
  const { addToFavorites, removeFromFavorites, favorites } = useFavorites()
  const { toast } = useToast()
  const [isAnimating, setIsAnimating] = useState<number | null>(null)



  const getCompanyInitials = (companyName: string) => {
    return companyName
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2)
  }

  const handleFavoriteToggle = async (startupId: number) => {
    setIsAnimating(startupId)
    
    const startup = startups.find(s => s.id === startupId)
    const currentlyFavorite = favorites.some(fav => fav.id === startupId)
    
    if (currentlyFavorite) {
      removeFromFavorites(startupId)
      toast({
        title: "Removing from favorites...",
        description: (
          <div className="flex items-center justify-between">
            <Square
              size="20"
              stroke="3"
              strokeLength="0.25"
              bgOpacity="0.1"
              speed="1.2"
              color="#0891b2"
            />
            <div className="flex-1 ml-3">
              <div className="font-semibold text-sm">{startup?.fullName}</div>
              <div className="text-xs text-gray-500">Removing from your favorites</div>
            </div>
          </div>
        ),
        variant: "default",
        duration: 1000,
      })
    } else {
      addToFavorites(startupId)
      toast({
        title: "Adding to favorites...",
        description: (
          <div className="flex items-center justify-between">
            <Square
              size="20"
              stroke="3"
              strokeLength="0.25"
              bgOpacity="0.1"
              speed="1.2"
              color="#0891b2"
            />
            <div className="flex-1 ml-3">
              <div className="font-semibold text-sm">{startup?.fullName}</div>
              <div className="text-xs text-gray-500">Adding to your favorites</div>
            </div>
          </div>
        ),
        variant: "default",
        duration: 1000,
      })
    }
    
    setTimeout(() => {
      setIsAnimating(null)
    }, 300)
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="px-4 sm:px-6 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
          <div className="flex-1">
            <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Featured Startups
            </CardTitle>
            <CardDescription className="text-sm sm:text-base mt-1">
              Top startups seeking investment opportunities
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white border-0 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 flex items-center gap-1 self-start sm:self-center">
            <Star className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">{startups.length} Featured</span>
            <span className="sm:hidden">{startups.length}</span>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
        <div className="space-y-3 sm:space-y-4">
          {startups.map((startup) => {
            const isInFavorites = favorites.some(fav => fav.id === startup.id)
            
            return (
              <div 
                key={startup.id} 
                className="group bg-white/60 backdrop-blur-sm border border-gray-100 rounded-xl p-3 sm:p-4 hover:shadow-md transition-all duration-200 hover:border-gray-200"
              >
                <div className="flex items-start space-x-3 sm:space-x-4">
                  {/* Avatar Section */}
                  <div className="flex-shrink-0">
                    <div className="h-16 w-16 sm:h-18 sm:w-18 bg-white rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden shadow-sm">
                      <img 
                        src={startup.startupLogo || "/placeholder-logo.png"} 
                        alt={startup.startupName}
                        className="w-full h-full object-contain p-0.5"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className={`hidden w-full h-full bg-gradient-to-br from-cyan-500 to-teal-500 text-white font-bold text-sm flex items-center justify-center`}>
                        {getCompanyInitials(startup.startupName)}
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                          {startup.startupName}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                          {startup.briefDescription}
                        </p>
                      </div>
                      
                      {/* Favorite Button */}
                      <button
                        onClick={() => handleFavoriteToggle(startup.id)}
                        disabled={isAnimating === startup.id}
                        className={`ml-2 p-1.5 sm:p-2 rounded-full transition-all duration-200 ${
                          isInFavorites 
                            ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                            : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                        } ${isAnimating === startup.id ? 'animate-pulse' : ''}`}
                      >
                        <Bookmark className={`h-4 w-4 sm:h-5 sm:w-5 ${isInFavorites ? 'fill-current text-red-500' : 'text-gray-400'}`} />
                      </button>
                    </div>

                    {/* Badges and Info */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <DomainBadge domain={startup.startupDomain} className="text-xs" />
                      <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-gray-700">
                        {startup.designation}
                      </Badge>
                    </div>

                    {/* Company Details */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                                        <Users className="h-3 w-3" />
                <span className="truncate">{startup.fullName}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="h-3 w-3" />
                <span>{startup.contactNumber}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Briefcase className="h-3 w-3" />
                <span>{startup.designation}</span>
                      </div>
                    </div>
                  </div>
                </div>

                                 {/* Action Buttons */}
                 <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 pt-3 border-t border-gray-100 gap-2 sm:gap-0">
                   <div className="flex items-center space-x-2">
                     <Button 
                       size="sm" 
                       variant="outline" 
                       className="text-xs sm:text-sm border-gray-300 hover:bg-gray-50 flex-1 sm:flex-none"
                     >
                       <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                       <span className="hidden sm:inline">View Details</span>
                       <span className="sm:hidden">Details</span>
                     </Button>
                     <Button 
                       size="sm" 
                       className="text-xs sm:text-sm bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white flex-1 sm:flex-none"
                     >
                       Connect
                     </Button>
                   </div>
                  
                                     <div className="flex items-center space-x-1">
                     <div className="flex items-center justify-end w-full sm:w-auto">
                       <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                       <span className="text-xs sm:text-sm text-green-600 font-medium">Featured</span>
                     </div>
                   </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* View All Button */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <Link href="/startups" className="block">
            <Button 
              variant="outline" 
              className="w-full bg-transparent text-sm sm:text-base py-2 sm:py-3 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              View All Startups
              <TrendingUp className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
