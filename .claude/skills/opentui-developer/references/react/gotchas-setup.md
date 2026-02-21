# React Gotchas — Setup & Components

## Contents

- [Critical](#critical) — Never use process.exit(), signal handling
- [JSX Configuration](#jsx-configuration) — jsxImportSource, HTML vs TUI elements
- [Component Issues](#component-issues) — text modifiers, focus, select events
- [Hook Issues](#hook-issues) — useKeyboard conflicts, useEffect cleanup

---

## Critical

### Never use `process.exit()` directly

**This is the most common mistake.** Using `process.exit()` leaves the terminal in a broken state (cursor hidden, raw mode, alternate screen).

```tsx
// WRONG - Terminal left in broken state
process.exit(0)

// CORRECT - Use renderer.destroy()
import type { FC } from "react"
import { useRenderer } from "@opentui/react"

const App: FC = () => {
  const renderer = useRenderer()

  const handleExit = () => {
    renderer.destroy()  // Cleans up and exits properly
  }
}
```

`renderer.destroy()` restores the terminal (exits alternate screen, restores cursor, etc.) before exiting.

### Signal Handling

OpenTUI automatically handles cleanup for:
- `SIGINT` (Ctrl+C), `SIGTERM`, `SIGQUIT`, `SIGHUP`, `SIGPIPE`, `SIGBUS`, `SIGFPE`

If you need custom signal handling, use `exitOnCtrlC: false` and still call `renderer.destroy()`.

---

## JSX Configuration

### Missing jsxImportSource

**Symptom**: `Property 'text' does not exist on type 'JSX.IntrinsicElements'`

**Fix** — configure `tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@opentui/react"
  }
}
```

### HTML Elements vs TUI Elements

```tsx
// WRONG - HTML not supported
<div>Not supported</div>
<button>Not supported</button>

// CORRECT - OpenTUI elements
<box>Container</box>
<text>Display text</text>
<text><span>Inline styled</span></text>
```

---

## Component Issues

### Text Modifiers Outside Text

```tsx
// WRONG
<box>
  <strong>Won't work</strong>
</box>

// CORRECT
<box>
  <text>
    <strong>This works</strong>
  </text>
</box>
```

### Focus Not Working

```tsx
// WRONG - Won't receive keyboard input
<input placeholder="Type here..." />

// CORRECT
<input placeholder="Type here..." focused />

// Managed focus state
const [isFocused, setIsFocused] = useState(true)
<input placeholder="Type here..." focused={isFocused} />
```

### Select Not Responding

Options **must** have all three fields:

```tsx
// WRONG
<select options={["a", "b", "c"]} />

// CORRECT
<select
  options={[
    { name: "Option A", description: "First option", value: "a" },
  ]}
  onSelect={(i, opt) => console.log("Selected:", opt.name)}
  focused
/>
```

### Select Events Confusion

`onSelect` fires on Enter. `onChange` fires on arrow navigation.

```tsx
// WRONG - submitForm fires on every arrow key!
<select options={options} onChange={(i, opt) => submitForm(opt)} />

// CORRECT
<select
  options={options}
  onSelect={(i, opt) => submitForm(opt)}   // Enter: confirmed
  onChange={(i, opt) => showPreview(opt)}  // Arrow: preview
/>
```

---

## Hook Issues

### useKeyboard Not Firing

Multiple `useKeyboard` hooks conflict — both fire:

```tsx
// Both handlers fire
const App: FC = () => {
  useKeyboard((key) => { /* parent */ })
  return <ChildWithKeyboard />
}
const ChildWithKeyboard: FC = () => {
  useKeyboard((key) => { /* child */ })  // Also fires!
  return <text>Child</text>
}
```

**Solution**: single handler at the app level, or pass a callback down.

### useEffect Cleanup

```tsx
// WRONG - Memory leak
useEffect(() => {
  setInterval(() => { updateData() }, 1000)
}, [])

// CORRECT
useEffect(() => {
  const interval = setInterval(() => { updateData() }, 1000)
  return () => clearInterval(interval)
}, [])
```
