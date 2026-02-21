import { catppuccin } from './catppuccin'
import { claude } from './claude'
import { github } from './github'
import { grayed } from './grayed'

export type { Theme } from './types'

export { catppuccin, claude, github, grayed }

export const themes = {
    catppuccin,
    claude,
    github,
    grayed,
} as const

export type ThemeName = keyof typeof themes
