# FSD: Layer Hierarchy & Import Rules

## Layer Stack (Bottom to Top)

```
src/
├── app/         — Initialization, providers, entry point
├── pages/       — Complete screens, route-level components
├── widgets/     — Composite UI blocks, page sections
├── features/    — User interactions, business features
├── entities/    — Business entities, domain models
└── shared/      — Reusable code, no business logic
```

**Strict downward imports:** `app → pages → widgets → features → entities → shared`

Cross-slice imports (same layer) allowed selectively — import only through public API (index.ts).

```typescript
// ✅ GOOD
import { TaskTable } from '@/widgets/task-table';
import { useTaskFilter } from '@/features/task-filtering';
import type { Task } from '@/entities/task';

// ❌ BAD: lower layer imports upper layer
import { TaskTable } from '@/widgets/task-table'; // in entities/

// ❌ BAD: bypasses public API
import { TaskTableInternal } from '@/widgets/task-table/ui/task-table-internal';
```

## Layer Purposes

### `app/` — Application Layer
- Setup, global providers, entry point, app-level hooks
- Can import from all layers; no business logic; minimal UI

```typescript
// src/app/index.tsx
const App: FC = () => (
  <QueryClientProvider client={queryClient}>
    <TaskListPage />
  </QueryClientProvider>
);
```

### `pages/` — Page Layer
- Complete screens; orchestrate widgets
- One page per route; compose widgets/features; minimal logic; no reusable UI

```typescript
// src/pages/task-list/ui/task-list-page.tsx
const TaskListPage: FC = () => (
  <box style={{ flexDirection: 'column' }}>
    <TaskFilter />
    <TaskTable />
  </box>
);
```

### `widgets/` — Widget Layer
- Composite UI blocks; autonomous page sections
- Self-contained; compose features + entities; reusable across pages

```typescript
// src/widgets/task-table/ui/task-table.tsx
const TaskTable: FC = () => {
  const { selected, select } = useTaskSelection();
  const { data: tasks } = useTasksQuery();
  return (
    <box style={{ flexDirection: 'column' }}>
      {tasks?.map(task => (
        <TaskRow key={task.id} task={task} selected={selected === task.id} onSelect={select} />
      ))}
    </box>
  );
};
```

### `features/` — Feature Layer
- User interactions; feature-specific hooks, UI, state
- Focused on single feature; stateful logic lives here; features should be independent

```typescript
// src/features/task-filtering/model/use-task-filter.ts
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
- Domain types, entity-specific UI, entity utilities
- Represents business domain; no feature logic; pure functions preferred

```typescript
// src/entities/task/model/types.ts
export type TaskStatus = 'pending' | 'in_progress' | 'completed';
export type Task = {
  id: string; subject: string; description: string; status: TaskStatus;
  owner?: string; blocks: string[]; blockedBy: string[];
  metadata: Record<string, unknown>;
};
```

### `shared/` — Shared Layer
- Reusable primitives with no business logic
- No knowledge of entities/features; could be extracted to a package

**Shared segments:**
- `shared/ui/` — Base components (Panel, Spinner, ErrorMessage)
- `shared/lib/` — Utilities (formatDate, debounce, file I/O)
- `shared/api/` — API setup (queryClient, file system watchers)
- `shared/types/` — Common types
- `shared/config/` — Configuration (paths, env vars)
- `shared/domain/` — Domain models (Zod schemas and types)

#### `shared/ui` Structure

Each component lives in its own sub-folder. **No** barrel `shared/ui/index.ts`.

```
shared/ui/
├── panel/
│   ├── panel.tsx
│   └── index.ts      # export { Panel } from './panel'
└── spinner/
    ├── spinner.tsx
    └── index.ts
```

```typescript
import { Panel } from '@/shared/ui/panel'   // ✅
import { Panel } from '@/shared/ui'         // ❌ no barrel
```
