"use client"

import type { Startup } from "@/data/startups"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { X, MapPin, Users, CalendarIcon, ExternalLink, Mail, Award, Building2, Briefcase, Phone } from "lucide-react"
import Image from "next/image"

interface StartupDetailsPanelProps {
  startup: Startup | null
  onClose: () => void
}

export function StartupDetailsPanel({ startup, onClose }: StartupDetailsPanelProps) {
  if (!startup) {
    return (
      <div className="sticky top-32 h-fit">
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="flex items-center justify-center h-[400px] sm:h-[650px] text-gray-400 p-4 sm:p-6">
            <div className="text-center">
              <MapPin className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-gray-300" />
              <p className="text-gray-600 text-sm sm:text-base">Click on a pin to view startup details</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="sticky top-32 h-fit">
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3 sm:pb-4 px-4 sm:px-6">
          <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 relative flex-shrink-0 bg-white rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
              <img
                src={startup.startupLogo || "/placeholder.svg"}
                alt={`${startup.startupName} logo`}
                className="w-full h-full object-contain p-0.5"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className={`hidden w-full h-full bg-gradient-to-br from-cyan-500 to-teal-500 text-white font-bold text-sm flex items-center justify-center`}>
                {startup.startupName.split(' ').map(word => word.charAt(0).toUpperCase()).join('').slice(0, 2)}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base sm:text-xl text-gray-900 truncate">{startup.startupName}</CardTitle>
              <p className="text-xs sm:text-sm text-gray-600 truncate">{startup.fullName}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="flex-shrink-0 p-1 sm:p-2">
            <X className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 h-[400px] sm:h-[550px] overflow-y-auto px-4 sm:px-6">
          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <Badge variant="secondary" className="text-xs sm:text-sm">{startup.startupDomain}</Badge>
            <Badge className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-xs sm:text-sm">
              {startup.designation}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{startup.briefDescription}</p>

          <Separator />

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div className="text-center p-2 sm:p-2 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-lg">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-600 mx-auto mb-1" />
              <p className="text-xs text-gray-600">Contact</p>
              <p className="font-semibold text-gray-900 text-xs sm:text-sm">{startup.contactNumber}</p>
            </div>
            <div className="text-center p-2 sm:p-2 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
              <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600 mx-auto mb-1" />
              <p className="text-xs text-gray-600">Designation</p>
              <p className="font-semibold text-gray-900 text-xs sm:text-sm">{startup.designation}</p>
            </div>
            <div className="text-center p-2 sm:p-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mx-auto mb-1" />
              <p className="text-xs text-gray-600">Contact Person</p>
              <p className="font-semibold text-gray-900 text-xs sm:text-sm">{startup.fullName}</p>
            </div>
            <div className="text-center p-2 sm:p-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
              <Award className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 mx-auto mb-1" />
              <p className="text-xs text-gray-600">Domain</p>
              <p className="font-semibold text-gray-900 text-xs sm:text-sm">{startup.startupDomain}</p>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900 flex items-center text-xs sm:text-sm">
              <Building2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              Contact Information
            </h4>
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-600 truncate">{startup.emailAddress}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                <a 
                  href={startup.websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-cyan-600 hover:text-cyan-700 underline truncate"
                >
                  Visit Website
                </a>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
            <Button className="flex-1 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white text-xs sm:text-sm py-2 sm:py-2.5">
              <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              Contact
            </Button>
            <Button variant="outline" className="flex-1 text-xs sm:text-sm py-2 sm:py-2.5">
              <Award className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              Schedule
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
