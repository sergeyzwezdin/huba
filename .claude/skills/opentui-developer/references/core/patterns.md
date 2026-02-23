# Core Patterns — Index

## Contents

| File | Topic |
|------|-------|
| [patterns-composition.md](./patterns-composition.md) | Imperative/declarative composition, factory functions, focus delegation |
| [patterns-events.md](./patterns-events.md) | Keyboard, component, and mouse event handling |
| [patterns-focus.md](./patterns-focus.md) | Focus management with FocusProvider and useFocus hooks |
| [patterns-lifecycle.md](./patterns-lifecycle.md) | Cleanup, dynamic updates, debugging |

## Quick Reference

### Compose UI

```typescript
// Imperative
const box = new BoxRenderable(renderer, { id: "box", flexDirection: "column" })
box.add(new TextRenderable(renderer, { id: "text", content: "Hello" }))
renderer.root.add(box)

// Declarative (Constructs)
renderer.root.add(Box({ flexDirection: "column" }, Text({ content: "Hello" })))
```

### Handle keyboard

```typescript
renderer.keyInput.on("keypress", (key) => {
  if (key.name === "escape") renderer.destroy()
  if (key.ctrl && key.name === "s") save()
})
```

### Cleanup on exit

```typescript
const renderer = await createCliRenderer({
  onDestroy: () => { clearAllIntervals() },
})
```
