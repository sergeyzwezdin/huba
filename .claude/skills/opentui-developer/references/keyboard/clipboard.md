# Keyboard — Paste & Clipboard

## Paste Events

### Core

```typescript
renderer.keyInput.on("paste", (text: string) => {
  console.log("Pasted:", text)
  currentInput?.setValue(currentInput.value + text)
})
```

### React

Paste events arrive through `useKeyboard` or are handled automatically by focused `<input>` / `<textarea>` components.

## Clipboard (OSC 52)

Copy text to the system clipboard via OSC 52 escape sequences. Works over SSH in most modern terminals.

### Core

```typescript
// Copy to clipboard
renderer.copyToClipboardOSC52("text to copy")

// Check support
if (renderer.isOsc52Supported()) {
  renderer.copyToClipboardOSC52("Hello!")
}

// Clear clipboard
renderer.clearClipboardOSC52()

// Target specific clipboard (X11)
import { ClipboardTarget } from "@opentui/core"
renderer.copyToClipboardOSC52("text", ClipboardTarget.Primary)   // X11 primary
renderer.copyToClipboardOSC52("text", ClipboardTarget.Clipboard) // System (default)
```
