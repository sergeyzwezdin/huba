# React Patterns — Keyboard Navigation

## Project-Specific: useKeyboard from @/shared/keyboard

This project wraps OpenTUI's `useKeyboard` with a context that supports global enable/disable.
Always import from `@/shared/keyboard`, never directly from `@opentui/react`:

```tsx
import { useKeyboard } from '@/shared/keyboard'
```

This wrapper respects global hotkey enable/disable state (e.g., disabled during text input focus).

## Widget-Level Hotkeys Pattern

Each widget has `model/use-hotkeys.ts`. The hook gates on `visible` and `focused`:

```tsx
// src/widgets/task-table/model/use-hotkeys.ts
import { useKeyboard } from '@/shared/keyboard'
import { useFocusManager } from '@/shared/focus-manager'

const useHotkeys = (
    visible: boolean,
    focused: boolean,
    scrollRef: RefObject<SomeScrollableRenderable | null>,
): void => {
    const { focus } = useFocusManager()

    useKeyboard((key) => {
        if (!visible) return           // Not visible: ignore all
        if (key.name === '1') focus('task-table')  // Global navigation (no focus gate)

        if (!focused) return           // Not focused: ignore further
        if (key.name === 'up' || key.name === 'k') scrollRef.current?.scrollBy(-1)
        if (key.name === 'down' || key.name === 'j') scrollRef.current?.scrollBy(1)
        if (key.name === 'escape') {
            // handle escape
        }
    })
}
```

## Page-Level Hotkeys Pattern

Pages register app-wide shortcuts via `pages/*/model/use-hotkeys.ts`:

```tsx
// src/pages/task-list/model/use-hotkeys.ts
import { useKeyboard } from '@/shared/keyboard'
import { useAtom, useSetAtom } from 'jotai'

const useHotkeys = (): void => {
    const setShowDetails = useSetAtom(showTaskDetailsAtom)
    const { toggleTheme } = useTheme()

    useKeyboard((key) => {
        if (key.name === '/') setShowDetails((prev) => !prev)
        if (key.name === 'w' && !key.shift) toggleTheme(false)
        if (key.name === 'w' && key.shift) toggleTheme(true)
    })
}
```

Mount once at page level. Multiple `useKeyboard` hooks all receive events (no blocking).

## Disabling Hotkeys During Input

Use `disableGlobalHotkeys` / `enableGlobalHotkeys` from the same hook when entering text fields:

```tsx
import { useKeyboard } from '@/shared/keyboard'

const SearchInput: FC = () => {
    const { disableGlobalHotkeys, enableGlobalHotkeys } = useKeyboard()

    return (
        <input
            onFocus={disableGlobalHotkeys}
            onBlur={enableGlobalHotkeys}
            placeholder="Search..."
        />
    )
}
```

## Renderer Destroy

To quit the app, use `renderer.destroy()`, never `process.exit()`:

```tsx
const { destroy } = useRenderer()
useKeyboard((key) => {
    if (key.ctrl && key.name === 'c') destroy()
})
```

## Key Properties

```typescript
key.name     // 'up', 'down', 'return', 'escape', 'tab', 'space', 'a'-'z', '0'-'9', etc.
key.ctrl     // boolean
key.shift    // boolean
key.meta     // boolean
key.sequence // raw terminal sequence
```
