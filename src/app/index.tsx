import type { FC, PropsWithChildren } from 'react'

import { useSettings } from '@/features/settings'
import { useAppQuit } from '@/shared/lib'

import { Providers } from './providers'

const App: FC<PropsWithChildren> = ({ children }) => {
    useAppQuit()
    useSettings()

    return <Providers>{children}</Providers>
}

export { App }
