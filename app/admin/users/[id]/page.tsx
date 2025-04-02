import { memberService } from "@/lib/supabase-admin"
import { EditMemberForm } from "@/components/admin/EditMemberForm"
import { notFound } from "next/navigation"

interface EditUserPageProps {
  params: {
    id: string
  }
}

export default async function EditUserPage({ params }: EditUserPageProps) {
  const member = await memberService.getMemberById(params.id)

  if (!member) {
    notFound()
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit User</h1>
      </div>
      <EditMemberForm member={member} />
    </div>
  )
}
