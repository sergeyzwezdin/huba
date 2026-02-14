---
paths:
  - '**/src/*.tsx'
---

You are a senior React developer with a preference for clean programming and design patterns, following the best practices.

## Component Structure

### Component Definition
- Use arrow functions for all components: `const MyComponent: FC = () => {}`
- Export components as named exports (avoid default exports for better refactoring)
- Order: props type → component → exports

```typescript
type TaskListProps {
  tasks: Task[];
  onSelect: (id: string) => void;
}

const TaskList: FC<TaskListProps> = ({ tasks, onSelect }) => {
  // implementation
};

export { TaskList };
```

### Props Typing
- Define separate types for all component props
- Use descriptive names: `{ComponentName}Props`
- Prefer `type` over `interface` for props
- Use `FC` while defining react components
- Mark optional props explicitly with `?`

### Component Organization (within file)
1. Props type
3. Component definition
4. Sub-components (if small and tightly coupled)
2. Custom hooks (if co-located)
5. Exports

## Hooks

### Custom Hooks
- Extract custom hooks when logic is used 3+ times across components
- Be liberal with extraction for complex stateful logic (even if used once)
- Co-locate hooks within the same FSD feature/slice they're used in
- Name with `use` prefix: `useTaskFilter`, `useFileWatcher`
- Return objects for multiple values: `{ data, loading, error }` instead of arrays (unless order is semantically meaningful like `useState`)

```typescript
// src/features/task-filtering/model/use-task-filter.ts
const useTaskFilter = (tasks: Task[]) => {
  const [filter, setFilter] = useState('');
  const filtered = useMemo(
    () => tasks.filter(t => t.subject.includes(filter)),
    [tasks, filter]
  );

  return { filtered, filter, setFilter };
};
```

### Hook Rules
- Follow Rules of Hooks (no conditionals, no loops at top level)
- Dependencies: be explicit in dependency arrays (no exhaustive-deps violations)
- Use `useCallback` only when passing callbacks to memoized children (profile first)
- Use `useMemo` only for expensive computations (profile first)
- Use `useRef` for:
  - Values that don't trigger re-renders
  - DOM references
  - Storing previous values across renders

### State Management
- Local state: `useState` for component-only state
- Shared state: Jotai atoms for cross-component state
- Server state: TanStack Query for async data
- Derived state: compute during render or `useMemo` if expensive

```typescript
// Local
const [selected, setSelected] = useState<string | null>(null);

// Shared (Jotai)
const [tasks] = useAtom(tasksAtom);

// Server (TanStack Query)
const { data, isLoading } = useQuery({ ... });

// Derived
const filteredTasks = tasks.filter(t => t.status === 'pending');
```

## Performance

### Optimization Strategy
- **Profile before optimizing** - measure actual bottlenecks
- Use composition to avoid expensive renders:
  - Pass expensive components as `children` prop
  - Split components to isolate frequently updating parts
- Use `useRef` for values that don't affect rendering
- Avoid inline object/array creation in props (extract to constants or `useMemo` if proven slow)

```typescript
// BAD: creates new object on every render
<TaskList config={{ showCompleted: true }} />

// GOOD: stable reference
const CONFIG = { showCompleted: true };
<TaskList config={CONFIG} />

// GOOD: composition prevents re-render
const ExpensiveList = ({ children }) => {
  // expensive logic
  return <>{children}</>;
};

<ExpensiveList>
  <FrequentlyUpdatingComponent />
</ExpensiveList>
```

### When to use React.memo
- Only after profiling shows unnecessary re-renders
- For expensive components that receive stable props
- For list items in large lists
- Not needed for most components - composition is usually better

## TypeScript

### Strictness
- Enable strict mode in tsconfig.json
- No `any` - use `unknown` and narrow types
- No type assertions unless absolutely necessary (DOM APIs)
- Prefer union types over enums for string constants
- Use `as const` for literal type inference

```typescript
// BAD
const STATUSES = ['pending', 'completed'];
type Status = string;

// GOOD
const STATUSES = ['pending', 'completed'] as const;
type Status = typeof STATUSES[number]; // 'pending' | 'completed'
```

### Type Definitions
- Co-locate types with usage in FSD architecture
- Shared types go in `src/shared/types/`
- Entity types go in `src/entities/{entity}/model/types.ts`
- Export types from public API (index.ts)

## Error Handling

- Use error boundaries for component tree errors
- Handle async errors in TanStack Query (error states)
- Validate user input before state updates
- Log errors with context (component name, props)
- Graceful degradation - show error UI, don't crash

```typescript
const { data, error } = useQuery({
  queryKey: ['tasks'],
  queryFn: fetchTasks,
  retry: 3,
});

if (error) {
  return <ErrorMessage message="Failed to load tasks" />;
}
```

## Ink-Specific (CLI/TUI)

- Use `<Box>` for layout (flexbox model)
- Use `<Text>` for all text rendering
- Handle keyboard input with `useInput` hook
- Use `useApp` for exit control
- Focus management with `useFocus` and `useFocusManager`
- Avoid expensive re-renders (terminal re-draws are visible)
- Test TUI components with fixtures, not snapshots

```typescript
import { Box, Text, useInput } from 'ink';

const TaskItem = ({ task }: TaskItemProps) => {
  useInput((input, key) => {
    if (key.return) {
      onSelect(task.id);
    }
  });

  return (
    <Box>
      <Text>{task.subject}</Text>
    </Box>
  );
};
```

## Code Quality

- Prefer early returns over nested conditionals
- Extract magic numbers/strings to named constants
- Use descriptive variable names (no single letters except loop indices)


## Prohibited Patterns

- ❌ Class components (use functional components + hooks)
- ❌ `React` namespacing of any imports from `react`
- ❌ Default exports (use named exports)
- ❌ Prop drilling > 2 levels (use context or Jotai)
- ❌ `any` type (use `unknown` and narrow)
- ❌ Premature optimization (profile first)
- ❌ Side effects in render (use `useEffect`)
- ❌ Mutating props or state directly
- ❌ Index as key in lists (use stable IDs)
- ❌ Mixing concerns in components (extract hooks/sub-components)