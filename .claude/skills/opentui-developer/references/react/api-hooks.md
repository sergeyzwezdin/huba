# React Hooks

## useRenderer()

Access the OpenTUI renderer instance:

```tsx
import { useRenderer } from "@opentui/react"

const App: FC = () => {
  const renderer = useRenderer()

  useEffect(() => {
    console.log(`Terminal: ${renderer.width}x${renderer.height}`)
    console.log(`Theme: ${renderer.themeMode}`)  // "dark" | "light" | null
    renderer.console.show()
  }, [renderer])

  // Listen for theme mode changes
  useEffect(() => {
    const handler = (mode: "dark" | "light") => setTheme(mode)
    renderer.on("theme_mode", handler)
    return () => renderer.off("theme_mode", handler)
  }, [renderer])
}
```

## useKeyboard(handler, options?)

```tsx
import { useKeyboard, useRenderer } from "@opentui/react"

const App: FC = () => {
  const renderer = useRenderer()

  useKeyboard((key) => {
    if (key.name === "escape") renderer.destroy()  // Never use process.exit()!
    if (key.ctrl && key.name === "s") save()
  })
}

// With release events
useKeyboard(
  (event) => {
    if (event.eventType === "release") removeKey(event.name)
    else addKey(event.name)
  },
  { release: true }  // Enable release events
)
```

**KeyEvent properties:**
- `name: string` — key name ("a", "escape", "f1", etc.)
- `ctrl`, `shift`, `meta`, `option: boolean` — modifiers
- `eventType: "press" | "release" | "repeat"`
- `repeated: boolean` — key held down

**Options:** `{ release?: boolean }` — include key release events (default: false)

## useOnResize(callback)

```tsx
import { useOnResize } from "@opentui/react"

const App: FC = () => {
  useOnResize((width, height) => {
    console.log(`Resized to ${width}x${height}`)
  })
}
```

## useTerminalDimensions()

Reactive terminal size:

```tsx
import { useTerminalDimensions } from "@opentui/react"

const ResponsiveLayout: FC = () => {
  const { width, height } = useTerminalDimensions()

  return (
    <box flexDirection={width > 80 ? "row" : "column"}>
      <text>Width: {width}, Height: {height}</text>
    </box>
  )
}
```

## useTimeline(options?)

```tsx
import { useTimeline } from "@opentui/react"

const AnimatedBox: FC = () => {
  const [width, setWidth] = useState(0)

  const timeline = useTimeline({ duration: 2000, loop: false })

  useEffect(() => {
    timeline.add(
      { width: 0 },
      {
        width: 50,
        duration: 2000,
        ease: "easeOutQuad",
        onUpdate: (anim) => setWidth(Math.round(anim.targets[0].width)),
      }
    )
  }, [timeline])

  return <box style={{ width, height: 3, backgroundColor: "#6a5acd" }} />
}
```

**Timeline options:** `duration`, `loop`, `autoplay` (default: true), `onComplete`, `onPause`

**Timeline methods:** `timeline.play()`, `timeline.pause()`, `timeline.restart()`

See [Animation](../animation/REFERENCE.md) for easing functions and patterns.
