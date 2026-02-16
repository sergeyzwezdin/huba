import type { FC, ReactNode } from 'react'

import { useDimensions } from '@/shared/lib'

import { WindowTooSmall } from './window-too-small'

type RequiredWindowSizeProps = {
    minWidth: number
    minHeight: number
    children: ReactNode
}

const RequiredWindowSize: FC<RequiredWindowSizeProps> = ({ minWidth, minHeight, children }) => {
    const { columns, rows } = useDimensions()

    if (columns < minWidth || rows < minHeight) return <WindowTooSmall />

    return <>{children}</>
}

export { RequiredWindowSize }
