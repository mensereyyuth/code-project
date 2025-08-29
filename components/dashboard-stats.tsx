import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Clock, TrendingUp } from "lucide-react"

export function DashboardStats() {
  const stats = [
    {
      title: "Active Groups",
      value: "4",
      description: "Groups you're part of",
      icon: Users,
      color: "text-primary",
    },
    {
      title: "This Week",
      value: "8",
      description: "Scheduled meetings",
      icon: Calendar,
      color: "text-secondary",
    },
    {
      title: "Study Hours",
      value: "24",
      description: "Hours this month",
      icon: Clock,
      color: "text-accent",
    },
    {
      title: "Progress",
      value: "85%",
      description: "Meeting attendance",
      icon: TrendingUp,
      color: "text-chart-1",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
