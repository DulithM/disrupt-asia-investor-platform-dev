import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, Users, TrendingUp, MapPin } from "lucide-react"

export function StatsCards() {
  const stats = [
    {
      icon: TrendingUp,
      value: "150+",
      label: "Startups Pitching",
      color: "text-cyan-500",
    },
    {
      icon: Users,
      value: "200+",
      label: "Active Investors",
      color: "text-orange-500",
    },
    {
      icon: CalendarIcon,
      value: "50+",
      label: "Sessions",
      color: "text-teal-500",
    },
    {
      icon: MapPin,
      value: "15+",
      label: "Countries",
      color: "text-pink-500",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 px-4 sm:px-0">
      {stats.map((stat, index) => (
        <Card key={index} className="text-center bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
            <div className="flex items-center justify-center mb-2 sm:mb-3">
              <stat.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${stat.color}`} />
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-xs sm:text-sm text-gray-600 leading-tight">{stat.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
