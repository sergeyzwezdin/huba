# Layout Patterns — Advanced

## Modal / Dialog

Centered overlay with semi-transparent backdrop:

```tsx
const Modal: FC<{ children: React.ReactNode; visible: boolean }> = ({ children, visible }) => {
  if (!visible) return null
  return (
    <box
      position="absolute"
      left={0} top={0}
      width="100%" height="100%"
      justifyContent="center" alignItems="center"
    >
      <box
        width={50} height={15}
        border borderStyle="double"
        backgroundColor="#1a1a2e"
        padding={2}
      >
        {children}
      </box>
    </box>
  )
}
```

## Tooltip / Popup

Absolute positioned overlay:

```tsx
const Tooltip: FC<{ x: number; y: number; children: React.ReactNode }> = ({ x, y, children }) => (
  <box
    position="absolute"
    left={x} top={y}
    border backgroundColor="#333" padding={1}
    zIndex={100}
  >
    {children}
  </box>
)
```

## Sticky Footer

Footer always at the bottom regardless of content height:

```tsx
<box flexDirection="column" width="100%" height="100%">
  <box flexGrow={1} flexDirection="column">
    <text>Content that might be short</text>
  </box>
  <box height={1}>
    <text fg="#888">Press ? for help | q to quit</text>
  </box>
</box>
```

## Equal Height Columns

```tsx
<box flexDirection="row" alignItems="stretch" height={20}>
  <box flexGrow={1} border><text>Short content</text></box>
  <box flexGrow={1} border><text>Longer content that spans multiple lines</text></box>
  <box flexGrow={1} border><text>Medium content</text></box>
</box>
```

## Centering

```tsx
// Horizontally
<box width="100%" justifyContent="center">
  <box width={40}><text>Centered horizontally</text></box>
</box>

// Vertically
<box height="100%" alignItems="center">
  <text>Centered vertically</text>
</box>

// Both axes
<box width="100%" height="100%" justifyContent="center" alignItems="center">
  <box width={40} height={10} border><text>Centered both</text></box>
</box>
```

## Spacing Utilities

```tsx
const Spacer: FC<{ size?: number }> = ({ size = 1 }) => <box height={size} width={size} />
const Divider: FC = () => <box height={1} width="100%" backgroundColor="#333" />

// Combined card spacing
<box paddingX={3} paddingY={1} marginY={1} border>
  <text>Nicely spaced card</text>
</box>
```
