import { useEffect } from 'react'

import { useInput } from 'ink'

import { useSelectedTaskIndex } from './selection.atom'

/**
 * Hook to enable keyboard navigation through tasks
 * Handles arrow up/down keys to move selection
 *
 * @param taskCount - Total number of tasks in the list
 */
export const useTaskNavigation = (taskCount: number): void => {
    const [selectedIndex, setSelectedIndex] = useSelectedTaskIndex()

    // Clamp selection when task count changes (e.g., filtering)
    // Preserve selection position when possible
    useEffect(() => {
        if (taskCount === 0) {
            setSelectedIndex(0)
        } else if (selectedIndex >= taskCount) {
            setSelectedIndex(taskCount - 1)
        }
    }, [taskCount, selectedIndex, setSelectedIndex])

    useInput((_input, key) => {
        if (key.upArrow) {
            setSelectedIndex((prev) => Math.max(0, prev - 1))
        } else if (key.downArrow) {
            setSelectedIndex((prev) => Math.min(taskCount - 1, prev + 1))
        }
    })
}
