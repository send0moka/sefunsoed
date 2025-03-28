"use client"

import { useState } from "react"
import { UserIcon } from "@heroicons/react/24/outline"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "@heroicons/react/20/solid"

interface User {
  id: string
  name: string
  email: string
  role: string
  status: string
  joinedDate: string
}

const columns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }: { row: { getValue: (key: keyof User) => unknown } }) => {
      return (
        <div className="flex items-center gap-x-3">
          <div className="rounded-lg bg-gray-50 p-1">
            <UserIcon className="h-5 w-5 text-gray-600" />
          </div>
          <span className="font-medium text-gray-900">{row.getValue("name") as string}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }: { row: { getValue: (key: keyof User) => unknown } }) => (
      <span className="text-gray-600">{row.getValue("email") as string}</span>
    )
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }: { row: { getValue: (key: keyof User) => unknown } }) => (
      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
        {row.getValue("role") as string}
      </span>
    )
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: { getValue: (key: keyof User) => unknown } }) => {
      const status = row.getValue("status") as string
      return (
        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset
          ${status === 'active' 
            ? 'bg-green-50 text-green-700 ring-green-600/20' 
            : 'bg-red-50 text-red-700 ring-red-600/20'}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      )
    }
  },
  {
    accessorKey: "joinedDate",
    header: "Joined Date",
    cell: ({ row }: { row: { getValue: (key: keyof User) => unknown } }) => {
      const date = new Date(row.getValue("joinedDate") as string)
      return (
        <span className="text-gray-600">
          {date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}
        </span>
      )
    }
  }
]

export default function UsersPage() {
  const [users] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Member",
      status: "active",
      joinedDate: "2024-03-15"
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Admin",
      status: "active",
      joinedDate: "2024-02-20"
    },
    {
      id: "3",
      name: "Bob Wilson",
      email: "bob@example.com",
      role: "Member",
      status: "inactive",
      joinedDate: "2024-01-10"
    }
  ])

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-600">
            A list of all users in the system including their name, email, role and status.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0">
          <Button className="bg-indigo-600 hover:bg-indigo-500 text-white">
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Add User
          </Button>
        </div>
      </div>
      
      <div className="mt-8 flow-root">
        <div className="rounded-lg border border-gray-200 bg-white">
          <DataTable 
            columns={columns} 
            data={users}
            searchKey="name"
          />
        </div>
      </div>
    </div>
  )
}
