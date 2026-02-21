import type { ComponentProps, FC } from 'react'
import { useMemo, useRef } from 'react'

import { useKeyboard } from '@opentui/react'
import { useAtom } from 'jotai'

import { useTasksQuery } from '@/entities/task'
import { selectedListAtom } from '@/entities/task-list'
import { useFocus, useFocusManager } from '@/shared/focus-manager'
import { detailsVisibleAtom } from '@/shared/settings'
import { Panel } from '@/shared/ui/panel'
import { TaskSelect, type TaskSelectRenderable } from '@/shared/ui/task-select'

type TaskTableProps = Pick<ComponentProps<typeof Panel>, 'style'>

const now = new Date()
const minutesAgo = (m: number) => new Date(now.getTime() - m * 60_000)

const TaskTable: FC<TaskTableProps> = (props) => {
    const { isFocused, ref } = useFocus({ id: 'task-table', autoFocus: true })
    const { focus } = useFocusManager()
    const [, setShowDetails] = useAtom(detailsVisibleAtom)
    const selectRef = useRef<TaskSelectRenderable>(null)
    const [selectedList] = useAtom(selectedListAtom)
    const { data: tasks } = useTasksQuery(selectedList)

    const options = useMemo(() => {
        return tasks?.map((task) => ({
            id: task.id,
            title: task.subject,
            description: task.description,
            status: task.status,
            date: new Date(),
        }))
    }, [tasks])

    useKeyboard((key) => {
        if (!isFocused) return

        if (key.name === 'space') {
            setShowDetails((prev) => !prev)
        } else if (key.name === 'return') {
            setShowDetails(true)
            setTimeout(() => {
                focus('task-details')
            }, 100)
        } else {
            selectRef.current?.handleKeyPress(key)
        }
    })

    return (
        <Panel
            focusable
            focused={isFocused}
            ref={ref}
            title={['[1]', `Task List${!!tasks && tasks.length > 0 ? ` (${tasks.length})` : ''}`]}
            {...props}
            style={props.style}>
            <TaskSelect
                ref={selectRef}
                style={{ flexGrow: 1 }}
                showScrollIndicator={true}
                showId={true}
                showDate={true}
                maxLines={2}
                options={options}
                // options={[
                //     { id: '1', title: 'Fix', status: 'in_progress', date: new Date('2026-02-19T08:02:00+03:00') },
                //     {
                //         id: '2',
                //         title: 'Implement comprehensive focus manager with keyboard navigation support across all panels, including proper focus trapping when modal dialogs are open and focus restoration when closing overlays, with full accessibility compliance for screen readers and keyboard-only users navigating through nested interactive elements',
                //         status: 'in_progress',
                //         date: minutesAgo(60 * 24 * 2.5),
                //     },
                //     { id: '3', title: 'Refactor', status: 'pending', date: minutesAgo(25) },
                //     {
                //         id: '4',
                //         title: 'Add error boundary for graceful handling of runtime errors in production builds',
                //         status: 'pending',
                //         date: minutesAgo(35),
                //     },
                //     { id: '5', title: 'Update deps', status: 'blocked', date: minutesAgo(45) },
                //     {
                //         id: '6',
                //         title: 'Create shared focusedPanel Jotai atom for cross-component focus state synchronization that persists across route changes and provides a single source of truth for which panel currently has focus, enabling coordinated keyboard handling and preventing focus from getting lost during async operations',
                //         status: 'blocked',
                //         date: minutesAgo(55),
                //     },
                //     {
                //         id: '7',
                //         title: 'Design and implement responsive layout system for variable terminal dimensions',
                //         status: 'completed',
                //         date: minutesAgo(65),
                //     },
                //     { id: '8', title: 'Test', status: 'completed', date: minutesAgo(75) },
                //     {
                //         id: '9',
                //         title: 'Migrate legacy scroll implementation to virtualized list for better performance',
                //         status: 'in_progress',
                //         date: minutesAgo(85),
                //     },
                //     { id: '10', title: 'Docs', status: 'pending', date: minutesAgo(95) },
                //     {
                //         id: '11',
                //         title: 'Integrate experimental select component with form validation and accessibility features including ARIA labels, proper focus management when opening/closing the dropdown, keyboard navigation through options, and inline error display for validation failures with clear user feedback',
                //         status: 'pending',
                //         date: minutesAgo(105),
                //     },
                //     { id: '12', title: 'Bug', status: 'blocked', date: minutesAgo(115) },
                //     {
                //         id: '13',
                //         title: 'Optimize re-renders in task table when filtering by status or search query',
                //         status: 'blocked',
                //         date: minutesAgo(125),
                //     },
                //     { id: '14', title: 'Style', status: 'completed', date: minutesAgo(135) },
                //     {
                //         id: '15',
                //         title: 'Add keyboard shortcuts for quick task creation and status transitions',
                //         status: 'completed',
                //         date: minutesAgo(145),
                //     },
                //     { id: '16', title: 'WIP', status: 'in_progress', date: minutesAgo(155) },
                //     {
                //         id: '17',
                //         title: 'Implement task dependencies visualization with directed graph layout',
                //         status: 'in_progress',
                //         date: minutesAgo(165),
                //     },
                //     { id: '18', title: 'PR', status: 'pending', date: minutesAgo(175) },
                //     {
                //         id: '19',
                //         title: 'Write unit tests for focus manager provider and useFocus hook',
                //         status: 'pending',
                //         date: minutesAgo(185),
                //     },
                //     { id: '20', title: 'Review', status: 'blocked', date: minutesAgo(195) },
                //     {
                //         id: '21',
                //         title: 'Fix edge case where search filter does not update when switching between task lists, causing stale results to persist until manual refresh, and ensure debounced search input is properly cleared when navigating away to prevent unexpected behavior on return',
                //         status: 'blocked',
                //         date: minutesAgo(205),
                //     },
                //     { id: '22', title: 'Clean', status: 'completed', date: minutesAgo(215) },
                //     {
                //         id: '23',
                //         title: 'Add markdown rendering support for task descriptions with code blocks',
                //         status: 'completed',
                //         date: minutesAgo(225),
                //     },
                //     { id: '24', title: 'API', status: 'in_progress', date: minutesAgo(235) },
                //     {
                //         id: '25',
                //         title: 'Extract reusable panel layout components from task details and blocked-by widgets',
                //         status: 'in_progress',
                //         date: minutesAgo(245),
                //     },
                //     { id: '26', title: 'Merge', status: 'pending', date: minutesAgo(255) },
                //     {
                //         id: '27',
                //         title: 'Configure ESLint and Prettier for consistent code style across the monorepo',
                //         status: 'pending',
                //         date: minutesAgo(265),
                //     },
                //     { id: '28', title: 'Deploy', status: 'blocked', date: minutesAgo(275) },
                //     {
                //         id: '29',
                //         title: 'Improve progress widget to show breakdown by status with optional drill-down',
                //         status: 'blocked',
                //         date: minutesAgo(285),
                //     },
                //     { id: '30', title: 'Done', status: 'completed', date: minutesAgo(295) },
                //     {
                //         id: '31',
                //         title: 'Investigate memory leak in experimental select when rapidly switching options',
                //         status: 'completed',
                //         date: minutesAgo(305),
                //     },
                //     { id: '32', title: 'UX', status: 'in_progress', date: minutesAgo(315) },
                //     {
                //         id: '33',
                //         title: 'Add loading skeleton states for async data fetches in lists and details views',
                //         status: 'in_progress',
                //         date: minutesAgo(325),
                //     },
                //     { id: '34', title: 'Perf', status: 'pending', date: minutesAgo(335) },
                //     {
                //         id: '35',
                //         title: 'Reduce bundle size by lazy-loading markdown parser and syntax highlighter',
                //         status: 'pending',
                //         date: minutesAgo(345),
                //     },
                //     { id: '36', title: 'CI', status: 'blocked', date: minutesAgo(355) },
                //     {
                //         id: '37',
                //         title: 'Set up GitHub Actions workflow for automated testing and release on tag push',
                //         status: 'blocked',
                //         date: minutesAgo(365),
                //     },
                //     { id: '38', title: 'A11y', status: 'completed', date: minutesAgo(375) },
                //     {
                //         id: '39',
                //         title: 'Ensure all interactive elements have proper focus indicators and screen reader labels',
                //         status: 'completed',
                //         date: minutesAgo(385),
                //     },
                //     { id: '40', title: 'DB', status: 'in_progress', date: minutesAgo(395) },
                //     {
                //         id: '41',
                //         title: 'Add indexing and query optimization for task search across large datasets',
                //         status: 'in_progress',
                //         date: minutesAgo(405),
                //     },
                //     { id: '42', title: 'Auth', status: 'pending', date: minutesAgo(415) },
                //     {
                //         id: '43',
                //         title: 'Implement OAuth flow for syncing tasks with external project management tools',
                //         status: 'pending',
                //         date: minutesAgo(425),
                //     },
                //     { id: '44', title: 'Cache', status: 'blocked', date: minutesAgo(435) },
                //     {
                //         id: '45',
                //         title: 'Add offline-first support with local storage persistence and sync conflict resolution using last-write-wins with timestamp tracking, plus optional manual merge UI for when users need to reconcile conflicting edits made on different devices',
                //         status: 'blocked',
                //         date: minutesAgo(445),
                //     },
                //     { id: '46', title: 'Log', status: 'completed', date: minutesAgo(455) },
                //     {
                //         id: '47',
                //         title: 'Integrate structured logging with log levels and optional remote aggregation',
                //         status: 'completed',
                //         date: minutesAgo(465),
                //     },
                //     { id: '48', title: 'Config', status: 'in_progress', date: minutesAgo(475) },
                //     {
                //         id: '49',
                //         title: 'Support user-configurable themes and key bindings via config file',
                //         status: 'in_progress',
                //         date: minutesAgo(485),
                //     },
                //     {
                //         id: '50',
                //         title: 'Implement real-time collaboration with conflict-free merge for concurrent edits',
                //         status: 'pending',
                //         date: minutesAgo(495),
                //     },
                // ]}
            />
        </Panel>
    )
}

export { TaskTable }
