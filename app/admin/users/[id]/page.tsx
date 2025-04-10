import { userService, departmentService, batchService } from "@/lib/supabase-admin"
import { EditUserForm } from "@/components/admin/EditUserForm"
import { notFound } from "next/navigation"

interface PageProps {
  params: {
    id: string
  }
}

export default async function EditUserPage({ params }: PageProps) {
  const [user, departments, batches] = await Promise.all([
    userService.getUserById(params.id),
    departmentService.getAllDepartments(),
    batchService.getAllBatches()
  ])

  if (!user) {
    notFound()
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit User</h1>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6 border max-w-2xl">
        <EditUserForm 
          user={user} 
          departments={departments} 
          batches={batches}
        />
      </div>
    </div>
  )
}
