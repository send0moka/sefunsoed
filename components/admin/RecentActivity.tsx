import React from "react"

interface Activity {
  id: number
  user: string
  action: string
  time: string
}

interface RecentActivityProps {
  isLoading: boolean
}

export default function RecentActivity({ isLoading }: RecentActivityProps) {
  // Sample data - replace with real data from your API
  const activities: Activity[] = [
    {
      id: 1,
      user: "Admin",
      action: "Added a new program",
      time: "just now",
    },
    {
      id: 2,
      user: "System",
      action: "Updated user permissions",
      time: "2 hours ago",
    },
    {
      id: 3,
      user: "Admin",
      action: "Published a new article",
      time: "5 hours ago",
    },
    {
      id: 4,
      user: "System",
      action: "Backup completed",
      time: "1 day ago",
    },
    {
      id: 5,
      user: "Admin",
      action: "Updated homepage content",
      time: "2 days ago",
    },
  ]

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-200 h-10 w-10"></div>
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {activities.map((activity, activityIdx) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {activityIdx !== activities.length - 1 ? (
                <span
                  className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex items-start space-x-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center ring-8 ring-white">
                    <span className="text-xs font-medium text-gray-500">
                      {activity.user.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div>
                    <div className="text-sm text-gray-500">
                      <span className="font-medium text-gray-900">
                        {activity.user}
                      </span>{" "}
                      {activity.action}
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {activity.time}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
