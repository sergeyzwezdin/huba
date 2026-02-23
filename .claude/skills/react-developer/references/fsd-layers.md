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
- Providers nested in dependency order: QueryClient → Jotai → watchers → KeyboardProvider → FocusProvider → DialogProvider

```typescript
// src/app/providers.tsx
const Providers: FC<PropsWithChildren> = ({ children }) => (
    <QueryClientProvider client={queryClient}>
        <JotaiProvider store={jotaiStore}>
            <FileWatcher>
                <KeyboardProvider>
                    <FocusProvider>
                        {children}
                    </FocusProvider>
                </KeyboardProvider>
            </FileWatcher>
        </JotaiProvider>
    </QueryClientProvider>
)
```

### `pages/` — Page Layer
- Complete screens; orchestrate widgets
- One page per route; compose widgets/features; minimal logic; no reusable UI
- Call page-level `useHotkeys()` (no args) to register page-wide keyboard shortcuts

```typescript
// src/pages/task-list/ui/task-list-page.tsx
const TaskListPage: FC = () => {
    const { width: columns, height: rows } = useTerminalDimensions()
    const showDetails = useAtomValue(showTaskDetailsAtom)

    useHotkeys() // page-level keyboard handler

    return (
        <RequiredWindowSize minWidth={80} minHeight={24}>
            <box style={{ flexDirection: 'row', flexGrow: 1 }}>
                <TaskTable />
                {showDetails && <TaskDetails />}
            </box>
        </RequiredWindowSize>
    )
}
```

### `widgets/` — Widget Layer
- Composite UI blocks; autonomous page sections
- Self-contained; compose features + entities; reusable across pages
- Each widget registers focus with `useFocus({ id })` and calls `useHotkeys(isFocused, ref)`

```typescript
// src/widgets/task-table/ui/task-table.tsx
const TaskTable: FC<TaskTableProps> = (props) => {
    const { isFocused, ref } = useFocus({ id: 'task-table', autoFocus: true })
    const { focus } = useFocusManager()
    const selectRef = useRef<TaskSelectRenderable>(null)
    const [selectedList] = useAtom(selectedListAtom)
    const { data: tasks } = useTasks(selectedList)

    useHotkeys(isFocused, selectRef) // widget-level keyboard handler

    return (
        <Panel
            focusable
            focused={isFocused}
            ref={ref}
            title={['[1]', 'Task List']}
            {...props}
            onMouseUp={() => focus('task-table')}>
            <TaskSelect ref={selectRef} options={tasks} />
        </Panel>
    )
}
```

### `features/` — Feature Layer
- User interactions; feature-specific hooks, UI, state
- Focused on single feature; stateful logic lives here; features should be independent

```typescript
// src/features/settings/ui/settings-panel.tsx
const SettingsPanel: FC = () => {
    const { theme, themeName, toggleTheme } = useTheme()
    return (
        <Panel title="Settings" style={{ width: 40 }}>
            <text fg={rgbToHex(theme.colors.primary)}>Theme: {themeName}</text>
        </Panel>
    )
}
```

### `entities/` — Entity Layer
- Domain types, entity-specific UI, entity utilities, entity-scoped queries/atoms
- Represents business domain; no feature logic; pure functions preferred
- Domain Zod schemas live in `shared/domain/`, entity-specific queries/atoms live in `entities/*/model/`

```typescript
// src/entities/task/model/tasks.query.ts
export const useTasks = (listId?: string) => {
    const query = useTasksQuery(listId)
    const filter = useAtomValue(taskFilterAtom)
    const sort = useAtomValue(taskSortAtom)
    // filter + sort applied here, returns { ...query, data: sortedTasks }
}
```

### `shared/` — Shared Layer
- Reusable primitives with no business logic
- No knowledge of entities/features; could be extracted to a package

**Shared segments:**
- `shared/ui/` — Base components (Panel, Spinner, RequiredWindowSize); each in its own sub-folder
- `shared/api/` — File system API functions (getTasks, getLists)
- `shared/state/` — `atomWithStorage` utility
- `shared/keyboard/` — `useKeyboard` wrapper (respects global enable/disable)
- `shared/focus-manager/` — `useFocus`, `useFocusManager`
- `shared/settings/` — `useTheme`, theme atoms
- `shared/theme/` — Theme definitions, `rgbToHex`
- `shared/domain/` — Zod schemas and inferred types (Task, TaskStatus, etc.)
- `shared/routing/` — Route atoms and navigation

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
