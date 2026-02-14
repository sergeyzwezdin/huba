import type { FC } from 'react'

import { TaskListPage } from '@/pages/task-list'

import { Providers } from './providers'

const App: FC = () => {
    return (
        <Providers>
            <TaskListPage />
        </Providers>
    )
}

export { App }
