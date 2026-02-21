# Core Patterns — Lifecycle & Debugging

## Cleanup on Exit

```typescript
const intervals: Timer[] = []

intervals.push(setInterval(() => { updateClock() }, 1000))

// Option 1: onDestroy callback
const renderer = await createCliRenderer({
  onDestroy: () => { intervals.forEach(clearInterval) },
})

// Option 2: process signal
process.on("SIGINT", () => {
  intervals.forEach(clearInterval)
  renderer.destroy()
  process.exit(0)
})
```

**Never call `process.exit()` without `renderer.destroy()` first** — this leaves the terminal in a broken state.

## Responsive Layout

```typescript
const mainPanel = new BoxRenderable(renderer, {
  id: "main",
  width: "100%",
  height: "100%",
  flexDirection: renderer.width > 80 ? "row" : "column",
})

process.stdout.on("resize", () => {
  mainPanel.setFlexDirection(renderer.width > 80 ? "row" : "column")
})
```

## Toggling Visibility

```typescript
// Prefer display:none over remove/add for toggling
element.setDisplay("none")   // Hidden, preserves layout position
element.setDisplay("flex")   // Visible again

// Force layout recalculation after property changes
box.setWidth(newWidth)
renderer.requestRender()
```

## Debugging

```typescript
// Use the console overlay instead of console.log
const renderer = await createCliRenderer({
  consoleOptions: { startInDebugMode: true },
})
renderer.console.show()
console.log("Visible in overlay")

// Toggle with keyboard
renderer.keyInput.on("keypress", (key) => {
  if (key.name === "f12") renderer.console.toggle()
})

// Or write to file
import { appendFileSync } from "node:fs"
const debug = (msg: string) => appendFileSync("debug.log", `${Date.now()} ${msg}\n`)
```

## Performance

```typescript
// Batch updates — items update, single render
items.forEach((item, i) => item.setContent(data[i]))

// Avoid unnecessary wrappers
// WRONG: Box({}, Box({}, Box({}, Text({ content: "Hello" }))))
// RIGHT: Box({}, Text({ content: "Hello" }))
```
