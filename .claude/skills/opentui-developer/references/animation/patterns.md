# Animation — Patterns

## Progress Bar

```tsx
const ProgressBar: FC<{ progress: number }> = ({ progress }) => {
  const [width, setWidth] = useState(0)
  const maxWidth = 50
  const timeline = useTimeline()

  useEffect(() => {
    timeline.add(
      { value: width },
      {
        value: (progress / 100) * maxWidth,
        duration: 300,
        ease: "easeOutQuad",
        onUpdate: (anim) => setWidth(Math.round(anim.targets[0].value)),
      }
    )
  }, [progress])

  return (
    <box flexDirection="column" gap={1}>
      <text>Progress: {progress}%</text>
      <box width={maxWidth} height={1} backgroundColor="#333">
        <box width={width} height={1} backgroundColor="#00FF00" />
      </box>
    </box>
  )
}
```

## Spinner (Interval-based)

```tsx
const Spinner: FC = () => {
  const [frame, setFrame] = useState(0)
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]

  useEffect(() => {
    const interval = setInterval(() => setFrame(f => (f + 1) % frames.length), 80)
    return () => clearInterval(interval)
  }, [])

  return <text>{frames[frame]} Loading...</text>
}
```

## Fade In

```tsx
const FadeIn: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [opacity, setOpacity] = useState(0)
  const timeline = useTimeline()

  useEffect(() => {
    timeline.add(
      { opacity: 0 },
      { opacity: 1, duration: 500, ease: "easeOutQuad", onUpdate: (anim) => setOpacity(anim.targets[0].opacity) }
    )
  }, [])

  return <box style={{ opacity }}>{children}</box>
}
```

## Slide In

```tsx
const SlideIn: FC<{ children: React.ReactNode; from?: "left" | "right" }> = ({ children, from = "left" }) => {
  const [offset, setOffset] = useState(from === "left" ? -20 : 20)
  const timeline = useTimeline()

  useEffect(() => {
    timeline.add(
      { offset: from === "left" ? -20 : 20 },
      {
        offset: 0,
        duration: 300,
        ease: "easeOutCubic",
        onUpdate: (anim) => setOffset(Math.round(anim.targets[0].offset)),
      }
    )
  }, [])

  return <box position="relative" left={offset}>{children}</box>
}
```

## Staggered List

```tsx
const StaggeredList: FC<{ items: string[] }> = ({ items }) => {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    let count = 0
    const interval = setInterval(() => {
      count++
      setVisibleCount(count)
      if (count >= items.length) clearInterval(interval)
    }, 100)
    return () => clearInterval(interval)
  }, [items.length])

  return (
    <box flexDirection="column">
      {items.slice(0, visibleCount).map((item, i) => <text key={i}>{item}</text>)}
    </box>
  )
}
```
