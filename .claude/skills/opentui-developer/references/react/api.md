# React API — Index

## Contents

| File | Topic |
|------|-------|
| [api-hooks.md](./api-hooks.md) | `useRenderer`, `useKeyboard`, `useOnResize`, `useTerminalDimensions`, `useTimeline` |
| [api-components.md](./api-components.md) | All JSX component props: text, box, scrollbox, input, textarea, select, etc. |

## createRoot

```tsx
import { createCliRenderer } from "@opentui/core"
import { createRoot } from "@opentui/react"

const renderer = await createCliRenderer({ exitOnCtrlC: true })
createRoot(renderer).render(<App />)
```

## Hooks Overview

```tsx
import {
  useRenderer,           // Access renderer instance
  useKeyboard,           // Handle keyboard events
  useOnResize,           // Terminal resize events
  useTerminalDimensions, // Reactive { width, height }
  useTimeline,           // Animation timeline
} from "@opentui/react"
```

## JSX Elements (Quick Ref)

```tsx
// Layout & Display
<text fg="#fff">Hello</text>
<box border padding={2} flexDirection="row">...</box>
<scrollbox focused height={20}>...</scrollbox>
<ascii-font text="TITLE" font="tiny" />

// Input
<input value={v} onChange={setV} focused />
<textarea value={v} onChange={setV} focused />
<select options={[{ name, description, value }]} onSelect={fn} focused />
<tab-select options={[...]} onSelect={fn} focused />

// Code
<code code={src} language="typescript" />
<line-number code={src} language="typescript" diagnostics={[...]} />
<diff oldCode={old} newCode={new} mode="unified" />
```

## Type Exports

```tsx
import type { TextProps, BoxProps, InputProps, SelectProps, KeyEvent } from "@opentui/react"
```
