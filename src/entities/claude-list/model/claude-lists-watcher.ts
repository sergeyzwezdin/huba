import { useCallback, useEffect, useRef } from 'react'

import { existsSync, mkdirSync } from 'node:fs'
import path from 'node:path'

import { toast } from '@opentui-ui/toast'
import chokidar from 'chokidar'

import { getCcsInstancesDir, getCcsInstancesWithTasks, getCcsTasksBaseDir, getTasksBaseDir } from '@/shared/api/paths'
import { debounce } from '@/shared/lib'

const WATCHER_OPTIONS = {
    depth: 1,
    ignoreInitial: true,
    persistent: true,
} as const

const CCS_WATCHER_OPTIONS = {
    depth: 2,
    ignoreInitial: true,
    persistent: true,
} as const

const DEBOUNCE_DELAY = 150

/**
 * Watches ~/.claude/tasks/ and CCS instance task directories for changes.
 * Also watches ~/.ccs/instances/ so newly created instances are picked up at runtime.
 * Calls onChanged whenever a task list subdirectory or its files change.
 */
export const useListsWatcher = (onChanged: () => void | Promise<void>): void => {
    const onChangedRef = useRef(onChanged)
    onChangedRef.current = onChanged

    const debouncedOnChangedRef = useRef(debounce(() => void onChangedRef.current(), DEBOUNCE_DELAY))

    const onAddDir = useCallback(
        (basePaths: string[]) => (changedPath: string) => {
            if (!basePaths.includes(changedPath)) {
                debouncedOnChangedRef.current()
                toast.success('New list created', {
                    description: path.basename(changedPath),
                })
            }
        },
        [],
    )

    const onRemoveDir = useCallback(
        (basePaths: string[]) => (changedPath: string) => {
            if (!basePaths.includes(changedPath)) debouncedOnChangedRef.current()
        },
        [],
    )

    const onFilesChange = useCallback((changedPath: string) => {
        if (changedPath.endsWith('.json')) debouncedOnChangedRef.current()
    }, [])

    useEffect(() => {
        const basePath = getTasksBaseDir()
        mkdirSync(basePath, { recursive: true })

        const watchPaths = [basePath]
        for (const instance of getCcsInstancesWithTasks()) {
            const ccsPath = getCcsTasksBaseDir(instance)
            if (existsSync(ccsPath)) {
                watchPaths.push(ccsPath)
            }
        }

        const handleAddDir = onAddDir(watchPaths)
        const handleRemoveDir = onRemoveDir(watchPaths)

        const watcher = chokidar.watch(watchPaths, WATCHER_OPTIONS)

        watcher.on('addDir', handleAddDir)
        watcher.on('unlinkDir', handleRemoveDir)
        watcher.on('add', onFilesChange)
        watcher.on('unlink', onFilesChange)
        watcher.on('error', () => {})

        // Watch ~/.ccs/instances/ for new instances gaining tasks/ directories
        const ccsInstancesDir = getCcsInstancesDir()
        let ccsWatcher: ReturnType<typeof chokidar.watch> | undefined
        if (existsSync(ccsInstancesDir)) {
            ccsWatcher = chokidar.watch(ccsInstancesDir, CCS_WATCHER_OPTIONS)
            ccsWatcher.on('addDir', (changedPath) => {
                if (changedPath.endsWith('/tasks') || changedPath.endsWith('\\tasks')) {
                    debouncedOnChangedRef.current()
                }
            })
            ccsWatcher.on('unlinkDir', (changedPath) => {
                if (changedPath.endsWith('/tasks') || changedPath.endsWith('\\tasks')) {
                    debouncedOnChangedRef.current()
                }
            })
            ccsWatcher.on('error', () => {})
        }

        return () => {
            watcher.close()
            ccsWatcher?.close()
        }
    }, [onAddDir, onRemoveDir, onFilesChange])
}
