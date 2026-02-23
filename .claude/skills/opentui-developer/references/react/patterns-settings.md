# React Patterns — Settings Management

Settings are split into two layers: shared atoms for state, and hotkey hooks for keyboard shortcuts.

## 1. Shared Settings Atoms (`src/shared/settings/`)

Each logical group lives in its own file, re-exported from `index.ts`:

```ts
// src/shared/settings/details-panel.ts
import { atom } from 'jotai'
import { atomWithStorage } from '@/shared/state'

// Transient: resets on app restart
export const detailsExpandedAtom = atom<false | 'lists' | 'task-details'>(false)

// Persistent: survives restarts (stored in ~/.huba/settings.json)
export const showTaskDetailsAtom = atomWithStorage<boolean>('showTaskDetails', true)
```

```ts
// src/shared/settings/index.ts
export { detailsExpandedAtom, showTaskDetailsAtom } from './details-panel'
export { activeThemeAtom, useTheme } from './theme'
```

**Import always from the barrel:** `import { showTaskDetailsAtom } from '@/shared/settings'` — never from sub-files.

## 2. Widget/Page Hotkeys (`model/use-hotkeys.ts`)

Keyboard shortcuts live in `model/use-hotkeys.ts` next to each widget/page.
Always import `useKeyboard` from `@/shared/keyboard` (respects global enable/disable):

```ts
// src/pages/task-list/model/use-hotkeys.ts
import { useKeyboard } from '@/shared/keyboard'   // NOT from '@opentui/react'
import { useSetAtom } from 'jotai'
import { showTaskDetailsAtom, useTheme } from '@/shared/settings'

export const useHotkeys = (): void => {
    const setShowDetails = useSetAtom(showTaskDetailsAtom)
    const { toggleTheme } = useTheme()

    useKeyboard((key) => {
        if (key.name === '/') setShowDetails((prev) => !prev)
        if (key.name === 'w' && !key.shift) toggleTheme(false)  // cycle forward
        if (key.name === 'w' && key.shift) toggleTheme(true)    // cycle backward
    })
}
```

Mount once at page level — registers global shortcuts for the whole page.

## 3. Reading Settings in Components

```tsx
import { useAtomValue, useAtom } from 'jotai'
import { showTaskDetailsAtom, detailsExpandedAtom, useTheme } from '@/shared/settings'

const TaskListPage: FC = () => {
    const { theme } = useTheme()
    const showDetails = useAtomValue(showTaskDetailsAtom)           // read-only
    const [expanded, setExpanded] = useAtom(detailsExpandedAtom)   // read + write

    useHotkeys()  // mount once at page level

    return (
        <box>
            {showDetails && <TaskDetails />}
            <TaskTable />
        </box>
    )
}
```

## Key Rules

- Settings atoms live in `src/shared/settings/` — use `atomWithStorage` for persistence
- Keyboard shortcuts belong in `model/use-hotkeys.ts` next to the widget/page
- Always import `useKeyboard` from `@/shared/keyboard`, never `@opentui/react`
- Components only read settings — they never register keyboard shortcuts themselves
- Mount hotkey hooks once at page/widget level, not inside list-rendered components
