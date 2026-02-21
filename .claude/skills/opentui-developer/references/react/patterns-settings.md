# React Patterns — Settings Management

Settings are split into two layers: shared atoms for state, and a feature hook for keyboard shortcuts.

## 1. Shared Settings Atoms (`src/shared/settings/`)

Each logical group lives in its own file, re-exported from `index.ts`:

```ts
// src/shared/settings/details-panel.ts
import { atom } from 'jotai'
export const detailsVisibleAtom = atom<boolean>(true)
export const detailsExpandedAtom = atom<boolean>(false)
```

```ts
// src/shared/settings/index.ts
export { detailsExpandedAtom, detailsVisibleAtom } from './details-panel'
export { activeThemeAtom, useTheme } from './theme'
```

**Import always from the barrel:** `import { detailsVisibleAtom } from '@/shared/settings'` — never from sub-files directly.

## 2. Feature Hook for Shortcuts (`src/features/settings/`)

```ts
// src/features/settings/model/use-settings.ts
import { useKeyboard } from '@opentui/react'
import { useSetAtom } from 'jotai'
import { detailsExpandedAtom, detailsVisibleAtom, useTheme } from '@/shared/settings'

export const useSettings = (): void => {
  const setShowDetails = useSetAtom(detailsVisibleAtom)
  const setDetailsExpanded = useSetAtom(detailsExpandedAtom)
  const { toggleTheme } = useTheme()

  useKeyboard((key) => {
    if (key.name === '/') {
      setShowDetails((prev) => !prev)
      setDetailsExpanded(false)
    } else if (key.name === 'w' && !key.shift) {
      toggleTheme(false)       // cycle forward
    } else if (key.name === 'w' && key.shift) {
      toggleTheme(true)        // cycle backward
    }
  })
}
```

Mount once at page/app level — registers global shortcuts for the whole app.

## 3. Reading Settings in Components

```tsx
import { useAtomValue, useAtom } from 'jotai'
import { detailsVisibleAtom, detailsExpandedAtom, useTheme } from '@/shared/settings'

const TaskListPage: FC = () => {
  const { theme } = useTheme()
  const showDetails = useAtomValue(detailsVisibleAtom)        // read-only
  const [expanded, setExpanded] = useAtom(detailsExpandedAtom)  // read + write

  return (
    <box>
      {showDetails && <TaskDetails />}
      <TaskTable />
    </box>
  )
}
```

**Key rules:**
- Settings atoms live in `src/shared/settings/`
- Keyboard shortcuts for settings belong in `useSettings()` in `src/features/settings/`
- Components only read settings — they never register settings shortcuts themselves
- `useSettings()` is mounted once at page/app level
