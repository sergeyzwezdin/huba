# React Patterns — Responsive Design

## Terminal-size Responsive

```tsx
import { useTerminalDimensions } from "@opentui/react"

const ResponsiveLayout: FC = () => {
  const { width } = useTerminalDimensions()

  return (
    <box flexDirection={width < 80 ? "column" : "row"}>
      <box flexGrow={1} height={width < 80 ? 10 : "100%"}>
        <text>Sidebar</text>
      </box>
      <box flexGrow={1}>
        <text>Main Content</text>
      </box>
    </box>
  )
}
```

## Responsive Breakpoints

```tsx
const ResponsiveApp: FC = () => {
  const { width } = useTerminalDimensions()

  const isSmall  = width < 60
  const isMedium = width >= 60 && width < 100

  if (isSmall) {
    return <box flexDirection="column"><Navigation /><Content /></box>
  }
  if (isMedium) {
    return <box flexDirection="row"><box width={20}><Navigation /></box><box flexGrow={1}><Content /></box></box>
  }
  return (
    <box flexDirection="row">
      <box width={25}><Navigation /></box>
      <box flexGrow={1}><Content /></box>
      <box width={30}><Sidebar /></box>
    </box>
  )
}
```

## Responsive Sidebar

```tsx
const ResponsiveSidebar: FC = () => {
  const { width } = useTerminalDimensions()
  const isSidebarVisible = width > 60
  const sidebarWidth = Math.min(30, Math.floor(width * 0.3))

  return (
    <box flexDirection="row" width="100%" height="100%">
      {isSidebarVisible && (
        <box width={sidebarWidth} border>
          <text>Sidebar</text>
        </box>
      )}
      <box flexGrow={1}>
        <text>Main</text>
      </box>
    </box>
  )
}
```

## Dynamic Grid

```tsx
const DynamicGrid: FC<{ items: string[] }> = ({ items }) => {
  const { width } = useTerminalDimensions()
  const columns = Math.max(1, Math.floor(width / 20))

  return (
    <box flexDirection="row" flexWrap="wrap">
      {items.map((item, i) => (
        <box key={i} width={`${100 / columns}%`} padding={1}>
          <text>{item}</text>
        </box>
      ))}
    </box>
  )
}
```
