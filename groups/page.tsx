import { GroupDiscovery } from "@/components/group-discovery"
import { DashboardHeader } from "@/components/dashboard-header"

export default function GroupsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6">
        <GroupDiscovery />
      </main>
    </div>
  )
}
