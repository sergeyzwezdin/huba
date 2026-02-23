# Testing — React Testing

## testRender Utility

```tsx
import { testRender } from "@opentui/react/test-utils"
```

`testRender`:
- Creates a headless test renderer
- Sets up the React Act environment automatically
- Handles proper unmounting on destroy
- Returns the standard test setup object

## Basic Component Test

```tsx
import { test, expect } from "bun:test"
import { testRender } from "@opentui/react/test-utils"

const Greeting: FC<{ name: string }> = ({ name }) => <text>Hello, {name}!</text>

test("Greeting renders name", async () => {
  const testSetup = await testRender(
    <Greeting name="World" />,
    { width: 80, height: 24 }
  )

  await testSetup.renderOnce()
  expect(testSetup.captureCharFrame()).toContain("Hello, World!")
})
```

## Snapshot Test

```tsx
import { test, expect, afterEach } from "bun:test"
import { testRender } from "@opentui/react/test-utils"

let testSetup: Awaited<ReturnType<typeof testRender>>

afterEach(() => {
  if (testSetup) testSetup.renderer.destroy()
})

test("matches snapshot", async () => {
  testSetup = await testRender(
    <box style={{ width: 20, height: 5, border: true }}>
      <text>Content</text>
    </box>,
    { width: 25, height: 8 }
  )

  await testSetup.renderOnce()
  expect(testSetup.captureCharFrame()).toMatchSnapshot()
})
```

## Testing State

```tsx
const Counter: FC = () => {
  const [count, setCount] = useState(0)
  return <box><text>Count: {count}</text></box>
}

test("shows initial value", async () => {
  testSetup = await testRender(<Counter />, { width: 20, height: 5 })
  await testSetup.renderOnce()
  expect(testSetup.captureCharFrame()).toContain("Count: 0")
})
```

## describe / beforeEach Pattern

```tsx
import { describe, test, expect, beforeEach, afterEach } from "bun:test"

let testSetup: Awaited<ReturnType<typeof testRender>>

describe("MyComponent", () => {
  beforeEach(async () => {
    if (testSetup) testSetup.renderer.destroy()
  })
  afterEach(() => {
    if (testSetup) testSetup.renderer.destroy()
  })

  test("renders correctly", async () => {
    testSetup = await testRender(<MyComponent />, { width: 40, height: 10 })
    await testSetup.renderOnce()
    expect(testSetup.captureCharFrame()).toMatchSnapshot()
  })
})
```

## Conditional Rendering

```tsx
test("shows loading", async () => {
  testSetup = await testRender(<DataLoader loading={true} />, { width: 40, height: 10 })
  await testSetup.renderOnce()
  expect(testSetup.captureCharFrame()).toContain("Loading...")
})

test("shows data when loaded", async () => {
  testSetup = await testRender(
    <DataLoader loading={false} data={["Item 1", "Item 2"]} />,
    { width: 40, height: 10 }
  )
  await testSetup.renderOnce()
  const frame = testSetup.captureCharFrame()
  expect(frame).toContain("Item 1")
  expect(frame).toContain("Item 2")
})
```

## Debugging

```tsx
// Print rendered output to see what's there
const frame = testSetup.captureCharFrame()
console.log(frame)  // Shows up outside the TUI since we're in test mode
```
