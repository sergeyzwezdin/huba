# Error Handling Patterns

Graceful error handling with type safety.

## Graceful Null Returns

```typescript
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
```

**Pattern**: API functions return `undefined` on errors instead of throwing. Errors logged with context.

## Type Guard Filtering

```typescript
const result = await Promise.all(tasks.map((taskId) => getTask(taskId, listId)))
return result.filter((task): task is Task => !!task)
```

**Pattern**: Filter with type predicates to exclude undefineds and refine types after Promise.all().

## Context Requirement Checks

```typescript
// src/shared/routing/hooks.ts
const useRouter = () => {
    const context = useContext(RouterContext)
    if (!context) throw new Error('useRouter must be used within RouterProvider')
    return context
}
```

**Pattern**: Hooks validate required context and throw meaningful errors if missing.

## When to Throw vs Return Null

**Return undefined**: Expected failures (file not found, validation failed, network error)
```typescript
export const getUser = async (id: string): Promise<User | undefined> => {
    try {
        const data = await fetch(`/users/${id}`)
        return userSchema.safeParse(data).data ?? undefined
    } catch {
        return undefined
    }
}
```

**Throw errors**: Unexpected errors (missing context, invariant violations, programmer errors)
```typescript
const useUser = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUser must be used within UserProvider')
    }
    return context
}
```
