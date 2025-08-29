import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Calendar, Lock, MessageSquare, Settings } from "lucide-react"

interface StudyGroupCardProps {
  title: string
  description: string
  members: number
  nextMeeting: string
  tags: string[]
  isPrivate: boolean
}

export function StudyGroupCard({ title, description, members, nextMeeting, tags, isPrivate }: StudyGroupCardProps) {
  return (
    <Card className="border-border hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg text-card-foreground">{title}</CardTitle>
          <div className="flex items-center space-x-1">
            {isPrivate && <Lock className="h-4 w-4 text-muted-foreground" />}
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Settings className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{members} members</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{nextMeeting}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">View Group</Button>
          <Button variant="outline" size="icon" className="border-border bg-transparent">
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
