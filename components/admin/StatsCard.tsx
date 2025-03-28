import React from "react"
import { ArrowSmallUpIcon, ArrowSmallDownIcon } from "@heroicons/react/20/solid"

interface StatsCardProps {
  name: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: React.ElementType
  color: string
  isLoading: boolean
}

export default function StatsCard({
  name,
  value,
  change,
  trend,
  icon: Icon,
  color,
  isLoading,
}: StatsCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div
            className={`flex-shrink-0 rounded-md p-3 ${color} bg-opacity-10`}
          >
            <Icon
              className={`h-6 w-6 ${color.replace("bg-", "text-")}`}
              aria-hidden="true"
            />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {name}
              </dt>
              <dd>
                {isLoading ? (
                  <div className="h-6 w-16 bg-gray-200 animate-pulse rounded mt-1"></div>
                ) : (
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">
                      {value}
                    </p>
                    <p
                      className={`ml-2 flex items-baseline text-sm font-semibold ${
                        trend === "up"
                          ? "text-green-600"
                          : trend === "down"
                          ? "text-red-600"
                          : "text-gray-500"
                      }`}
                    >
                      {trend === "up" ? (
                        <ArrowSmallUpIcon
                          className="h-4 w-4 flex-shrink-0 self-center text-green-500"
                          aria-hidden="true"
                        />
                      ) : trend === "down" ? (
                        <ArrowSmallDownIcon
                          className="h-4 w-4 flex-shrink-0 self-center text-red-500"
                          aria-hidden="true"
                        />
                      ) : null}
                      <span className="sr-only">
                        {trend === "up"
                          ? "Increased"
                          : trend === "down"
                          ? "Decreased"
                          : "No change"}{" "}
                        by
                      </span>
                      {change}
                    </p>
                  </div>
                )}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
