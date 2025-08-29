"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, MoreHorizontal, Eye, Edit, Trash2, Check, X, Users, Lock, Globe } from "lucide-react"

const mockGroups = [
  {
    id: "1",
    name: "Advanced Mathematics",
    subject: "Mathematics",
    members: 8,
    maxMembers: 15,
    status: "active",
    isPrivate: false,
    createdBy: "Sarah Johnson",
    createdAt: "2024-01-15",
    lastActivity: "2 hours ago",
  },
  {
    id: "2",
    name: "Computer Science Fundamentals",
    subject: "Computer Science",
    members: 12,
    maxMembers: 20,
    status: "active",
    isPrivate: true,
    createdBy: "Mike Chen",
    createdAt: "2024-01-10",
    lastActivity: "1 day ago",
  },
  {
    id: "3",
    name: "Biology Research Group",
    subject: "Biology",
    members: 0,
    maxMembers: 10,
    status: "pending",
    isPrivate: false,
    createdBy: "Emily Davis",
    createdAt: "2024-01-20",
    lastActivity: "Never",
  },
  {
    id: "4",
    name: "Physics Study Circle",
    subject: "Physics",
    members: 6,
    maxMembers: 10,
    status: "suspended",
    isPrivate: false,
    createdBy: "Alex Rodriguez",
    createdAt: "2024-01-05",
    lastActivity: "1 week ago",
  },
]

export function GroupManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredGroups = mockGroups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || group.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "suspended":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-4">
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg text-card-foreground">Group Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search groups by name, subject, or creator..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input border-border"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-input border-border">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredGroups.map((group) => (
              <div key={group.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {group.isPrivate ? (
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Globe className="h-4 w-4 text-muted-foreground" />
                    )}
                    <div>
                      <h3 className="font-semibold text-card-foreground">{group.name}</h3>
                      <p className="text-sm text-muted-foreground">{group.subject}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>
                        {group.members}/{group.maxMembers}
                      </span>
                    </div>
                    <span>by {group.createdBy}</span>
                    <span>{group.lastActivity}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Badge className={getStatusColor(group.status)}>{group.status}</Badge>

                  {group.status === "pending" && (
                    <div className="flex space-x-1">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-popover border-border" align="end">
                      <DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Group
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Group
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
