import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, Calendar, MessageSquare, Users } from "lucide-react"

const activities = [
  {
    id: "1",
    type: "joined",
    message: "You joined Advanced Mathematics study group",
    time: "2 hours ago",
    icon: UserPlus,
    color: "text-primary",
  },
  {
    id: "2",
    type: "meeting",
    message: "Meeting scheduled for CS Fundamentals",
    time: "4 hours ago",
    icon: Calendar,
    color: "text-secondary",
  },
  {
    id: "3",
    type: "message",
    message: "New message in Physics Study Circle",
    time: "6 hours ago",
    icon: MessageSquare,
    color: "text-accent",
  },
  {
    id: "4",
    type: "member",
    message: "Sarah Johnson joined your Chemistry group",
    time: "1 day ago",
    icon: Users,
    color: "text-chart-1",
  },
  {
    id: "5",
    type: "meeting",
    message: "Completed study session: Linear Algebra Review",
    time: "2 days ago",
    icon: Calendar,
    color: "text-chart-2",
  },
]

export function RecentActivity() {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-foreground mb-4">Recent Activity</h2>
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg text-card-foreground">Activity Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-full bg-muted ${activity.color}`}>
                  <activity.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm text-card-foreground">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
