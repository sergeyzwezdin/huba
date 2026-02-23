import type { FC, RefObject } from 'react'

import { type BoxRenderable, TextAttributes } from '@opentui/core'
import type { BoxProps } from '@opentui/react'

import { useKeyboard } from '@/shared/keyboard'
import { useTheme } from '@/shared/settings'
import { useDoubleClick } from '@/shared/ui/input/mouse'

type SelectorOption<T extends string> = {
    value: T
    label: string
}

type SelectorProps<T extends string> = Omit<BoxProps, 'ref' | 'focusable' | 'focused'> & {
    options: SelectorOption<T>[]
    value: T
    onChange: (value: T) => void
    isFocused: boolean
    focusRef: RefObject<BoxRenderable | null>
}

const Selector = <T extends string>({
    options,
    value,
    onChange,
    isFocused,
    focusRef,
    ...boxProps
}: SelectorProps<T>): ReturnType<FC> => {
    const { theme } = useTheme()
    const handleMouseDown = useDoubleClick(onChange)

    useKeyboard((key) => {
        if (!isFocused) return

        const currentIndex = options.findIndex((o) => o.value === value)
        if (['return', 'j', 'l', 'right', 'down'].includes(key.name)) {
            const nextIndex = (currentIndex + 1) % options.length
            onChange(options[nextIndex].value)
        } else if (['k', 'h', 'left', 'up'].includes(key.name)) {
            const prevIndex = (currentIndex - 1 + options.length) % options.length
            onChange(options[prevIndex].value)
        }
    })

    return (
        <box
            ref={focusRef}
            focusable
            focused={isFocused}
            {...boxProps}
            style={{
                borderStyle: 'rounded',
                borderColor: isFocused ? theme.border.focused : theme.border.default,
                focusedBorderColor: theme.border.focused,
                paddingLeft: 1,
                paddingRight: 1,
                flexDirection: 'row',
                ...boxProps.style,
            }}>
            {options.flatMap((option, index) => [
                ...(index > 0
                    ? [
                          <text key={`sep-${option.value}`} style={{ fg: theme.colors.secondary }}>
                              {' | '}
                          </text>,
                      ]
                    : []),
                // biome-ignore lint/a11y/noStaticElementInteractions: mouse click
                <text
                    key={option.value}
                    style={{
                        fg: option.value === value ? theme.colors.primary : theme.colors.secondary,
                    }}
                    attributes={option.value === value ? TextAttributes.BOLD : undefined}
                    onMouseDown={() => handleMouseDown(option.value)}>
                    {option.label}
                </text>,
            ])}
        </box>
    )
}

export { Selector, type SelectorOption }
