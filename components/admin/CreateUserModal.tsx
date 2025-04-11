"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SelectButtons } from "@/components/ui/select-buttons"
import { Department, Batch } from "@/types/database"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { PlusIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { userService } from "@/lib/supabase-admin"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["admin", "visitor", "member"]),
  department_id: z.string().optional(),
  batch_key: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
})

const roles = [
  { id: "admin", label: "Admin" },
  { id: "visitor", label: "Visitor" },
  { id: "member", label: "Member" },
] as const

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

interface CreateUserModalProps {
  departments: Department[]
  batches: Batch[]
}

export function CreateUserModal({ departments, batches }: CreateUserModalProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  // Add console.log to verify props
  console.log('CreateUserModal departments:', departments)
  console.log('CreateUserModal batches:', batches)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "visitor",
      instagram: "",
      linkedin: "",
      department_id: undefined, // Changed from empty string
      batch_key: undefined, // Changed from empty string
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const user = {
        ...values,
        image: `https://api.dicebear.com/7.x/initials/svg?seed=${values.name}`,
        created_at: new Date().toISOString(),
      }
      await userService.createUser(user)
      toast.success("User created successfully")
      setOpen(false)
      form.reset()
      router.refresh()
    } catch {
      toast.error("Failed to create user")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="John Doe" />
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
                    <Input {...field} placeholder="john@example.com" type="email" />
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
                      items={departments || []}
                      value={field.value || ""}
                      onChange={field.onChange}
                      getLabel={(dept) => dept.name_en}
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
                      items={batches || []}
                      value={field.value || ""}
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
                      value={field.value || ""}
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
                      value={field.value || ""}
                      onChange={(value) => field.onChange(value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Create User</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}