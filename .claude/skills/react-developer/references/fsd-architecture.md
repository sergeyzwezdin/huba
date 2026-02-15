# Feature-Sliced Design (FSD) Architecture

## Layer Hierarchy (Bottom to Top)

```
src/
├── app/         — Application initialization, providers, entry point
├── pages/       — Complete screens, route-level components
├── widgets/     — Composite UI blocks, page sections
├── features/    — User interactions, business features
├── entities/    — Business entities, domain models
└── shared/      — Reusable code, no business logic
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
import { TaskTable } from '@/widgets/task-table';
import { useTaskFilter } from '@/features/task-filtering';
import type { Task } from '@/entities/task';

// ✅ GOOD: Cross-slice import with public API
import { useProjectFilter } from '@/features/project-filtering';

// ❌ BAD: Lower layer imports upper layer
import { TaskTable } from '@/widgets/task-table'; // in entities/

// ❌ BAD: Imports internal segment directly
import { TaskTableInternal } from '@/widgets/task-table/ui/task-table-internal';
```

## Layer Purposes

### `app/` — Application Layer
- **Purpose**: Application-wide setup and initialization
- **Contains**: Entry point, global providers, router setup, global error boundaries, app-level hooks
- **Rules**: Can import from all layers, no business logic, minimal UI

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
- **Contains**: Full page components, page-level layout, route-specific logic, page-level state coordination
- **Rules**: One page per route/screen, compose widgets and features, minimal logic, no reusable UI

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
- **Contains**: Multi-feature UI compositions, complex reusable components, widget-specific state, integration of features + entities
- **Rules**: Self-contained, compose features + entities, reusable across pages, can have internal sub-components

```typescript
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
- **Contains**: User actions (filtering, sorting, selection), feature-specific hooks, feature UI, feature state management
- **Rules**: Focused on single feature/interaction, stateful logic lives here, can use entities, features should be independent

```typescript
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
- **Contains**: Domain types, entity-specific UI, entity utilities, entity constants
- **Rules**: Represents business domain, no feature-specific logic, reusable across features, pure functions preferred

```typescript
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
const TaskRow: FC<TaskRowProps> = ({ task, selected }) => (
  <Box>
    <Text color={selected ? 'blue' : undefined}>
      {task.subject}
    </Text>
  </Box>
);
```

### `shared/` — Shared Layer
- **Purpose**: Reusable code with no business logic
- **Contains**: UI primitives, generic utilities, API/query setup, common types, constants
- **Rules**: No business logic, no knowledge of entities/features, highly reusable, could be extracted to separate package

**Shared segments:**
- `shared/ui/` — Base components (Button, Spinner, ErrorMessage)
- `shared/lib/` — Utilities (formatDate, debounce, file I/O)
- `shared/api/` — API setup (queryClient, file system watchers)
- `shared/types/` — Common types
- `shared/config/` — Configuration (paths, env vars)
- `shared/domain/` — Domain models (Zod schemas and types)

```typescript
// src/shared/ui/spinner/spinner.tsx
const Spinner: FC<SpinnerProps> = ({ text }) => (
  <Box>
    <Text>
      <Text color="blue">⠋</Text> {text}
    </Text>
  </Box>
);

// src/shared/lib/file/read-json.ts
export const readJsonFile = async <T>(path: string): Promise<T> => {
  const content = await fs.readFile(path, 'utf-8');
  return JSON.parse(content);
};
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

**`ui/`** — React components, presentational logic, Ink rendering, co-located tests

**`model/`** — Types, custom hooks, state management (Jotai atoms: `*.atom.ts`, TanStack Query: `*.query.ts`), domain logic

**`lib/`** — Helper functions specific to this slice, calculations, transformations, pure functions preferred

**When NOT to create a segment:**
- Don't create empty segments
- Simple slices may only have `ui/` and `index.ts`
- Extract segments as complexity grows

## Public API (index.ts)

Every slice must export a public API through `index.ts`.

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
- Don't export internals
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

**Slices:** kebab-case (`task-filtering`, `task-table`)
**Components:** PascalCase (`TaskFilterInput`, `TaskTable`)
**Hooks:** camelCase with `use` prefix (`useTaskFilter`)
**Types:** PascalCase (`Task`, `TaskStatus`)
**Files:** kebab-case, match export name
- `task-table.tsx` exports `TaskTable`
- `use-task-filter.ts` exports `useTaskFilter`
- `tasks.query.ts` exports `useTasksQuery`, `useTaskQuery`
- `mode.atom.ts` exports `modeAtom`, `useModeAtom`

## Common Patterns

### Feature + Entity Composition

```typescript
// Feature uses entity
import { useState } from 'react';
import { TaskRow } from '@/entities/task';
import type { Task } from '@/entities/task';

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
```

### Widget Orchestration

```typescript
// Widget composes features + entities
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
  const { selectedProject } = useProjectFilter();
  // ... filter implementation
};
```

## Anti-Patterns

❌ **Upward imports**: entities importing widgets
❌ **Business logic in shared**: Task-specific utilities in shared/
❌ **Importing internals**: Bypassing public API (index.ts)
❌ **God slices**: Feature with 20+ files (split into smaller features)
❌ **Shared with business logic**: Shared code knowing about domain entities

## Migration Strategy

1. **Start with shared layer** - extract generic utilities
2. **Define entities** - identify domain models
3. **Extract features** - isolate user interactions
4. **Group into widgets** - composite UI blocks
5. **Create pages** - top-level orchestration
6. **Setup app layer** - providers and initialization
