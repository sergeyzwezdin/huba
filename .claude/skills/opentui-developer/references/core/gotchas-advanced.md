# Core Gotchas — Errors, Performance & Testing

## Contents

- [Common Errors](#common-errors) — undefined errors, layout, colors
- [Performance](#performance) — batching, tree depth, display:none
- [Testing](#testing) — test runner, commands
- [Keyboard Handling](#keyboard-handling) — key names, event types

---

## Common Errors

### "Cannot read properties of undefined"

Renderable not added to the tree:

```typescript
// WRONG - not in tree
const text = new TextRenderable(renderer, { content: "Hello" })
// text.someMethod() — may fail

// CORRECT
const text = new TextRenderable(renderer, { content: "Hello" })
renderer.root.add(text)
text.someMethod()
```

### Layout Not Updating

Force recalculation after changing layout properties:

```typescript
box.setWidth(newWidth)
renderer.requestRender()
```

### Text Overflow/Clipping

Text doesn't wrap without explicit width:

```typescript
// May overflow
const text = new TextRenderable(renderer, {
  content: "Very long text...",
})

// Contained
const text = new TextRenderable(renderer, {
  content: "Very long text...",
  width: 40,
})
```

### Colors Not Showing

```typescript
// CORRECT formats
fg: "#FF0000"
fg: "red"
fg: RGBA.fromHex("#FF0000")

// WRONG
fg: "FF0000"    // Missing #
fg: 0xFF0000    // Number not supported
```

---

## Performance

### Avoid Frequent Render Calls

OpenTUI batches automatically, but minimize separate update calls:

```typescript
// Less efficient
item1.setContent("a")
item2.setContent("b")
item3.setContent("c")

// Better — single pass
items.forEach((item, i) => item.setContent(data[i]))
```

### Minimize Tree Depth

Deep nesting impacts layout calculation:

```typescript
// WRONG — unnecessary wrappers
Box({}, Box({}, Box({}, Text({ content: "Hello" }))))

// CORRECT
Box({}, Text({ content: "Hello" }))
```

### Use display:none for Visibility Toggling

```typescript
// Better than remove/add
element.setDisplay("none")   // Hidden
element.setDisplay("flex")   // Visible
```

---

## Testing

### Test Runner

Use Bun's test runner:

```typescript
import { test, expect, beforeEach, afterEach } from "bun:test"

test("my test", () => {
  expect(1 + 1).toBe(2)
})
```

### Run Tests

```bash
# From package directory
cd packages/core
bun test

# For native tests
bun run test:native

# Filter
bun test --filter "component name"
bun run test:native -Dtest-filter="test name"
```

---

## Keyboard Handling

### Key Names

```typescript
// Letters/numbers: "a"-"z", "1"-"0"

// Special keys
"escape", "enter", "return", "tab", "backspace", "delete"
"up", "down", "left", "right"
"home", "end", "pageup", "pagedown"
"f1"-"f12", "space"

// Modifiers (boolean props on KeyEvent)
key.ctrl
key.shift
key.meta    // Alt
key.option  // Option (macOS)
```

### Key Event Types

```typescript
renderer.keyInput.on("keypress", (key) => {
  // key.eventType: "press" | "release" | "repeat"
  if (key.eventType === "repeat") {
    // Key being held
  }
})
```
