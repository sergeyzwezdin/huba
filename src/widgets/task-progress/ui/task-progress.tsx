import type { ComponentProps, FC } from 'react'

import { TaskProgress as TaskProgressBase, useProgress } from '@/entities/task'
import { Panel } from '@/shared/ui/panel'

type TaskProgressProps = Pick<ComponentProps<typeof Panel>, 'style'>

const TaskProgress: FC<TaskProgressProps> = (props) => {
    const values = useProgress()

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
            <TaskProgressBase style={{ flexGrow: 1 }} />
        </Panel>
    )
}

export { TaskProgress }
