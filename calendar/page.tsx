import { CalendarView } from "@/components/calendar-view"
import { DashboardHeader } from "@/components/dashboard-header"

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6">
        <CalendarView />
      </main>
    </div>
  )
}
