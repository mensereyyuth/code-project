import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, Calendar, AlertTriangle } from "lucide-react"

export function AdminStats() {
  const stats = [
    {
      title: "Total Users",
      value: "1,247",
      description: "+12% from last month",
      icon: Users,
      color: "text-primary",
    },
    {
      title: "Active Groups",
      value: "89",
      description: "7 pending approval",
      icon: UserCheck,
      color: "text-secondary",
    },
    {
      title: "Meetings Today",
      value: "24",
      description: "3 cancelled",
      icon: Calendar,
      color: "text-accent",
    },
    {
      title: "Reports",
      value: "3",
      description: "Require attention",
      icon: AlertTriangle,
      color: "text-destructive",
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
