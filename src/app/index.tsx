import type { FC, PropsWithChildren } from 'react'

import { useAppQuit } from '@/shared/lib'

import { Providers } from './providers'

const App: FC<PropsWithChildren> = ({ children }) => {
    useAppQuit()

    return <Providers>{children}</Providers>
}

export { App }
