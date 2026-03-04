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

/**
 * Depth 3 from ~/.ccs/instances/ covers:
 * 0: instances/
 * 1: instances/{name}/
 * 2: instances/{name}/tasks/
 * 3: instances/{name}/tasks/{list}/  (and *.json files at this level)
 */
const CCS_WATCHER_OPTIONS = {
    depth: 3,
    ignoreInitial: true,
    persistent: true,
} as const

const DEBOUNCE_DELAY = 150

/**
 * Watches ~/.claude/tasks/ and CCS instance task directories for changes.
 * Also watches ~/.ccs/instances/ at depth 3 to fully cover new CCS instances,
 * their tasks/ directories, list subdirectories, and JSON file changes.
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

    // Main watcher for ~/.claude/tasks/ and already-known CCS task dirs
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

        return () => {
            watcher.close()
        }
    }, [onAddDir, onRemoveDir, onFilesChange])

    // CCS watcher: covers new instances, their tasks/ dirs, list subdirs, and JSON files
    useEffect(() => {
        const ccsInstancesDir = getCcsInstancesDir()
        if (!existsSync(ccsInstancesDir)) return

        const watcher = chokidar.watch(ccsInstancesDir, CCS_WATCHER_OPTIONS)

        watcher.on('addDir', (changedPath) => {
            if (changedPath !== ccsInstancesDir) debouncedOnChangedRef.current()
        })
        watcher.on('unlinkDir', (changedPath) => {
            if (changedPath !== ccsInstancesDir) debouncedOnChangedRef.current()
        })
        watcher.on('add', onFilesChange)
        watcher.on('unlink', onFilesChange)
        watcher.on('error', () => {})

        return () => {
            watcher.close()
        }
    }, [onFilesChange])
}
