# Functions & Types Patterns

Type-safe function and type definition patterns.

## Type Definition Patterns

### Type-Only Imports

```typescript
import type { FC } from 'react'
import type { Task } from '@/shared/domain'
import type { RouteParams, RouterContextValue } from './types'
```

**Pattern**: Use `import type` exclusively for type-only imports. Enables better tree-shaking and makes dependency graph clearer.

### Props Types for Components

```typescript
type TaskRowProps = {
    task: Task
    isSelected: boolean
}

const TaskRow: FC<TaskRowProps> = ({ task, isSelected }) => {
    // Implementation
}

export { TaskRow }
export type { TaskRowProps }
```

**Pattern**: Define props as separate type object. Export both component and props type. Use descriptive suffix (`ComponentNameProps`).

### Function Parameter Types

```typescript
type CreateUserParams = {
    name: string
    email: string
    role?: string
}

export const createUser = async (params: CreateUserParams): Promise<User | undefined> => {
    const { name, email, role = 'user' } = params
    // Implementation
}
```

**Pattern**: For functions with multiple parameters, use RO-RO pattern (receive object, return object). Define dedicated params type.

## Function Patterns

### Arrow Functions with Explicit Types

```typescript
// src/shared/api/paths.ts
export const getClaudeDir = (): string => {
    return join(homedir(), '.claude')
}

export const getTasksDir = (listId?: string): string => {
    const id = listId ?? process.env.CLAUDE_CODE_TASK_LIST_ID ?? 'default'
    return join(getTasksBaseDir(), id)
}
```

**Pattern**: All functions are arrow functions. Return types always explicit. Use `??` for undefined coalescing defaults.

### Async Functions with Error Handling

```typescript
// src/shared/api/get-task.ts
export const getTask = async (taskId: string, listId?: string): Promise<Task | undefined> => {
    const dirPath = getTasksDir(listId)
    const filePath = join(dirPath, `${taskId}.json`)

    try {
        const content = await readFile(filePath, 'utf-8')
        const data = JSON.parse(content)
        const result = taskSchema.safeParse(data)

        if (!result.success) {
            console.error(`Invalid task data in ${filePath}:`, result.error)
            return undefined
        }

        return result.data
    } catch (error) {
        console.error(`Error reading task file ${filePath}:`, error)
        return undefined
    }
}
```

**Pattern**: Async APIs return `Promise<T | undefined>` for graceful degradation. Errors caught and logged; functions never throw.

### Single-Purpose Utility Functions

```typescript
// src/shared/formatters/date-time.ts
const dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
})

export const formatDateTime = (date: Date): string => {
    return dateTimeFormatter.format(date)
}
```

**Pattern**: Single-purpose functions with external state initialization. Explicit return types.

### React Hooks with Stable References

```typescript
// src/shared/routing/router.tsx
const push = useCallback((name: string, params?: RouteParams) => {
    setStack((prev) => [...prev, { name, params }])
}, [])

const value = useMemo<RouterContextValue>(
    () => ({
        push,
        back,
        replace,
        canGoBack: () => canGoBack,
        currentRoute,
    }),
    [push, back, replace, canGoBack, currentRoute],
)
```

**Pattern**: Stable callback references use `useCallback()`. Context values use `useMemo()` with explicit type annotations.

## Import/Export Patterns

### Import Organization

```typescript
// src/entities/task/ui/task-row.tsx
import type { FC } from 'react'
import { Box, Text } from 'ink'
import type { Task } from '@/shared/domain'
```

**Pattern**: Type imports first, then value imports. Order: React types → libraries → internal types.

### Absolute Path Imports

```typescript
import { TaskRow, useTasksQuery } from '@/entities/task'
import { useSelectedListId } from '@/features/list-selection'
import { useSelectedTaskIndex, useTaskNavigation } from '@/features/task-selection'
```

**Pattern**: All imports use `@/` prefix for absolute imports from `src/`. No relative paths.

### Barrel Exports (index.ts)

```typescript
// src/features/task-selection/index.ts
export { useSelectedTaskIndex } from './model/selection.atom'
export { useTaskNavigation } from './model/use-task-navigation'

// src/entities/task/index.ts
export { useTasksQuery } from './model/tasks.query'
export type { TaskRowProps } from './ui/task-row'
export { TaskRow } from './ui/task-row'
```

**Pattern**: Each module exports through `index.ts`. Type exports separate from value exports. No default exports.

### Public API Exports

```typescript
// src/shared/api/index.ts
export { getTask } from './get-task'
export { getTaskList } from './get-task-list'
export { getTaskLists } from './get-task-lists'
```

**Pattern**: Only public functions exported. Internal helpers remain private.
