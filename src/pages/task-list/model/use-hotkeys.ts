import { useKeyboard } from '@opentui/react'
import { toast } from '@opentui-ui/toast'
import { useAtom, useSetAtom } from 'jotai'

import { selectedListAtom, useListsQuery } from '@/entities/claude-list'
import { selectedTaskIdAtom, taskFilterAtom } from '@/entities/task'
import { useFocusManager } from '@/shared/focus-manager'
import {
    fullScreenAtom,
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
    const { focus } = useFocusManager()

    const setLayout = useSetAtom(taskDetailsLayoutAtom)
    const setShowDetails = useSetAtom(showTaskDetailsAtom)
    const setShowProgress = useSetAtom(showProgressAtom)
    const [selectedList, setSelectedList] = useAtom(selectedListAtom)
    const setTaskFilter = useSetAtom(taskFilterAtom)
    const setSelectedTaskId = useSetAtom(selectedTaskIdAtom)
    const setFullScreen = useSetAtom(fullScreenAtom)

    const { data: lists } = useListsQuery()

    const { toggleTheme } = useTheme()

    useKeyboard((key) => {
        if (key.name === '/') {
            setShowDetails((prev) => !prev)
        }
        if (key.name === 'h') {
            setLayout((prev: TaskDetailsLayout) => (prev === 'horizontal' ? 'vertical' : 'horizontal'))
        } else if (key.name === 'p') {
            setShowProgress((prev) => !prev)
        } else if (key.name === 'w' && !key.shift) {
            toggleTheme(false)
        } else if (key.name === 'w' && key.shift) {
            toggleTheme(true)
        } else if (key.name === 'm' && key.shift) {
            const latestListId = lists && lists.length > 0 ? lists[0].id : undefined
            if (!latestListId) return
            if (selectedList === latestListId) return

            setSelectedList(latestListId)
            setTaskFilter({ status: 'all', search: '' })
            setSelectedTaskId(undefined)

            setFullScreen(false)

            setTimeout(() => {
                focus('task-table')
            }, 100)

            toast.info('Switched to the latest list', {
                description: latestListId,
            })
        }
    })
}
