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

  const isSuperAdmin = (email: string) => {
    return email === "jehianathayata@gmail.com"
  }

  const handleDelete = async (id: string, email: string) => {
    if (isSuperAdmin(email)) {
      toast.error("Cannot delete superadmin user")
      return
    }

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
      accessorKey: "departments",
      header: "Department",
      cell: ({ row }) => {
        const dept = row.original.departments
        if (!dept) return "-"
        return `${dept.name_en} (${dept.name_id})`
      },
    },
    {
      accessorKey: "batches",
      header: "Batch",
      cell: ({ row }) => row.original.batches?.name || "-",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const isSuper = isSuperAdmin(row.original.email)
        
        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/admin/users/${row.original.id}`)}
              disabled={isSuper}
              className={isSuper ? "cursor-not-allowed opacity-50" : ""}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(row.original.id, row.original.email)}
              disabled={isSuper}
              className={isSuper ? "cursor-not-allowed opacity-50" : ""}
            >
              Delete
            </Button>
          </div>
        )
      },
    },
  ]

  return <DataTable columns={columns} data={members} />
}
