# Core Patterns — Composition

## Imperative Composition

```typescript
const renderer = await createCliRenderer()

const container = new BoxRenderable(renderer, {
  id: "container",
  flexDirection: "column",
  padding: 1,
})

container.add(new TextRenderable(renderer, { id: "header", content: "Header", fg: "#00FF00" }))
container.add(new TextRenderable(renderer, { id: "body", content: "Body content" }))
renderer.root.add(container)
```

## Declarative Composition (Constructs)

```typescript
import { Box, Text, Input, delegate } from "@opentui/core"

renderer.root.add(
  Box(
    { flexDirection: "column", padding: 1 },
    Text({ content: "Header", fg: "#00FF00" }),
    Box(
      { flexDirection: "row", gap: 2 },
      Text({ content: "Name:" }),
      Input({ id: "name", placeholder: "Enter name..." }),
    ),
  )
)
```

## Factory Functions (Reusable Components)

```typescript
// Imperative factory
const createLabeledInput = (
  renderer: RenderContext,
  props: { id: string; label: string; placeholder: string }
): BoxRenderable => {
  const container = new BoxRenderable(renderer, {
    id: `${props.id}-container`,
    flexDirection: "row",
    gap: 1,
  })
  container.add(new TextRenderable(renderer, { id: `${props.id}-label`, content: props.label }))
  container.add(new InputRenderable(renderer, {
    id: `${props.id}-input`,
    placeholder: props.placeholder,
    width: 20,
  }))
  return container
}

// Declarative factory
const createLabeledInputNode = (props: { id: string; label: string; placeholder: string }) =>
  delegate(
    { focus: `${props.id}-input` },
    Box(
      { flexDirection: "row", gap: 1 },
      Text({ content: props.label }),
      Input({ id: `${props.id}-input`, placeholder: props.placeholder, width: 20 }),
    ),
  )
```

## Focus Delegation

Route `.focus()` calls to a nested element using `delegate`:

```typescript
const form = delegate(
  { focus: "email-input", blur: "email-input" },
  Box(
    { border: true, padding: 1 },
    Text({ content: "Email:" }),
    Input({ id: "email-input", placeholder: "you@example.com" }),
  ),
)

form.focus()  // Focuses the input, not the box
```

## Dynamic Updates

```typescript
const statsText = new TextRenderable(renderer, { id: "stats", content: "Loading..." })

const updateStats = async () => {
  const data = await fetchStats()
  statsText.setContent(`CPU: ${data.cpu}% | Memory: ${data.memory}%`)
}

await updateStats()
setInterval(updateStats, 5000)
```
