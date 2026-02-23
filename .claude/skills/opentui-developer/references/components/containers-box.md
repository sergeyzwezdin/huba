# Box Component

The primary container with borders, backgrounds, layout, and focus capabilities.

## Contents

- [Basic Usage](#basic-usage)
- [Borders](#borders)
- [Title & Background](#title--background)
- [Layout & Spacing](#layout--spacing)
- [Dimensions](#dimensions)
- [Mouse Events](#mouse-events)
- [Focusable Boxes](#focusable-boxes)

---

## Basic Usage

```tsx
// React
<box>
  <text>Content inside box</text>
</box>

// Core
const box = new BoxRenderable(renderer, { id: "container" })
box.add(child)
```

---

## Borders

```tsx
<box border>Simple border</box>

<box border borderStyle="rounded" borderColor="#FFFFFF">
  Styled border
</box>

// Individual sides
<box borderTop borderBottom borderLeft={false} borderRight={false}>
  Top and bottom only
</box>
```

| Style | Appearance |
|-------|------------|
| `single` | `┌─┐│ │└─┘` |
| `double` | `╔═╗║ ║╚═╝` |
| `rounded` | `╭─╮│ │╰─╯` |
| `bold` | `┏━┓┃ ┃┗━┛` |

> Borders add 1 char on each side: `width={10}` → 8 chars of inner space.

---

## Title & Background

```tsx
<box border title="Settings" titleAlignment="center">
  Panel content
</box>

<box backgroundColor="#1a1a2e">Dark background</box>
<box backgroundColor="transparent">No background</box>
```

`titleAlignment`: `left` | `center` | `right`

---

## Layout & Spacing

Boxes are flex containers by default:

```tsx
<box
  flexDirection="row"           // row | column | row-reverse | column-reverse
  justifyContent="center"       // flex-start | flex-end | center | space-between | space-around
  alignItems="center"           // flex-start | flex-end | center | stretch | baseline
  gap={2}
>
  <text>Item 1</text>
  <text>Item 2</text>
</box>
```

```tsx
<box
  padding={2}           // All sides
  paddingX={2}          // Left + right
  paddingY={1}          // Top + bottom
  margin={1}
  marginX={2}
  marginY={1}
>
  Spaced content
</box>
```

---

## Dimensions

```tsx
<box
  width={40}            // Fixed
  height={10}
  width="50%"           // Percentage of parent (parent must have explicit size)
  minWidth={20}
  maxWidth={80}
  flexGrow={1}          // Grow to fill (parent must have size)
>
  Sized box
</box>
```

---

## Mouse Events

```tsx
<box
  onMouseDown={(event) => console.log("Clicked at:", event.x, event.y)}
  onMouseUp={(event) => {}}
  onMouseMove={(event) => {}}
>
  Clickable box
</box>
```

---

## Focusable Boxes

By default, boxes are not focusable. Enable with `focusable`:

```tsx
<box focusable border>
  <text>Click to focus</text>
</box>

// Controlled focus state
const [focused, setFocused] = useState(false)
<box
  focusable
  focused={focused}
  border
  borderColor={focused ? "#00ff00" : "#888"}
>
  <text>{focused ? "Focused!" : "Not focused"}</text>
</box>
```

When clicked, focus bubbles to the nearest focusable parent. Use `event.preventDefault()` in `onMouseDown` to prevent auto-focus.
