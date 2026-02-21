# React Patterns — State Management

## Local State

```tsx
const Counter: FC = () => {
  const [count, setCount] = useState(0)
  return (
    <box flexDirection="row" gap={2}>
      <text>Count: {count}</text>
      <box border onMouseDown={() => setCount(c => c - 1)}><text>-</text></box>
      <box border onMouseDown={() => setCount(c => c + 1)}><text>+</text></box>
    </box>
  )
}
```

## Complex State with useReducer

```tsx
type State = { items: string[]; selectedIndex: number }
type Action =
  | { type: "ADD_ITEM"; item: string }
  | { type: "SELECT"; index: number }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_ITEM": return { ...state, items: [...state.items, action.item] }
    case "SELECT": return { ...state, selectedIndex: action.index }
  }
}

const ItemList: FC = () => {
  const [state, dispatch] = useReducer(reducer, { items: [], selectedIndex: 0 })
}
```

## Async Data Loading

```tsx
const DataDisplay: FC = () => {
  const [data, setData] = useState<string[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchData()
        setData(result)
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error")
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  if (isLoading) return <text>Loading...</text>
  if (error) return <text fg="red">Error: {error}</text>
  return <box flexDirection="column">{data?.map((item, i) => <text key={i}>{item}</text>)}</box>
}
```

## Interval-based Updates

```tsx
const Clock: FC = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)  // Always clean up!
  }, [])

  return <text>{time.toLocaleTimeString()}</text>
}
```

## Animation with useTimeline

```tsx
const ProgressBar: FC = () => {
  const [progress, setProgress] = useState(0)
  const timeline = useTimeline({ duration: 3000 })

  useEffect(() => {
    timeline.add(
      { value: 0 },
      {
        value: 100,
        duration: 3000,
        ease: "linear",
        onUpdate: (anim) => setProgress(Math.round(anim.targets[0].value)),
      }
    )
  }, [])

  return (
    <box flexDirection="column" gap={1}>
      <text>Progress: {progress}%</text>
      <box width={50} height={1} backgroundColor="#333">
        <box width={`${progress}%`} height={1} backgroundColor="#00ff00" />
      </box>
    </box>
  )
}
```

## Performance

```tsx
// Prefer direct props over inline style objects
<box padding={2}>Content</box>          // GOOD
<box style={{ padding: 2 }}>Content</box>  // New object every render

// Memoize expensive components
const ExpensiveList = React.memo(function ExpensiveList({ items }: { items: Item[] }) {
  return <box flexDirection="column">{items.map(item => <text key={item.id}>{item.name}</text>)}</box>
})

// Don't update state during render — use useEffect
```
