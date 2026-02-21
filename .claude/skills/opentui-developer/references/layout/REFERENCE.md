# OpenTUI Layout System — Index

OpenTUI uses the Yoga layout engine (CSS Flexbox-like) for terminal layouts. Dimensions are in character cells (columns × rows).

## Contents

| File | Topic |
|------|-------|
| [flex.md](./flex.md) | Flex container properties (direction, justify, align, wrap, gap) + flex item properties (grow, shrink, basis) |
| [dimensions.md](./dimensions.md) | Fixed/percentage dimensions, min/max constraints, spacing (padding/margin) |
| [positioning.md](./positioning.md) | Absolute/relative positioning, display, overflow, z-index |
| [patterns.md](./patterns.md) | Layout recipes: full-screen, sidebar, modal, grid, responsive |

## Quick Reference

```tsx
// Full-screen app
<box width="100%" height="100%" flexDirection="column">
  <box height={3} border>Header</box>
  <box flexGrow={1}>Content</box>
  <box height={1}>Footer</box>
</box>

// Side-by-side
<box flexDirection="row" width="100%" height="100%">
  <box width={25} border>Sidebar</box>
  <box flexGrow={1}>Main</box>
</box>

// Centered content
<box width="100%" height="100%" justifyContent="center" alignItems="center">
  <box width={40} height={10} border>Centered</box>
</box>
```

## Common Props (on all components)

```tsx
// Dimensions
width, height, minWidth, maxWidth, minHeight, maxHeight

// Flexbox (as container)
flexDirection: "row" | "column" | "row-reverse" | "column-reverse"
justifyContent: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly"
alignItems: "flex-start" | "flex-end" | "center" | "stretch" | "baseline"
flexWrap: "nowrap" | "wrap" | "wrap-reverse"
gap

// Flexbox (as item)
flexGrow, flexShrink, flexBasis
alignSelf

// Spacing
padding, paddingTop/Right/Bottom/Left, paddingX, paddingY
margin, marginTop/Right/Bottom/Left, marginX, marginY

// Positioning
position: "relative" | "absolute"
left, top, right, bottom
display: "flex" | "none"
overflow: "visible" | "hidden" | "scroll"
zIndex
```
