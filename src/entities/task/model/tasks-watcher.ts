import { useEffect, useRef } from 'react'

import { mkdirSync } from 'node:fs'

import chokidar from 'chokidar'
import { useAtomValue } from 'jotai'

import { selectedListAtom } from '@/entities/claude-list'
import { debounce } from '@/shared/lib'

const WATCHER_OPTIONS = {
    depth: 0,
    ignoreInitial: true,
    persistent: true,
} as const

const DEBOUNCE_DELAY = 150

/**
 * Watches the selected list directory for file changes.
 * Re-attaches watcher when the selected list changes.
 * Calls onChanged whenever a JSON task file is added, modified, or removed.
 */
export const useTasksWatcher = (onChanged: (listPath: string) => void | Promise<void>): void => {
    const onChangedRef = useRef(onChanged)
    onChangedRef.current = onChanged

    const selectedList = useAtomValue(selectedListAtom)
    const tasksPath = selectedList?.path

    useEffect(() => {
        if (!tasksPath) return

        mkdirSync(tasksPath, { recursive: true })

        const watcher = chokidar.watch(tasksPath, WATCHER_OPTIONS)

        const debouncedOnChanged = debounce((p: string) => void onChangedRef.current(p), DEBOUNCE_DELAY)

        const handleFileChange = (filePath: string) => {
            if (filePath.endsWith('.json')) debouncedOnChanged(tasksPath)
        }

        watcher.on('add', handleFileChange)
        watcher.on('change', handleFileChange)
        watcher.on('unlink', handleFileChange)
        watcher.on('error', () => {})

        return () => {
            watcher.close()
        }
    }, [tasksPath])
}
