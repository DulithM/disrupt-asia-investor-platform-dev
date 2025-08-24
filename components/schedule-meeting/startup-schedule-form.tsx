"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Users, MapPin, Building2, ExternalLink, ArrowRight, Briefcase, Phone } from "lucide-react"
import { startups } from "@/data/startups"
import { StartupDetailsModal } from "@/components/startups/startup-details-modal"

interface StartupScheduleFormProps {
  selectedStartup: string
  onStartupChange: (startupName: string) => void
  onScheduleWithStartup: (startupName: string) => void
  onDirectCalendlySchedule: (startupName: string) => void
}

export function StartupScheduleForm({
  selectedStartup,
  onStartupChange,
  onScheduleWithStartup,
  onDirectCalendlySchedule
}: StartupScheduleFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const selectedStartupData = startups.find(s => s.startupName === selectedStartup)

  const handleViewDetails = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.005]">
        <CardHeader className="bg-gradient-to-r from-cyan-50 to-teal-50 border-b border-gray-100 p-4 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-cyan-500 to-teal-500 p-2 sm:p-3 rounded-xl shadow-lg">
              <CalendarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Schedule with Startups
              </CardTitle>
              <CardDescription className="text-sm sm:text-base lg:text-lg text-gray-600 mt-1">
                Select a startup and schedule a meeting using their Calendly booking system
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 lg:p-8">
          <div className="space-y-6">
            {/* Startup Selection */}
            <div className="space-y-4">
              <div className="space-y-2 sm:space-y-3">
                <Label htmlFor="startup" className="text-sm sm:text-base lg:text-lg font-semibold text-gray-700">
                  Select Startup
                </Label>
                <Select value={selectedStartup} onValueChange={onStartupChange}>
                  <SelectTrigger className="h-10 sm:h-12 lg:h-14 text-sm sm:text-base">
                    <SelectValue placeholder="Choose a startup to meet with" />
                  </SelectTrigger>
                  <SelectContent>
                    {startups.map((startup) => (
                      <SelectItem key={startup.startupName} value={startup.startupName}>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <span className="font-semibold text-sm sm:text-base">{startup.startupName}</span>
                          <Badge variant="secondary" className="text-xs">
                            {startup.startupDomain}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Enhanced Quick Action Section */}
              {selectedStartup && (
                <div className="bg-gradient-to-r from-cyan-50 to-teal-50 border border-cyan-200 rounded-xl p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                        Schedule with {selectedStartup}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600">
                        Choose your preferred scheduling method to connect with {selectedStartup}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        type="button"
                        onClick={handleViewDetails}
                        className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <ArrowRight className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      {selectedStartupData?.calendlyLink && (
                        <Button
                          type="button"
                          onClick={() => onDirectCalendlySchedule(selectedStartup)}
                          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Quick Calendly
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* Startup Info Preview */}
                  <div className="mt-4 pt-4 border-t border-cyan-200">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-cyan-600" />
                        <span className="text-gray-700">
                          {selectedStartupData?.startupDomain}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-cyan-600" />
                        <span className="text-gray-700">
                          {selectedStartupData?.designation}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-cyan-600" />
                        <span className="text-gray-700">
                          {selectedStartupData?.fullName}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* No Startup Selected Message */}
            {!selectedStartup && (
              <div className="text-center py-8">
                <div className="bg-white rounded-xl p-6 max-w-md mx-auto">
                  <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Select a Startup</h3>
                  <p className="text-gray-600 text-sm">
                    Choose a startup from the dropdown above to schedule a meeting using their Calendly booking system.
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Startup Details Modal */}
      <StartupDetailsModal
        startup={selectedStartupData || null}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
