import { forwardRef, useMemo } from 'react'
import './task-select.renderable'

import type { ExtendedComponentProps } from '@opentui/react'

import { useTheme } from '@/shared/settings'

import type { TaskSelectRenderable } from './task-select.renderable'
import type { TaskSelectOption } from './types'

type TaskSelectProps = Omit<
    ExtendedComponentProps<typeof TaskSelectRenderable>,
    'theme' | 'selectedId' | 'optionsById' | 'indexById' | 'maxIdLen'
> & {
    focused?: boolean
    selectedItem?: string
}

export const TaskSelect = forwardRef<TaskSelectRenderable, TaskSelectProps>((props, ref) => {
    const { theme } = useTheme()
    const { selectedItem, options, ...rest } = props

    const optionsById = useMemo(
        () => Object.fromEntries((options ?? []).map((opt) => [opt.id, opt])) as Record<string, TaskSelectOption>,
        [options],
    )

    const indexById = useMemo(
        () => Object.fromEntries((options ?? []).map((opt, i) => [opt.id, i])) as Record<string, number>,
        [options],
    )

    const maxIdLen = useMemo(() => (options ?? []).reduce((max, opt) => Math.max(max, opt.id.length), 0), [options])

    return (
        <task-select
            ref={ref}
            {...rest}
            options={options}
            optionsById={optionsById}
            indexById={indexById}
            maxIdLen={maxIdLen}
            selectedId={selectedItem}
            theme={theme}
        />
    )
})
