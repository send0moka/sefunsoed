import { Tab } from "@headlessui/react"

type TabProps = {
  tabs: {
    name: string
    component: React.ReactNode
  }[]
}

export default function TabGroup({ tabs }: TabProps) {
  return (
    <Tab.Group>
      <Tab.List className="flex space-x-1 rounded-xl bg-indigo-100 p-1">
        {tabs.map((tab) => (
          <Tab
            key={tab.name}
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${selected 
                ? 'bg-white text-indigo-700 shadow'
                : 'text-indigo-600 hover:bg-white/[0.12] hover:text-indigo-700'
              }`
            }
          >
            {tab.name}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-4">
        {tabs.map((tab, idx) => (
          <Tab.Panel key={idx} className="p-3">
            {tab.component}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}