import { type FC, type PropsWithChildren, useEffect, useRef } from 'react'

import { useAtom } from 'jotai'

import { type SelectedList, selectedListAtom, useListsQuery } from '@/entities/claude-list'
import { getTasksBaseDir } from '@/shared/api/paths'
import type { TaskList } from '@/shared/domain'

const toSelectedList = (list: TaskList): SelectedList => ({
    id: list.id,
    path: list.path,
    instance: list.instance,
})

/**
 * Automatically selects the active task list on startup.
 *
 * Priority:
 * 1. `CLAUDE_CODE_TASK_LIST_ID` env variable (if set)
 * 2. Previously selected list (persisted in atom storage)
 * 3. First available list from the file system
 */
export const ListSelector: FC<PropsWithChildren> = ({ children }) => {
    const { data: lists } = useListsQuery()

    const [selectedList, setSelectedList] = useAtom(selectedListAtom)
    const selectedListRef = useRef<SelectedList | undefined>(selectedList)
    useEffect(() => {
        selectedListRef.current = selectedList
    }, [selectedList])

    useEffect(() => {
        const envListId = process.env.CLAUDE_CODE_TASK_LIST_ID
        if (envListId) {
            const found = lists?.find((l) => l.id === envListId)
            if (found) {
                setSelectedList(toSelectedList(found))
            } else {
                // Fallback: assume it's a default ~/.claude/tasks/ list
                setSelectedList({ id: envListId, path: `${getTasksBaseDir()}/${envListId}` })
            }
        } else if (!selectedListRef.current && !!lists && lists.length > 0) {
            setSelectedList(toSelectedList(lists[0]))
        }
    }, [lists, setSelectedList])

    return children
}
