"use client"

import { Button } from "./button"

interface SelectButtonsProps<T> {
  items: readonly T[] | T[]
  value?: string
  onChange: (value: string) => void
  getLabel: (item: T) => string
  getValue: (item: T) => string
}

export function SelectButtons<T>({ 
  items, 
  value, 
  onChange,
  getLabel,
  getValue
}: SelectButtonsProps<T>) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const itemValue = getValue(item)
        return (
          <Button
            key={itemValue}
            type="button"
            variant={value === itemValue ? "default" : "outline"}
            onClick={() => onChange(itemValue)}
          >
            {getLabel(item)}
          </Button>
        )
      })}
    </div>
  )
}