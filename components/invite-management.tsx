"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, X, Mail, Clock, UserPlus, Send } from "lucide-react"

const receivedInvites = [
  {
    id: "1",
    groupName: "Biology Research Group",
    groupDescription: "Advanced biology research and lab work",
    inviterName: "Dr. Emily Davis",
    inviterAvatar: "ED",
    sentDate: "2024-01-22",
    status: "pending",
    message: "I think you'd be a great addition to our research group!",
  },
  {
    id: "2",
    groupName: "Chemistry Lab Prep",
    groupDescription: "Organic chemistry lab preparation sessions",
    inviterName: "Sarah Johnson",
    inviterAvatar: "SJ",
    sentDate: "2024-01-21",
    status: "pending",
    message: "Join us for chemistry lab prep sessions every Monday.",
  },
  {
    id: "3",
    groupName: "Statistics Study Group",
    groupDescription: "Statistical analysis and data science",
    inviterName: "Mike Chen",
    inviterAvatar: "MC",
    sentDate: "2024-01-20",
    status: "accepted",
    message: "",
  },
]

const sentInvites = [
  {
    id: "1",
    groupName: "Advanced Mathematics",
    recipientEmail: "alex.rodriguez@university.edu",
    sentDate: "2024-01-23",
    status: "pending",
    message: "Would love to have you join our calculus study sessions!",
  },
  {
    id: "2",
    groupName: "Advanced Mathematics",
    recipientEmail: "jessica.kim@university.edu",
    sentDate: "2024-01-23",
    status: "accepted",
    message: "Would love to have you join our calculus study sessions!",
  },
  {
    id: "3",
    groupName: "Computer Science Fundamentals",
    recipientEmail: "david.wilson@university.edu",
    sentDate: "2024-01-22",
    status: "declined",
    message: "Join us for algorithm practice and coding sessions.",
  },
]

export function InviteManagement() {
  const [receivedInvitesList, setReceivedInvitesList] = useState(receivedInvites)

  const handleInviteResponse = (inviteId: string, response: "accepted" | "declined") => {
    setReceivedInvitesList((prev) =>
      prev.map((invite) => (invite.id === inviteId ? { ...invite, status: response } : invite)),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "accepted":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "declined":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const pendingCount = receivedInvitesList.filter((invite) => invite.status === "pending").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Invitations</h1>
          <p className="text-muted-foreground">Manage your group invitations and requests</p>
        </div>
        {pendingCount > 0 && (
          <Badge variant="secondary" className="text-sm">
            {pendingCount} pending
          </Badge>
        )}
      </div>

      <Tabs defaultValue="received" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="received" className="flex items-center">
            <Mail className="mr-2 h-4 w-4" />
            Received ({receivedInvitesList.length})
          </TabsTrigger>
          <TabsTrigger value="sent" className="flex items-center">
            <Send className="mr-2 h-4 w-4" />
            Sent ({sentInvites.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="received" className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg text-card-foreground">Group Invitations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {receivedInvitesList.map((invite) => (
                  <div key={invite.id} className="p-4 border border-border rounded-lg space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`/avatar-${invite.id}.png`} alt={invite.inviterName} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {invite.inviterAvatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h3 className="font-semibold text-card-foreground">{invite.groupName}</h3>
                          <p className="text-sm text-muted-foreground">{invite.groupDescription}</p>
                          <p className="text-sm text-muted-foreground">
                            Invited by <span className="font-medium">{invite.inviterName}</span> on{" "}
                            {new Date(invite.sentDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(invite.status)}>{invite.status}</Badge>
                    </div>

                    {invite.message && (
                      <div className="bg-muted p-3 rounded-lg">
                        <p className="text-sm text-card-foreground">"{invite.message}"</p>
                      </div>
                    )}

                    {invite.status === "pending" && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleInviteResponse(invite.id, "accepted")}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Accept
                        </Button>
                        <Button
                          onClick={() => handleInviteResponse(invite.id, "declined")}
                          variant="outline"
                          className="border-border bg-transparent"
                        >
                          <X className="mr-2 h-4 w-4" />
                          Decline
                        </Button>
                      </div>
                    )}
                  </div>
                ))}

                {receivedInvitesList.length === 0 && (
                  <div className="text-center py-12">
                    <UserPlus className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No invitations received yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sent" className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg text-card-foreground">Sent Invitations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sentInvites.map((invite) => (
                  <div key={invite.id} className="p-4 border border-border rounded-lg space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-card-foreground">{invite.groupName}</h3>
                        <p className="text-sm text-muted-foreground">
                          Sent to <span className="font-medium">{invite.recipientEmail}</span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <Clock className="inline h-3 w-3 mr-1" />
                          {new Date(invite.sentDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={getStatusColor(invite.status)}>{invite.status}</Badge>
                    </div>

                    {invite.message && (
                      <div className="bg-muted p-3 rounded-lg">
                        <p className="text-sm text-card-foreground">"{invite.message}"</p>
                      </div>
                    )}

                    {invite.status === "pending" && (
                      <Button variant="outline" size="sm" className="border-border bg-transparent">
                        Resend Invitation
                      </Button>
                    )}
                  </div>
                ))}

                {sentInvites.length === 0 && (
                  <div className="text-center py-12">
                    <Send className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No invitations sent yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
