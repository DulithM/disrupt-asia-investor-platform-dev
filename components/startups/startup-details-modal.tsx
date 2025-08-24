"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { DomainBadge } from "@/components/ui/domain-badge"

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"
import { 
  X, 
  Users, 
  Globe, 
  Mail, 
  ExternalLink, 
  Check,
  Building,
  TrendingUp,
  Star,
  Bookmark,
  Briefcase,
  Phone,
  CalendarIcon,
  FileText
} from "lucide-react"
import { useFavorites } from "@/hooks/use-favorites"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { PDFViewerModal } from "./pdf-viewer-modal"

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
  pitchDeckPdf: string
  briefDescription: string
}

interface StartupDetailsModalProps {
  startup: Startup | null
  isOpen: boolean
  onClose: () => void
}

export function StartupDetailsModal({ startup, isOpen, onClose }: StartupDetailsModalProps) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const { toast } = useToast()
  const router = useRouter()
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false)

  if (!startup) return null

  const getCompanyInitials = (companyName: string) => {
    return companyName
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2)
  }

  const handleFavoriteToggle = async () => {
    setIsAnimating(true)
    
    const currentlyFavorite = isFavorite(startup.id)
    
    if (currentlyFavorite) {
      removeFromFavorites(startup.id)
      toast({
        title: "Removed from favorites",
        description: `${startup.startupName} has been removed from your favorites`,
        variant: "default",
        duration: 2000,
      })
    } else {
      addToFavorites(startup.id)
      toast({
        title: "Added to favorites",
        description: `${startup.startupName} has been added to your favorites`,
        variant: "default",
        duration: 2000,
      })
    }
    
    setTimeout(() => {
      setIsAnimating(false)
    }, 300)
  }

  const handleContact = () => {
    window.open(`mailto:${startup.emailAddress}`, '_blank')
  }

  const handleWebsite = () => {
    window.open(startup.websiteUrl, '_blank')
  }

  const handleScheduleWithStartup = () => {
    router.push(`/schedule-meeting/${startup.id}`)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={isPdfViewerOpen ? undefined : onClose}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[95vh] overflow-y-auto p-0 mx-2 sm:mx-4 [&>button]:hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-50 to-teal-50 border-b border-cyan-200 p-4 sm:p-6 relative">
          {/* Close Button - Mobile: Top Right, Desktop: Hidden (will be inline) */}
          <Button
            size="sm"
            variant="outline"
            onClick={onClose}
            className="absolute top-3 right-3 sm:hidden border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 z-10"
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              {/* Company Logo */}
              <div className="h-12 w-12 sm:h-16 sm:w-16 bg-white rounded-lg border-2 border-cyan-200 flex items-center justify-center overflow-hidden shadow-sm self-start sm:self-auto">
                <img 
                  src={startup.startupLogo || "/placeholder-logo.png"} 
                  alt={startup.startupName}
                  className="w-full h-full object-contain p-2"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-full h-full bg-gradient-to-br from-cyan-500 to-teal-500 text-white font-bold text-sm sm:text-lg flex items-center justify-center">
                  {getCompanyInitials(startup.startupName)}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-lg sm:text-xl font-bold text-gray-900 mb-1 break-words">
                  {startup.startupName}
                </DialogTitle>
                <DomainBadge domain={startup.startupDomain} className="text-xs font-medium" />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Save Button */}
              <Button
                size="sm"
                variant="outline"
                className={`border-cyan-300 bg-white hover:bg-cyan-50 transition-all duration-200 w-full sm:w-auto ${
                  isFavorite(startup.id) ? 'text-red-500 border-red-300 bg-red-50' : 'text-cyan-700 hover:text-cyan-800'
                } ${isAnimating ? 'animate-pulse' : ''}`}
                onClick={handleFavoriteToggle}
                disabled={isAnimating}
              >
                {isAnimating && !isFavorite(startup.id) ? (
                  <Check className="h-4 w-4 mr-2 text-green-600" />
                ) : (
                  <Bookmark className={`h-4 w-4 mr-2 ${isFavorite(startup.id) ? 'fill-current text-red-500' : 'text-cyan-600'}`} />
                )}
                {isAnimating && !isFavorite(startup.id) ? 'Added!' : (isFavorite(startup.id) ? 'Saved' : 'Save')}
              </Button>
              
              {/* Close Button - Desktop Only */}
              <Button
                size="sm"
                variant="outline"
                onClick={onClose}
                className="hidden sm:block border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-gray-50">
          {/* About Section */}
          <Card className="border border-cyan-200 bg-white shadow-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-teal-500 rounded-full"></div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">About {startup.startupName}</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                {startup.briefDescription}
              </p>
            </CardContent>
          </Card>

          {/* Information Grid */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
            {/* Company Information */}
            <Card className="border border-blue-200 bg-white shadow-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Building className="h-5 w-5 text-blue-600" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Company Information</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                    <div className="p-1.5 bg-blue-100 rounded-md flex-shrink-0 mt-0.5">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500">Contact Person</p>
                      <p className="text-sm font-medium text-gray-900 break-words">{startup.fullName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                    <div className="p-1.5 bg-blue-100 rounded-md flex-shrink-0 mt-0.5">
                      <Briefcase className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500">Position</p>
                      <p className="text-sm font-medium text-gray-900 break-words">{startup.designation}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                    <div className="p-1.5 bg-blue-100 rounded-md flex-shrink-0 mt-0.5">
                      <Phone className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm font-medium text-gray-900 break-all">{startup.contactNumber}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                    <div className="p-1.5 bg-blue-100 rounded-md flex-shrink-0 mt-0.5">
                      <Mail className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-medium text-gray-900 break-all">{startup.emailAddress}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Startup Details */}
            <Card className="border border-teal-200 bg-white shadow-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-teal-600" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Startup Details</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-teal-50 transition-colors">
                    <div className="p-1.5 bg-teal-100 rounded-md flex-shrink-0 mt-0.5">
                      <Star className="h-4 w-4 text-teal-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500">Domain</p>
                      <p className="text-sm font-medium text-gray-900 break-words">{startup.startupDomain}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-teal-50 transition-colors">
                    <div className="p-1.5 bg-teal-100 rounded-md flex-shrink-0 mt-0.5">
                      <Globe className="h-4 w-4 text-teal-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500">Website</p>
                      <p className="text-sm font-medium text-gray-900 break-all">{startup.websiteUrl}</p>
                    </div>
                  </div>
                  
                  {startup.pitchDeckPdf && startup.pitchDeckPdf !== "N/A" && (
                    <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-teal-50 transition-colors">
                      <div className="p-1.5 bg-teal-100 rounded-md flex-shrink-0 mt-0.5">
                        <FileText className="h-4 w-4 text-teal-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500">Pitch Deck</p>
                        <Button
                          variant="link"
                          className="p-0 h-auto text-sm font-medium text-teal-700 hover:text-teal-800 hover:underline"
                          onClick={() => {
                            // On mobile, open PDF directly in new tab
                            if (window.innerWidth < 768) {
                              window.open(startup.pitchDeckPdf, '_blank')
                            } else {
                              // On desktop, open the modal
                              setIsPdfViewerOpen(true)
                            }
                          }}
                        >
                          View Pitch Deck PDF
                          <FileText className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Actions */}
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-teal-500 rounded-full"></div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Get in Touch</h3>
              </div>
              
              <div className="flex flex-col gap-3">
                <Button
                  onClick={handleContact}
                  className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white shadow-sm w-full sm:w-auto"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Email
                </Button>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    onClick={handleWebsite}
                    className="border-cyan-300 text-cyan-700 hover:bg-cyan-50 hover:border-cyan-400 flex-1"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Website
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handleScheduleWithStartup}
                    className="border-cyan-300 text-cyan-700 hover:bg-cyan-50 hover:border-cyan-400 flex-1"
                  >
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Schedule Meeting
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
      
      {/* PDF Viewer Modal */}
      <PDFViewerModal
        isOpen={isPdfViewerOpen}
        onClose={() => setIsPdfViewerOpen(false)}
        pdfUrl={startup.pitchDeckPdf}
        startupName={startup.startupName}
      />
    </Dialog>
  )
} 