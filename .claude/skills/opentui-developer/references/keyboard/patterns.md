# Keyboard — Patterns

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
  const [content, setContent] = useState("")

  useKeyboard((key) => {
    if (mode === "normal") {
      switch (key.name) {
        case "i": setMode("insert"); break
        case "j": moveCursorDown(); break
        case "k": moveCursorUp(); break
      }
    } else if (mode === "insert") {
      if (key.name === "escape") setMode("normal")
    }
  })

  return (
    <box flexDirection="column">
      <text>Mode: {mode}</text>
      <textarea value={content} onChange={setContent} focused={mode === "insert"} />
    </box>
  )
}
```

## Game Controls (release events)

```tsx
const Game: FC = () => {
  const [pressed, setPressed] = useState(new Set<string>())

  useKeyboard(
    (key) => {
      setPressed(keys => {
        const next = new Set(keys)
        if (key.eventType === "release") next.delete(key.name)
        else next.add(key.name)
        return next
      })
    },
    { release: true }
  )

  useEffect(() => {
    if (pressed.has("up") || pressed.has("w")) moveUp()
    if (pressed.has("down") || pressed.has("s")) moveDown()
  }, [pressed])

  return <text>WASD or arrows to move</text>
}
```

## Keyboard Shortcuts Help Display

```tsx
const shortcuts = [
  { keys: "Ctrl+S", action: "Save" },
  { keys: "Ctrl+Q", action: "Quit" },
  { keys: "Tab",    action: "Next field" },
]

<box border title="Keyboard Shortcuts" padding={1}>
  {shortcuts.map(({ keys, action }) => (
    <box key={keys} flexDirection="row">
      <text width={15} fg="#00FFFF">{keys}</text>
      <text>{action}</text>
    </box>
  ))}
</box>
```
