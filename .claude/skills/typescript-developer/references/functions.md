# Function Patterns

## Arrow Functions with Explicit Types

```typescript
export const getClaudeDir = (): string => {
    return join(homedir(), '.claude')
}

export const getTasksDir = (listId?: string): string => {
    const id = listId ?? process.env.CLAUDE_CODE_TASK_LIST_ID ?? 'default'
    return join(getTasksBaseDir(), id)
}
```

**Pattern**: All functions are arrow functions. Return types always explicit. Use `??` for undefined coalescing defaults.

## Async Functions

```typescript
export const getTask = async (taskId: string, listId?: string): Promise<Task | undefined> => {
    const filePath = join(getTasksDir(listId), `${taskId}.json`)

    try {
        const content = await readFile(filePath, 'utf-8')
        const result = taskSchema.safeParse(JSON.parse(content))

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

## Single-Purpose Utility Functions

```typescript
const dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false,
})

export const formatDateTime = (date: Date): string => {
    return dateTimeFormatter.format(date)
}
```

**Pattern**: Single-purpose functions with external state initialization. Explicit return types.

## React Hooks with Stable References

```typescript
const push = useCallback((name: string, params?: RouteParams) => {
    setStack((prev) => [...prev, { name, params }])
}, [])

const value = useMemo<RouterContextValue>(
    () => ({ push, back, replace, canGoBack: () => canGoBack, currentRoute }),
    [push, back, replace, canGoBack, currentRoute],
)
```

**Pattern**: Stable callback references use `useCallback()`. Context values use `useMemo()` with explicit type annotations.
