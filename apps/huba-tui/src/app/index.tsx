import type { FC } from 'react'
import { RouterProvider } from 'react-router'

import { useAppQuit } from '@/shared/lib'

import { Providers } from './providers'
import { router } from './routes'

const App: FC = () => {
    useAppQuit()

    return (
        <Providers>
            <RouterProvider router={router} />
        </Providers>
    )
}

export { App }
