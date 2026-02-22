import { forwardRef } from 'react'

import type { ScrollBoxRenderable } from '@opentui/core'
import { TextAttributes } from '@opentui/core'

import type { Task, TaskStatus } from '@/shared/domain'
import { useTheme } from '@/shared/settings'
import { Markdown } from '@/shared/ui/markdown'

const STATUS_LABEL: Record<TaskStatus, string> = {
    pending: 'Pending',
    in_progress: 'In Progress',
    completed: 'Completed',
    blocked: 'Blocked',
}

type TaskDetailsViewProps = {
    task: Task
}

const TaskDetailsView = forwardRef<ScrollBoxRenderable, TaskDetailsViewProps>(({ task }, ref) => {
    const { theme } = useTheme()

    return (
        <>
            <box style={{ flexDirection: 'row', paddingBottom: 1, gap: 1 }}>
                <box style={{ flexShrink: 0 }}>
                    <text fg={theme.colors.accent} attributes={TextAttributes.DIM}>
                        <strong>#{task.id}</strong>
                    </text>
                </box>
                <box style={{ flexGrow: 1 }}>
                    <text fg={theme.colors.primary}>
                        <u>{task.subject}</u>
                    </text>
                </box>
            </box>
            <box style={{ flexDirection: 'row', paddingBottom: 1, gap: 1 }}>
                <box style={{ flexShrink: 0 }}>
                    <text fg={theme.colors.secondary}>Status:</text>
                </box>
                <box style={{ flexGrow: 1 }}>
                    <text fg={theme.colors.primary}>{STATUS_LABEL[task.status]}</text>
                </box>
            </box>
            <scrollbox
                ref={ref}
                focusable={false}
                scrollbarOptions={{
                    showArrows: false,
                    trackOptions: {
                        foregroundColor: theme.surface.scrollbarThumb,
                        backgroundColor: theme.surface.scrollbarTrack,
                    },
                }}
                style={{
                    padding: 0,
                    flexGrow: 1,
                    flexShrink: 1,
                    flexBasis: 0,
                    titleAlignment: 'center',
                }}>
                <Markdown>{task.description}</Markdown>
                <Markdown>{task.description}</Markdown>
                <Markdown>{task.description}</Markdown>
                <Markdown>{task.description}</Markdown>
                <Markdown>{task.description}</Markdown>
                <Markdown>{task.description}</Markdown>
                <Markdown>{task.description}</Markdown>
                <Markdown>{task.description}</Markdown>
                <Markdown>{task.description}</Markdown>
                <Markdown>{task.description}</Markdown>
                <Markdown>{task.description}</Markdown>
                <Markdown>{task.description}</Markdown>
                <Markdown>{task.description}</Markdown>
                <Markdown>{task.description}</Markdown>
                <Markdown>{task.description}</Markdown>
                <Markdown>{task.description}</Markdown>
                <Markdown>{task.description}</Markdown>
                <Markdown>{task.description}</Markdown>
                <Markdown>{task.description}</Markdown>
                <Markdown>{task.description}</Markdown>
            </scrollbox>
        </>
    )
})

export { TaskDetailsView, type TaskDetailsViewProps }
