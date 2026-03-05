import { useCallback } from 'react'

import { useAtom } from 'jotai'

import { atomWithStorage } from '@/shared/state/atom-with-storage'
import type { Theme, ThemeName } from '@/shared/theme'
import { themes } from '@/shared/theme'

export const activeThemeAtom = atomWithStorage<ThemeName>('theme', 'claude')

export const useTheme = (): {
    theme: Theme
    themeName: ThemeName
    setTheme: (name: ThemeName) => void
    toggleTheme: (reverse?: boolean) => void
} => {
    const [themeName, setThemeName] = useAtom(activeThemeAtom)
    const theme = themes[themeName] ?? themes.claude

    const setTheme = useCallback((name: ThemeName) => setThemeName(name), [setThemeName])

    const toggleTheme = useCallback(
        (reverse = false) => {
            setThemeName((current) => {
                const names = Object.keys(themes)
                const currentIndex = names.indexOf(current)
                const nextIndex = reverse
                    ? (currentIndex - 1 + names.length) % names.length
                    : (currentIndex + 1) % names.length
                return names[nextIndex] as ThemeName
            })
        },
        [setThemeName],
    )

    return { theme, themeName, setTheme, toggleTheme } as const
}
