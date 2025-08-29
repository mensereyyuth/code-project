"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InviteMembersDialog } from "@/components/invite-members-dialog"
import { Users, Calendar, MapPin, Settings, UserPlus, MessageSquare, Clock } from "lucide-react"

interface GroupDetailsProps {
  groupId: string
}

const mockGroupData = {
  id: "1",
  title: "Advanced Mathematics",
  description:
    "Calculus III and Linear Algebra study sessions. We meet twice a week to work through problem sets, discuss concepts, and prepare for exams together.",
  subject: "Mathematics",
  members: 8,
  maxMembers: 15,
  tags: ["Math", "Calculus", "Linear Algebra"],
  isPrivate: false,
  meetingTime: "Tuesdays & Thursdays, 2:00 PM",
  location: "Library Room 204",
  createdBy: "Sarah Johnson",
  createdAt: "2024-01-15",
  members_list: [
    { id: "1", name: "Sarah Johnson", role: "Admin", avatar: "SJ" },
    { id: "2", name: "Mike Chen", role: "Member", avatar: "MC" },
    { id: "3", name: "Emily Davis", role: "Member", avatar: "ED" },
    { id: "4", name: "Alex Rodriguez", role: "Member", avatar: "AR" },
    { id: "5", name: "Jessica Kim", role: "Member", avatar: "JK" },
  ],
  upcomingMeetings: [
    {
      id: "1",
      title: "Chapter 12: Vector Spaces",
      date: "2024-01-23",
      time: "2:00 PM - 4:00 PM",
      location: "Library Room 204",
      description: "Working through vector space problems and linear transformations",
    },
    {
      id: "2",
      title: "Exam Prep Session",
      date: "2024-01-25",
      time: "2:00 PM - 4:00 PM",
      location: "Library Room 204",
      description: "Review session for upcoming midterm exam",
    },
  ],
}

export function GroupDetails({ groupId }: GroupDetailsProps) {
  const [isJoined, setIsJoined] = useState(false)
  const [showInviteDialog, setShowInviteDialog] = useState(false)
  const group = mockGroupData

  const handleJoinGroup = () => {
    setIsJoined(true)
  }

  return (
    <div className="space-y-6">
      {/* Group Header */}
      <Card className="border-border">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl text-card-foreground">{group.title}</CardTitle>
              <p className="text-muted-foreground">{group.description}</p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>
                    {group.members}/{group.maxMembers} members
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{group.meetingTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{group.location}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              {!isJoined ? (
                <Button onClick={handleJoinGroup} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Join Group
                </Button>
              ) : (
                <>
                  <Button variant="outline" className="border-border bg-transparent">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message Group
                  </Button>
                  <Button
                    onClick={() => setShowInviteDialog(true)}
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Invite Members
                  </Button>
                </>
              )}
              <Button variant="outline" size="icon" className="border-border bg-transparent">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{group.subject}</Badge>
            {group.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabs Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Group Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-card-foreground">Created by</p>
                  <p className="text-sm text-muted-foreground">{group.createdBy}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">Created on</p>
                  <p className="text-sm text-muted-foreground">{new Date(group.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">Group Type</p>
                  <p className="text-sm text-muted-foreground">{group.isPrivate ? "Private" : "Public"}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Next Meeting</CardTitle>
              </CardHeader>
              <CardContent>
                {group.upcomingMeetings.length > 0 ? (
                  <div className="space-y-2">
                    <h4 className="font-medium text-card-foreground">{group.upcomingMeetings[0].title}</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(group.upcomingMeetings[0].date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{group.upcomingMeetings[0].time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{group.upcomingMeetings[0].location}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{group.upcomingMeetings[0].description}</p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No upcoming meetings scheduled</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg text-card-foreground">
                Group Members ({group.members_list.length})
              </CardTitle>
              {isJoined && (
                <Button
                  onClick={() => setShowInviteDialog(true)}
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Invite
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {group.members_list.map((member) => (
                  <div key={member.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`/avatar-${member.id}.png`} alt={member.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground">{member.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-card-foreground">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    {member.role === "Admin" && (
                      <Badge variant="outline" className="text-xs">
                        Admin
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meetings" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Upcoming Meetings</h3>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Schedule Meeting</Button>
          </div>

          <div className="space-y-4">
            {group.upcomingMeetings.map((meeting) => (
              <Card key={meeting.id} className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-card-foreground">{meeting.title}</h4>
                      <p className="text-sm text-muted-foreground">{meeting.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(meeting.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{meeting.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{meeting.location}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-border bg-transparent">
                      Join Meeting
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <InviteMembersDialog
        open={showInviteDialog}
        onOpenChange={setShowInviteDialog}
        groupName={group.title}
        groupId={group.id}
      />
    </div>
  )
}
