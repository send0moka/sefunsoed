import { memberService, departmentService, batchService } from "@/lib/supabase-admin"
import { EditMemberForm } from "@/components/admin/EditMemberForm"
import { notFound } from "next/navigation"

interface PageProps {
  params: {
    id: string
  }
}

export default async function EditMemberPage({ params }: PageProps) {
  const [member, departments, batches] = await Promise.all([
    memberService.getMemberById(params.id),
    departmentService.getAllDepartments(),
    batchService.getAllBatches()
  ])

  if (!member) {
    notFound()
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Member</h1>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6 border max-w-2xl">
        <EditMemberForm 
          member={member} 
          departments={departments} 
          batches={batches}
        />
      </div>
    </div>
  )
}
