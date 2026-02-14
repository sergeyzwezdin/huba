#!/usr/bin/env bun

import { render } from 'ink'

import { App } from './src/app'

const { waitUntilExit } = render(<App />)

await waitUntilExit()
