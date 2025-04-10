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
import { Checkbox } from "@/components/ui/checkbox"

interface BatchesTableProps {
  initialBatches: Batch[]
}

export function BatchesTable({ initialBatches }: BatchesTableProps) {
  const [batches, setBatches] = useState<Batch[]>(initialBatches)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedBatches, setSelectedBatches] = useState<string[]>([])
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null)
  const router = useRouter()

  const handleDelete = async (ids: string[]) => {
    const totalUsed = ids.reduce((sum, id) => {
      const batch = batches.find(b => b.id === id)
      return sum + (batch?.used || 0)
    }, 0)

    if (totalUsed > 0) {
      if (!confirm(`Selected batches are used by ${totalUsed} users. Are you sure you want to delete them?`)) {
        return
      }
    } else if (!confirm(`Are you sure you want to delete ${ids.length} batch(es)?`)) {
      return
    }

    try {
      await Promise.all(ids.map(id => batchService.deleteBatch(id)))
      setBatches(batches.filter((batch) => !ids.includes(batch.id)))
      setSelectedBatches([])
      toast.success("Batches deleted successfully")
      router.refresh()
    } catch {
      toast.error("Failed to delete batches")
    }
  }

  const columns: ColumnDef<Batch>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value)
            setSelectedBatches(
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
            setSelectedBatches(
              value
                ? [...selectedBatches, row.original.id]
                : selectedBatches.filter(id => id !== row.original.id)
            )
          }}
        />
      ),
    },
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
        <h2 className="text-xl font-semibold">Batches</h2>
        <Button onClick={() => setIsCreateModalOpen(true)}>Create Batch</Button>
      </div>
      <DataTable 
        columns={columns} 
        data={batches}
        filterColumn="name"
        filterPlaceholder="Filter by name..."
        rowCount="batch(es)"
        actionButtons={selectedBatches.length > 0 ? (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (selectedBatches.length === 1) {
                  const batch = batches.find(b => b.id === selectedBatches[0])
                  if (batch) setEditingBatch(batch)
                } else {
                  toast.error("Please select only one batch to edit")
                }
              }}
              disabled={selectedBatches.length !== 1}
            >
              Edit ({selectedBatches.length})
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(selectedBatches)}
            >
              Delete ({selectedBatches.length})
            </Button>
          </div>
        ) : null}
      />
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
            setSelectedBatches([])
          }}
        />
      )}
    </div>
  )
}