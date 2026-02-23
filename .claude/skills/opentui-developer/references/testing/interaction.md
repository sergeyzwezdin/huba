# Testing — Interaction & Patterns

## Simulating Key Presses

```typescript
import { createTestRenderer } from "@opentui/core/testing"

test("responds to keyboard", async () => {
  testSetup = await createTestRenderer({ width: 40, height: 10 })

  // ... setup component ...

  // Simulate keypress
  testSetup.renderer.keyInput.emit("keypress", {
    name: "enter",
    sequence: "\r",
    ctrl: false,
    shift: false,
    meta: false,
    option: false,
    eventType: "press",
    repeated: false,
  })

  await testSetup.renderOnce()
  expect(testSetup.captureCharFrame()).toContain("Selected")
})
```

## Testing Focus

```typescript
test("input receives focus", async () => {
  testSetup = await createTestRenderer({ width: 40, height: 10 })

  const input = new InputRenderable(testSetup.renderer, {
    id: "test-input",
    placeholder: "Type here",
  })
  testSetup.renderer.root.add(input)
  input.focus()

  expect(input.isFocused()).toBe(true)
})
```

## Testing Lists

```tsx
test("renders all items", async () => {
  const items = ["Apple", "Banana", "Cherry"]

  testSetup = await testRender(
    <ItemList items={items} />,
    { width: 40, height: 10 }
  )

  await testSetup.renderOnce()
  const frame = testSetup.captureCharFrame()

  items.forEach(item => expect(frame).toContain(item))
})
```

## Layout Snapshot

```tsx
test("matches layout snapshot", async () => {
  testSetup = await testRender(
    <AppLayout />,
    { width: 120, height: 40 }  // Larger viewport for layout tests
  )

  await testSetup.renderOnce()
  expect(testSetup.captureCharFrame()).toMatchSnapshot()
})
```

## Test Return Object Reference

| Property | Type | Description |
|----------|------|-------------|
| `renderer` | `Renderer` | Headless renderer instance |
| `renderOnce` | `() => Promise<void>` | Trigger one render cycle |
| `captureCharFrame` | `() => string` | Capture output as text |
| `resize` | `(w, h) => void` | Resize virtual terminal |
