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
import { useState, useCallback } from "react"
import { toast } from "sonner"
import { userService } from "@/lib/supabase-admin"
import { useRouter } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase"
import Image from "next/image"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["admin", "visitor", "member"]),
  department_id: z.string().optional(),
  batch_key: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
  image: z.instanceof(File)
    .refine((file) => file.size <= 5000000, `Max file size is 5MB.`)
    .refine(
      (file) => 
        ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type),
      "Only .jpg, .jpeg, and .png formats are supported."
    )
    .optional(),
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
  const [preview, setPreview] = useState<string | null>(null)
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
      department_id: "",
      batch_key: "",
      image: undefined,
    },
  })

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, onChange: (value: File | undefined) => void) => {
    const file = e.target.files?.[0]
    if (file) {
      onChange(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let imageUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${values.name}`

      if (values.image) {
        const fileName = `${Date.now()}-${values.image.name.replace(/[^a-zA-Z0-9.]/g, '')}`

        console.log('Attempting to upload:', fileName)
        
        const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
          .from('avatars')
          .upload(fileName, values.image, {
            cacheControl: '3600',
            upsert: true
          })

        if (uploadError) {
          console.error('Upload error:', uploadError)
          throw new Error(`Upload failed: ${uploadError.message}`)
        }

        console.log('Upload successful:', uploadData)

        // Get public URL using getPublicUrl
        const { data: { publicUrl } } = supabaseAdmin.storage
          .from('avatars')
          .getPublicUrl(fileName)

        imageUrl = publicUrl
        console.log('Generated public URL:', imageUrl)
      }

      // Create user payload
      const userPayload = {
        name: values.name,
        email: values.email,
        role: values.role,
        department_id: values.department_id || undefined,
        batch_key: values.batch_key || undefined,
        instagram: values.instagram || undefined,
        linkedin: values.linkedin || undefined,
        image: imageUrl,
        created_at: new Date().toISOString(),
        is_anonymous: false,
        is_sso_user: false
      }

      console.log('Creating user with payload:', userPayload)
      const newUser = await userService.createUser(userPayload)
      console.log('User created:', newUser)

      toast.success("User created successfully")
      setOpen(false)
      form.reset()
      setPreview(null)
      router.refresh()
    } catch (error) {
      console.error('Full error:', error)
      toast.error(error instanceof Error ? error.message : "Failed to create user")
    }
  }

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen)
      if (!newOpen) {
        setPreview(null)
        form.reset()
      }
    }}>
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
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Image</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <Input
                        type="file"
                        onChange={(e) => handleImageChange(e, field.onChange)}
                        accept=".jpg,.jpeg,.png"
                        className="cursor-pointer"
                      />
                      {preview && (
                        <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
                          <Image
                            src={preview}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <p className="text-sm text-gray-500">
                    Max file size: 5MB. Supported formats: JPG, JPEG, PNG
                  </p>
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