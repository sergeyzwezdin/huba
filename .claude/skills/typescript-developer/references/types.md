# Type Definition Patterns

## Type-Only Imports

```typescript
import type { FC } from 'react'
import type { Task } from '@/shared/domain'
import type { RouteParams, RouterContextValue } from './types'
```

**Pattern**: Use `import type` exclusively for type-only imports. Enables better tree-shaking and makes dependency graph clearer.

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