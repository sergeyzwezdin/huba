# ASCII Font, Colors & Text Utilities

## Contents

- [ASCII Font Component](#ascii-font-component)
- [Colors](#colors)
- [Text Wrapping](#text-wrapping)
- [Dynamic Content](#dynamic-content)
- [Gotchas](#gotchas)

---

## ASCII Font Component

Display large ASCII art text banners.

### Basic Usage

```tsx
// React
<ascii-font text="TITLE" font="tiny" />

// Core
const title = new ASCIIFontRenderable(renderer, {
  id: "title",
  text: "TITLE",
  font: "tiny",
})
```

### Available Fonts

| Font | Description |
|------|-------------|
| `tiny` | Compact ASCII font |
| `block` | Block-style letters |
| `slick` | Sleek modern style |
| `shade` | Shaded 3D effect |

### Styling

```tsx
<ascii-font text="HELLO" font="block" color="#00FF00" />

// Core
const title = new ASCIIFontRenderable(renderer, {
  text: "HELLO",
  font: "block",
  color: RGBA.fromHex("#00FF00"),
})
```

### Example Output

```
Font: tiny
╭─╮╭─╮╭─╮╭╮╭╮╭─╮╶╮╶ ╶╮
│ ││─┘├┤ │╰╯││  │  │
╰─╯╵  ╰─╯╵  ╵╰─╯╶╯╶╰─╯

Font: block
█▀▀█ █▀▀█ █▀▀ █▀▀▄
█  █ █▀▀▀ █▀▀ █  █
▀▀▀▀ ▀    ▀▀▀ ▀  ▀
```

---

## Colors

```tsx
// Hex
<text fg="#FF0000">Red</text>
<text fg="#F00">Short hex</text>

// Named colors
<text fg="red">Red</text>
<text fg="blue">Blue</text>

// Transparent background
<text bg="transparent">No background</text>
```

> Always include `#` in hex colors: `fg="#FF0000"` not `fg="FF0000"`.

For the full `RGBA` class API (fromHex, fromInts, parseColor), see [core/colors.md](../core/colors.md).

---

## Text Wrapping

Text wraps based on parent container width:

```tsx
<box width={40}>
  <text>
    This long text will wrap when it reaches the edge of the
    40-character wide parent container.
  </text>
</box>
```

---

## Dynamic Content

### React

```tsx
const Counter: FC = () => {
  const [count, setCount] = useState(0)
  return <text>Count: {count}</text>
}
```

### Core

```typescript
const text = new TextRenderable(renderer, { id: "counter", content: "Count: 0" })
// Update later:
text.setContent("Count: 1")
```

---

## Gotchas

```tsx
// WRONG - modifiers outside text
<box><strong>Won't work</strong></box>

// CORRECT
<box><text><strong>This works</strong></text></box>
```

```tsx
// Empty text may cause layout issues
<text></text>

// Better
<text>{content || " "}</text>
```
