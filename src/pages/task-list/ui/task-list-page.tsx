import type { FC } from 'react'

import { RequiredWindowSize } from '@/shared/ui/required-window-size'
import { ClaudeList } from '@/widgets/claude-list'
import { Footer } from '@/widgets/footer'
import { TaskBlockedBy } from '@/widgets/task-blocked-by'
import { TaskBlocks } from '@/widgets/task-blocks'
import { TaskDetails } from '@/widgets/task-details'
import { TaskProgress } from '@/widgets/task-progress'
import { TaskTable } from '@/widgets/task-table'
import { TasksSearch } from '@/widgets/tasks-search'

import '@/entities/task/ui/task-select'

import { useAtom, useAtomValue } from 'jotai'

import { selectedListAtom } from '@/entities/claude-list'
import { selectedTaskIdAtom, useSelectedTask } from '@/entities/task'
import { fullScreenAtom, showTaskDetailsAtom, taskDetailsLayoutAtom } from '@/shared/settings'
import { NoTaskSelected } from '@/shared/ui/placeholders'

const TaskListPage: FC = () => {
    const fullScreen = useAtomValue(fullScreenAtom)
    const showDetails = useAtomValue(showTaskDetailsAtom)
    const layout = useAtomValue(taskDetailsLayoutAtom)

    const [selectedList] = useAtom(selectedListAtom)
    const selectedTask = useSelectedTask(selectedList)

    return (
        <RequiredWindowSize minWidth={70} minHeight={5}>
            <box style={{ flexDirection: 'column', paddingLeft: 1, paddingRight: 1, paddingTop: 0, flexGrow: 1 }}>
                <box
                    style={{
                        flexDirection: 'row',
                        flexGrow: fullScreen === 'lists' ? 1 : undefined,
                        visible: !fullScreen || fullScreen === 'lists',
                    }}>
                    <TasksSearch style={{ flexGrow: 1, visible: !fullScreen }} />
                    <ClaudeList
                        style={{
                            width: !fullScreen ? 40 : undefined,
                            flexGrow: fullScreen === 'lists' ? 1 : undefined,
                            paddingLeft: 1,
                        }}
                    />
                </box>
                <box
                    style={{
                        flexGrow: 1,
                        flexDirection: layout === 'horizontal' ? 'row' : 'column',
                        visible: !fullScreen || fullScreen === 'task-details',
                    }}>
                    <TaskTable style={{ flexGrow: 1, flexBasis: 1, visible: !fullScreen }} />
                    {showDetails && !!selectedTask && <TaskListDetails />}
                </box>
                {fullScreen !== 'lists' && <TaskProgress />}
                <Footer />
            </box>
        </RequiredWindowSize>
    )
}

const TaskListDetails: FC = () => {
    const selectedTaskId = useAtomValue(selectedTaskIdAtom)
    const showDetails = useAtomValue(showTaskDetailsAtom)
    const fullScreen = useAtomValue(fullScreenAtom)

    return selectedTaskId ? (
        <box style={{ flexDirection: 'column', flexGrow: 1, flexBasis: 1 }}>
            <TaskDetails style={{ flexGrow: 1 }} />
            {!fullScreen && (
                <>
                    <TaskBlockedBy style={{ visible: showDetails }} />
                    <TaskBlocks style={{ visible: showDetails }} />
                </>
            )}
        </box>
    ) : (
        <NoTaskSelected />
    )
}

export { TaskListPage }
