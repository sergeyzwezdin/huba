import { atom, useAtom } from 'jotai'

import type { Theme, ThemeName } from '@/shared/theme'
import { themes } from '@/shared/theme'

export const activeThemeAtom = atom<ThemeName>('claude')

export const themeAtom = atom<Theme>((get) => themes[get(activeThemeAtom)])

export const useTheme = (): {
    theme: Theme
    themeName: ThemeName
    setTheme: (name: ThemeName) => void
    toggleTheme: (reverse?: boolean) => void
} => {
    const [themeName, setThemeName] = useAtom(activeThemeAtom)
    const theme = themes[themeName]

    const setTheme = (name: ThemeName) => setThemeName(name)

    const toggleTheme = (reverse = false) => {
        const names = Object.keys(themes) as ThemeName[]
        const currentIndex = names.indexOf(themeName)
        const nextIndex = reverse ? (currentIndex - 1 + names.length) % names.length : (currentIndex + 1) % names.length
        setThemeName(names[nextIndex])
    }

    return { theme, themeName, setTheme, toggleTheme } as const
}
