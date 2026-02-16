# React & Ink Patterns

## Component Structure

### Component Definition
- Use arrow functions: `const MyComponent: FC = () => {}`
- Export as named exports (no default exports)
- Order: props type → component → exports

```typescript
type TaskListProps = {
  tasks: Task[];
  onSelect: (id: string) => void;
};

const TaskList: FC<TaskListProps> = ({ tasks, onSelect }) => {
  // implementation
};

export { TaskList };
```

### Component Organization (within file)
1. Props type
2. Component definition
3. Sub-components (if small and tightly coupled)
4. Custom hooks (if co-located)
5. Exports

## Hooks

### Custom Hooks
- Extract when logic is used 3+ times across components
- Be liberal with extraction for complex stateful logic (even if used once)
- Co-locate hooks within the same FSD feature/slice
- Name with `use` prefix: `useTaskFilter`, `useFileWatcher`
- Return objects for multiple values: `{ data, loading, error }` (not arrays, unless order is semantically meaningful like `useState`)

```typescript
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
- Be explicit in dependency arrays (no exhaustive-deps violations)
- Use `useCallback` only when passing callbacks to memoized children (profile first)
- Use `useMemo` only for expensive computations (profile first)
- Use `useRef` for:
  - Values that don't trigger re-renders
  - DOM references
  - Storing previous values across renders

### State Management
- **Local state**: `useState` for component-only state
- **Shared state**: Jotai atoms for cross-component state
- **Server state**: TanStack Query for async data
- **Derived state**: compute during render or `useMemo` if expensive

```typescript
// Local
const [selected, setSelected] = useState<string | undefined>(undefined);

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

### Core Patterns
- Use `<Box>` for layout (flexbox model)
- Use `<Text>` for all text rendering
- Handle keyboard input with `useInput` hook
- Use `useApp` for exit control
- Focus management with `useFocus` and `useFocusManager`
- Avoid expensive re-renders (terminal re-draws are visible)
- Test TUI components with fixtures, not snapshots
- **When uncertain about Ink patterns**: Use Context7 to query Ink documentation for latest API details and best practices

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
- ❌ `React` namespacing of imports from `react`
- ❌ Default exports (use named exports)
- ❌ Prop drilling > 2 levels (use context or Jotai)
- ❌ Premature optimization (profile first)
- ❌ Side effects in render (use `useEffect`)
- ❌ Mutating props or state directly
- ❌ Index as key in lists (use stable IDs)
- ❌ Mixing concerns in components (extract hooks/sub-components)
- ❌ Generic `Props` as props type name — always use `{ComponentName}Props` (e.g. `TaskDetailsProps`, not `Props`)
