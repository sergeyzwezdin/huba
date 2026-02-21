# Animation System — Index

Timeline-based animation for smooth property transitions.

## Contents

| File | Topic |
|------|-------|
| [timeline.md](./timeline.md) | Timeline options, methods, animation properties |
| [easing.md](./easing.md) | All easing functions (linear, quad, cubic, elastic, bounce, etc.) |
| [patterns.md](./patterns.md) | Progress bar, fade in, spinner, staggered list, slide in |

## Quick Start

### React

```tsx
import { useTimeline } from "@opentui/react"

const AnimatedBox: FC = () => {
  const [width, setWidth] = useState(0)
  const timeline = useTimeline({ duration: 2000 })

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
  }, [])

  return <box width={width} height={3} backgroundColor="#6a5acd" />
}
```

### Core

```typescript
import { Timeline, engine } from "@opentui/core"

engine.attach(renderer)
const timeline = new Timeline({ duration: 2000, autoplay: true })

timeline.add(
  { x: 0 },
  {
    x: 50,
    duration: 2000,
    ease: "easeOutQuad",
    onUpdate: (anim) => box.setLeft(Math.round(anim.targets[0].x)),
  }
)

engine.addTimeline(timeline)
```

## Gotchas

- Terminal UIs refresh at ~60 FPS max — very fast animations may appear choppy
- Animations constrained to character cells — no sub-character positioning
- Always round animated values: `Math.round(anim.targets[0].x)`
- React hook cleans up automatically; for Core use `engine.removeTimeline(timeline)`
