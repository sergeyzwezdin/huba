# React Patterns — Keyboard Navigation

## Global Shortcuts

```tsx
const App: FC = () => {
  const renderer = useRenderer()

  useKeyboard((key) => {
    // Quit — use renderer.destroy(), never process.exit()
    if (key.name === "escape" || (key.ctrl && key.name === "c")) {
      renderer.destroy()
      return
    }
    if (key.name === "?" || (key.shift && key.name === "/")) setShowHelp(h => !h)
    if (key.name === "j") moveDown()
    if (key.name === "k") moveUp()
  })
}
```

## Navigation Menu

```tsx
const Menu: FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const items = ["Home", "Settings", "Help", "Quit"]

  useKeyboard((key) => {
    switch (key.name) {
      case "up": case "k": setSelectedIndex(i => Math.max(0, i - 1)); break
      case "down": case "j": setSelectedIndex(i => Math.min(items.length - 1, i + 1)); break
      case "enter": handleSelect(items[selectedIndex]); break
    }
  })

  return (
    <box flexDirection="column">
      {items.map((item, i) => (
        <text key={item} fg={i === selectedIndex ? "#00FF00" : "#FFFFFF"}>
          {i === selectedIndex ? "> " : "  "}{item}
        </text>
      ))}
    </box>
  )
}
```

## Vim-style Modes

```tsx
const Editor: FC = () => {
  const [mode, setMode] = useState<"normal" | "insert">("normal")

  useKeyboard((key) => {
    if (mode === "normal") {
      if (key.name === "i") setMode("insert")
      if (key.name === "j") moveCursorDown()
      if (key.name === "k") moveCursorUp()
    } else {
      if (key.name === "escape") setMode("normal")
    }
  })

  return (
    <box>
      <text>Mode: {mode}</text>
      <textarea focused={mode === "insert"} />
    </box>
  )
}
```

## Modal Escape

```tsx
const Modal: FC<{ onClose: () => void; children: React.ReactNode }> = ({ onClose, children }) => {
  useKeyboard((key) => {
    if (key.name === "escape") onClose()
  })
  return <box border padding={2}>{children}</box>
}
```

## Multiple Keyboard Handlers

Multiple `useKeyboard` hooks all receive events — they don't block each other. Coordinate to prevent conflicts:

```tsx
// Gate on focus state to avoid conflicts
const Widget: FC = () => {
  const { isFocused } = useFocus({ id: 'widget' })

  useKeyboard((key) => {
    if (!isFocused) return  // Only handle when focused
    // handle keys...
  })
}
```
