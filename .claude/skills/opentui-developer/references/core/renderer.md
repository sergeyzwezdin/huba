# Core Renderer

## createCliRenderer(config?)

```typescript
import { createCliRenderer, ConsolePosition } from "@opentui/core"

const renderer = await createCliRenderer({
  targetFPS: 60,              // Target frames per second (default: 60)
  exitOnCtrlC: true,          // Exit process on Ctrl+C (default: true)
  autoFocus: true,            // Auto-focus elements on click (default: true)
  useMouse: true,             // Enable mouse support (default: true)
  consoleOptions: {
    position: ConsolePosition.BOTTOM,  // BOTTOM | TOP | LEFT | RIGHT
    sizePercent: 30,
    startInDebugMode: false,
  },
  onDestroy: () => {},        // Cleanup callback
})
```

## CliRenderer Instance

```typescript
renderer.root              // Root renderable node
renderer.width             // Terminal width in columns
renderer.height            // Terminal height in rows
renderer.keyInput          // Keyboard event emitter
renderer.console           // Console overlay controller
renderer.themeMode         // "dark" | "light" | null

renderer.start()           // Start render loop
renderer.stop()            // Stop render loop
renderer.destroy()         // Cleanup and exit alternate screen
renderer.requestRender()   // Request a re-render
```

**Always use `renderer.destroy()` instead of `process.exit()`** — destroy restores terminal state first.

## Console Overlay

```typescript
renderer.console.show()    // Show overlay
renderer.console.hide()    // Hide overlay
renderer.console.toggle()  // Toggle visibility/focus
renderer.console.clear()   // Clear contents
```

Enable via env var for development:

```bash
OTUI_SHOW_STATS=true SHOW_CONSOLE=true bun run src/index.ts
```

## Renderable Methods (all renderables)

```typescript
renderable.add(child)              // Add child
renderable.remove(child)           // Remove child
renderable.getRenderable(id)       // Find child by ID
renderable.focus()                 // Focus this renderable
renderable.blur()                  // Remove focus
renderable.destroy()               // Destroy and cleanup

renderable.on(event, handler)      // Add event listener
renderable.off(event, handler)     // Remove event listener
renderable.emit(event, ...args)    // Emit event
```
