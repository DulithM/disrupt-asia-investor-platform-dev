import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function HeroSection() {
  return (
    <div className="text-center mb-8 sm:mb-12 px-4 sm:px-0">
      <div className="mb-4 sm:mb-6">
        <Badge variant="secondary" className="bg-orange-100 text-orange-700 mb-4 text-xs sm:text-sm px-3 py-1">
          Disrupt Asia 2025 • 17-20th September
        </Badge>
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
        Investor Platform for
        <br />
        <span className="bg-gradient-to-r from-cyan-600 to-orange-500 bg-clip-text text-transparent">
          Asia's Premier Startup Event
        </span>
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4 sm:px-0 leading-relaxed">
        Connect with groundbreaking startups, schedule meetings, and discover the next big opportunities in Asia's
        thriving innovation ecosystem.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
        <Link href="/startups" className="w-full sm:w-auto">
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-6 sm:px-8 py-3 w-full sm:w-auto text-sm sm:text-base"
          >
            Browse Startups
          </Button>
        </Link>
        <Link href="/favorites" className="w-full sm:w-auto">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-gray-300 hover:bg-gray-50 px-6 sm:px-8 py-3 bg-transparent w-full sm:w-auto text-sm sm:text-base"
          >
            View Favorites
          </Button>
        </Link>
      </div>
    </div>
  )
}
