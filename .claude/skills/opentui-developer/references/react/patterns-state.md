# React Patterns — State Management

This project uses **Jotai** for app state and **TanStack Query** for file system data.
Do not use `useState`/`useReducer` for shared or persistent state.

## Jotai Atoms

### Persistent Atoms (survive navigation)

Use `atomWithStorage` from `@/shared/state` for atoms that should persist across sessions:

```ts
// src/entities/task/model/tasks-filter.atom.ts
import { atomWithStorage } from '@/shared/state'

export type TaskFilter = {
    status: 'all' | 'pending' | 'in_progress' | 'completed'
    search: string
}

export const taskFilterAtom = atomWithStorage<TaskFilter>('filter', {
    status: 'all',
    search: '',
})
```

Backed by `~/.claude-tasks/settings.json` using a synchronous file store.

### Transient Atoms

For state that resets on navigation, use plain `atom` from `jotai`:

```ts
import { atom } from 'jotai'

export const selectedTaskIdAtom = atom<string | undefined>(undefined)
```

### Derived Atoms

```ts
import { atom } from 'jotai'
import { themes } from '@/shared/theme'

export const activeThemeAtom = atomWithStorage<ThemeName>('theme', 'claude')
// Derived: auto-updates when activeThemeAtom changes
export const themeAtom = atom<Theme>((get) => themes[get(activeThemeAtom)] ?? themes['claude'])
```

### Consuming Atoms in Components

```tsx
import { useAtom, useAtomValue, useSetAtom } from 'jotai'

const MyComponent: FC = () => {
    const filter = useAtomValue(taskFilterAtom)      // read-only
    const setFilter = useSetAtom(taskFilterAtom)     // write-only
    const [sort, setSort] = useAtom(taskSortAtom)    // read + write

    setFilter((prev) => ({ ...prev, search: 'new' })) // functional update
}
```

## TanStack Query

### Query Client Setup

```ts
// src/shared/state/query-client.ts
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30_000,
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
})
```

### Query Keys

```ts
// src/shared/state/query-keys.ts
export const queryKeys = {
    tasks: {
        list: (listId?: string) => ['tasks', listId ?? 'default'] as const,
    },
    taskLists: {
        all: () => ['task-lists'] as const,
    },
} as const
```

### Layered Query Pattern

Queries are layered: base query → filtered/sorted wrapper → derived selectors:

```ts
// Base query (internal)
const useTasksQuery = (listId?: string) => {
    return useQuery({
        queryKey: queryKeys.tasks.list(listId),
        queryFn: () => getTasks(listId),
    })
}

// Public hook: applies Jotai filter/sort atoms on top of query data
export const useTasks = (listId?: string) => {
    const query = useTasksQuery(listId)
    const sort = useAtomValue(taskSortAtom)
    const filter = useAtomValue(taskFilterAtom)

    const filtered = useMemo(() => {
        return (query.data?.list ?? []).filter((task) => {
            const statusMatch = filter.status === 'all' || task.status === filter.status
            const searchMatch = !filter.search || task.subject.toLowerCase().includes(filter.search.toLowerCase())
            return statusMatch && searchMatch
        })
    }, [query.data, filter])

    const sorted = useMemo(() => {
        return [...filtered].sort((a, b) => {
            const dir = sort.direction === 'asc' ? 1 : -1
            if (sort.field === 'id') return (Number(a.id) - Number(b.id)) * dir
            return a.subject.localeCompare(b.subject) * dir
        })
    }, [filtered, sort])

    return { ...query, data: sorted }
}

// Derived selector
export const useSelectedTask = (listId?: string): Task | undefined => {
    const selectedId = useAtomValue(selectedTaskIdAtom)
    const { data } = useTasksQuery(listId)
    return selectedId !== undefined ? data?.map[selectedId] : undefined
}
```

### Cache Invalidation (from file watchers)

```ts
// Invalidate query cache when file watcher detects changes
queryClient.invalidateQueries({ queryKey: queryKeys.tasks.list(listId) })
```

## Local Component State

Use `useState` only for transient UI state that is truly local to one component:

```tsx
const [isExpanded, setIsExpanded] = useState(false)
const [inputValue, setInputValue] = useState('')
```
