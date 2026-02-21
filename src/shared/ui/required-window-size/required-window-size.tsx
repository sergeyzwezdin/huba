import type { FC, ReactNode } from 'react'

import { useTerminalDimensions } from '@opentui/react'

import { WindowTooSmall } from './window-too-small'

type RequiredWindowSizeProps = {
    minWidth: number
    minHeight: number
    children: ReactNode
}

const RequiredWindowSize: FC<RequiredWindowSizeProps> = ({ minWidth, minHeight, children }) => {
    const { width: columns, height: rows } = useTerminalDimensions()

    if (columns < minWidth || rows < minHeight) return <WindowTooSmall />

    return children
}

export { RequiredWindowSize }
