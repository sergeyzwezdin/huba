import type { FC } from 'react'

import { TextAttributes } from '@opentui/core'

import { RequiredWindowSize } from '@/shared/ui/required-window-size'
import { ListsTable } from '@/widgets/lists-table'
import { Progress } from '@/widgets/progress'
import { TaskBlockedBy } from '@/widgets/task-blocked-by'
import { TaskBlocks } from '@/widgets/task-blocks'
import { TaskDetails } from '@/widgets/task-details'
import { TaskTable } from '@/widgets/task-table'
import { TasksSearch } from '@/widgets/tasks-search'
import { TasksStatusFilter } from '@/widgets/tasks-status-filter'

import '@/shared/ui/task-select'

import { useAtomValue } from 'jotai'

import { detailsExpandedAtom, detailsVisibleAtom, layoutAtom, useTheme } from '@/shared/settings'

const TaskListPage: FC = () => {
    const { theme } = useTheme()
    const showDetails = useAtomValue(detailsVisibleAtom)
    const detailsExpanded = useAtomValue(detailsExpandedAtom)
    const layout = useAtomValue(layoutAtom)

    return (
        <RequiredWindowSize minWidth={70} minHeight={20}>
            <box style={{ flexDirection: 'column', paddingLeft: 1, paddingRight: 1, paddingTop: 0, flexGrow: 1 }}>
                <box style={{ flexDirection: 'row', visible: !detailsExpanded }}>
                    <TasksStatusFilter style={{ width: 16 }} />
                    <TasksSearch style={{ flexGrow: 1 }} />
                    <ListsTable style={{ width: 20 }} />
                </box>
                <box style={{ flexGrow: 1, flexDirection: layout === 'horizontal' ? 'row' : 'column' }}>
                    <TaskTable style={{ flexGrow: 1, flexBasis: 1, visible: !detailsExpanded }} />
                    {showDetails && (
                        <box style={{ flexDirection: 'column', flexGrow: 1, flexBasis: 1 }}>
                            <TaskDetails style={{ flexGrow: 1 }} />
                            <TaskBlockedBy style={{ visible: !detailsExpanded }} />
                            <TaskBlocks style={{ visible: !detailsExpanded }} />
                        </box>
                    )}
                </box>
                <Progress />
                <box style={{ flexDirection: 'row', gap: 2, paddingLeft: 1 }}>
                    <text fg={theme.colors.hint} attributes={TextAttributes.BOLD}>
                        Claude Tasks v.1.5.0
                    </text>

                    <text
                        style={{ fg: theme.colors.hint }}
                        attributes={TextAttributes.ITALIC | TextAttributes.UNDERLINE | TextAttributes.DIM}>
                        <a href="https://github.com/sergeyzwezdin/claude-tasks">
                            https://github.com/sergeyzwezdin/claude-tasks
                        </a>
                    </text>
                </box>
            </box>
        </RequiredWindowSize>
    )
}

export { TaskListPage }
