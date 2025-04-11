"use client"

import { User, Department, Batch } from "@/types/database"
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
import { userService } from "@/lib/supabase-admin"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { SelectButtons } from "@/components/ui/select-buttons"
import { useEffect } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

function InstagramInput({ value, onChange }: { value: string, onChange: (value: string) => void }) {
  return (
    <div className="flex">
      <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-gray-50 text-gray-500">
        instagram.com/
      </div>
      <Input 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-l-none"
        placeholder="username"
      />
    </div>
  )
}

function LinkedInInput({ value, onChange }: { value: string, onChange: (value: string) => void }) {
  return (
    <div className="flex">
      <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-gray-50 text-gray-500">
        linkedin.com/in/
      </div>
      <Input 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-l-none"
        placeholder="username"
      />
    </div>
  )
}

const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  role: z.enum(["admin", "visitor", "member"]),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
  department_id: z.string().optional(),
  batch_key: z.string().optional(),
})

const roles = [
  { id: "admin", label: "Admin" },
  { id: "visitor", label: "Visitor" },
  { id: "member", label: "Member" }
] as const

interface EditUserFormProps {
  user: User
  departments: Department[]
  batches: Batch[]
}

export function EditUserForm({ user, departments, batches }: EditUserFormProps) {
  const router = useRouter()

  // Add protection for superadmin
  useEffect(() => {
    if (user.email === "jehianathayata@gmail.com") {
      toast.error("Cannot edit superadmin user")
      router.push("/admin/users")
    }
  }, [user.email, router])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.role,
      instagram: user.instagram || "",
      linkedin: user.linkedin || "",
      department_id: user.department_id || "",
      batch_key: user.batch_key || "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { ...updateData } = values
      await userService.updateUser(user.id, updateData)
      toast.success("User updated successfully")
      router.refresh()
      router.push("/admin/users")
    } catch {
      toast.error("Failed to update user")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={user.image}
              alt={user.name}
            />
            <AvatarFallback>
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-medium">Profile Picture</h3>
            <p className="text-sm text-gray-500">
              Profile picture is synced from authentication provider
            </p>
          </div>
        </div>

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
                <InstagramInput 
                  value={field.value?.replace("@", "") || ""}
                  onChange={(value) => field.onChange(value)}
                />
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
                <LinkedInInput 
                  value={field.value?.replace("https://linkedin.com/in/", "") || ""}
                  onChange={(value) => field.onChange(value)}
                />
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
