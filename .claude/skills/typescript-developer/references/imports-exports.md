# Import & Export Patterns

## Import Organization

```typescript
import type { FC } from 'react'
import type { Task } from '@/shared/domain'
```

**Pattern**: Type imports first, then value imports. Order: React types → libraries → internal types.

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
