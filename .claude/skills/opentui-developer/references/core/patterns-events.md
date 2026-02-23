# Core Patterns — Events

## Keyboard Events

```typescript
renderer.keyInput.on("keypress", (key) => {
  if (key.name === "escape") {
    renderer.destroy()
    return
  }
  if (key.ctrl && key.name === "c") { /* Ctrl+C */ }
  if (key.name === "tab") focusNext()
  if (key.shift && key.name === "tab") focusPrevious()
})

renderer.keyInput.on("paste", (text: string) => {
  currentInput?.setValue(currentInput.value + text)
})
```

Key properties: `name`, `sequence`, `ctrl`, `shift`, `meta`, `option`, `eventType` ("press" | "release" | "repeat")

Common key names: `"a"`–`"z"`, `"0"`–`"9"`, `"escape"`, `"enter"`, `"tab"`, `"backspace"`, `"up"`, `"down"`, `"left"`, `"right"`, `"f1"`–`"f12"`, `"space"`

## Component Events

### Input

```typescript
input.on(InputRenderableEvents.CHANGE, (value) => { performSearch(value) })
input.on(InputRenderableEvents.FOCUS, () => {})
input.on(InputRenderableEvents.BLUR, () => {})
```

### Select / TabSelect

```typescript
select.on(SelectRenderableEvents.ITEM_SELECTED, (index, option) => {
  // Enter pressed — confirm selection
  handleSelection(option)
})
select.on(SelectRenderableEvents.SELECTION_CHANGED, (index, option) => {
  // Arrow keys — preview as user browses
  showPreview(option)
})
```

## Mouse Events

```typescript
const button = new BoxRenderable(renderer, {
  id: "button",
  border: true,
  onMouseDown: (event) => { button.setBackgroundColor("#444444") },
  onMouseUp: (event) => {
    button.setBackgroundColor("#222222")
    handleClick()
  },
  onMouseMove: (event) => { /* hover effect */ },
})
```

Mouse event properties: `event.x`, `event.y`, `event.button`
