import { useCallback, useEffect, useRef } from 'react'

import { mkdirSync } from 'node:fs'
import path from 'node:path'

import { toast } from '@opentui-ui/toast'
import chokidar from 'chokidar'

import { getTasksBaseDir } from '@/shared/api/paths'

const WATCHER_OPTIONS = {
    depth: 0,
    ignoreInitial: true,
    persistent: true,
} as const

const basePath = getTasksBaseDir()

/**
 * Watches ~/.claude/tasks/ for new or removed task list directories.
 * Calls onChanged whenever a first-level subdirectory is added or removed.
 */
export const useListsWatcher = (onChanged: () => void | Promise<void>): void => {
    const onChangedRef = useRef(onChanged)
    onChangedRef.current = onChanged

    const onAddDir = useCallback((changedPath: string) => {
        if (changedPath !== basePath) {
            void onChangedRef.current()
            toast.success('New list created [M]', {
                description: path.basename(changedPath),
            })
        }
    }, [])

    const onRemoveDir = useCallback((path: string) => {
        if (path !== basePath) void onChangedRef.current()
    }, [])

    useEffect(() => {
        mkdirSync(basePath, { recursive: true })

        const watcher = chokidar.watch(basePath, WATCHER_OPTIONS)

        watcher.on('addDir', onAddDir)
        watcher.on('unlinkDir', onRemoveDir)
        watcher.on('error', () => {})

        return () => {
            watcher.close()
        }
    }, [onAddDir, onRemoveDir])
}
