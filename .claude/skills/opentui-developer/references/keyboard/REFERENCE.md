# Keyboard Input — Index

## Contents

| File | Topic |
|------|-------|
| [keys.md](./keys.md) | KeyEvent object, key names, modifier keys, event types |
| [patterns.md](./patterns.md) | Navigation menus, vim modes, game controls, focus-aware handling |
| [clipboard.md](./clipboard.md) | Paste events, OSC 52 clipboard API |

## Quick Reference

### Core

```typescript
renderer.keyInput.on("keypress", (key: KeyEvent) => {
  if (key.name === "escape") renderer.destroy()
  if (key.ctrl && key.name === "s") save()
  if (key.name === "tab") focusNext()
})
```

### React

```tsx
const App: FC = () => {
  const renderer = useRenderer()
  useKeyboard((key) => {
    if (key.name === "escape") renderer.destroy()
  })
}
```

## Focus and Input Components

Input components (`<input>`, `<textarea>`, `<select>`) capture keyboard when focused. Global `useKeyboard` still fires — guard with focus state:

```tsx
useKeyboard((key) => {
  if (isInputFocused) return  // Let input handle it
  // Global shortcuts here
})
```

## Gotchas

- Some keys are intercepted by the terminal: `Ctrl+C` (SIGINT), `Ctrl+Z` (suspend)
- Key detection may vary over SSH — test on target environments
- Multiple `useKeyboard` calls all receive events — no automatic stopping
