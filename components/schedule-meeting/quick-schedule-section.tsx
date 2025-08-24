"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, ArrowRight, Heart, Bookmark } from "lucide-react"
import { startups } from "@/data/startups"
import { useFavorites } from "@/hooks/use-favorites"
import { StartupDetailsModal } from "@/components/startups/startup-details-modal"

interface QuickScheduleSectionProps {
  onScheduleWithStartup: (startupName: string) => void
  onDirectCalendlySchedule: (startupName: string) => void
}

export function QuickScheduleSection({ 
  onScheduleWithStartup, 
  onDirectCalendlySchedule 
}: QuickScheduleSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedStartup, setSelectedStartup] = useState<typeof startups[0] | null>(null)
  const { favorites } = useFavorites()
  const favoritedStartups = startups.filter(s => favorites.some(fav => fav.id === s.id))
  const startupsWithCalendly = startups.slice(0, 6) // No calendly links in new structure

  const handleViewDetails = (startup: typeof startups[0]) => {
    setSelectedStartup(startup)
    setIsModalOpen(true)
  }

  return (
    <>
      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl mt-8">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg">
              <Bookmark className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">Quick Schedule with Favorites</CardTitle>
              <CardDescription className="text-gray-600">
                Your favorited startups for quick scheduling
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoritedStartups.map((startup) => (
              <div key={startup.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{startup.startupName}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {startup.startupDomain}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{startup.briefDescription}</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleViewDetails(startup)}
                    variant="outline"
                    className="flex-1 text-xs"
                  >
                    <ArrowRight className="h-3 w-3 mr-1" />
                    Details
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onScheduleWithStartup(startup.startupName)}
                    className="flex-1 text-xs bg-cyan-600 hover:bg-cyan-700"
                  >
                    <ArrowRight className="h-3 w-3 mr-1" />
                    Schedule
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {favoritedStartups.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Bookmark className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No favorited startups yet.</p>
              <p className="text-sm">Add startups to your favorites to see them here for quick scheduling.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Startup Details Modal */}
      <StartupDetailsModal
        startup={selectedStartup}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
