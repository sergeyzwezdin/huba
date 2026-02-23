# FSD: Composition Patterns & Anti-Patterns

## Common Patterns

### Feature + Entity Composition

```typescript
// Feature uses entity types and UI
import { TaskRow } from '@/entities/task';
import type { Task } from '@/entities/task';

const TaskSelector: FC<TaskSelectorProps> = ({ tasks }) => {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <>
      {tasks.map(task => (
        <TaskRow key={task.id} task={task} selected={selected === task.id} onSelect={setSelected} />
      ))}
    </>
  );
};
```

### Widget Orchestration

```typescript
// Widget composes multiple features + entities
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
import { useProjectFilter } from '@/features/project-filtering'; // cross-feature dependency

/**
 * Task filtering with project context.
 * NOTE: Depends on project-filtering feature for project-level filtering.
 */
export const useTaskFilter = (tasks: Task[]) => {
  const { selectedProject } = useProjectFilter();
  // filter implementation
};
```

## Anti-Patterns

❌ **Upward imports** — entities importing widgets
❌ **Business logic in shared** — task-specific utilities in `shared/`
❌ **Importing internals** — bypassing public API (index.ts)
❌ **God slices** — feature with 20+ files (split into smaller features)
❌ **Cross-layer skip** — pages importing directly from entities/shared (always go through widgets/features when they exist)

## Migration Strategy

When introducing FSD into an existing codebase:

1. **Start with shared** — extract generic utilities
2. **Define entities** — identify domain models
3. **Extract features** — isolate user interactions
4. **Group into widgets** — composite UI blocks
5. **Create pages** — top-level orchestration
6. **Setup app layer** — providers and initialization
