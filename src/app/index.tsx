import type { FC, PropsWithChildren } from 'react'

import { useAppQuit } from '@/shared/lib'

import { FileWatcher } from './file-watcher'
import { Providers } from './providers'

const App: FC<PropsWithChildren> = ({ children }) => {
    useAppQuit()

    return (
        <Providers>
            <FileWatcher>{children}</FileWatcher>
        </Providers>
    )
}

export { App }
