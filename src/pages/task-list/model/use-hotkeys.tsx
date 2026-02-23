import { useNavigate } from 'react-router'

import { rgbToHex } from '@opentui/core'
import { useTerminalDimensions } from '@opentui/react'
import { useDialog } from '@opentui-ui/dialog/react'
import { toast } from '@opentui-ui/toast'
import { useAtom, useSetAtom } from 'jotai'

import { selectedListAtom, useListsQuery } from '@/entities/claude-list'
import { selectedTaskIdAtom, taskFilterAtom } from '@/entities/task'
import { HelpContent } from '@/features/help'
import { useFocusManager } from '@/shared/focus-manager'
import { useKeyboard } from '@/shared/keyboard'
import {
    showProgressAtom,
    showTaskDetailsAtom,
    type TaskDetailsLayout,
    taskDetailsLayoutAtom,
    useTheme,
} from '@/shared/settings'

export const useHotkeys = () => {
    const { focus } = useFocusManager()
    const navigate = useNavigate()
    const dialog = useDialog()
    const { height: rows } = useTerminalDimensions()

    const setLayout = useSetAtom(taskDetailsLayoutAtom)
    const setShowDetails = useSetAtom(showTaskDetailsAtom)
    const setShowProgress = useSetAtom(showProgressAtom)
    const [selectedList, setSelectedList] = useAtom(selectedListAtom)
    const setTaskFilter = useSetAtom(taskFilterAtom)
    const setSelectedTaskId = useSetAtom(selectedTaskIdAtom)

    const { data: lists } = useListsQuery()

    const { toggleTheme, theme } = useTheme()

    useKeyboard((key) => {
        if (key.name === '/') {
            setShowDetails((prev) => !prev)
        }
        if (key.name === '?') {
            dialog.show({
                content: () => <HelpContent />,
                closeOnClickOutside: true,
                closeOnEscape: true,
                style: {
                    backgroundColor: rgbToHex(theme.surface.background),
                    borderColor: rgbToHex(theme.border.focused),
                    border: true,
                    borderStyle: 'rounded',
                    maxHeight: rows - 4,
                },
            })
        }
        if (key.name === 'h') {
            setLayout((prev: TaskDetailsLayout) => (prev === 'horizontal' ? 'vertical' : 'horizontal'))
        } else if (key.name === 'p' && !key.shift) {
            setShowProgress((prev) => !prev)
        } else if (key.name === 's' && !key.shift) {
            navigate('/settings')
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

            setTimeout(() => {
                focus('task-table')
            }, 100)

            toast.info('Switched to the latest list', {
                description: latestListId,
            })
        }
    })
}
