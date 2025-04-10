"use client"

import { Member } from "@/types/database"
import { useState } from "react"
import { DataTable } from "./DataTable"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { memberService } from "@/lib/supabase-admin"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { InstagramIcon, LinkedinIcon } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface MembersTableProps {
  initialMembers: Member[]
}

export function MembersTable({ initialMembers }: MembersTableProps) {
  const [members, setMembers] = useState<Member[]>(initialMembers)
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const router = useRouter()

  const isSuperAdmin = (email: string) => {
    return email === "jehianathayata@gmail.com"
  }

  const handleDelete = async (ids: string[]) => {
    // Check if trying to delete superadmin
    const hasSuperAdmin = members.some(
      (member) => ids.includes(member.id) && isSuperAdmin(member.email)
    )
    if (hasSuperAdmin) {
      toast.error("Cannot delete superadmin user")
      return
    }

    if (!confirm(`Are you sure you want to delete ${ids.length} member(s)?`)) return

    try {
      await Promise.all(ids.map((id) => memberService.deleteMember(id)))
      setMembers(members.filter((member) => !ids.includes(member.id)))
      setSelectedMembers([])
      toast.success("Members deleted successfully")
      router.refresh()
    } catch {
      toast.error("Failed to delete members")
    }
  }

  const actionButtons = selectedMembers.length > 0 ? (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          if (selectedMembers.length === 1) {
            router.push(`/admin/users/${selectedMembers[0]}`)
          } else {
            toast.error("Please select only one member to edit")
          }
        }}
        disabled={selectedMembers.length !== 1}
      >
        Edit ({selectedMembers.length})
      </Button>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => handleDelete(selectedMembers)}
      >
        Delete ({selectedMembers.length})
      </Button>
    </div>
  ) : null

  const columns: ColumnDef<Member>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value)
            setSelectedMembers(
              value 
                ? table.getRowModel().rows
                    .filter(row => !isSuperAdmin(row.original.email))
                    .map(row => row.original.id)
                : []
            )
          }}
        />
      ),
      cell: ({ row }) => {
        const isSuper = isSuperAdmin(row.original.email)
        return (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value)
              setSelectedMembers(
                value
                  ? [...selectedMembers, row.original.id]
                  : selectedMembers.filter(id => id !== row.original.id)
              )
            }}
            disabled={isSuper}
            className={isSuper ? "cursor-not-allowed opacity-50" : ""}
          />
        )
      },
    },
    {
      accessorKey: "image",
      header: "Avatar",
      cell: ({ row }) => {
        const member = row.original
        return (
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={member.image}
              alt={member.name}
            />
            <AvatarFallback>
              {member.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )
      },
    },
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
      accessorKey: "instagram",
      header: "Instagram",
      cell: ({ row }) => {
        const instagram = row.original.instagram
        if (!instagram) return "-"
        
        return (
          <a
            href={`https://instagram.com/${instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 w-fit hover:bg-gray-100 px-2 py-1 rounded-md transition-colors"
          >
            <InstagramIcon className="w-4 h-4 text-pink-600" />
            <span className="text-gray-600 hover:text-gray-900">
              {instagram}
            </span>
          </a>
        )
      },
    },
    {
      accessorKey: "linkedin",
      header: "LinkedIn",
      cell: ({ row }) => {
        const linkedin = row.original.linkedin
        if (!linkedin) return "-"
        
        return (
          <a
            href={`https://linkedin.com/in/${linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 w-fit hover:bg-gray-100 px-2 py-1 rounded-md transition-colors"
          >
            <LinkedinIcon className="w-4 h-4 text-blue-600" />
            <span className="text-gray-600 hover:text-gray-900">
              {linkedin}
            </span>
          </a>
        )
      },
    },
  ]

  return (
    <div>
      <DataTable 
        columns={columns} 
        data={members} 
        actionButtons={actionButtons}
      />
    </div>
  )
}
