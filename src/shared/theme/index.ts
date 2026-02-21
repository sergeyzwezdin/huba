import { catppuccin } from './catppuccin'
import { claude } from './claude'
import { github } from './github'
import { grayed } from './grayed'
import { loadCustomThemes } from './load-custom-themes'

export type { Theme } from './types'
export { themeSchema } from './types'

export { catppuccin, claude, github, grayed }

const builtinThemes = { catppuccin, claude, github, grayed } as const

export const themes: Record<string, import('./types').Theme> = {
    ...builtinThemes,
    ...loadCustomThemes(),
}

export type ThemeName = keyof typeof builtinThemes | (string & {})
