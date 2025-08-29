import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, Video } from "lucide-react"

export function UpcomingMeetups() {
  const meetups = [
    {
      id: 1,
      title: "Advanced Mathematics",
      date: "Tomorrow",
      time: "2:00 PM - 4:00 PM",
      location: "Library Room 204",
      type: "Study Session",
      attendees: 8,
      isOnline: false,
    },
    {
      id: 2,
      title: "Computer Science Fundamentals",
      date: "Friday",
      time: "4:00 PM - 6:00 PM",
      location: "Online Meeting",
      type: "Project Work",
      attendees: 12,
      isOnline: true,
    },
    {
      id: 3,
      title: "Physics Study Circle",
      date: "Saturday",
      time: "10:00 AM - 12:00 PM",
      location: "Physics Lab 101",
      type: "Lab Work",
      attendees: 6,
      isOnline: false,
    },
  ]

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-foreground">Upcoming Meetups</h2>
        <Button variant="outline" size="sm" className="border-border bg-transparent">
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {meetups.map((meetup) => (
          <Card key={meetup.id} className="border-border">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="space-y-1">
                  <h3 className="font-semibold text-card-foreground">{meetup.title}</h3>
                  <div className="flex items-center space-x-1">
                    <Badge variant="outline" className="text-xs">
                      {meetup.type}
                    </Badge>
                    {meetup.isOnline && (
                      <Badge variant="secondary" className="text-xs">
                        <Video className="mr-1 h-3 w-3" />
                        Online
                      </Badge>
                    )}
                  </div>
                </div>
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Join
                </Button>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{meetup.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{meetup.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{meetup.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>{meetup.attendees} attending</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
