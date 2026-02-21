# React Patterns — Theming

Themes use a two-layer palette pattern and Jotai atoms. No React Context or Provider needed.

## 1. Define the Theme Type

```ts
// src/shared/theme/types.ts
import type { RGBA } from '@opentui/core'

export type Theme = {
  border: { default: RGBA; focused: RGBA }
  colors: { primary: RGBA; secondary: RGBA; accent: RGBA; hint: RGBA }
  surface: { selection: RGBA; scrollbarTrack: RGBA; scrollbarThumb: RGBA }
}
```

## 2. Implement a Theme

```ts
// src/shared/theme/default.ts
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
export const defaultTheme: Theme = {
  border: { default: palette.charcoal, focused: palette.rust },
  colors: { primary: palette.white, secondary: palette.charcoal, accent: palette.rust, hint: palette.charcoal },
  surface: { selection: palette.coal, scrollbarTrack: palette.coal, scrollbarThumb: palette.charcoal },
}
```

## 3. Register Themes

```ts
// src/shared/theme/index.ts
import { defaultTheme } from './default'
import { alternateTheme } from './alternate'

export type { Theme } from './types'
export { defaultTheme, alternateTheme }
export const themes = { default: defaultTheme, alternate: alternateTheme } as const
export type ThemeName = keyof typeof themes
```

## 4. Theme State with Jotai

```ts
// src/shared/settings/theme.ts
import { atom, useAtom } from 'jotai'
import type { Theme, ThemeName } from '@/shared/theme'
import { themes } from '@/shared/theme'

export const activeThemeAtom = atom<ThemeName>('default')
export const themeAtom = atom<Theme>((get) => themes[get(activeThemeAtom)])

export const useTheme = () => {
  const [themeName, setThemeName] = useAtom(activeThemeAtom)
  const theme = themes[themeName]

  const setTheme = (name: ThemeName) => setThemeName(name)

  const toggleTheme = (reverse = false) => {
    const names = Object.keys(themes) as ThemeName[]
    const i = names.indexOf(themeName)
    const next = reverse
      ? (i - 1 + names.length) % names.length
      : (i + 1) % names.length
    setThemeName(names[next])
  }

  return { theme, themeName, setTheme, toggleTheme } as const
}
```

## 5. Consume in Components

```tsx
import { useTheme } from '@/shared/settings'

const MyPanel: FC = () => {
  const { theme } = useTheme()

  return (
    <box borderColor={theme.border.default}>
      <text fg={theme.colors.primary}>Primary text</text>
      <text fg={theme.colors.hint}>Hint text</text>
    </box>
  )
}
```

**Key rules:**
- Never reference palette color names in components — use semantic roles (`theme.colors.primary`, not `palette.white`)
- `useTheme()` works in any component without a Provider — state is global via Jotai
- Adding a new theme: implement the `Theme` type, add to the `themes` registry. No other changes needed
