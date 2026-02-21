# React: Components, Hooks & State

## Component Structure

```typescript
// Order: props type → component → exports
type TaskListProps = {
  tasks: Task[];
  onSelect: (id: string) => void;
};

const TaskList: FC<TaskListProps> = ({ tasks, onSelect }) => {
  // implementation
};

export { TaskList };
```

**Rules:**
- Arrow functions with `FC` type annotation
- Named exports only (no default exports)
- Props type named `{ComponentName}Props` — never generic `Props`
- Order within file: props type → component → sub-components → co-located hooks → exports

## Custom Hooks

- Extract when logic is used 3+ times, or when stateful logic is complex (even if used once)
- Name with `use` prefix: `useTaskFilter`, `useFileWatcher`
- Return objects for multiple values (not arrays, unless order is semantically meaningful like `useState`)
- Co-locate within the same FSD feature/slice

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

**Hook rules:**
- Follow Rules of Hooks (no conditionals, no loops at top level)
- Explicit dependency arrays (no suppressed exhaustive-deps)
- `useCallback` only when passing callbacks to memoized children — profile first
- `useMemo` only for expensive computations — profile first
- `useRef` for: values that don't trigger re-renders, DOM references, previous values

## State Management

| State type | Tool | Location |
|-----------|------|----------|
| Component-local | `useState` | Inside component |
| Shared cross-component | Jotai atom | `model/*.atom.ts` |
| Server/async data | TanStack Query | `model/*.query.ts` or `shared/api/` |
| Derived | Compute in render or `useMemo` if expensive | — |

```typescript
const [selected, setSelected] = useState<string | undefined>(undefined);  // local
const [tasks] = useAtom(tasksAtom);                                        // shared
const { data, isLoading } = useQuery({ ... });                             // server
const filteredTasks = tasks.filter(t => t.status === 'pending');           // derived
```

## Prohibited Patterns

- ❌ Class components
- ❌ `React` namespace imports (`React.FC`, `React.useState`)
- ❌ Default exports
- ❌ Prop drilling > 2 levels (use Jotai or context)
- ❌ Side effects in render (use `useEffect`)
- ❌ Mutating props or state directly
- ❌ Index as key in lists (use stable IDs)
- ❌ Mixing concerns in one component (extract hooks/sub-components)
