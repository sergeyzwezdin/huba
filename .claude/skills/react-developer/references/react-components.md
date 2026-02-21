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

## forwardRef — Renderer Refs

Use when a parent needs direct access to a renderable (e.g., to call `handleKeyPress`):

```typescript
type TaskSelectProps = { options: TaskSelectOption[]; selectedItem?: string }

const TaskSelect = forwardRef<TaskSelectRenderable, TaskSelectProps>((props, ref) => {
    const { theme } = useTheme()
    return <task-select {...props} theme={theme} ref={ref} />
})
TaskSelect.displayName = 'TaskSelect'

export { TaskSelect }
```

Parent usage:
```typescript
const selectRef = useRef<TaskSelectRenderable>(null)
// ...
selectRef.current?.handleKeyPress(key)
// ...
<TaskSelect ref={selectRef} options={options} />
```

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
| Shared (read-only) | `useAtomValue(atom)` | `model/*.atom.ts` |
| Shared (write-only) | `useSetAtom(atom)` | `model/*.atom.ts` |
| Shared (read+write) | `useAtom(atom)` | `model/*.atom.ts` |
| Persistent across sessions | `atomWithStorage` from `@/shared/state` | `model/*.atom.ts` |
| Server/async data | TanStack Query | `model/*.query.ts` or `shared/api/` |
| Derived | Compute in render or `useMemo` if expensive | — |

```typescript
// Local
const [selected, setSelected] = useState<string | undefined>(undefined)
// Shared — prefer specific hooks over useAtom when possible
const fullScreen = useAtomValue(fullScreenAtom)          // read-only
const setShowDetails = useSetAtom(showDetailsAtom)       // write-only
const [filter, setFilter] = useAtom(filterAtom)          // read+write
// Persistent atom (survives navigation, written to settings.json)
export const taskFilterAtom = atomWithStorage<TaskFilter>('filter', { status: 'all', search: '' })
// Server
const { data, isLoading } = useQuery({ queryKey: ['tasks', listId], queryFn: () => getTasks(listId) })
// Derived (in render or useMemo)
const filteredTasks = tasks.filter(t => t.status === 'pending')
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
