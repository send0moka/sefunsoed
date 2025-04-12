"use client"

import { Batch, Department, User } from "@/types/database"
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
import { CreateUserModal } from "./CreateUserModal"

interface UsersTableProps {
  initialUsers: User[]
  departments: Department[]
  batches: Batch[]
}

export function UsersTable({ initialUsers, departments, batches }: UsersTableProps) {
  // Add console.log to verify props
  console.log('UsersTable departments:', departments)
  console.log('UsersTable batches:', batches)

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
      accessorKey: "name",
      header: "User",
      cell: ({ row }) => {
        const user = row.original
        const fallbackUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`
        
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage 
                src={user.image || fallbackUrl} 
                alt={user.name}
                onError={(e) => {
                  console.error('Image load error for:', user.image)
                  e.currentTarget.src = fallbackUrl
                }}
              />
              <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{user.name}</span>
              <span className="text-sm text-gray-500">{user.email}</span>
            </div>
          </div>
        )
      },
      enableSorting: true,
    },
    {
      accessorKey: "role",
      header: "Role",
      enableSorting: true,
    },
    {
      id: "department_batch",
      header: "Department",
      cell: ({ row }) => {
        const user = row.original
        const dept = departments.find(d => d.id === user.department_id)
        const batch = batches.find(b => b.key === user.batch_key)
        
        if (!dept) return "-"
        return `${dept.name_en}'${batch ? batch.name.slice(-2) : ""}`
      },
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
    {
      accessorKey: "last_sign_in",
      header: "Last Sign In",
      enableSorting: true,
      cell: ({ row }) => {
        const date = row.original.last_sign_in
        if (!date) return "Never"
        
        return new Date(date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      },
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      enableSorting: true,
      cell: ({ row }) => {
        const date = new Date(row.original.created_at)
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
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
        createButton={
          <CreateUserModal 
            departments={departments} 
            batches={batches} 
          />
        }
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
