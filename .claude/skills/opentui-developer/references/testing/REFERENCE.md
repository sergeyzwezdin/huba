# Testing — Index

## Contents

| File | Topic |
|------|-------|
| [setup.md](./setup.md) | Test renderer, Core tests, snapshot testing, test teardown |
| [react-testing.md](./react-testing.md) | `testRender`, React component tests, state testing, describe/beforeEach patterns |
| [interaction.md](./interaction.md) | Simulating key presses, focus testing, conditional rendering, list testing |

## Quick Start

```typescript
// Core
import { createTestRenderer } from "@opentui/core/testing"
const testSetup = await createTestRenderer({ width: 80, height: 24 })

// React
import { testRender } from "@opentui/react/test-utils"
const testSetup = await testRender(<MyComponent />, { width: 80, height: 24 })

// Both return:
// testSetup.renderer      — headless renderer
// testSetup.renderOnce()  — trigger a render cycle (await this!)
// testSetup.captureCharFrame()  — snapshot as string
// testSetup.resize(w, h)  — resize virtual terminal
```

## Always Destroy After Tests

```typescript
afterEach(() => {
  if (testSetup) testSetup.renderer.destroy()
})
```

## Updating Snapshots

```bash
bun test --update-snapshots
```

## Running Tests

```bash
bun test                            # All tests
bun test src/components/Button.test.tsx  # Single file
bun test --filter "Button"          # Filter by name
bun test --watch                    # Watch mode
bun test --verbose                  # Verbose output
```
