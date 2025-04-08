"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { departmentService } from "@/lib/supabase-admin"
import { toast } from "sonner"
import { Department } from "@/types/database"

const formSchema = z.object({
  name_en: z.string().min(2, "English name must be at least 2 characters"),
  name_id: z.string().min(2, "Indonesian name must be at least 2 characters"),
})

interface EditDepartmentModalProps {
  department: Department
  open: boolean
  onClose: () => void
  onSuccess: (department: Department) => void
}

export function EditDepartmentModal({ department, open, onClose, onSuccess }: EditDepartmentModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name_en: department.name_en,
      name_id: department.name_id,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      const updated = await departmentService.updateDepartment(department.id, values)
      toast.success("Department updated successfully")
      onSuccess(updated)
      form.reset()
    } catch {
      toast.error("Failed to update department")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Department</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name_en"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name (English)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name (Indonesian)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              Save Changes
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}