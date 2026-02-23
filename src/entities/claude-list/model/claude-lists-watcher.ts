import { useCallback, useEffect, useRef } from 'react'

import { mkdirSync } from 'node:fs'
import path from 'node:path'

import { toast } from '@opentui-ui/toast'
import chokidar from 'chokidar'

import { getTasksBaseDir } from '@/shared/api/paths'
import { debounce } from '@/shared/lib'

const WATCHER_OPTIONS = {
    depth: 1,
    ignoreInitial: true,
    persistent: true,
} as const

const DEBOUNCE_DELAY = 150

const basePath = getTasksBaseDir()

/**
 * Watches ~/.claude/tasks/ for new or removed task list directories.
 * Calls onChanged whenever a first-level subdirectory is added or removed.
 */
export const useListsWatcher = (onChanged: () => void | Promise<void>): void => {
    const onChangedRef = useRef(onChanged)
    onChangedRef.current = onChanged

    const debouncedOnChangedRef = useRef(debounce(() => void onChangedRef.current(), DEBOUNCE_DELAY))

    const onAddDir = useCallback((changedPath: string) => {
        if (changedPath !== basePath) {
            debouncedOnChangedRef.current()
            toast.success('New list created', {
                description: path.basename(changedPath),
            })
        }
    }, [])

    const onRemoveDir = useCallback((changedPath: string) => {
        if (changedPath !== basePath) debouncedOnChangedRef.current()
    }, [])

    const onFilesChange = useCallback((changedPath: string) => {
        if (changedPath.endsWith('.json')) debouncedOnChangedRef.current()
    }, [])

    useEffect(() => {
        mkdirSync(basePath, { recursive: true })

        const watcher = chokidar.watch(basePath, WATCHER_OPTIONS)

        watcher.on('addDir', onAddDir)
        watcher.on('unlinkDir', onRemoveDir)
        watcher.on('add', onFilesChange)
        watcher.on('unlink', onFilesChange)
        watcher.on('error', () => {})

        return () => {
            watcher.close()
        }
    }, [onAddDir, onRemoveDir, onFilesChange])
}
