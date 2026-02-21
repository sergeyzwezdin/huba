import { useKeyboard } from '@opentui/react'
import { useSetAtom } from 'jotai'

import { showTaskDetailsAtom, type TaskDetailsLayout, taskDetailsLayoutAtom, useTheme } from '@/shared/settings'

/**
 * Hook that manages all settings keyboard shortcuts
 * - `/` toggles showDetails
 * - `h` toggles layout between horizontal and vertical
 * - `w` cycles themes forward
 * - `W` cycles themes backward
 */
export const useSettings = (): void => {
    const setLayout = useSetAtom(taskDetailsLayoutAtom)
    const setShowDetails = useSetAtom(showTaskDetailsAtom)
    const { toggleTheme } = useTheme()

    useKeyboard((key) => {
        if (key.name === '/') {
            setShowDetails((prev) => !prev)
            // setDetailsExpanded(false)
        } else if (key.name === 'h') {
            setLayout((prev: TaskDetailsLayout) => (prev === 'horizontal' ? 'vertical' : 'horizontal'))
        } else if (key.name === 'w' && !key.shift) {
            toggleTheme(false)
        } else if (key.name === 'w' && key.shift) {
            toggleTheme(true)
        }
    })
}
