"use client"

import { User } from "@/types/database"
import { useState } from "react"
import { DataTable } from "./DataTable"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { userService } from "@/lib/supabase-admin"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { InstagramIcon, LinkedinIcon } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface UsersTableProps {
  initialUsers: User[]
}

export function UsersTable({ initialUsers }: UsersTableProps) {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const router = useRouter()

  const isSuperAdmin = (email: string) => {
    return email === "jehianathayata@gmail.com"
  }

  const handleDelete = async (ids: string[]) => {
    const hasSuperAdmin = users.some(
      (user) => ids.includes(user.id) && isSuperAdmin(user.email)
    )
    if (hasSuperAdmin) {
      toast.error("Cannot delete superadmin user")
      return
    }

    if (!confirm(`Are you sure you want to delete ${ids.length} user(s)?`)) return

    try {
      await Promise.all(ids.map((id) => userService.deleteUser(id)))
      setUsers(users.filter((user) => !ids.includes(user.id)))
      setSelectedUsers([])
      toast.success("Users deleted successfully")
      router.refresh()
    } catch {
      toast.error("Failed to delete users")
    }
  }

  const columns: ColumnDef<User>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value)
            setSelectedUsers(
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
              setSelectedUsers(
                value
                  ? [...selectedUsers, row.original.id]
                  : selectedUsers.filter(id => id !== row.original.id)
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
        const user = row.original
        return (
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
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
        data={users} 
        filterColumn="name"
        filterPlaceholder="Filter by name..."
        rowCount="user(s)"
        actionButtons={selectedUsers.length > 0 ? (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (selectedUsers.length === 1) {
                  router.push(`/admin/users/${selectedUsers[0]}`)
                } else {
                  toast.error("Please select only one user to edit")
                }
              }}
              disabled={selectedUsers.length !== 1}
            >
              Edit ({selectedUsers.length})
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(selectedUsers)}
            >
              Delete ({selectedUsers.length})
            </Button>
          </div>
        ) : null}
      />
    </div>
  )
}
