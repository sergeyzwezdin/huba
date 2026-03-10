import { type FC, type ReactNode, useCallback, useEffect, useId, useRef, useState } from 'react'

import type { BoxRenderable, OptimizedBuffer, Renderable } from '@opentui/core'
import type { BoxProps } from '@opentui/react'

import { useTheme } from '@/shared/settings'

import { useFormContext } from './form-context'

const WIDE_THRESHOLD = 70

const getOffsetY = (node: Renderable, ancestor: Renderable): number => {
    let y = 0
    let current: Renderable | null = node
    while (current && current !== ancestor) {
        y += current.y
        current = current.parent
    }
    return y
}

type FormFieldProps = BoxProps & {
    children?: ReactNode
    title: string
    hint?: string
    isFocused?: boolean
}

const FormField: FC<FormFieldProps> = ({ children, title, hint, isFocused = false, ...props }) => {
    const id = useId()
    const { theme } = useTheme()
    const context = useFormContext()

    const [isWide, setIsWide] = useState(false)
    const prevWidthRef = useRef<number | null>(null)

    useEffect(() => {
        context?.registerTitle(id, title.length + 1)
        return () => context?.unregisterTitle(id)
    }, [id, title, context])

    const needsScrollRef = useRef(false)
    const prevFocusedRef = useRef(false)

    if (isFocused && !prevFocusedRef.current) {
        needsScrollRef.current = true
    }
    prevFocusedRef.current = isFocused

    const titleWidth = context?.maxTitleWidth ?? title.length + 1

    const scrollRefRef = useRef(context?.scrollRef)
    scrollRefRef.current = context?.scrollRef

    const renderAfter = useCallback(function (this: BoxRenderable, _buffer: OptimizedBuffer) {
        if (this.width !== prevWidthRef.current) {
            prevWidthRef.current = this.width
            setIsWide(this.width > WIDE_THRESHOLD)
        }

        if (!needsScrollRef.current) return
        needsScrollRef.current = false

        const scrollBox = scrollRefRef.current?.current
        if (!scrollBox) return

        const content = scrollBox.content
        const fieldY = getOffsetY(this, content)
        const fieldHeight = this.height
        const scrollTop = scrollBox.scrollTop
        const viewportHeight = scrollBox.viewport.height

        if (fieldY < scrollTop) {
            scrollBox.scrollTo(fieldY)
        } else if (fieldY + fieldHeight + 1 > scrollTop + viewportHeight) {
            scrollBox.scrollTo(fieldY + fieldHeight + 1 - viewportHeight)
        }
    }, [])

    return (
        <box
            style={{
                flexDirection: isWide ? 'row' : 'column',
                rowGap: 0,
                columnGap: 2,
            }}
            renderAfter={renderAfter}
            {...props}>
            <box style={{ width: titleWidth, flexShrink: 0, paddingTop: 1 }}>
                <text style={{ fg: isFocused ? theme.colors.primary : theme.colors.secondary }}>
                    {isFocused ? <u>{title}</u> : title}:
                </text>
            </box>
            <box
                style={{
                    flexGrow: 1,
                    flexDirection: 'column',
                }}>
                {children}

                {!!hint && <text style={{ fg: theme.colors.hint, opacity: 0.7, marginLeft: 2 }}>{hint}</text>}
            </box>
        </box>
    )
}

export { FormField }
export type { FormFieldProps }
