import type { FC } from 'react'
import './progress.renderable'

import type { ExtendedComponentProps } from '@opentui/react'

import type { ProgressRenderable } from './progress.renderable'

type ProgressProps = ExtendedComponentProps<typeof ProgressRenderable>

const Progress: FC<ProgressProps> = (props) => (
    <box style={{ height: 1, overflow: 'hidden' }}>
        <progress-bar {...props} />
    </box>
)

export { Progress }
