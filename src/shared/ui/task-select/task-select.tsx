import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import './task-select.renderable'

import type { ExtendedComponentProps } from '@opentui/react'

import { useTheme } from '@/shared/settings'

import type { TaskSelectRenderable } from './task-select.renderable'

type TaskSelectProps = Omit<ExtendedComponentProps<typeof TaskSelectRenderable>, 'theme'> & {
    focused?: boolean
}

export const TaskSelect = forwardRef<TaskSelectRenderable, TaskSelectProps>((props, ref) => {
    const { theme } = useTheme()
    const internalRef = useRef<TaskSelectRenderable>(null)

    useImperativeHandle(ref, () => internalRef.current!, [])

    useEffect(() => {
        setTimeout(() => {
            internalRef.current?.setSelectedIndex(2)
        }, 500)
    }, [])

    return <task-select ref={internalRef} {...props} theme={theme} />
})
