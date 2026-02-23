type HotkeyGroup = {
    group: string
    entries: {
        key: string[]
        description: string
    }[]
}

const hotkeys: HotkeyGroup[] = [
    {
        group: 'Navigation',
        entries: [
            { key: ['q'], description: 'Exit' },
            { key: ['s'], description: 'Navigate to settings' },
            { key: ['Shift⇧ + L'], description: 'Change claude task list' },
            { key: ['Shift⇧ + M'], description: 'Switch to latest list created' },
            { key: ['1'], description: 'Focus task list' },
            { key: ['2'], description: 'Focus task details' },
            { key: ['3'], description: 'Focus task blocks' },
            { key: ['4'], description: 'Focus task blocked by' },
        ],
    },
    {
        group: 'View',
        entries: [
            { key: ['/', 'Space'], description: 'Toggle task details pane' },
            { key: ['h'], description: 'Toggle horizontal / vertical layout' },
            { key: ['p'], description: 'Toggle progress display' },
            { key: ['w', 'Shift⇧ + W'], description: 'Cycle themes forward / backward' },
        ],
    },
    {
        group: 'Search',
        entries: [{ key: [':'], description: 'Search tasks' }],
    },
    {
        group: 'Sort',
        entries: [
            { key: ['Shift⇧ + I'], description: 'Sort by task ID' },
            { key: ['Shift⇧ + T'], description: 'Sort by title' },
            { key: ['Shift⇧ + S'], description: 'Sort by status' },
            { key: ['Shift⇧ + D'], description: 'Sort by date' },
        ],
    },
    {
        group: 'Filter',
        entries: [{ key: ['Shift⇧ + F'], description: 'Filter by status (All → Pending → In Progress → Completed)' }],
    },
]

export { hotkeys }
