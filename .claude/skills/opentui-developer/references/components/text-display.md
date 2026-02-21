# Text & Display Components — Index

| File | Contents |
|------|---------|
| [text-basic.md](./text-basic.md) | `text` component, modifiers (span/strong/em/u/br/a), styled text template `t` |
| [text-extras.md](./text-extras.md) | `ascii-font`, colors, text wrapping, dynamic content, gotchas |

## Quick Reference

```tsx
// Basic text
<text>Hello, World!</text>
<text fg="#FFFFFF" bg="#000000">Colored</text>

// Modifiers (must be inside <text>)
<text><strong>Bold</strong>, <em>italic</em>, <u>underlined</u></text>
<text>Normal <span fg="red">red inline</span> text</text>

// ASCII art
<ascii-font text="TITLE" font="tiny" color="#00FF00" />
```

> Never use `bold`, `italic`, `underline` as direct props on `<text>` — use nested tags.

## See Also

- [core/colors.md](../core/colors.md) — RGBA class API
