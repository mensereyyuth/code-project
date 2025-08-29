"use client"

import { BookOpen, Calendar, Users, Bell, TrendingUp, Clock, Settings, LogOut, ChevronDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export default function StudentPortal() {
    const router = useRouter()

    const handleSignOut = () => {
        // Clear any stored authentication data
        localStorage.removeItem("userType")
        localStorage.removeItem("authToken")
        // Redirect to home page
        router.push("/")
    }

    const handleSettings = () => {
        router.push("/student/settings")
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Student Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold text-gray-900">Student Portal</h1>
                                <p className="text-sm text-gray-500">Welcome back, Alex!</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="outline" size="sm">
                                <Bell className="w-4 h-4 mr-2" />
                                Notifications
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="flex items-center space-x-2 p-2">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-sm font-medium text-blue-600">A</span>
                                        </div>
                                        <ChevronDown className="w-4 h-4 text-gray-500" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuItem onClick={handleSettings}>
                                        <Settings className="w-4 h-4 mr-2" />
                                        Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Sign Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Active Groups</p>
                                    <p className="text-2xl font-bold text-gray-900">5</p>
                                </div>
                                <Users className="w-8 h-8 text-blue-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">This Week</p>
                                    <p className="text-2xl font-bold text-gray-900">8</p>
                                    <p className="text-xs text-gray-500">study sessions</p>
                                </div>
                                <Calendar className="w-8 h-8 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Study Hours</p>
                                    <p className="text-2xl font-bold text-gray-900">24</p>
                                    <p className="text-xs text-gray-500">this month</p>
                                </div>
                                <Clock className="w-8 h-8 text-purple-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Progress</p>
                                    <p className="text-2xl font-bold text-gray-900">85%</p>
                                    <p className="text-xs text-gray-500">goals completed</p>
                                </div>
                                <TrendingUp className="w-8 h-8 text-orange-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* My Study Groups */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>My Study Groups</CardTitle>
                                <CardDescription>Your active study groups and upcoming sessions</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[
                                    {
                                        name: "Advanced Mathematics",
                                        subject: "MATH 301",
                                        nextSession: "Today, 3:00 PM",
                                        members: 8,
                                        progress: 75,
                                    },
                                    {
                                        name: "Computer Science Fundamentals",
                                        subject: "CS 101",
                                        nextSession: "Tomorrow, 10:00 AM",
                                        members: 12,
                                        progress: 60,
                                    },
                                    {
                                        name: "Physics Study Circle",
                                        subject: "PHYS 201",
                                        nextSession: "Friday, 2:00 PM",
                                        members: 6,
                                        progress: 90,
                                    },
                                ].map((group, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h3 className="font-medium text-gray-900">{group.name}</h3>
                                                <Badge variant="secondary">{group.subject}</Badge>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">Next: {group.nextSession}</p>
                                            <div className="flex items-center space-x-4">
                                                <span className="text-xs text-gray-500">{group.members} members</span>
                                                <div className="flex items-center space-x-2">
                                                    <Progress value={group.progress} className="w-20 h-2" />
                                                    <span className="text-xs text-gray-500">{group.progress}%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            Join Session
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Actions & Upcoming */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button className="w-full justify-start bg-transparent" variant="outline">
                                    <Users className="w-4 h-4 mr-2" />
                                    Find Study Groups
                                </Button>
                                <Button className="w-full justify-start bg-transparent" variant="outline">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Schedule Session
                                </Button>
                                <Button className="w-full justify-start bg-transparent" variant="outline">
                                    <BookOpen className="w-4 h-4 mr-2" />
                                    Create New Group
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Upcoming Sessions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Today's Schedule</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {[
                                    { time: "3:00 PM", group: "Advanced Math", type: "Group Study" },
                                    { time: "5:30 PM", group: "CS Fundamentals", type: "Review Session" },
                                    { time: "7:00 PM", group: "Physics Circle", type: "Problem Solving" },
                                ].map((session, index) => (
                                    <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        <div className="flex-1">
                                            <p className="font-medium text-sm">{session.group}</p>
                                            <p className="text-xs text-gray-500">{session.type}</p>
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">{session.time}</span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Study Progress */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Weekly Progress</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span>Study Goal</span>
                                        <span>20/25 hours</span>
                                    </div>
                                    <Progress value={80} className="h-2" />
                                    <p className="text-xs text-gray-500">5 hours remaining this week</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}
