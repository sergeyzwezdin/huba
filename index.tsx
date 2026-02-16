#!/usr/bin/env bun

import { render } from 'ink'

import { TaskListPage } from '@/pages/task-list'
import { enterAltScreen } from '@/shared/lib'

import { App } from './src/app'

enterAltScreen()

const { waitUntilExit } = render(
    <App>
        <TaskListPage />
    </App>,
)

await waitUntilExit()
