'use client'

type TabBarProps<T extends string> = {
    tabs: T[]
    active: T
    onChange: (tab: T) => void
}

const TabBar = <T extends string>({ tabs, active, onChange }: TabBarProps<T>) => (
    <div className="flex gap-1 rounded-lg bg-surface p-1">
        {tabs.map((tab) => (
            <button
                key={tab}
                type="button"
                onClick={() => onChange(tab)}
                className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                    active === tab ? 'bg-elevated text-foreground' : 'text-subtle hover:text-secondary'
                }`}>
                {tab}
            </button>
        ))}
    </div>
)

export { TabBar }
