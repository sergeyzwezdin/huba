# Validation & Schema Patterns

Zod-first validation patterns for type-safe data handling.

## Schema-First Type Definition

```typescript
// src/shared/domain/task.ts
export const taskSchema = z.object({
    id: z.string(),
    subject: z.string(),
    description: z.string(),
    activeForm: z.string(),
    status: taskStatusSchema,
    owner: z.string().optional(),
    blocks: z.array(z.string()).optional(),
    blockedBy: z.array(z.string()).optional(),
    metadata: z.record(z.string(), z.unknown()).optional(),
})

export type Task = z.infer<typeof taskSchema>
```

**Pattern**: Define Zod schema first, export both schema and inferred type from domain files.

## Enum Schemas

```typescript
// src/shared/domain/task-status.ts
export const taskStatusSchema = z.enum(['pending', 'in_progress', 'completed'])
export type TaskStatus = z.infer<typeof taskStatusSchema>
```

**Pattern**: Use `z.enum()` for literal unions. Infer type automatically.

## Safe Parsing with Error Handling

```typescript
// src/shared/api/get-task.ts
const result = taskSchema.safeParse(data)

if (!result.success) {
    console.error(`Invalid task data in ${filePath}:`, result.error)
    return undefined
}

return result.data
```

**Pattern**: Always use `.safeParse()` with error handling. Never use `.parse()` directly (throws errors).

## Optional Fields

```typescript
owner: z.string().optional(),
blocks: z.array(z.string()).optional(),
metadata: z.record(z.string(), z.unknown()).optional(),
```

**Pattern**: Use `.optional()` for fields that may not exist in external data. Enables tolerant parsing.

## Array Validation with Type Guards

```typescript
// src/shared/api/get-task-list.ts
const result = await Promise.all(tasks.map((taskId) => getTask(taskId, listId)))
return result.filter((task): task is Task => !!task)
```

**Pattern**: Filter with type predicates (`task is Task`) to exclude undefineds and refine array types.

## Zod Error Context

```typescript
const result = taskListSchema.safeParse(rawData)
if (!result.success) {
    throw new Error(`Invalid task list data for ${entry.name}: ${result.error.message}`)
}
```

**Pattern**: Zod errors caught and re-thrown with additional context about what failed.

## Deprecated Methods to Avoid

**NEVER use these deprecated Zod methods:**

```typescript
// ❌ WRONG - deprecated methods
z.string().url()       // deprecated
z.string().email()       // deprecated

// ✅ CORRECT - use specific methods instead
z.url()  // for datetime strings (ISO 8601)
z.email()  // for URL strings

// ✅ CORRECT - add custom refinement if validation needed
z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid datetime format'
})
```

**Pattern**: Use plain `z.string()` instead of deprecated string validators. Add custom refinements only when validation is required.
