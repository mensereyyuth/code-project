import { AdminHeader } from "@/components/admin-header"
import { AdminStats } from "@/components/admin-stats"
import { GroupManagement } from "@/components/group-management"
import { UserManagement } from "@/components/user-management"
import { SystemActivity } from "@/components/system-activity"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader/>

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage study groups, users, and system settings</p>
          </div>
        </div>

        <AdminStats />

        <Tabs defaultValue="groups" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="groups" className="space-y-4">
            <GroupManagement />
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <UserManagement />
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <SystemActivity />
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="text-center py-12">
              <p className="text-muted-foreground">System settings panel coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
