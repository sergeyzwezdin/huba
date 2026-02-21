# Core Constructs (VNode API)

Declarative wrappers that create VNodes instead of direct instances. Cleaner composition without needing a renderer at creation time.

## Basic Usage

```typescript
import { Box, Text, Input, Select } from "@opentui/core"

// Create VNode tree (no renderer needed yet)
const ui = Box(
  { flexDirection: "column", padding: 1 },
  Text({ content: "Header", fg: "#00FF00" }),
  Box(
    { flexDirection: "row", gap: 2 },
    Text({ content: "Name:" }),
    Input({ id: "name", placeholder: "Enter name..." }),
  ),
)

// Attach to renderer (instantiated here)
renderer.root.add(ui)
```

## Constructs vs Renderables

| Renderables (Imperative) | Constructs (Declarative) |
|--------------------------|--------------------------|
| `new TextRenderable(renderer, {...})` | `Text({...})` |
| Requires renderer at creation | Creates VNode, instantiated later |
| Direct mutation via methods | Chained calls recorded, replayed on instantiation |

## delegate

Route `.focus()` and `.blur()` calls to a nested element:

```typescript
import { delegate, Box, Input, Text } from "@opentui/core"

const form = delegate(
  {
    focus: "email-input",  // Route .focus() here
    blur: "email-input",   // Route .blur() here
  },
  Box(
    { border: true, padding: 1 },
    Text({ content: "Email:" }),
    Input({ id: "email-input", placeholder: "you@example.com" }),
  ),
)

form.focus()  // Actually focuses the input, not the box
```

## Available Construct Functions

```typescript
import { Text, Box, Input, Select, instantiate, delegate } from "@opentui/core"
```

All renderable classes have corresponding construct functions with the same prop signatures.
