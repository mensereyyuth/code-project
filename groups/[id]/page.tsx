import { GroupDetails } from "@/components/group-details"
import { DashboardHeader } from "@/components/dashboard-header"

interface GroupPageProps {
  params: {
    id: string
  }
}

export default function GroupPage({ params }: GroupPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6">
        <GroupDetails groupId={params.id} />
      </main>
    </div>
  )
}
