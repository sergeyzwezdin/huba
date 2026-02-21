import { type ComponentProps, type FC, useMemo } from 'react'

import { useTheme } from '@/shared/settings'
import { Panel } from '@/shared/ui/panel'
import { Progress as ProgressBar } from '@/shared/ui/progress'

import { useProgress } from '../model/use-values'

type ProgressProps = Pick<ComponentProps<typeof Panel>, 'style'>

const Progress: FC<ProgressProps> = (props) => {
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

    return (
        <Panel
            focusable
            {...props}
            title={[' Progress ', `(${values.items.completed}/${values.total})`, `[${values.progress}%]`]}
            style={{
                ...props.style,
                titleAlignment: 'center',
                paddingLeft: 1,
                paddingRight: 1,
            }}>
            <ProgressBar items={items} emptyColor={theme.progress.pending} style={{ flexGrow: 1 }} />
        </Panel>
    )
}

export { Progress }
