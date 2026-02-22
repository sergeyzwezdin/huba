#!/usr/bin/env bun

import { ConsolePosition, createCliRenderer } from '@opentui/core'
import { createRoot } from '@opentui/react'

import { App } from './src/app'

const renderer = await createCliRenderer({
    exitOnCtrlC: true,
    autoFocus: true,
    useMouse: true,
    consoleOptions: {
        position: ConsolePosition.BOTTOM,
        sizePercent: 30,
    },
})
createRoot(renderer).render(<App />)
