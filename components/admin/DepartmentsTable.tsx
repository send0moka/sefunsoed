"use client"

import { Department } from "@/types/database"
import { useState } from "react"
import { DataTable } from "./DataTable"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { CreateDepartmentModal } from "./CreateDepartmentModal"
import { EditDepartmentModal } from "./EditDepartmentModal"
import { departmentService } from "@/lib/supabase-admin"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface DepartmentsTableProps {
  initialDepartments: Department[]
}

export function DepartmentsTable({ initialDepartments }: DepartmentsTableProps) {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null)
  const router = useRouter()

  const handleDelete = async (id: string, used: number) => {
    if (used > 0) {
      if (!confirm(`This department is used by ${used} users. Are you sure you want to delete it?`)) {
        return
      }
    } else if (!confirm("Are you sure you want to delete this department?")) {
      return
    }

    try {
      await departmentService.deleteDepartment(id)
      setDepartments(departments.filter((dept) => dept.id !== id))
      toast.success("Department deleted successfully")
      router.refresh()
    } catch {
      toast.error("Failed to delete department")
    }
  }

  const columns: ColumnDef<Department>[] = [
    {
      accessorKey: "name_en",
      header: "Name (English)",
    },
    {
      accessorKey: "name_id",
      header: "Name (Indonesia)",
    },
    {
      accessorKey: "used",
      header: "Used By",
      cell: ({ row }) => `${row.original.used} users`,
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString(),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditingDepartment(row.original)}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(row.original.id, row.original.used || 0)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Departments</h2>
        <Button onClick={() => setIsCreateModalOpen(true)}>Create Department</Button>
      </div>
      <DataTable columns={columns} data={departments} />
      <CreateDepartmentModal 
        open={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={(newDepartment) => {
          setDepartments([{...newDepartment, used: 0}, ...departments])
          setIsCreateModalOpen(false)
        }}
      />
      {editingDepartment && (
        <EditDepartmentModal
          department={editingDepartment}
          open={true}
          onClose={() => setEditingDepartment(null)}
          onSuccess={(updated) => {
            setDepartments(departments.map(dept => 
              dept.id === updated.id ? {...updated, used: dept.used} : dept
            ))
            setEditingDepartment(null)
          }}
        />
      )}
    </div>
  )
}