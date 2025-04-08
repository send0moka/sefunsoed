"use client"

import { Batch } from "@/types/database"
import { useState } from "react"
import { DataTable } from "./DataTable"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { CreateBatchModal } from "./CreateBatchModal"
import { EditBatchModal } from "./EditBatchModal"
import { batchService } from "@/lib/supabase-admin"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface BatchesTableProps {
  initialBatches: Batch[]
}

export function BatchesTable({ initialBatches }: BatchesTableProps) {
  const [batches, setBatches] = useState<Batch[]>(initialBatches)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null)
  const router = useRouter()

  const handleDelete = async (id: string, used: number) => {
    if (used > 0) {
      if (!confirm(`This batch is used by ${used} members. Are you sure you want to delete it?`)) {
        return
      }
    } else if (!confirm("Are you sure you want to delete this batch?")) {
      return
    }

    try {
      await batchService.deleteBatch(id)
      setBatches(batches.filter((batch) => batch.id !== id))
      toast.success("Batch deleted successfully")
      router.refresh()
    } catch {
      toast.error("Failed to delete batch")
    }
  }

  const columns: ColumnDef<Batch>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "key",
      header: "Key",
    },
    {
      accessorKey: "used",
      header: "Used By",
      cell: ({ row }) => `${row.original.used} members`,
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
            onClick={() => setEditingBatch(row.original)}
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
        <h2 className="text-xl font-semibold">Batches</h2>
        <Button onClick={() => setIsCreateModalOpen(true)}>Create Batch</Button>
      </div>
      <DataTable columns={columns} data={batches} />
      <CreateBatchModal 
        open={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={(newBatch) => {
          setBatches([{...newBatch, used: 0}, ...batches])
          setIsCreateModalOpen(false)
        }}
      />
      {editingBatch && (
        <EditBatchModal
          batch={editingBatch}
          open={true}
          onClose={() => setEditingBatch(null)}
          onSuccess={(updated) => {
            setBatches(batches.map(batch => 
              batch.id === updated.id ? {...updated, used: batch.used} : batch
            ))
            setEditingBatch(null)
          }}
        />
      )}
    </div>
  )
}