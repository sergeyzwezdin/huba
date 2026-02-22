import type { FC, RefObject } from 'react'

import { type BoxRenderable, TextAttributes } from '@opentui/core'

import { useKeyboard } from '@/shared/keyboard'
import { useTheme } from '@/shared/settings'
import { useDoubleClick } from '@/shared/ui/input/mouse'

type ListOption<T extends string> = {
    value: T
    label: string
}

type ListProps<T extends string> = {
    options: ListOption<T>[]
    value: T
    onChange: (value: T) => void
    isFocused: boolean
    focusRef: RefObject<BoxRenderable | null>
}

const List = <T extends string>({ options, value, onChange, isFocused, focusRef }: ListProps<T>): ReturnType<FC> => {
    const { theme } = useTheme()
    const handleMouseDown = useDoubleClick(onChange)

    useKeyboard((key) => {
        if (!isFocused) return
        const currentIndex = options.findIndex((o) => o.value === value)

        if (['up', 'k'].includes(key.name)) {
            const prevIndex = (currentIndex - 1 + options.length) % options.length
            onChange(options[prevIndex].value)
        } else if (['down', 'j'].includes(key.name)) {
            const nextIndex = (currentIndex + 1) % options.length
            onChange(options[nextIndex].value)
        }
    })

    return (
        <box
            ref={focusRef}
            focusable
            focused={isFocused}
            style={{
                borderStyle: 'rounded',
                borderColor: isFocused ? theme.border.focused : theme.border.default,
                focusedBorderColor: theme.border.focused,
                paddingLeft: 1,
                paddingRight: 1,
                flexDirection: 'column',
            }}>
            {options.map((option) => (
                // biome-ignore lint/a11y/noStaticElementInteractions: mouse click
                <text
                    key={option.value}
                    style={{
                        fg: option.value === value ? theme.colors.primary : theme.colors.secondary,
                    }}
                    attributes={option.value === value ? TextAttributes.BOLD : undefined}
                    onMouseDown={() => handleMouseDown(option.value)}>
                    {option.value === value ? `▸ ${option.label}` : `  ${option.label}`}
                </text>
            ))}
        </box>
    )
}

export { List, type ListOption }
