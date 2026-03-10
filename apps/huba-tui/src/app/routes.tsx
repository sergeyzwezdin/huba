import { createMemoryRouter } from 'react-router'

import { ClaudeListPage } from '@/pages/claude-list'
import { NotFoundPage } from '@/pages/not-found'
import { SettingsPage } from '@/pages/settings'
import { TaskDetailsPage } from '@/pages/task-details'
import { TaskListPage } from '@/pages/task-list'
import { Layout } from '@/widgets/layout'

import { withPageProviders } from './with-page-providers'

// Wrapped page components

const TaskList = withPageProviders(TaskListPage)
const TaskDetails = withPageProviders(TaskDetailsPage)
const ClaudeList = withPageProviders(ClaudeListPage)
const Settings = withPageProviders(SettingsPage)

// Router

const router = createMemoryRouter(
    [
        {
            path: '/',
            element: <Layout />,
            children: [
                { index: true, element: <TaskList /> },
                { path: 'claude-list', element: <ClaudeList /> },
                { path: 'task-details', element: <TaskDetails /> },
                { path: 'settings', element: <Settings /> },
                { path: '*', element: <NotFoundPage /> },
            ],
        },
    ],
    { initialEntries: ['/'] },
)

export { router }
