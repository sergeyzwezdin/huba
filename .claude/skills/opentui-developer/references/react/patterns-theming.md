# React Patterns — Theming

Themes use a two-layer palette pattern with Jotai atoms. No React Context or Provider needed.

## Theme Type

```ts
// src/shared/theme/types.ts
import type { RGBA } from '@opentui/core'

export type Theme = {
    border: { default: RGBA; focused: RGBA }
    colors: { primary: RGBA; secondary: RGBA; accent: RGBA; hint: RGBA; date: RGBA }
    surface: { selection: RGBA; scrollbarTrack: RGBA; scrollbarThumb: RGBA }
    progress: { pending: RGBA; in_progress: RGBA; completed: RGBA; blocked: RGBA }
}
```

## Implementing a Theme

```ts
// src/shared/theme/claude.ts
import { RGBA } from '@opentui/core'
import type { Theme } from './types'

// Layer 1: named palette
const palette = {
    white: RGBA.fromHex('#FFFFFF'),
    charcoal: RGBA.fromHex('#696968'),
    rust: RGBA.fromHex('#D77757'),
    coal: RGBA.fromHex('#444444'),
}

// Layer 2: semantic mapping
export const claudeTheme: Theme = {
    border: { default: palette.charcoal, focused: palette.rust },
    colors: { primary: palette.white, secondary: palette.charcoal, accent: palette.rust, hint: palette.charcoal, date: palette.charcoal },
    surface: { selection: palette.coal, scrollbarTrack: palette.coal, scrollbarThumb: palette.charcoal },
    progress: { pending: palette.charcoal, in_progress: palette.rust, completed: RGBA.fromHex('#4CAF50'), blocked: RGBA.fromHex('#F44336') },
}
```

## Theme Registry and State

```ts
// src/shared/settings/theme.ts
import { atom } from 'jotai'
import { atomWithStorage } from '@/shared/state'  // persistent storage

export const activeThemeAtom = atomWithStorage<ThemeName>('theme', 'claude')
export const themeAtom = atom<Theme>((get) => themes[get(activeThemeAtom)] ?? themes['claude'])

export const useTheme = () => {
    const [themeName, setThemeName] = useAtom(activeThemeAtom)
    const theme = themes[themeName] ?? themes['claude']

    const toggleTheme = (reverse = false) => {
        const names = Object.keys(themes) as ThemeName[]
        const i = names.indexOf(themeName)
        const next = reverse ? (i - 1 + names.length) % names.length : (i + 1) % names.length
        setThemeName(names[next])
    }

    return { theme, themeName, setTheme: setThemeName, toggleTheme } as const
}
```

**Note:** `activeThemeAtom` uses `atomWithStorage` (not plain `atom`) — theme persists across restarts.

## Consuming Theme in Components

```tsx
import { useTheme } from '@/shared/settings'

const MyPanel: FC = () => {
    const { theme } = useTheme()

    return (
        <box style={{ borderColor: theme.border.default, focusedBorderColor: theme.border.focused }}>
            <text fg={theme.colors.primary}>Primary text</text>
            <text fg={theme.colors.hint}>Hint text</text>
        </box>
    )
}
```

## rgbToHex — For Components That Need Hex Strings

Some OpenTUI props (e.g. Toaster styles, custom renderables) require hex strings, not RGBA:

```tsx
import { rgbToHex } from '@opentui/core'
import { useTheme } from '@/shared/settings'

const Toaster: FC = () => {
    const { theme } = useTheme()

    return (
        <ToasterBase
            toastOptions={{
                style: {
                    backgroundColor: rgbToHex(theme.surface.selection),
                    foregroundColor: rgbToHex(theme.colors.primary),
                    borderColor: rgbToHex(theme.border.default),
                },
                success: { style: { borderColor: rgbToHex(theme.progress.completed) } },
                error: { style: { borderColor: rgbToHex(theme.progress.blocked) }, duration: 6000 },
            }}
        />
    )
}
```

Also used in custom renderables when calling `OptimizedBuffer` methods:

```typescript
protected onThemeChanged(theme: Theme): void {
    this._colors = {
        primary: parseColor(theme.colors.primary),
        hint: parseColor(theme.colors.hint),
    }
}
```

## Key Rules

- Never reference palette color names in components — use semantic roles (`theme.colors.primary`, not `palette.white`)
- `useTheme()` works in any component without a Provider — state is global via Jotai
- Use `theme.*` RGBA values directly for JSX props; convert to hex with `rgbToHex()` only when required by imperative APIs
- Adding a new theme: implement the `Theme` type, add to the `themes` registry — no other changes needed
