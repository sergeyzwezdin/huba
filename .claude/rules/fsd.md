---
paths:
  - '**/src/**'
---

# Feature-Sliced Design (FSD) Best Practices

Follow Feature-Sliced Design architecture for scalable, maintainable code organization.

## Layer Hierarchy (Bottom to Top)

```
app/         — Application initialization, providers, entry point
  ├─ pages/      — Complete screens, route-level components
  ├─ widgets/    — Composite UI blocks, page sections
  ├─ features/   — User interactions, business features
  ├─ entities/   — Business entities, domain models
  └─ shared/     — Reusable code, no business logic
```

### Import Rules

**Strict downward dependency:**
- Upper layers can import from lower layers
- Lower layers **cannot** import from upper layers
- `app → pages → widgets → features → entities → shared`

**Cross-slice imports (same layer):**
- Allowed selectively when needed
- Document cross-dependencies in comments
- Prefer composition or shared layer over tight coupling
- Import only through public API (index.ts)

**External libraries:**
- Can be imported from any layer

```typescript
// ✅ GOOD: Upper layer imports lower layer
// src/pages/task-list/ui/task-list-page.tsx
import { TaskTable } from '@/widgets/task-table';
import { useTaskFilter } from '@/features/task-filtering';
import type { Task } from '@/entities/task';

// ✅ GOOD: Cross-slice import with public API
// src/features/task-filtering/model/use-task-filter.ts
import { useProjectFilter } from '@/features/project-filtering'; // cross-feature dependency

// ❌ BAD: Lower layer imports upper layer
// src/entities/task/model/types.ts
import { TaskTable } from '@/widgets/task-table'; // entities can't import widgets

// ❌ BAD: Imports internal segment directly
import { TaskTableInternal } from '@/widgets/task-table/ui/task-table-internal';
// Use: import { TaskTable } from '@/widgets/task-table';
```

## Layer Purposes

### `app/` — Application Layer
- **Purpose**: Application-wide setup and initialization
- **Contains**:
  - Entry point (index.tsx, main.tsx)
  - Global providers (QueryClientProvider, theme providers)
  - Router setup
  - Global error boundaries
  - App-level hooks (useApp, useStdin, useStdout)
- **Rules**:
  - Can import from all layers
  - No business logic
  - Minimal UI - mostly providers and wrappers

```typescript
// src/app/index.tsx
import { QueryClientProvider } from '@tanstack/react-query';
import { TaskListPage } from '@/pages/task-list';

const App: FC = () => (
  <QueryClientProvider client={queryClient}>
    <TaskListPage />
  </QueryClientProvider>
);
```

### `pages/` — Page Layer
- **Purpose**: Complete screens/routes, orchestrate widgets
- **Contains**:
  - Full page components
  - Page-level layout
  - Route-specific logic
  - Page-level state coordination
- **Rules**:
  - One page per route/screen
  - Compose widgets and features
  - Minimal logic - delegate to widgets/features
  - No reusable UI (extract to widgets)

```typescript
// src/pages/task-list/ui/task-list-page.tsx
import { Box } from 'ink';
import { TaskTable } from '@/widgets/task-table';
import { TaskFilter } from '@/widgets/task-filter';

const TaskListPage: FC = () => (
  <Box flexDirection="column">
    <TaskFilter />
    <TaskTable />
  </Box>
);
```

### `widgets/` — Widget Layer
- **Purpose**: Composite UI blocks, autonomous page sections
- **Contains**:
  - Multi-feature UI compositions
  - Complex reusable components
  - Widget-specific state
  - Integration of features + entities
- **Rules**:
  - Self-contained (can work independently)
  - Compose features + entities
  - Reusable across pages
  - Can have internal sub-components

```typescript
// src/widgets/task-table/index.ts
export { TaskTable } from './ui/task-table';
export type { TaskTableProps } from './model/types';

// src/widgets/task-table/ui/task-table.tsx
import { Box } from 'ink';
import { TaskRow } from '@/entities/task';
import { useTaskSelection } from '@/features/task-selection';
import { useTasksQuery } from '@/shared/api/tasks';

const TaskTable: FC = () => {
  const { selected, select } = useTaskSelection();
  const { data: tasks } = useTasksQuery();

  return (
    <Box flexDirection="column">
      {tasks?.map(task => (
        <TaskRow
          key={task.id}
          task={task}
          selected={selected === task.id}
          onSelect={select}
        />
      ))}
    </Box>
  );
};
```

### `features/` — Feature Layer
- **Purpose**: User interactions, business features
- **Contains**:
  - User actions (filtering, sorting, selection)
  - Feature-specific hooks
  - Feature UI (buttons, inputs for actions)
  - Feature state management
- **Rules**:
  - Focused on single feature/interaction
  - Stateful logic lives here
  - Can use entities
  - Features should be as independent as possible

```typescript
// src/features/task-filtering/index.ts
export { TaskFilterInput } from './ui/task-filter-input';
export { useTaskFilter } from './model/use-task-filter';

// src/features/task-filtering/model/use-task-filter.ts
import { useMemo, useState } from 'react';
import type { Task } from '@/entities/task';

export const useTaskFilter = (tasks: Task[]) => {
  const [filter, setFilter] = useState('');
  const filtered = useMemo(
    () => tasks.filter(t => t.subject.toLowerCase().includes(filter.toLowerCase())),
    [tasks, filter]
  );

  return { filtered, filter, setFilter };
};
```

### `entities/` — Entity Layer
- **Purpose**: Business entities and domain models
- **Contains**:
  - Domain types (Task, Project)
  - Entity-specific UI (TaskRow, ProjectBadge)
  - Entity utilities (task validation, parsing)
  - Entity constants (statuses, defaults)
- **Rules**:
  - Represents business domain
  - No feature-specific logic
  - Reusable across features
  - Pure functions preferred

```typescript
// src/entities/task/index.ts
export type { Task, TaskStatus } from './model/types';
export { TaskRow } from './ui/task-row';
export { parseTaskFile, isValidTask } from './lib/task-utils';

// src/entities/task/model/types.ts
export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export type Task = {
  id: string;
  subject: string;
  description: string;
  status: TaskStatus;
  owner?: string;
  blocks: string[];
  blockedBy: string[];
  metadata: Record<string, unknown>;
};

// src/entities/task/ui/task-row.tsx
import { Box, Text } from 'ink';
import type { FC } from 'react';
import type { Task } from '../model/types';

type TaskRowProps = {
  task: Task;
  selected: boolean;
};

const TaskRow: FC<TaskRowProps> = ({ task, selected }) => (
  <Box>
    <Text color={selected ? 'blue' : undefined}>
      {task.subject}
    </Text>
  </Box>
);

export { TaskRow };
```

### `shared/` — Shared Layer
- **Purpose**: Reusable code with no business logic
- **Contains**:
  - UI primitives (Button, Input, Spinner)
  - Generic utilities (date formatting, file I/O)
  - API/query setup (TanStack Query, file system queries)
  - Common types (Nullable, AsyncState)
  - Constants (colors, paths)
- **Rules**:
  - No business logic
  - No knowledge of entities/features
  - Highly reusable
  - Could be extracted to separate package

**Shared segments:**
- `shared/ui/` — Base components (Button, Spinner, ErrorMessage)
- `shared/lib/` — Utilities (formatDate, debounce, file I/O)
- `shared/api/` — API setup (queryClient, file system watchers)
- `shared/types/` — Common types
- `shared/config/` — Configuration (paths, env vars)

```typescript
// src/shared/ui/spinner/spinner.tsx
import { Box, Text } from 'ink';
import type { FC } from 'react';

type SpinnerProps = {
  text: string;
};

const Spinner: FC<SpinnerProps> = ({ text }) => (
  <Box>
    <Text>
      <Text color="blue">⠋</Text> {text}
    </Text>
  </Box>
);

export { Spinner };

// src/shared/lib/file/read-json.ts
import fs from 'node:fs/promises';

export const readJsonFile = async <T>(path: string): Promise<T> => {
  const content = await fs.readFile(path, 'utf-8');
  return JSON.parse(content);
};

// src/shared/api/query-client.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, retry: 1 },
  },
});
```

## Slice Structure

Each slice (except `app` and `shared`) follows this structure:

```
feature-name/
├── index.ts                    # Public API (required)
├── ui/                         # React components
│   ├── component-name.tsx
│   └── component-name.test.tsx
├── model/                      # Business logic
│   ├── types.ts
│   ├── use-feature.ts          # Custom hooks
│   ├── feature.atom.ts         # Jotai atoms
│   └── feature.query.ts        # TanStack Query queries
└── lib/                        # Slice-specific utilities
    └── helpers.ts
```

### Segments

**`ui/` — UI Components**
- React components
- Presentational logic
- Ink-specific rendering
- Co-located tests

**`model/` — Business Logic**
- Types
- Custom hooks
- State management:
  - Jotai atoms (`*.atom.ts`): `mode.atom.ts`, `active-task.atom.ts`
  - TanStack Query queries (`*.query.ts`): `tasks.query.ts`, `folders.query.ts`
- Domain logic

**`lib/` — Utilities**
- Helper functions specific to this slice
- Calculations, transformations
- Pure functions preferred

**When NOT to create a segment:**
- Don't create empty segments
- Simple slices may only have `ui/` and `index.ts`
- Extract segments as complexity grows

## Public API (index.ts)

Every slice must export a public API through `index.ts`.

**Segment-based exports (preferred):**

```typescript
// src/features/task-filtering/index.ts

// From ui segment
export { TaskFilterInput } from './ui/task-filter-input';

// From model segment
export { useTaskFilter } from './model/use-task-filter';
export { filterAtom } from './model/filter.atom';
export type { TaskFilterState } from './model/types';

// From lib segment
export { matchesFilter } from './lib/filter-helpers';
```

**Rules:**
- Export only public interface
- Don't export internals (sub-components, helpers)
- Group exports by segment with comments
- Export types separately with `export type`
- Use named exports (no default exports)

## Path Aliases

Use `@` for absolute imports from `src/`:

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

// Usage
import type { Task } from '@/entities/task';
import { useTaskFilter } from '@/features/task-filtering';
import { Button } from '@/shared/ui/button';
```

## Naming Conventions

**Slices:** kebab-case
- `task-filtering`, `task-table`, `project-badge`

**Components:** PascalCase
- `TaskFilterInput`, `TaskTable`, `ProjectBadge`

**Hooks:** camelCase with `use` prefix
- `useTaskFilter`, `useFileWatcher`, `useProjectList`

**Types:** PascalCase
- `Task`, `Project`, `TaskStatus`

**Files:** kebab-case, match export name
- `task-table.tsx` exports `TaskTable`
- `use-task-filter.ts` exports `useTaskFilter`
- `tasks.query.ts` exports `useTasksQuery`, `useTaskQuery`
- `mode.atom.ts` exports `modeAtom`, `useModeAtom`
- `types.ts` for multiple type exports

## Common Patterns

### Feature + Entity Composition

```typescript
// Feature uses entity
// src/features/task-selection/ui/task-selector.tsx
import { useState } from 'react';
import type { FC } from 'react';
import { TaskRow } from '@/entities/task';
import type { Task } from '@/entities/task';

type TaskSelectorProps = {
  tasks: Task[];
};

const TaskSelector: FC<TaskSelectorProps> = ({ tasks }) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      {tasks.map(task => (
        <TaskRow
          key={task.id}
          task={task}
          selected={selected === task.id}
          onSelect={setSelected}
        />
      ))}
    </>
  );
};

export { TaskSelector };
```

### Widget Orchestration

```typescript
// Widget composes features + entities
// src/widgets/task-management/ui/task-management.tsx
import type { FC } from 'react';
import { TaskList } from '@/entities/task';
import { TaskFilter, useTaskFilter } from '@/features/task-filtering';
import { TaskSort, useTaskSort } from '@/features/task-sorting';

const TaskManagement: FC = () => {
  const { filtered } = useTaskFilter();
  const { sorted } = useTaskSort(filtered);

  return (
    <>
      <TaskFilter />
      <TaskSort />
      <TaskList tasks={sorted} />
    </>
  );
};

export { TaskManagement };
```

### Cross-Slice Dependencies

When features depend on each other, document the relationship:

```typescript
// src/features/task-filtering/model/use-task-filter.ts
import type { Task } from '@/entities/task';
import { useProjectFilter } from '@/features/project-filtering'; // cross-feature dependency

/**
 * Task filtering with project context.
 * NOTE: Depends on project-filtering feature for project-level filtering.
 */
export const useTaskFilter = (tasks: Task[]) => {
  // Cross-feature dependency documented
  const { selectedProject } = useProjectFilter();
  // ... filter implementation
};
```

## Anti-Patterns

❌ **Upward imports**
```typescript
// entities/task/model/types.ts
import { TaskTable } from '@/widgets/task-table'; // ❌ entities can't import widgets
```

❌ **Business logic in shared**
```typescript
// shared/lib/task-utils.ts
export const calculateTaskPriority = (task: Task) => { // ❌ Task is entity
  // Business logic doesn't belong in shared
};
// Move to: entities/task/lib/
```

❌ **Importing internals**
```typescript
import { InternalHelper } from '@/features/task-filtering/lib/internal-helper';
// ❌ Not exported from index.ts
// Use: import through public API or move to shared
```

❌ **God slices**
```typescript
// features/tasks/ with 20+ files
// ❌ Too broad, split into:
// features/task-filtering/
// features/task-sorting/
// features/task-selection/
```

❌ **Shared with business logic**
```typescript
// shared/lib/task-validator.ts
// ❌ "task" is domain entity
// Move to: entities/task/lib/validator.ts
```

## Migration Strategy

When refactoring to FSD:

1. **Start with shared layer** - extract generic utilities
2. **Define entities** - identify domain models
3. **Extract features** - isolate user interactions
4. **Group into widgets** - composite UI blocks
5. **Create pages** - top-level orchestration
6. **Setup app layer** - providers and initialization

## References

- [Official FSD Documentation](https://feature-sliced.design/)
- [FSD Examples](https://github.com/feature-sliced/examples)
- Project CLAUDE.md for architecture overview
