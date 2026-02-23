# Layout — Positioning, Display & Overflow

## Positioning

### Relative (default)

Element flows in normal document order:

```tsx
<box position="relative">Normal flow</box>
```

### Absolute

Element positioned relative to nearest positioned ancestor:

```tsx
<box position="relative" width="100%" height="100%">
  <box
    position="absolute"
    left={10}
    top={5}
    width={20}
    height={5}
  >
    Positioned at (10, 5) from the container
  </box>
</box>
```

Position properties: `left`, `top`, `right`, `bottom` (numbers only, not percentages)

## Display

```tsx
<box display="flex">Visible (default)</box>
<box display="none">Hidden — removed from layout flow</box>
```

Prefer `display="none"` over `remove()`/`add()` for toggling:

```tsx
// Core
element.setDisplay("none")   // Hidden
element.setDisplay("flex")   // Visible again

// React
<box display={isVisible ? "flex" : "none"}>Content</box>
```

## Overflow

```tsx
<box overflow="visible">Content can extend beyond bounds (default)</box>
<box overflow="hidden">Content clipped at bounds</box>
<box overflow="scroll">Scrollable when content exceeds bounds</box>
```

Use `<scrollbox>` for a pre-built scrollable container with keyboard support.

## Z-Index

Control stacking order for overlapping elements:

```tsx
<box position="relative">
  <box position="absolute" zIndex={1}>Behind</box>
  <box position="absolute" zIndex={2}>In front</box>
</box>
```
