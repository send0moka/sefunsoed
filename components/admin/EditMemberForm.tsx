"use client"

import { Member, Department, Batch } from "@/types/database"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { memberService } from "@/lib/supabase-admin"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { SelectButtons } from "@/components/ui/select-buttons"
import { useEffect } from "react"

const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  role: z.enum(["admin", "member"]),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
  department_id: z.string().optional(),
  batch_key: z.string().optional(),
})

const roles = [
  { id: "admin", label: "Admin" },
  { id: "member", label: "Member" },
] as const

interface EditMemberFormProps {
  member: Member
  departments: Department[]
  batches: Batch[]
}

export function EditMemberForm({ member, departments, batches }: EditMemberFormProps) {
  const router = useRouter()

  // Add protection for superadmin
  useEffect(() => {
    if (member.email === "jehianathayata@gmail.com") {
      toast.error("Cannot edit superadmin user")
      router.push("/admin/users")
    }
  }, [member.email, router])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: member.name,
      email: member.email,
      role: member.role,
      instagram: member.instagram || "",
      linkedin: member.linkedin || "",
      department_id: member.department_id || "",
      batch_key: member.batch_key || "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Remove name and email from the update payload
      const { ...updateData } = values
      await memberService.updateMember(member.id, updateData)
      toast.success("Member updated successfully")
      router.refresh()
      router.push("/admin/users")
    } catch {
      toast.error("Failed to update member")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} disabled className="bg-gray-50" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled className="bg-gray-50" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <SelectButtons
                  items={roles}
                  value={field.value}
                  onChange={field.onChange}
                  getLabel={(role) => role.label}
                  getValue={(role) => role.id}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="department_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <FormControl>
                <SelectButtons
                  items={departments}
                  value={field.value}
                  onChange={field.onChange}
                  getLabel={(dept) => `${dept.name_en} (${dept.name_id})`}
                  getValue={(dept) => dept.id}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="batch_key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Batch</FormLabel>
              <FormControl>
                <SelectButtons
                  items={batches}
                  value={field.value}
                  onChange={field.onChange}
                  getLabel={(batch) => batch.name}
                  getValue={(batch) => batch.key}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="instagram"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instagram</FormLabel>
              <FormControl>
                <Input {...field} placeholder="@username" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://linkedin.com/in/username" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  )
}
