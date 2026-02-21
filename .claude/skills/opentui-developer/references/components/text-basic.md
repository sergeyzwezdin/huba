# Text Component & Modifiers

## Contents

- [Text Component](#text-component) — basic usage, styling, selection
- [Text Modifiers](#text-modifiers) — span, strong, em, u, br, a
- [Styled Text Template (Core)](#styled-text-template-core) — `t` template literal

---

## Text Component

### Basic Usage

```tsx
<text>Hello, World!</text>

// With content prop
<text content="Hello, World!" />

// Core
const text = new TextRenderable(renderer, {
  id: "greeting",
  content: "Hello, World!",
})
```

### Styling (React)

Use **nested modifier tags** — NOT props directly on `<text>`:

```tsx
<text fg="#FFFFFF" bg="#000000">
  <strong>Bold</strong>, <em>italic</em>, and <u>underlined</u>
</text>
```

> **Do NOT use** `bold`, `italic`, `underline`, `dim`, `strikethrough` as props on `<text>` — they don't work. Use nested tags.

### Styling (Core) - Text Attributes

```typescript
import { TextRenderable, TextAttributes } from "@opentui/core"

const text = new TextRenderable(renderer, {
  content: "Styled",
  attributes: TextAttributes.BOLD | TextAttributes.UNDERLINE,
})
```

Available: `BOLD`, `DIM`, `ITALIC`, `UNDERLINE`, `BLINK`, `INVERSE`, `HIDDEN`, `STRIKETHROUGH`

### Text Selection

```tsx
<text selectable>Can be selected</text>
<text selectable={false}>Cannot be selected</text>
```

---

## Text Modifiers

Inline styling — must be inside `<text>`:

```tsx
// WRONG
<box><strong>Won't work</strong></box>

// CORRECT
<box><text><strong>This works</strong></text></box>
```

### Available Modifiers

```tsx
<text>
  <span fg="red">Red text inline</span>
  <strong>Bold</strong> or <b>Also bold</b>
  <em>Italic</em> or <i>Also italic</i>
  <u>Underlined</u>
  Line one<br />Line two
  Visit <a href="https://example.com">our site</a>
</text>
```

### Combined Modifiers

```tsx
<text>
  <span fg="#00FF00"><strong>Bold green</strong></span>
  and
  <span fg="#FF0000"><em><u>italic underlined red</u></em></span>
</text>
```

---

## Styled Text Template (Core)

The `t` template literal for complex styling:

```typescript
import { t, bold, italic, underline, fg, bg, dim } from "@opentui/core"

const styled = t`
  ${bold("Bold")} and ${italic("italic")} text.
  ${fg("#FF0000")("Red")} with ${bg("#0000FF")("blue background")}.
  ${dim("Dimmed")} and ${underline("underlined")}.
`

const text = new TextRenderable(renderer, { content: styled })
```

| Function | Effect |
|----------|--------|
| `bold(text)` | Bold |
| `italic(text)` | Italic |
| `underline(text)` | Underlined |
| `dim(text)` | Dimmed |
| `strikethrough(text)` | Strikethrough |
| `fg(color)(text)` | Foreground color |
| `bg(color)(text)` | Background color |
