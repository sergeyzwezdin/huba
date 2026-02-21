import type { RefObject } from 'react'

import { useSetAtom } from 'jotai'

import type { TaskFilterStatus, TaskSelectRenderable, TaskSortField } from '@/entities/task'
import { taskFilterAtom, taskSortAtom } from '@/entities/task'
import { useFocusManager } from '@/shared/focus-manager'
import { useKeyboard } from '@/shared/keyboard'
import { showTaskDetailsAtom } from '@/shared/settings'

const filterCycle: TaskFilterStatus[] = ['all', 'pending', 'in_progress', 'completed']

const useHotkeys = (enabled: boolean, selectRef: RefObject<TaskSelectRenderable | null>): void => {
    const { focus } = useFocusManager()
    const setShowDetails = useSetAtom(showTaskDetailsAtom)
    const setSort = useSetAtom(taskSortAtom)
    const setFilter = useSetAtom(taskFilterAtom)

    const toggleSort = (field: TaskSortField): void => {
        setSort((prev) =>
            prev.field === field
                ? { field, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
                : { field, direction: 'asc' },
        )
    }

    useKeyboard((key) => {
        if (key.name === '1') focus('task-table')

        if (!enabled) return

        if (key.name === 'escape') {
            setShowDetails(false)
        } else if (key.name === 'space') {
            setShowDetails((prev) => !prev)
        } else if (key.name === 'return') {
            setShowDetails(true)
            setTimeout(() => {
                focus('task-details')
            }, 100)
        } else if (key.shift && key.name === 'i') {
            toggleSort('id')
        } else if (key.shift && key.name === 't') {
            toggleSort('subject')
        } else if (key.shift && key.name === 's') {
            toggleSort('status')
        } else if (key.shift && key.name === 'd') {
            toggleSort('updatedAt')
        } else if (key.shift && key.name === 'f') {
            setFilter((prev) => {
                const idx = filterCycle.indexOf(prev.status)
                const next = filterCycle[(idx + 1) % filterCycle.length]
                return { ...prev, status: next }
            })
        } else {
            selectRef.current?.handleKeyPress(key)
        }
    })
}

export { useHotkeys }
