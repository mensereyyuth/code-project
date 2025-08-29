"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CreateGroupDialog } from "@/components/create-group-dialog"
import { Search, Filter, Users, Lock, Globe } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockGroups = [
  {
    id: "1",
    title: "Advanced Mathematics",
    description: "Calculus III and Linear Algebra study sessions",
    members: 8,
    maxMembers: 15,
    tags: ["Math", "Calculus", "Linear Algebra"],
    isPrivate: false,
    subject: "Mathematics",
    meetingTime: "Tuesdays & Thursdays, 2:00 PM",
  },
  {
    id: "2",
    title: "Computer Science Fundamentals",
    description: "Data structures, algorithms, and programming concepts",
    members: 12,
    maxMembers: 20,
    tags: ["CS", "Programming", "Algorithms"],
    isPrivate: true,
    subject: "Computer Science",
    meetingTime: "Fridays, 4:00 PM",
  },
  {
    id: "3",
    title: "Physics Study Circle",
    description: "Quantum mechanics and thermodynamics discussions",
    members: 6,
    maxMembers: 10,
    tags: ["Physics", "Quantum", "Thermodynamics"],
    isPrivate: false,
    subject: "Physics",
    meetingTime: "Wednesdays, 3:00 PM",
  },
  {
    id: "4",
    title: "Chemistry Lab Prep",
    description: "Organic chemistry lab preparation and review",
    members: 9,
    maxMembers: 12,
    tags: ["Chemistry", "Organic", "Lab"],
    isPrivate: false,
    subject: "Chemistry",
    meetingTime: "Mondays, 1:00 PM",
  },
]

export function GroupDiscovery() {
  const [searchTerm, setSearchTerm] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  const filteredGroups = mockGroups.filter((group) => {
    const matchesSearch =
      group.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesSubject = subjectFilter === "all" || group.subject === subjectFilter

    return matchesSearch && matchesSubject
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Discover Study Groups</h1>
          <p className="text-muted-foreground">Find and join study groups that match your interests</p>
        </div>
        <Button
          onClick={() => setShowCreateDialog(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Create Group
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="border-border">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search groups by name, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input border-border"
              />
            </div>
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-input border-border">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Chemistry">Chemistry</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Groups Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredGroups.map((group) => (
          <Card key={group.id} className="border-border hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg text-card-foreground">{group.title}</CardTitle>
                {group.isPrivate ? (
                  <Lock className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Globe className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">{group.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>
                    {group.members}/{group.maxMembers} members
                  </span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {group.subject}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground">{group.meetingTime}</p>

              <div className="flex flex-wrap gap-2">
                {group.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => (window.location.href = `/groups/${group.id}`)}
                >
                  View Details
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-border hover:bg-accent hover:text-accent-foreground bg-transparent"
                >
                  {group.isPrivate ? "Request Join" : "Join Group"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGroups.length === 0 && (
        <Card className="border-border">
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No study groups found matching your criteria.</p>
            <Button
              onClick={() => setShowCreateDialog(true)}
              className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Create the First Group
            </Button>
          </CardContent>
        </Card>
      )}

      <CreateGroupDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </div>
  )
}
