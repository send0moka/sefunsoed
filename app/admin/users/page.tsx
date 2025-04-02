import { memberService } from "@/lib/supabase-admin"
import { MembersTable } from "@/components/admin/MembersTable"
import { Member } from "@/types/database"

export default async function UsersPage() {
  const members = await memberService.getAllMembers() as Member[]

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Users Management</h1>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <MembersTable initialMembers={members} />
      </div>
    </div>
  )
}
