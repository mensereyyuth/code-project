import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, X, Check } from "lucide-react"

const notifications = [
  {
    id: "1",
    title: "Meeting Reminder",
    message: "Advanced Mathematics meeting starts in 30 minutes",
    time: "30 min",
    type: "reminder",
    urgent: true,
  },
  {
    id: "2",
    title: "New Group Invitation",
    message: "You've been invited to join Biology Study Group",
    time: "2 hours",
    type: "invitation",
    urgent: false,
  },
  {
    id: "3",
    title: "Schedule Change",
    message: "CS Fundamentals meeting moved to Friday 5:00 PM",
    time: "4 hours",
    type: "update",
    urgent: false,
  },
  {
    id: "4",
    title: "New Message",
    message: "Sarah posted in Physics Study Circle",
    time: "6 hours",
    type: "message",
    urgent: false,
  },
]

export function NotificationsPanel() {
  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg text-card-foreground flex items-center">
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </CardTitle>
        <Badge variant="secondary" className="text-xs">
          {notifications.filter((n) => n.urgent).length}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 rounded-lg border ${
              notification.urgent ? "border-primary bg-primary/5" : "border-border bg-muted/50"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-1">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-card-foreground">{notification.title}</p>
                  {notification.urgent && (
                    <Badge variant="destructive" className="text-xs px-1 py-0">
                      Urgent
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{notification.message}</p>
                <p className="text-xs text-muted-foreground">{notification.time} ago</p>
              </div>
              <div className="flex space-x-1">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Check className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        <Button variant="outline" className="w-full text-sm border-border bg-transparent">
          View All Notifications
        </Button>
      </CardContent>
    </Card>
  )
}
