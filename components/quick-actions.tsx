"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Search, Calendar } from "lucide-react"

export function QuickActions() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg text-card-foreground">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full justify-start bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="mr-2 h-4 w-4" />
          Create Study Group
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start border-border hover:bg-accent hover:text-accent-foreground bg-transparent"
          onClick={() => (window.location.href = "/groups")}
        >
          <Search className="mr-2 h-4 w-4" />
          Find Groups
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start border-border hover:bg-accent hover:text-accent-foreground bg-transparent"
        >
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Meetup
        </Button>
      </CardContent>
    </Card>
  )
}
