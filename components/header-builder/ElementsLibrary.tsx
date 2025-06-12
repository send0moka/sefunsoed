import { DragEvent } from 'react'
import {
  DocumentTextIcon,
  PhotoIcon,
  RectangleGroupIcon,
  Square2StackIcon,
  Squares2X2Icon
} from '@heroicons/react/24/outline'

type ElementTemplate = {
  type: string
  name: string
  icon: React.ComponentType<React.ComponentProps<'svg'>>
  description: string
}

const elements: ElementTemplate[] = [
  {
    type: 'inner-section',
    name: 'Inner Section',
    icon: Square2StackIcon,
    description: 'A section within container'
  },
  {
    type: 'text',
    name: 'Text Editor',
    icon: DocumentTextIcon,
    description: 'Add text content'
  },
  {
    type: 'image',
    name: 'Image',
    icon: PhotoIcon,
    description: 'Add images from media library'
  },
  {
    type: 'button',
    name: 'Button',
    icon: RectangleGroupIcon,
    description: 'Add clickable buttons'
  },
  {
    type: 'grid',
    name: 'Grid',
    icon: Squares2X2Icon,
    description: 'Create responsive layouts'
  }
]

export default function ElementsLibrary() {
  const handleDragStart = (e: DragEvent<HTMLDivElement>, type: string) => {
    e.dataTransfer.setData('elementType', type)
    e.dataTransfer.effectAllowed = 'copy'
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Elements</h2>
      <div className="grid grid-cols-2 gap-3">
        {elements.map((element) => (
          <div
            key={element.type}
            draggable
            onDragStart={(e) => handleDragStart(e, element.type)}
            className="flex flex-col items-center p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 cursor-move transition-colors"
          >
            <element.icon className="w-8 h-8 text-gray-600" />
            <span className="mt-2 text-sm font-medium text-gray-900">
              {element.name}
            </span>
            <span className="mt-1 text-xs text-gray-500 text-center">
              {element.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}