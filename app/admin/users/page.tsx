import { memberService, departmentService, batchService } from "@/lib/supabase-admin"
import { MembersTable } from "@/components/admin/MembersTable"
import { DepartmentsTable } from "@/components/admin/DepartmentsTable"
import { BatchesTable } from "@/components/admin/BatchesTable"
import { Member, Department, Batch } from "@/types/database"

// Add this export to disable caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function UsersPage() {
  const [members, departments, batches] = await Promise.all([
    memberService.getAllMembers() as Promise<Member[]>,
    departmentService.getAllDepartments() as Promise<Department[]>,
    batchService.getAllBatches() as Promise<Batch[]>
  ])

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Users Management</h1>
      </div>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <MembersTable initialMembers={members} />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <DepartmentsTable initialDepartments={departments} />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <BatchesTable initialBatches={batches} />
        </div>
      </div>
    </div>
  )
}
