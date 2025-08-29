import { DashboardHeader } from "@/components/dashboard-header"
import { StudyGroupCard } from "@/components/study-group-card"
import { QuickActions } from "@/components/quick-actions"
import { UpcomingMeetups } from "@/components/upcoming-meetups"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentActivity } from "@/components/recent-activity"
import { NotificationsPanel } from "@/components/notifications-panel"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <DashboardStats />

        <div className="grid gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">My Study Groups</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <StudyGroupCard
                  title="Advanced Mathematics"
                  description="Calculus III study sessions"
                  members={8}
                  nextMeeting="Tomorrow, 2:00 PM"
                  tags={["Math", "Calculus"]}
                  isPrivate={false}
                />
                <StudyGroupCard
                  title="Computer Science Fundamentals"
                  description="Data structures and algorithms"
                  members={12}
                  nextMeeting="Friday, 4:00 PM"
                  tags={["CS", "Programming"]}
                  isPrivate={true}
                />
              </div>
            </section>

            <UpcomingMeetups />

            <RecentActivity />
          </div>

          <div className="space-y-6">
            <QuickActions />
            <NotificationsPanel />
          </div>
        </div>
      </main>
    </div>
  )
}
