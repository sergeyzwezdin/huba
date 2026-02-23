# React Patterns — Index

## Contents

| File | Topic |
|------|-------|
| [patterns-settings.md](./patterns-settings.md) | Settings atoms, keyboard shortcuts for settings |
| [patterns-theming.md](./patterns-theming.md) | Theme type, palette, Jotai-based theme state, switching, rgbToHex |
| [patterns-state.md](./patterns-state.md) | Jotai atoms, atomWithStorage, TanStack Query, layered queries |
| [patterns-forms.md](./patterns-forms.md) | Controlled inputs, validation, focus cycling |
| [patterns-keyboard.md](./patterns-keyboard.md) | Project-specific useKeyboard from @/shared/keyboard, widget/page hotkey patterns |
| [patterns-responsive.md](./patterns-responsive.md) | Terminal-size responsive layouts, dynamic grids |
| [patterns-toast.md](./patterns-toast.md) | Toast notifications: info, success, error, warning |

## Quick Reference

```tsx
// Focus cycling in a form
const [focusIndex, setFocusIndex] = useState(0)
useKeyboard((key) => {
  if (key.name === "tab") setFocusIndex(i => (i + 1) % fields.length)
})

// Quit properly
const renderer = useRenderer()
useKeyboard((key) => {
  if (key.name === "escape") renderer.destroy()  // Never process.exit()!
})

// Read terminal size
const { width, height } = useTerminalDimensions()
```
