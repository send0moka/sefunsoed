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
import { Checkbox } from "@/components/ui/checkbox"

interface DepartmentsTableProps {
  initialDepartments: Department[]
}

export function DepartmentsTable({ initialDepartments }: DepartmentsTableProps) {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([])
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null)
  const router = useRouter()

  const handleDelete = async (ids: string[]) => {
    const totalUsed = ids.reduce((sum, id) => {
      const dept = departments.find(d => d.id === id)
      return sum + (dept?.used || 0)
    }, 0)

    if (totalUsed > 0) {
      if (!confirm(`Selected departments are used by ${totalUsed} users. Are you sure you want to delete them?`)) {
        return
      }
    } else if (!confirm(`Are you sure you want to delete ${ids.length} department(s)?`)) {
      return
    }

    try {
      await Promise.all(ids.map(id => departmentService.deleteDepartment(id)))
      setDepartments(departments.filter((dept) => !ids.includes(dept.id)))
      setSelectedDepartments([])
      toast.success("Departments deleted successfully")
      router.refresh()
    } catch {
      toast.error("Failed to delete departments")
    }
  }

  const columns: ColumnDef<Department>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value)
            setSelectedDepartments(
              value 
                ? table.getRowModel().rows.map(row => row.original.id)
                : []
            )
          }}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value)
            setSelectedDepartments(
              value
                ? [...selectedDepartments, row.original.id]
                : selectedDepartments.filter(id => id !== row.original.id)
            )
          }}
        />
      ),
    },
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
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Departments</h2>
        <Button onClick={() => setIsCreateModalOpen(true)}>Create Department</Button>
      </div>
      <DataTable 
        columns={columns} 
        data={departments}
        actionButtons={selectedDepartments.length > 0 ? (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (selectedDepartments.length === 1) {
                  const dept = departments.find(d => d.id === selectedDepartments[0])
                  if (dept) setEditingDepartment(dept)
                } else {
                  toast.error("Please select only one department to edit")
                }
              }}
              disabled={selectedDepartments.length !== 1}
            >
              Edit ({selectedDepartments.length})
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(selectedDepartments)}
            >
              Delete ({selectedDepartments.length})
            </Button>
          </div>
        ) : null}
      />
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
            setSelectedDepartments([])
          }}
        />
      )}
    </div>
  )
}