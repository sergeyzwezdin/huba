import { claude } from './claude'
import { grayed } from './grayed'

export type { Theme } from './types'

export { claude, grayed }

export const themes = {
    claude,
    grayed,
} as const

export type ThemeName = keyof typeof themes
