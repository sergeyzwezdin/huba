# Layout — Dimensions & Spacing

## Dimensions

```tsx
// Fixed
<box width={40} height={10} />

// Percentage — parent must have explicit size
<box width="100%" height="100%">
  <box width="50%" height="50%" />
</box>

// Min/Max constraints
<box minWidth={20} maxWidth={60} minHeight={5} maxHeight={20} />

// Auto size (content-driven)
<box width="auto" />
```

**Gotcha:** Percentage dimensions require the parent to have an explicit size. `<box>` without width/height defaults to content size.

## Padding (inside the box)

```tsx
<box padding={2}>All sides</box>

<box
  paddingTop={1}
  paddingRight={2}
  paddingBottom={1}
  paddingLeft={2}
>Individual sides</box>

<box paddingX={2} paddingY={1}>Axis shorthand</box>
{/* paddingX = left + right, paddingY = top + bottom */}
```

Borders add to the used space. A `width={10} border` box has 8 chars of inner content.

## Margin (outside the box)

```tsx
<box margin={1}>All sides</box>

<box
  marginTop={1}
  marginRight={2}
  marginBottom={1}
  marginLeft={2}
>Individual sides</box>

<box marginX={2} marginY={1}>Axis shorthand</box>
```

## Axis Shorthand Reference

| Prop | Equivalent |
|------|-----------|
| `paddingX={n}` | `paddingLeft={n}` + `paddingRight={n}` |
| `paddingY={n}` | `paddingTop={n}` + `paddingBottom={n}` |
| `marginX={n}` | `marginLeft={n}` + `marginRight={n}` |
| `marginY={n}` | `marginTop={n}` + `marginBottom={n}` |
