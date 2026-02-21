import { useEffect, useRef } from 'react'

import { mkdirSync } from 'node:fs'

import chokidar from 'chokidar'

import { getTasksBaseDir } from '@/shared/api/paths'

const WATCHER_OPTIONS = {
    depth: 0,
    ignoreInitial: true,
    persistent: true,
} as const

/**
 * Watches ~/.claude/tasks/ for new or removed task list directories.
 * Calls onChanged whenever a first-level subdirectory is added or removed.
 */
export const useListsWatcher = (onChanged: () => void | Promise<void>): void => {
    const onChangedRef = useRef(onChanged)
    onChangedRef.current = onChanged

    useEffect(() => {
        const basePath = getTasksBaseDir()
        mkdirSync(basePath, { recursive: true })

        const watcher = chokidar.watch(basePath, WATCHER_OPTIONS)

        const handleDirChange = (changedPath: string) => {
            if (changedPath !== basePath) void onChangedRef.current()
        }

        watcher.on('addDir', handleDirChange)
        watcher.on('unlinkDir', handleDirChange)
        watcher.on('error', () => {})

        return () => {
            watcher.close()
        }
    }, [])
}
