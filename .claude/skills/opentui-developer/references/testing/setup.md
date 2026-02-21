# Testing — Setup & Core Tests

## Test Renderer

```typescript
import { createTestRenderer } from "@opentui/core/testing"

const testSetup = await createTestRenderer({
  width: 80,     // Terminal width (use consistent values for stable snapshots)
  height: 24,    // Terminal height
})
```

## Basic Core Test

```typescript
import { test, expect } from "bun:test"
import { createTestRenderer } from "@opentui/core/testing"
import { TextRenderable } from "@opentui/core"

test("renders text", async () => {
  const testSetup = await createTestRenderer({ width: 40, height: 10 })

  const text = new TextRenderable(testSetup.renderer, {
    id: "greeting",
    content: "Hello, World!",
  })
  testSetup.renderer.root.add(text)

  await testSetup.renderOnce()  // Required before capturing!

  expect(testSetup.captureCharFrame()).toContain("Hello, World!")
})
```

## Snapshot Test

```typescript
import { test, expect, afterEach } from "bun:test"
import { createTestRenderer } from "@opentui/core/testing"

let testSetup: Awaited<ReturnType<typeof createTestRenderer>>

afterEach(() => {
  if (testSetup) testSetup.renderer.destroy()
})

test("component matches snapshot", async () => {
  testSetup = await createTestRenderer({ width: 40, height: 10 })

  const box = new BoxRenderable(testSetup.renderer, {
    id: "box",
    border: true,
    width: 20, height: 5,
  })
  box.add(new TextRenderable(testSetup.renderer, { content: "Content" }))
  testSetup.renderer.root.add(box)

  await testSetup.renderOnce()

  expect(testSetup.captureCharFrame()).toMatchSnapshot()
})
```

## Snapshot Format

Snapshots capture rendered terminal output as text:

```
┌──────────────────┐
│ Hello, World!    │
│                  │
└──────────────────┘
```

## Key Rules

- Always `await testSetup.renderOnce()` before `captureCharFrame()`
- Always destroy the renderer in `afterEach` to avoid resource leaks
- Use consistent `width`/`height` values for stable snapshots
- Run tests from the correct package directory
