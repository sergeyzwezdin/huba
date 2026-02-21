# Colors — RGBA Class

`RGBA` is exported from `@opentui/core` and works in both Core and React.

## Creating Colors

```typescript
import { RGBA, parseColor } from "@opentui/core"

RGBA.fromHex("#FF0000")           // Full hex (most common)
RGBA.fromHex("#F00")              // Short hex

RGBA.fromInts(255, 0, 0, 255)    // r, g, b, a (0-255 each)
RGBA.fromInts(255, 0, 0, 128)    // 50% transparent red

RGBA.fromValues(1.0, 0.0, 0.0, 1.0)   // Normalized floats (0.0-1.0)
RGBA.fromValues(0.1, 0.1, 0.1, 0.7)   // Dark gray, 70% opaque
```

| Method | Use When |
|--------|----------|
| `fromHex()` | Design specs, CSS colors, config |
| `fromInts()` | 8-bit values (0-255) from graphics code |
| `fromValues()` | Color math, interpolation, animations |
| `parseColor()` | Accepting user input (any format) |

## parseColor

Accepts multiple formats:

```typescript
parseColor("#FF0000")             // Hex
parseColor("red")                 // CSS color name
parseColor("transparent")
parseColor(RGBA.fromHex("#F00"))  // Pass-through RGBA
```

## Common Patterns

```typescript
// Theme colors
const primary    = RGBA.fromHex("#7aa2f7")
const background = RGBA.fromHex("#1a1a2e")
const error      = RGBA.fromHex("#f7768e")

// Overlays
const overlay = RGBA.fromValues(0.0, 0.0, 0.0, 0.5)  // 50% black
const shadow  = RGBA.fromInts(0, 0, 0, 77)             // 30% black

// Borders
const activeBorder   = RGBA.fromHex("#7aa2f7")
const inactiveBorder = RGBA.fromInts(65, 72, 104, 255)
```

## Using RGBA in React

Color props accept both string formats and `RGBA` objects:

```tsx
import { RGBA } from "@opentui/core"

<box backgroundColor={RGBA.fromHex("#1a1a2e")} borderColor={RGBA.fromInts(122, 162, 247, 255)}>
  <text fg={RGBA.fromHex("#c0caf5")}>Works with RGBA objects</text>
</box>

// Or string shorthand
<box backgroundColor="#1a1a2e">
  <text fg="#c0caf5">Works with strings too</text>
</box>
```
