"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScheduleMeetingDialog } from "@/components/schedule-meeting-dialog"
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin } from "lucide-react"

const mockEvents = [
  {
    id: "1",
    title: "Advanced Mathematics",
    group: "Advanced Mathematics",
    date: "2024-01-23",
    time: "2:00 PM - 4:00 PM",
    location: "Library Room 204",
    type: "Study Session",
    color: "bg-primary",
  },
  {
    id: "2",
    title: "CS Fundamentals",
    group: "Computer Science Fundamentals",
    date: "2024-01-25",
    time: "4:00 PM - 6:00 PM",
    location: "CS Building Lab 3",
    type: "Project Work",
    color: "bg-secondary",
  },
  {
    id: "3",
    title: "Physics Study Circle",
    group: "Physics Study Circle",
    date: "2024-01-24",
    time: "3:00 PM - 5:00 PM",
    location: "Physics Lab 101",
    type: "Discussion",
    color: "bg-accent",
  },
  {
    id: "4",
    title: "Chemistry Lab Prep",
    group: "Chemistry Lab Prep",
    date: "2024-01-22",
    time: "1:00 PM - 3:00 PM",
    location: "Chemistry Building",
    type: "Lab Prep",
    color: "bg-chart-1",
  },
]

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"month" | "week" | "day">("month")
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return mockEvents.filter((event) => event.date === dateStr)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
          <p className="text-muted-foreground">Manage your study group meetings and schedule</p>
        </div>
        <Button
          onClick={() => setShowScheduleDialog(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="mr-2 h-4 w-4" />
          Schedule Meeting
        </Button>
      </div>

      {/* Calendar Controls */}
      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" onClick={() => navigateMonth("prev")} className="border-border">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-xl font-semibold text-card-foreground">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <Button variant="outline" size="icon" onClick={() => navigateMonth("next")} className="border-border">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Select value={view} onValueChange={(value: "month" | "week" | "day") => setView(value)}>
              <SelectTrigger className="w-32 bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="day">Day</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          {view === "month" && (
            <div className="space-y-4">
              {/* Days of week header */}
              <div className="grid grid-cols-7 gap-2">
                {daysOfWeek.map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-2">
                {getDaysInMonth(currentDate).map((day, index) => (
                  <div
                    key={index}
                    className={`min-h-[120px] p-2 border border-border rounded-md ${
                      day ? "bg-card hover:bg-accent/50 cursor-pointer" : ""
                    } ${isToday(day || 0) ? "ring-2 ring-primary" : ""}`}
                  >
                    {day && (
                      <>
                        <div className="text-sm font-medium text-card-foreground mb-2">{day}</div>
                        <div className="space-y-1">
                          {getEventsForDate(day).map((event) => (
                            <div
                              key={event.id}
                              className={`text-xs p-1 rounded text-white truncate ${event.color}`}
                              title={`${event.title} - ${event.time}`}
                            >
                              {event.title}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === "week" && (
            <div className="space-y-4">
              <div className="text-center text-lg font-semibold text-card-foreground">Week View</div>
              <div className="grid grid-cols-7 gap-4">
                {daysOfWeek.map((day, index) => {
                  const date = new Date(currentDate)
                  date.setDate(currentDate.getDate() - currentDate.getDay() + index)
                  const dayEvents = mockEvents.filter((event) => {
                    const eventDate = new Date(event.date)
                    return eventDate.toDateString() === date.toDateString()
                  })

                  return (
                    <div key={day} className="space-y-2">
                      <div className="text-center">
                        <div className="text-sm font-medium text-card-foreground">{day}</div>
                        <div className="text-xs text-muted-foreground">{date.getDate()}</div>
                      </div>
                      <div className="space-y-1">
                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            className={`text-xs p-2 rounded text-white ${event.color}`}
                            title={`${event.title} - ${event.time}`}
                          >
                            <div className="font-medium">{event.title}</div>
                            <div className="opacity-90">{event.time.split(" - ")[0]}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {view === "day" && (
            <div className="space-y-4">
              <div className="text-center text-lg font-semibold text-card-foreground">
                {currentDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="space-y-3">
                {mockEvents
                  .filter((event) => {
                    const eventDate = new Date(event.date)
                    return eventDate.toDateString() === currentDate.toDateString()
                  })
                  .map((event) => (
                    <Card key={event.id} className="border-border">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <h3 className="font-semibold text-card-foreground">{event.title}</h3>
                            <p className="text-sm text-muted-foreground">{event.group}</p>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{event.location}</span>
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline">{event.type}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Events Sidebar */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockEvents
                  .filter((event) => {
                    const today = new Date()
                    const eventDate = new Date(event.date)
                    return eventDate.toDateString() === today.toDateString()
                  })
                  .map((event) => (
                    <div key={event.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted">
                      <div className={`w-3 h-3 rounded-full ${event.color}`} />
                      <div className="flex-1">
                        <p className="font-medium text-card-foreground">{event.title}</p>
                        <p className="text-sm text-muted-foreground">{event.time}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {event.type}
                      </Badge>
                    </div>
                  ))}
                {mockEvents.filter((event) => {
                  const today = new Date()
                  const eventDate = new Date(event.date)
                  return eventDate.toDateString() === today.toDateString()
                }).length === 0 && (
                  <p className="text-muted-foreground text-center py-4">No meetings scheduled for today</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{mockEvents.length}</div>
                <div className="text-sm text-muted-foreground">Total Meetings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">4</div>
                <div className="text-sm text-muted-foreground">Active Groups</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">12</div>
                <div className="text-sm text-muted-foreground">Hours This Week</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ScheduleMeetingDialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog} />
    </div>
  )
}
