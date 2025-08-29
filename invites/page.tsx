import { InviteManagement } from "@/components/invite-management"
import { DashboardHeader } from "@/components/dashboard-header"

export default function InvitesPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6">
        <InviteManagement />
      </main>
    </div>
  )
}
