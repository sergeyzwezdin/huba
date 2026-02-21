import { useKeyboard } from '@opentui/react'
import { useSetAtom } from 'jotai'

import {
    showProgressAtom,
    showTaskDetailsAtom,
    type TaskDetailsLayout,
    taskDetailsLayoutAtom,
    useTheme,
} from '@/shared/settings'

/**
 * Hook that manages all settings keyboard shortcuts
 * - `/` toggles showDetails
 * - `h` toggles layout between horizontal and vertical
 * - `w` cycles themes forward
 * - `W` cycles themes backward
 */
export const useHotkeys = () => {
    const setLayout = useSetAtom(taskDetailsLayoutAtom)
    const setShowDetails = useSetAtom(showTaskDetailsAtom)
    const setShowProgress = useSetAtom(showProgressAtom)
    const { toggleTheme } = useTheme()

    useKeyboard((key) => {
        if (key.name === '/') {
            setShowDetails((prev) => !prev)
        } else if (key.name === 'h') {
            setLayout((prev: TaskDetailsLayout) => (prev === 'horizontal' ? 'vertical' : 'horizontal'))
        } else if (key.name === 'p') {
            setShowProgress((prev) => !prev)
        } else if (key.name === 'w' && !key.shift) {
            toggleTheme(false)
        } else if (key.name === 'w' && key.shift) {
            toggleTheme(true)
        }
    })
}
