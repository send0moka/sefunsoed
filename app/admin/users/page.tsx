import { userService, departmentService, batchService } from "@/lib/supabase-admin"
import { UsersTable } from "@/components/admin/UsersTable"
import { DepartmentsTable } from "@/components/admin/DepartmentsTable"
import { BatchesTable } from "@/components/admin/BatchesTable"
import { User, Department, Batch } from "@/types/database"

// Add this export to disable caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function UsersPage() {
  const [users, departments, batches] = await Promise.all([
    userService.getAllUsers() as Promise<User[]>,
    departmentService.getAllDepartments() as Promise<Department[]>,
    batchService.getAllBatches() as Promise<Batch[]>
  ])

  // Add logging to verify data
  console.log('Departments:', departments)
  console.log('Batches:', batches)

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Users Management</h1>
      </div>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <UsersTable initialUsers={users} departments={departments} batches={batches} />
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
