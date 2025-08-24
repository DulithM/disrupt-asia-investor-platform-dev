import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Building2, Users } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-lg font-bold text-gray-900">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 sm:space-y-3 px-4 sm:px-6 pb-4 sm:pb-6">
        <Link href="/personal-schedule">
          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-sm sm:text-base py-2 sm:py-3">
            <Calendar className="h-4 w-4 mr-2" />
            My 4-Day Schedule
          </Button>
        </Link>
        <Link href="/startups">
          <Button variant="outline" className="w-full bg-transparent text-sm sm:text-base py-2 sm:py-3">
            <Building2 className="h-4 w-4 mr-2" />
            Browse Startups
          </Button>
        </Link>
        <Link href="/map">
          <Button variant="outline" className="w-full bg-transparent text-sm sm:text-base py-2 sm:py-3">
            <MapPin className="h-4 w-4 mr-2" />
            Interactive Map
          </Button>
        </Link>
        <Link href="/schedule-meeting">
          <Button variant="outline" className="w-full bg-transparent text-sm sm:text-base py-2 sm:py-3">
            <Users className="h-4 w-4 mr-2" />
            Schedule Meeting
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
