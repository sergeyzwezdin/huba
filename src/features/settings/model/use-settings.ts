import { useKeyboard } from '@opentui/react'
import { useSetAtom } from 'jotai'

import type { Layout } from '@/shared/settings'
import { detailsExpandedAtom, detailsVisibleAtom, layoutAtom, useTheme } from '@/shared/settings'

/**
 * Hook that manages all settings keyboard shortcuts
 * - `/` toggles showDetails
 * - `h` toggles layout between horizontal and vertical
 * - `w` cycles themes forward
 * - `W` cycles themes backward
 */
export const useSettings = (): void => {
    const setShowDetails = useSetAtom(detailsVisibleAtom)
    const setDetailsExpanded = useSetAtom(detailsExpandedAtom)
    const setLayout = useSetAtom(layoutAtom)
    const { toggleTheme } = useTheme()

    useKeyboard((key) => {
        if (key.name === '/') {
            setShowDetails((prev) => !prev)
            setDetailsExpanded(false)
        } else if (key.name === 'h') {
            setLayout((prev: Layout) => (prev === 'horizontal' ? 'vertical' : 'horizontal'))
        } else if (key.name === 'w' && !key.shift) {
            toggleTheme(false)
        } else if (key.name === 'w' && key.shift) {
            toggleTheme(true)
        }
    })
}
