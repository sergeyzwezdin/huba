# Type Definition Patterns

## Type vs Interface

**Always use `type`, never `interface`:**

```typescript
// ✅ CORRECT
type TaskRowProps = {
    task: Task
    isSelected: boolean
}

// ❌ WRONG
interface TaskRowProps {
    task: Task
    isSelected: boolean
}
```

**Pattern**: Use `type` for all type definitions including props, params, and domain types.

## Type-Only Imports

```typescript
import type { FC } from 'react'
import type { Task } from '@/shared/domain'
// No relative path imports — only @/ absolute paths
```

**Pattern**: Use `import type` exclusively for type-only imports. No relative imports — use `@/` aliases everywhere.

## Props Types for Components

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

**Pattern**: Define props as separate type object. Export both component and props type. Use `ComponentNameProps` suffix.

## Function Parameter Types (RO-RO)

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

**Pattern**: For functions with multiple parameters, use RO-RO (receive object, return object). Define a dedicated params type.

## Components with Refs (forwardRef)

```typescript
import { forwardRef } from 'react'
import type { ScrollBoxRenderable } from '@opentui/react'

type TaskDetailsViewProps = {
    task: Task
}

const TaskDetailsView = forwardRef<ScrollBoxRenderable, TaskDetailsViewProps>(
    ({ task }, ref) => {
        // Implementation
    }
)

export { TaskDetailsView, type TaskDetailsViewProps }
```

**Pattern**: Use `forwardRef<RefType, PropsType>` for components that expose imperative handles. Export both component and props type together at file end using named exports.