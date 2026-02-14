#!/usr/bin/env bun

import { render } from 'ink'

import { TaskListPage } from '@/pages/task-list'
import { type RouteConfig, Router } from '@/shared/routing'

import { App } from './src/app'

const routes: RouteConfig[] = [
    {
        name: 'task-list',
        component: TaskListPage,
    },
]

const { waitUntilExit } = render(
    <Router routes={routes} defaultRoute="task-list">
        <App />
    </Router>,
)

await waitUntilExit()
