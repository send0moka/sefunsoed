"use client"

import { Member } from "@/types/database"
import { useState } from "react"
import { DataTable } from "./DataTable"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { memberService } from "@/lib/supabase-admin"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface MembersTableProps {
  initialMembers: Member[]
}

export function MembersTable({ initialMembers }: MembersTableProps) {
  const [members, setMembers] = useState<Member[]>(initialMembers)
  const router = useRouter()

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this member?")) return

    try {
      await memberService.deleteMember(id)
      setMembers(members.filter((member) => member.id !== id))
      toast.success("Member deleted successfully")
      router.refresh()
    } catch {
      toast.error("Failed to delete member")
    }
  }

  const columns: ColumnDef<Member>[] = [
    {
      accessorKey: "name",
      header: "Name",
      enableSorting: true,
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      enableSorting: true,
    },
    {
      accessorKey: "department",
      header: "Department",
      cell: ({ row }) => row.original.department || "-",
    },
    {
      accessorKey: "batch",
      header: "Batch",
      cell: ({ row }) => row.original.batch || "-",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/admin/users/${row.original.id}`)}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(row.original.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ]

  return <DataTable columns={columns} data={members} />
}
