# Layout Patterns — App Layouts

## Full-Screen App

```tsx
<box width="100%" height="100%">
  {/* Fills the entire terminal */}
</box>
```

## Header / Content / Footer

```tsx
<box flexDirection="column" width="100%" height="100%">
  <box height={3} borderStyle="single" borderBottom><text>Header</text></box>
  <box flexGrow={1}><text>Main Content</text></box>
  <box height={1}><text fg="#888">Press ? for help | q to quit</text></box>
</box>
```

## Sidebar Layout

```tsx
<box flexDirection="row" width="100%" height="100%">
  <box width={25} borderStyle="single" borderRight><text>Sidebar</text></box>
  <box flexGrow={1}><text>Main Content</text></box>
</box>
```

## Responsive Sidebar

```tsx
const { width } = useTerminalDimensions()
const isSidebarVisible = width > 60
const sidebarWidth = Math.min(30, Math.floor(width * 0.3))

<box flexDirection="row" width="100%" height="100%">
  {isSidebarVisible && <box width={sidebarWidth} border><text>Sidebar</text></box>}
  <box flexGrow={1}><text>Main</text></box>
</box>
```

## Split Panels

```tsx
// Horizontal split
<box flexDirection="row" width="100%" height="100%">
  <box width="40%" border><text>Left</text></box>
  <box flexGrow={1} border><text>Right</text></box>
</box>

// Vertical split
<box flexDirection="column" width="100%" height="100%">
  <box height="40%" border><text>Top</text></box>
  <box flexGrow={1} border><text>Bottom</text></box>
</box>
```

## Grid Layout

```tsx
const Grid: FC<{ items: string[]; columns?: number }> = ({ items, columns = 3 }) => {
  const itemWidth = `${Math.floor(100 / columns)}%`
  return (
    <box flexDirection="row" flexWrap="wrap" width="100%">
      {items.map((item, i) => (
        <box key={i} width={itemWidth} padding={1}><text>{item}</text></box>
      ))}
    </box>
  )
}
```

## Navigation Tabs

```tsx
const TabBar: FC<{ tabs: string[]; activeIndex: number; onSelect: (i: number) => void }> = ({ tabs, activeIndex, onSelect }) => (
  <box flexDirection="row" borderBottom>
    {tabs.map((tab, i) => (
      <box key={i} padding={1} backgroundColor={i === activeIndex ? "#333" : "transparent"} onMouseDown={() => onSelect(i)}>
        <text fg={i === activeIndex ? "#fff" : "#888"}>{tab}</text>
      </box>
    ))}
  </box>
)
```

## Form Field Layout

```tsx
const FormField: FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <box flexDirection="row" marginBottom={1}>
    <box width={15}><text>{label}:</text></box>
    <box flexGrow={1}>{children}</box>
  </box>
)
```
