# Container Components — Index

| File | Contents |
|------|---------|
| [containers-box.md](./containers-box.md) | `box` — borders, title, background, layout, spacing, dimensions, mouse, focus |
| [containers-scrollbox.md](./containers-scrollbox.md) | `scrollbox` — scroll, keyboard scroll, styling, composition patterns, nesting, gotchas |

## Quick Reference

```tsx
// Box with border and layout
<box border borderStyle="rounded" padding={2} flexDirection="column">
  <text>Content</text>
</box>

// Scrollable list
<scrollbox height={20} focused>
  {items.map((item, i) => <text key={i}>{item}</text>)}
</scrollbox>

// Full-screen layout
<box flexDirection="column" height="100%">
  <box height={3} border><text>Header</text></box>
  <box flexGrow={1}><scrollbox height="100%">{/* content */}</scrollbox></box>
</box>
```

## Component Chooser

```
Container needed?
├─ Borders, title, background, flex layout → containers-box.md
├─ Scrollable content list → containers-scrollbox.md
├─ Card / Panel / List pattern → containers-scrollbox.md#composition-patterns
└─ Header+sidebar+footer layout → containers-scrollbox.md#nesting-containers
```
