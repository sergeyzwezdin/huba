#!/usr/bin/env bun

import { render } from 'ink'

import { ListSelectionPage } from '@/pages/list-selection'
import { TaskListPage } from '@/pages/task-list'
import { type RouteConfig, Router } from '@/shared/routing'

import { App } from './src/app'

const routes: RouteConfig[] = [
    {
        name: 'list-selection',
        component: ListSelectionPage,
    },
    {
        name: 'task-list',
        component: TaskListPage,
    },
]

const DEFAULT_ROUTE = process.env.CLAUDE_CODE_TASK_LIST_ID ? 'task-list' : 'list-selection'

const { waitUntilExit } = render(
    <App>
        <Router routes={routes} defaultRoute={DEFAULT_ROUTE} />
    </App>,
)

await waitUntilExit()
