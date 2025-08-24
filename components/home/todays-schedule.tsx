import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"
import Link from "next/link"

interface Meeting {
  startup: string
  time: string
  duration: string
  type: string
}

interface TodaysScheduleProps {
  meetings: Meeting[]
}

export function TodaysSchedule({ meetings }: TodaysScheduleProps) {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg mb-4 sm:mb-6">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">Today's Schedule</CardTitle>
        <CardDescription className="text-sm sm:text-base">Your upcoming meetings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 sm:space-y-3 px-4 sm:px-6 pb-4 sm:pb-6">
        {meetings.map((meeting, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 sm:p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full flex-shrink-0">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 text-sm sm:text-base truncate">{meeting.startup}</h4>
              <p className="text-xs sm:text-sm text-gray-600 truncate">{meeting.type}</p>
              <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                <span>{meeting.time}</span>
                <span>•</span>
                <span>{meeting.duration}</span>
              </div>
            </div>
          </div>
        ))}
        <Link href="/startups" className="block mt-4 sm:mt-6">
          <Button variant="outline" className="w-full bg-transparent text-sm sm:text-base py-2 sm:py-3">
            View Full Schedule
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
