import { type FC, type PropsWithChildren, useEffect, useRef } from 'react'

import { useAtom } from 'jotai'

import { selectedListAtom, useListsQuery } from '@/entities/claude-list'

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
    const selectedListRef = useRef<string>(selectedList)
    useEffect(() => {
        selectedListRef.current = selectedList
    }, [selectedList])

    useEffect(() => {
        if (process.env.CLAUDE_CODE_TASK_LIST_ID) setSelectedList(process.env.CLAUDE_CODE_TASK_LIST_ID)
        else if (!selectedListRef.current && !!lists && lists.length > 0) setSelectedList(lists[0].id)
    }, [lists, setSelectedList])

    return children
}
