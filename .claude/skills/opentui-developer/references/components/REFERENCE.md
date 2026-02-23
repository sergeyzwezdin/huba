# OpenTUI Components

Reference for all OpenTUI components, organized by category. Components are available in both Core and React with slight API differences.

## When to Use

Use this reference when you need to find the right component category or compare naming across Core and React.

## Component Categories

| Category | Components | Entry Point | Sub-files |
|----------|------------|-------------|-----------|
| Text & Display | text, ascii-font, styled text | [text-display.md](./text-display.md) | — |
| Containers | box, scrollbox, borders | [containers.md](./containers.md) | — |
| Inputs — Text | input, textarea | [inputs.md](./inputs.md) | [inputs-text.md](./inputs-text.md) |
| Inputs — Select | select, tab-select, forms | [inputs.md](./inputs.md) | [inputs-select.md](./inputs-select.md) |
| Code & Diff | code, line-number, diff, markdown | [code-diff.md](./code-diff.md) | [code-syntax.md](./code-syntax.md), [diff.md](./diff.md) |

## Component Chooser

```
Need a component?
├─ Styled text or ASCII art -> text-display.md
├─ Containers, borders, scrolling -> containers.md
├─ Text entry (input/textarea) -> inputs-text.md
├─ Selection (select/tab-select/forms) -> inputs-select.md
├─ Code blocks, line numbers, markdown -> code-syntax.md
└─ Side-by-side or unified diff -> diff.md
```

## Component Naming

Components have different names across frameworks:

| Concept | Core (Class) | React (JSX) |
|---------|--------------|-------------|
| Text | `TextRenderable` | `<text>` |
| Box | `BoxRenderable` | `<box>` |
| ScrollBox | `ScrollBoxRenderable` | `<scrollbox>` |
| Input | `InputRenderable` | `<input>` |
| Textarea | `TextareaRenderable` | `<textarea>` |
| Select | `SelectRenderable` | `<select>` |
| Tab Select | `TabSelectRenderable` | `<tab-select>` |
| ASCII Font | `ASCIIFontRenderable` | `<ascii-font>` |
| Code | `CodeRenderable` | `<code>` |
| Line Number | `LineNumberRenderable` | `<line-number>` |
| Diff | `DiffRenderable` | `<diff>` |
| Markdown | `MarkdownRenderable` | `<markdown>` |

## Common Properties

All components share these layout properties (see [Layout](../layout/REFERENCE.md)):

```tsx
// Positioning
position="relative" | "absolute"
left, top, right, bottom

// Dimensions
width, height
minWidth, maxWidth, minHeight, maxHeight

// Flexbox
flexDirection, flexGrow, flexShrink, flexBasis
justifyContent, alignItems, alignSelf
flexWrap, gap

// Spacing
padding, paddingTop, paddingRight, paddingBottom, paddingLeft
paddingX, paddingY              // Axis shorthand (horizontal/vertical)
margin, marginTop, marginRight, marginBottom, marginLeft
marginX, marginY                // Axis shorthand (horizontal/vertical)

// Display
display="flex" | "none"
overflow="visible" | "hidden" | "scroll"
zIndex
```

## Quick Examples

### Core (Imperative)

```typescript
import { createCliRenderer, TextRenderable, BoxRenderable } from "@opentui/core"

const renderer = await createCliRenderer()

const box = new BoxRenderable(renderer, {
  id: "container",
  border: true,
  padding: 2,
})

const text = new TextRenderable(renderer, {
  id: "greeting",
  content: "Hello!",
  fg: "#00FF00",
})

box.add(text)
renderer.root.add(box)
```

### React

```tsx
import { createCliRenderer } from "@opentui/core"
import { createRoot } from "@opentui/react"

import type { FC } from "react"

const App: FC = () => {
  return (
    <box border padding={2}>
      <text fg="#00FF00">Hello!</text>
    </box>
  )
}

const renderer = await createCliRenderer()
createRoot(renderer).render(<App />)
```

## See Also

- [Core API](../core/api.md) - Imperative component classes
- [React API](../react/api.md) - React component props
- [Layout](../layout/REFERENCE.md) - Layout system details
