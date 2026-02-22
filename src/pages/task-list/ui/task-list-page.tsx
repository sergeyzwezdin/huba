import type { FC } from 'react'

import { useTerminalDimensions } from '@opentui/react'
import { useAtom, useAtomValue } from 'jotai'

import { selectedListAtom } from '@/entities/claude-list'
import { useSelectedTask } from '@/entities/task'
import { showProgressAtom, showTaskDetailsAtom, taskDetailsLayoutAtom } from '@/shared/settings'
import { RequiredWindowSize } from '@/shared/ui/required-window-size'
import { ClaudeList } from '@/widgets/claude-list'
import { TaskBlockedBy } from '@/widgets/task-blocked-by'
import { TaskBlocks } from '@/widgets/task-blocks'
import { TaskDetails } from '@/widgets/task-details'
import { TaskProgress } from '@/widgets/task-progress'
import { TaskTable } from '@/widgets/task-table'
import { TasksSearch } from '@/widgets/tasks-search'

import { useHotkeys } from '../model/use-hotkeys'

const TaskListPage: FC = () => {
    const showDetails = useAtomValue(showTaskDetailsAtom)
    const showProgress = useAtomValue(showProgressAtom)
    const layoutAtom = useAtomValue(taskDetailsLayoutAtom)
    const { width: columns, height: rows } = useTerminalDimensions()
    const layout = columns < 90 ? 'vertical' : layoutAtom

    const [selectedList] = useAtom(selectedListAtom)
    const selectedTask = useSelectedTask(selectedList)

    useHotkeys()

    return (
        <RequiredWindowSize minWidth={40} minHeight={28}>
            <box style={{ flexDirection: 'column', paddingLeft: 1, paddingRight: 1, paddingTop: 0, flexGrow: 1 }}>
                <box style={{ flexDirection: 'row' }}>
                    <TasksSearch style={{ flexGrow: 1 }} />
                    <ClaudeList style={{ width: columns > 90 ? 40 : 15, paddingLeft: 1 }} />
                </box>

                <box style={{ flexGrow: 1, flexDirection: layout === 'horizontal' ? 'row' : 'column' }}>
                    <TaskTable style={{ flexGrow: 1, flexBasis: 1 }} />
                    {showDetails && !!selectedTask && (
                        <box style={{ flexDirection: 'column', flexGrow: 1, flexBasis: 1 }}>
                            <TaskDetails style={{ flexGrow: 1 }} />
                            <TaskBlockedBy style={{ visible: showDetails }} />
                            <TaskBlocks style={{ visible: showDetails }} />
                        </box>
                    )}
                </box>

                {showProgress && rows > 35 && <TaskProgress />}
            </box>
        </RequiredWindowSize>
    )
}

export { TaskListPage }
