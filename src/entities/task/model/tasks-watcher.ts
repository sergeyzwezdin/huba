import { useEffect, useRef } from 'react'

import { mkdirSync } from 'node:fs'

import chokidar from 'chokidar'
import { useAtomValue } from 'jotai'

import { selectedListAtom } from '@/entities/task-list'
import { getTasksDir } from '@/shared/api/paths'

const WATCHER_OPTIONS = {
    depth: 0,
    ignoreInitial: true,
    persistent: true,
} as const

/**
 * Watches ~/.claude/tasks/{listId}/*.json for file changes.
 * Re-attaches watcher when the selected list changes.
 * Calls onChanged whenever a JSON task file is added, modified, or removed.
 */
export const useTasksWatcher = (onChanged: (listId: string) => void | Promise<void>): void => {
    const onChangedRef = useRef(onChanged)
    onChangedRef.current = onChanged

    const listId = useAtomValue(selectedListAtom)

    useEffect(() => {
        if (!listId) return

        const tasksPath = getTasksDir(listId)
        mkdirSync(tasksPath, { recursive: true })

        const watcher = chokidar.watch(tasksPath, WATCHER_OPTIONS)

        const handleFileChange = (filePath: string) => {
            if (filePath.endsWith('.json')) void onChangedRef.current(listId)
        }

        watcher.on('add', handleFileChange)
        watcher.on('change', handleFileChange)
        watcher.on('unlink', handleFileChange)
        watcher.on('error', () => {})

        return () => {
            watcher.close()
        }
    }, [listId])
}
