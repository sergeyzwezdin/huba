import { type ComponentProps, type FC, useMemo } from 'react'

import { useTheme } from '@/shared/settings'
import { Progress as ProgressBar } from '@/shared/ui/progress'

import { useProgress } from '../model/use-progress'

type TaskProgressProps = ComponentProps<typeof ProgressBar>

const TaskProgress: FC<TaskProgressProps> = (props) => {
    const { theme } = useTheme()
    const values = useProgress()

    const items = useMemo(
        () => [
            { title: 'Blocked', color: theme.progress.blocked, value: values.items.blocked },
            { title: 'Pending', color: theme.progress.pending, value: values.items.pending },
            { title: 'In Progress', color: theme.progress.inProgress, value: values.items.inProgress },
            { title: 'Completed', color: theme.progress.completed, value: values.items.completed },
        ],
        [values, theme],
    )

    return <ProgressBar items={items} emptyColor={theme.progress.pending} {...props} />
}

export { TaskProgress }
export type { TaskProgressProps }
