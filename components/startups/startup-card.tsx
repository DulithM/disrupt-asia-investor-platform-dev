"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DomainBadge } from "@/components/ui/domain-badge"

import { Trash2, Check, Users, Mail, Eye, Bookmark, Briefcase, Phone } from "lucide-react"
import { useFavorites } from "@/hooks/use-favorites"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { StartupDetailsModal } from "./startup-details-modal"
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

interface StartupCardProps {
  startup: Startup
  variant?: "compact" | "detailed"
  showFavoriteButton?: boolean
  showRemoveButton?: boolean
  onRemove?: () => void
}

export function StartupCard({
  startup,
  variant = "detailed",
  showFavoriteButton = true,
  showRemoveButton = false,
  onRemove,
}: StartupCardProps) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const { toast } = useToast()
  const [isAnimating, setIsAnimating] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleFavoriteToggle = async () => {
    setIsAnimating(true)
    
    const currentlyFavorite = isFavorite(startup.id)
    
    if (currentlyFavorite) {
      removeFromFavorites(startup.id)
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
              <div className="font-semibold text-sm">{startup.startupName}</div>
              <div className="text-xs text-gray-500">Removing from your favorites</div>
            </div>
          </div>
        ),
        variant: "default",
        duration: 1000,
      })
    } else {
      addToFavorites(startup.id)
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
              <div className="font-semibold text-sm">{startup.startupName}</div>
              <div className="text-xs text-gray-500">Adding to your favorites</div>
            </div>
          </div>
        ),
        variant: "default",
        duration: 1000,
      })
    }
    
    // Add a small delay for the animation
    setTimeout(() => {
      setIsAnimating(false)
    }, 300)
  }

  const handleContactStartup = () => {
    window.open(`mailto:${startup.emailAddress}`, "_blank")
  }



  const getCompanyInitials = (companyName: string) => {
    return companyName
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2)
  }

  if (variant === "compact") {
    return (
      <>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-200 hover:border-gray-200">
          <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
            <div className="h-36 w-36 flex-shrink-0 bg-white rounded-xl border-2 border-gray-300 flex items-center justify-center overflow-hidden shadow-sm">
              <img 
                src={startup.startupLogo || "/placeholder-logo.png"} 
                alt={startup.startupName}
                className="w-full h-full object-contain p-1"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className={`hidden w-full h-full bg-gradient-to-br from-cyan-500 to-teal-500 text-white font-semibold text-base flex items-center justify-center rounded-xl`}>
                {getCompanyInitials(startup.startupName)}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mb-1">
                <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base">{startup.startupName}</h3>
                <DomainBadge domain={startup.startupDomain} className="text-xs" />
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">{startup.briefDescription}</p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                                  <Users className="h-3 w-3" />
                <span className="truncate">{startup.fullName}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Briefcase className="h-3 w-3" />
                <span>{startup.designation}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile: Vertical buttons, Desktop: Horizontal buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-2 w-full sm:w-auto">
                         <Button
               size="sm"
               className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white shadow-md text-xs py-2.5 sm:py-2 h-auto sm:h-8 flex items-center justify-center"
               onClick={handleContactStartup}
             >
               <Mail className="h-3 w-3 mr-1" />
               <span className="hidden sm:inline">Contact</span>
               <span className="sm:hidden">Contact</span>
             </Button>
            {showFavoriteButton && (
              <Button
                size="sm"
                variant="outline"
                className={`border-gray-300 hover:bg-gray-50 bg-transparent transition-all duration-200 text-xs py-2.5 sm:py-2 h-auto sm:h-8 flex items-center justify-center ${
                  isFavorite(startup.id) ? 'text-red-500 border-red-300 bg-red-50' : 'text-gray-500 hover:text-red-500'
                } ${isAnimating ? 'animate-pulse' : ''}`}
                onClick={handleFavoriteToggle}
                disabled={isAnimating}
              >
                {isAnimating && !isFavorite(startup.id) ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Bookmark className={`h-4 w-4 ${isFavorite(startup.id) ? 'fill-current text-red-500' : 'text-gray-400'}`} />
                )}
                <span className={`ml-1 sm:hidden ${
                  isAnimating && !isFavorite(startup.id) ? 'text-green-600' : 
                  isFavorite(startup.id) ? 'text-red-500' : 'text-gray-500'
                }`}>
                  {isAnimating && !isFavorite(startup.id) ? 'Added!' : (isFavorite(startup.id) ? 'Saved' : 'Save')}
                </span>
              </Button>
            )}
            {showRemoveButton && onRemove && (
              <Button
                size="sm"
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent text-xs py-2.5 sm:py-2 h-auto sm:h-8 flex items-center justify-center"
                onClick={onRemove}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        <StartupDetailsModal
          startup={startup}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    )
  }

  return (
    <>
      <div className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden group">
        <div className="flex flex-col sm:flex-row">
          {/* Logo Section - Mobile: Full width, Desktop: 1/5 width */}
          <div className="w-full sm:w-1/5 flex items-center justify-center p-4 sm:p-6 bg-white border-b sm:border-b-0 sm:border-r border-gray-100">
            <div className="h-40 w-40 sm:h-44 sm:w-44 bg-white rounded-xl border-2 border-gray-300 flex items-center justify-center overflow-hidden shadow-sm">
              <img 
                src={startup.startupLogo || "/placeholder-logo.png"} 
                alt={startup.startupName}
                className="w-full h-full object-contain p-1.5"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className={`hidden w-full h-full bg-gradient-to-br from-cyan-500 to-teal-500 text-white font-bold text-lg sm:text-xl flex items-center justify-center rounded-xl`}>
                {getCompanyInitials(startup.startupName)}
              </div>
            </div>
          </div>

          {/* Content Section - Mobile: Full width, Desktop: 4/5 width */}
          <div className="w-full sm:w-4/5 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4">
              <div className="flex-1 min-w-0 mb-3 sm:mb-0">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate mb-2">{startup.startupName}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 line-clamp-2">{startup.briefDescription}</p>
              </div>
              <div className="flex items-center space-x-2 sm:ml-4">
                <DomainBadge domain={startup.startupDomain} className="text-xs sm:text-sm" />
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
              <div className="flex items-center space-x-1">
                <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="truncate">{startup.fullName}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Briefcase className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{startup.designation}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{startup.contactNumber}</span>
              </div>
            </div>

            {/* Mobile: Vertical buttons, Desktop: Horizontal buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              {/* Primary Action Button */}
                             <Button
                 size="sm"
                 className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white shadow-md text-xs sm:text-sm py-3 sm:py-2.5 h-auto sm:h-9 flex items-center justify-center"
                 onClick={handleContactStartup}
               >
                 <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                 <span className="hidden sm:inline">Contact Startup</span>
                 <span className="sm:hidden">Contact</span>
               </Button>

              {/* Secondary Action Button */}
              <Button 
                size="sm" 
                variant="outline" 
                className="border-gray-300 hover:bg-gray-50 text-xs sm:text-sm py-3 sm:py-2.5 h-auto sm:h-9 flex items-center justify-center"
                onClick={() => setIsModalOpen(true)}
              >
                <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span className="hidden sm:inline">View Details</span>
                <span className="sm:hidden">Details</span>
              </Button>

              {/* Favorite Button - Mobile: Icon only, Desktop: Icon + Text */}
              {showFavoriteButton && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  className={`border-gray-300 hover:bg-gray-50 transition-all duration-200 text-xs sm:text-sm py-3 sm:py-2.5 h-auto sm:h-9 flex items-center justify-center ${
                    isFavorite(startup.id) ? 'text-red-500 border-red-300 bg-red-50' : 'text-gray-500 hover:text-red-500'
                  } ${isAnimating ? 'animate-pulse' : ''}`}
                  onClick={handleFavoriteToggle}
                  disabled={isAnimating}
                >
                  {isAnimating && !isFavorite(startup.id) ? (
                    <Check className="h-4 w-4 sm:h-4 sm:w-4 text-green-600" />
                  ) : (
                    <Bookmark className={`h-4 w-4 sm:h-4 sm:w-4 ${isFavorite(startup.id) ? 'fill-current text-red-500' : 'text-gray-400'}`} />
                  )}
                  <span className={`ml-1 sm:hidden ${
                    isAnimating && !isFavorite(startup.id) ? 'text-green-600' : 
                    isFavorite(startup.id) ? 'text-red-500' : 'text-gray-500'
                  }`}>
                    {isAnimating && !isFavorite(startup.id) ? 'Added!' : (isFavorite(startup.id) ? 'Saved' : 'Save')}
                  </span>
                  <span className="hidden sm:inline ml-1">
                    {isAnimating && !isFavorite(startup.id) ? 'Added!' : (isFavorite(startup.id) ? 'Saved' : 'Save')}
                  </span>
                </Button>
              )}

              {/* Remove Button - Mobile: Icon only, Desktop: Icon + Text */}
              {showRemoveButton && onRemove && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-red-300 text-red-600 hover:bg-red-50 text-xs sm:text-sm py-3 sm:py-2.5 h-auto sm:h-9 flex items-center justify-center"
                  onClick={onRemove}
                >
                  <Trash2 className="h-4 w-4 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline ml-1">Remove</span>
                </Button>
              )}
            </div>

            {/* Mobile: Quick Actions Row */}
            <div className="sm:hidden mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-2">
                  <span className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{startup.fullName}</span>
                  </span>
                  <span>•</span>
                  <span>{startup.designation}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-green-600 font-medium">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <StartupDetailsModal
        startup={startup}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

