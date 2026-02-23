import { type FC, useRef } from 'react'

import type { ScrollBoxRenderable } from '@opentui/core'
import { useAtomValue } from 'jotai'

import { selectedListAtom } from '@/entities/claude-list'
import { useSelectedTask } from '@/entities/task'
import { NoTaskSelected } from '@/shared/ui/placeholders'
import { TaskBlockedBy } from '@/widgets/task-blocked-by'
import { TaskBlocks } from '@/widgets/task-blocks'
import { TaskDetails } from '@/widgets/task-details'

import { useHotkeys } from '../model/use-hotkeys'

const TaskDetailsPage: FC = () => {
    const scrollRef = useRef<ScrollBoxRenderable>(null)

    const selectedList = useAtomValue(selectedListAtom)
    const selectedTask = useSelectedTask(selectedList)

    useHotkeys(scrollRef)

    return (
        <box style={{ flexDirection: 'column', paddingLeft: 1, paddingRight: 1, paddingTop: 0, flexGrow: 1 }}>
            <box style={{ flexDirection: 'column', flexGrow: 1, flexBasis: 1 }}>
                {selectedTask ? (
                    <>
                        <TaskDetails autoFocus={true} style={{ flexGrow: 1 }} />
                        <TaskBlockedBy />
                        <TaskBlocks />
                    </>
                ) : (
                    <NoTaskSelected />
                )}
            </box>
        </box>
    )
}
export { TaskDetailsPage }
