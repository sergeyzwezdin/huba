# Core API — Index

## Contents

| File | Topic |
|------|-------|
| [renderer.md](./renderer.md) | `createCliRenderer`, renderer instance, console overlay |
| [renderables.md](./renderables.md) | All renderable classes and their props |
| [constructs.md](./constructs.md) | VNode / Construct API, `delegate` |
| [colors.md](./colors.md) | `RGBA` class — creating and using colors |

## Quick Start

```typescript
import { createCliRenderer, TextRenderable, BoxRenderable } from "@opentui/core"

const renderer = await createCliRenderer({ targetFPS: 60 })

const box = new BoxRenderable(renderer, { border: true, padding: 1 })
const text = new TextRenderable(renderer, { content: "Hello" })
box.add(text)
renderer.root.add(box)
```

## Common Renderable Props (all components)

All renderables accept these layout/sizing props:

```typescript
// Dimensions
width, height, minWidth, maxWidth, minHeight, maxHeight

// Flexbox (as container)
flexDirection, flexGrow, flexShrink, flexBasis, flexWrap
justifyContent, alignItems, alignSelf, alignContent, gap

// Spacing
padding, paddingTop/Right/Bottom/Left
margin, marginTop/Right/Bottom/Left

// Positioning
position: "relative" | "absolute"
left, top, right, bottom

// Display
display: "flex" | "none"
overflow: "visible" | "hidden" | "scroll"
zIndex
```

## Keyboard & Animation

These APIs are documented in cross-cutting guides:
- `renderer.keyInput` → [Keyboard](../keyboard/REFERENCE.md)
- `Timeline`, `engine` → [Animation](../animation/REFERENCE.md)
