# Core Patterns — Focus Management

The app uses a React Context-based focus system (`FocusProvider` + hooks). Tab navigation is handled automatically.

## Setup

Wrap the app once at the root:

```tsx
// src/app/providers.tsx
const Providers: FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <FocusProvider>{children}</FocusProvider>
  </QueryClientProvider>
)
```

## useFocus — Register a Focusable Component

```tsx
import { useFocus } from '@/shared/focus-manager'

const TaskTable: FC = () => {
  const { isFocused, ref } = useFocus({ id: 'task-table', autoFocus: true })

  useKeyboard((key) => {
    if (!isFocused) return  // Gate keyboard handling on focus
    // handle keys...
  })

  return <Panel focusable focused={isFocused} ref={ref} />
}
```

`useFocus` options:

| Option | Default | Description |
|--------|---------|-------------|
| `id` | random | Stable ID for programmatic focus |
| `autoFocus` | `false` | Focus when mounted (only if nothing else is focused) |
| `isActive` | `true` | When `false`, removes from Tab cycle without unmounting |

## useFocusManager — Programmatic Control

```tsx
import { useFocusManager } from '@/shared/focus-manager'

const TaskDetails: FC = () => {
  const { isFocused, ref } = useFocus({ id: 'task-details' })
  const { focus, disableTabButton, enableTabButton } = useFocusManager()

  useKeyboard((key) => {
    if (!isFocused) return
    if (key.name === 'escape') focus('task-table')  // Jump by ID
  })

  // Disable Tab while in expanded mode
  useEffect(() => {
    if (isFocused && expanded) disableTabButton()
    else enableTabButton()
  }, [isFocused, expanded])
}
```

`useFocusManager` API:

| Method | Description |
|--------|-------------|
| `focus(id)` | Move focus to a specific element |
| `focusNext()` | Next active focusable (wraps around) |
| `focusPrevious()` | Previous active focusable (wraps around) |
| `enableFocus()` / `disableFocus()` | Enable/disable the entire focus system |
| `enableTabButton()` / `disableTabButton()` | Enable/disable Tab cycling (e.g. inside a modal) |

**Tab/Shift+Tab** call `focusNext`/`focusPrevious` automatically — no manual wiring needed.

## Focus in Core (Imperative)

```typescript
input.focus()         // Focus a renderable
input.blur()          // Remove focus
input.isFocused()     // Check state

// Focus a nested element by ID
container.getRenderable("input-id")?.focus()
```
