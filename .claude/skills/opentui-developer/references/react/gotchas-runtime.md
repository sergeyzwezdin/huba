# React Gotchas — Styling, Performance & Runtime

## Contents

- [Styling Issues](#styling-issues) — colors, layout percentages
- [Performance Issues](#performance-issues) — re-renders, memoization, state
- [Debugging](#debugging) — console overlay, component tree, events
- [Runtime Issues](#runtime-issues) — Bun vs Node, async init
- [Common Error Messages](#common-error-messages) — TypeError, invalid hook

---

## Styling Issues

### Colors Not Applying

```tsx
// CORRECT formats
<text fg="#FF0000">Red</text>
<text fg="red">Red</text>
<box backgroundColor="#1a1a2e">Box</box>

// WRONG
<text fg="FF0000">Missing #</text>
<text color="#FF0000">Wrong prop name (use fg)</text>
```

### Layout Not Working

Parent must have dimensions for flex children to grow:

```tsx
// WRONG - Parent has no height
<box flexDirection="column">
  <box flexGrow={1}>Won't grow</box>
</box>

// CORRECT
<box flexDirection="column" height="100%">
  <box flexGrow={1}>Will grow</box>
</box>
```

### Percentage Widths Not Working

```tsx
// WRONG
<box>
  <box width="50%">Won't work</box>
</box>

// CORRECT
<box width="100%">
  <box width="50%">Works</box>
</box>
```

---

## Performance Issues

### Too Many Re-renders

```tsx
// WRONG - New object every render causes re-render
<box style={{ padding: 2 }}>Content</box>

// BETTER - Direct props
<box padding={2}>Content</box>

// OR - Memoize
const style = useMemo(() => ({ padding: 2 }), [])
<box style={style}>Content</box>
```

### Heavy Components

```tsx
const ExpensiveList = React.memo(function ExpensiveList({ items }: { items: Item[] }) {
  return (
    <box flexDirection="column">
      {items.map(item => (
        <text key={item.id}>{item.name}</text>
      ))}
    </box>
  )
})
```

### State Updates During Render

```tsx
// WRONG - Infinite loop!
const Component: FC<{ value: number }> = ({ value }) => {
  const [count, setCount] = useState(0)
  if (value > 10) setCount(value)  // Triggers re-render → re-runs → loop
  return <text>{count}</text>
}

// CORRECT
const Component: FC<{ value: number }> = ({ value }) => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (value > 10) setCount(value)
  }, [value])
  return <text>{count}</text>
}
```

---

## Debugging

### Console Not Visible

OpenTUI captures console output. Show the overlay:

```tsx
const App: FC = () => {
  const renderer = useRenderer()
  useEffect(() => {
    renderer.console.show()
    console.log("Now you can see this!")
  }, [renderer])
  return <box>{/* ... */}</box>
}
```

### Component Not Rendering

```tsx
// WRONG - returns undefined, not null
const MaybeComponent: FC<{ show: boolean }> = ({ show }) => {
  if (!show) return undefined
  return <text>Visible</text>
}

// CORRECT
const MaybeComponent: FC<{ show: boolean }> = ({ show }) => {
  if (!show) return null
  return <text>Visible</text>
}
```

### Events Not Firing

```tsx
// WRONG - No onClick in TUI
<box onClick={() => {}}>Click</box>

// CORRECT
<box onMouseDown={() => {}}>Click</box>
```

---

## Runtime Issues

### Use Bun, Not Node

```bash
# WRONG
node src/index.tsx
npm run start

# CORRECT
bun run src/index.tsx
bun run start
```

### Async Top-level Init

```tsx
// Must await createCliRenderer
const renderer = await createCliRenderer()
createRoot(renderer).render(<App />)

// With error handling
try {
  const renderer = await createCliRenderer()
  createRoot(renderer).render(<App />)
} catch (error) {
  console.error("Failed to initialize:", error)
  process.exit(1)
}
```

---

## Common Error Messages

### "Cannot read properties of undefined (reading 'root')"

```tsx
// WRONG - Missing await
const renderer = createCliRenderer()
createRoot(renderer).render(<App />)

// CORRECT
const renderer = await createCliRenderer()
createRoot(renderer).render(<App />)
```

### "Invalid hook call"

```tsx
// WRONG - Hook outside component
const dimensions = useTerminalDimensions()
const App: FC = () => <text>{dimensions.width}</text>

// CORRECT
const App: FC = () => {
  const dimensions = useTerminalDimensions()
  return <text>{dimensions.width}</text>
}
```
