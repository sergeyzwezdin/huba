# Keyboard — Key Names & Events

## KeyEvent Object

```typescript
interface KeyEvent {
  name: string          // Key name: "a", "escape", "f1", etc.
  sequence: string      // Raw escape sequence
  ctrl: boolean         // Ctrl modifier held
  shift: boolean        // Shift modifier held
  meta: boolean         // Alt modifier held
  option: boolean       // Option modifier held (macOS)
  eventType: "press" | "release" | "repeat"
  repeated: boolean     // Key is being held (repeat)
}
```

## Key Names

| Category | Values |
|----------|--------|
| Letters | `a`–`z` (lowercase). Check `key.shift` for uppercase |
| Numbers | `0`–`9` |
| Function | `f1`–`f12` |
| Navigation | `up`, `down`, `left`, `right`, `home`, `end`, `pageup`, `pagedown`, `insert` |
| Control | `escape`, `enter`, `return`, `tab`, `backspace`, `delete`, `space` |

## Modifier Combos

```typescript
renderer.keyInput.on("keypress", (key) => {
  if (key.ctrl && key.name === "c")                   { /* Ctrl+C */ }
  if (key.shift && key.name === "tab")                { /* Shift+Tab */ }
  if (key.meta && key.name === "s")                   { /* Alt+S */ }
  if (key.option && key.name === "a")                 { /* Option+A (macOS) */ }
  if (key.ctrl && key.shift && key.name === "s")      { /* Ctrl+Shift+S */ }
  if (key.shift && key.name === "/")                  { /* ? (question mark) */ }
})
```

## Event Types

```typescript
renderer.keyInput.on("keypress", (key) => {
  if (key.eventType === "press")   { /* Initial press */ }
  if (key.eventType === "repeat")  { /* Key held down */ }
  if (key.eventType === "release") { /* Key released */ }
})

// React: release events are opt-in
useKeyboard(handler, { release: true })
```
