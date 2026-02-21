import type { FC } from 'react'

import { RequiredWindowSize } from '@/shared/ui/required-window-size'
import { Footer } from '@/widgets/footer'
import { ListsTable } from '@/widgets/lists-table'
import { Progress } from '@/widgets/progress'
import { TaskBlockedBy } from '@/widgets/task-blocked-by'
import { TaskBlocks } from '@/widgets/task-blocks'
import { TaskDetails } from '@/widgets/task-details'
import { TaskTable } from '@/widgets/task-table'
import { TasksSearch } from '@/widgets/tasks-search'

import '@/shared/ui/task-select'

import { useAtomValue } from 'jotai'

import { selectedTaskIdAtom } from '@/entities/task'
import { detailsExpandedAtom, detailsVisibleAtom, layoutAtom } from '@/shared/settings'
import { NoTaskSelected } from '@/shared/ui/no-task-selected'

const TaskListPage: FC = () => {
    const showDetails = useAtomValue(detailsVisibleAtom)
    const detailsExpanded = useAtomValue(detailsExpandedAtom)
    const layout = useAtomValue(layoutAtom)

    return (
        <RequiredWindowSize minWidth={70} minHeight={20}>
            <box style={{ flexDirection: 'column', paddingLeft: 1, paddingRight: 1, paddingTop: 0, flexGrow: 1 }}>
                <box style={{ flexDirection: 'row', visible: !detailsExpanded }}>
                    <TasksSearch style={{ flexGrow: 1 }} />
                    <ListsTable style={{ width: 20 }} />
                </box>
                <box style={{ flexGrow: 1, flexDirection: layout === 'horizontal' ? 'row' : 'column' }}>
                    <TaskTable style={{ flexGrow: 1, flexBasis: 1, visible: !detailsExpanded }} />
                    {showDetails && <TaskListDetails />}
                </box>
                <Progress />
                <Footer />
            </box>
        </RequiredWindowSize>
    )
}

const TaskListDetails: FC = () => {
    const selectedTaskId = useAtomValue(selectedTaskIdAtom)
    const detailsExpanded = useAtomValue(detailsExpandedAtom)

    return selectedTaskId ? (
        <box style={{ flexDirection: 'column', flexGrow: 1, flexBasis: 1 }}>
            <TaskDetails style={{ flexGrow: 1 }} />
            <TaskBlockedBy style={{ visible: !detailsExpanded }} />
            <TaskBlocks style={{ visible: !detailsExpanded }} />
        </box>
    ) : (
        <NoTaskSelected />
    )
}

export { TaskListPage }
