# Import & Export Patterns

## Import Organization

```typescript
// 1. Node built-ins (node: prefix)
import { readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'

// 2. Third-party libraries
import { useQuery } from '@tanstack/react-query'
import type { FC } from 'react'

// 3. Internal — type imports then value imports
import type { Task } from '@/shared/domain'
import { taskSchema } from '@/shared/domain'
import { getTask } from '@/shared/api'
```

## Absolute Path Imports

```typescript
import { TaskRow, useTasksQuery } from '@/entities/task'
import { useSelectedListId } from '@/features/list-selection'
import { useSelectedTaskIndex, useTaskNavigation } from '@/features/task-selection'
```

**Pattern**: All imports use `@/` prefix for absolute imports from `src/`. No relative paths.

## Barrel Exports (index.ts)

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

## Public API Exports

```typescript
// src/shared/api/index.ts
export { getTask } from './get-task'
export { getTaskList } from './get-task-list'
export { getTaskLists } from './get-task-lists'
```

**Pattern**: Only public functions exported. Internal helpers remain private.
