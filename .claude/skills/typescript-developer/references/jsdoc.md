# JSDoc Documentation

TypeDoc-compatible documentation standards.

## Contents

- [Function Documentation](#function-documentation)
- [Schema Documentation](#schema-documentation)
- [Type Documentation](#type-documentation)
- [Component Documentation](#component-documentation)
- [Hook Documentation](#hook-documentation)
- [Required Tags](#required-tags-typedoc-compatible-only)
- [Documentation Coverage](#documentation-coverage)

## Function Documentation

```typescript
/**
 * Read and parse a single task file
 * Returns undefined if file is invalid or doesn't exist
 *
 * @param taskId - Task identifier (filename without .json extension)
 * @param listId - Optional list ID (defaults to CLAUDE_CODE_TASK_LIST_ID env var or 'default')
 * @returns Task object or undefined
 */
export const getTask = async (taskId: string, listId?: string): Promise<Task | undefined> => {
    // Implementation
}
```

**Pattern**: Brief description, parameter details with hyphens, explicit return documentation.

## Schema Documentation

```typescript
/**
 * Task object schema
 * Corresponds to JSON files in ~/.claude/tasks/{list-id}/*.json
 */
export const taskSchema = z.object({
    /**
     * Task identifier (matches filename without .json extension)
     * @example "1", "2", "setup-auth"
     */
    id: z.string(),

    /**
     * Task title displayed in UI
     * @example "Fix authentication bug"
     */
    subject: z.string(),
})
```

**Pattern**: Schema-level and field-level documentation. Use `@example` for clarity.

## Type Documentation

```typescript
/**
 * User authentication parameters
 * Used for login and registration flows
 */
type AuthParams = {
    /** User email address */
    email: string
    /** User password (min 8 characters) */
    password: string
    /** Optional remember me flag */
    rememberMe?: boolean
}
```

**Pattern**: Type description, then brief field descriptions. Constraints in field docs.

## Component Documentation

```typescript
/**
 * Single task row component
 * Displays task ID, status icon, status label, and title
 *
 * @param props - Component props
 * @param props.task - Task object to display
 * @param props.isSelected - Whether row is currently selected
 */
const TaskRow: FC<TaskRowProps> = ({ task, isSelected }) => {
    // Implementation
}
```

**Pattern**: Component purpose, visual output description, destructured prop documentation.

## Hook Documentation

```typescript
/**
 * Hook to enable keyboard navigation through tasks
 * Handles arrow up/down keys to move selection
 * Side effect: Updates global selected index atom
 *
 * @param taskCount - Total number of tasks in the list
 */
export const useTaskNavigation = (taskCount: number): void => {
    // Implementation
}
```

**Pattern**: Hook purpose, behavior description, side effects, parameter details.

## Required Tags (TypeDoc-compatible only)

Use these tags:
- `@param` - Parameter description
- `@returns` - Return value description
- `@example` - Usage example
- `@throws` - Exception description (rare)
- `@deprecated` - Mark deprecated APIs

**Do NOT use**:
- `@author`, `@version`, `@since` - Maintained in git
- `@see` - Use markdown links instead
- JSDoc-specific tags not supported by TypeDoc

## Documentation Coverage

Document all public APIs:
- ✅ Exported functions
- ✅ Exported types and interfaces
- ✅ Exported classes and methods
- ✅ Public component props
- ✅ Hook parameters and behavior

Do NOT document:
- ❌ Private/internal functions
- ❌ Implementation details
- ❌ Obvious getters/setters
- ❌ Self-explanatory utilities
