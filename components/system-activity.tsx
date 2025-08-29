import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Users, Calendar, AlertTriangle, Settings, MessageSquare } from "lucide-react"

const activities = [
  {
    id: "1",
    type: "user_joined",
    message: "New user Sarah Johnson registered",
    time: "2 minutes ago",
    icon: UserPlus,
    color: "text-green-600",
    severity: "info",
  },
  {
    id: "2",
    type: "group_created",
    message: "Biology Research Group created by Emily Davis",
    time: "15 minutes ago",
    icon: Users,
    color: "text-blue-600",
    severity: "info",
  },
  {
    id: "3",
    type: "meeting_cancelled",
    message: "Physics Study Circle meeting cancelled",
    time: "1 hour ago",
    icon: Calendar,
    color: "text-yellow-600",
    severity: "warning",
  },
  {
    id: "4",
    type: "report_submitted",
    message: "Inappropriate content reported in CS Fundamentals",
    time: "2 hours ago",
    icon: AlertTriangle,
    color: "text-red-600",
    severity: "high",
  },
  {
    id: "5",
    type: "system_update",
    message: "System maintenance completed successfully",
    time: "4 hours ago",
    icon: Settings,
    color: "text-purple-600",
    severity: "info",
  },
  {
    id: "6",
    type: "group_message",
    message: "High activity in Advanced Mathematics group",
    time: "6 hours ago",
    icon: MessageSquare,
    color: "text-indigo-600",
    severity: "info",
  },
]

export function SystemActivity() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "warning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "info":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-4">
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg text-card-foreground">System Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                <div className={`p-2 rounded-full bg-muted ${activity.color}`}>
                  <activity.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-card-foreground">{activity.message}</p>
                    <Badge className={getSeverityColor(activity.severity)}>{activity.severity}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-card-foreground">Inappropriate Content</p>
                  <p className="text-xs text-muted-foreground">CS Fundamentals Group</p>
                </div>
                <Badge variant="destructive">High</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-card-foreground">Spam Messages</p>
                  <p className="text-xs text-muted-foreground">Physics Study Circle</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Medium</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-card-foreground">Biology Research Group</p>
                  <p className="text-xs text-muted-foreground">Created by Emily Davis</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">New</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-card-foreground">Admin Request</p>
                  <p className="text-xs text-muted-foreground">Mike Chen</p>
                </div>
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">Pending</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
