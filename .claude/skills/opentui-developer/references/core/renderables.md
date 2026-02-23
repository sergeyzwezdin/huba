# Core Renderables

## TextRenderable

```typescript
import { TextRenderable, TextAttributes, t, bold, fg, underline } from "@opentui/core"

const text = new TextRenderable(renderer, {
  id: "text",
  content: "Hello World",
  fg: "#FFFFFF",
  bg: "#000000",
  attributes: TextAttributes.BOLD | TextAttributes.UNDERLINE,
  selectable: true,
})

// Template literal styled text
const styled = new TextRenderable(renderer, {
  content: t`${bold("Bold")} and ${fg("#FF0000")(underline("red underlined"))}`,
})
```

TextAttributes flags: `BOLD`, `DIM`, `ITALIC`, `UNDERLINE`, `BLINK`, `INVERSE`, `HIDDEN`, `STRIKETHROUGH`

## BoxRenderable

```typescript
import { BoxRenderable } from "@opentui/core"

const box = new BoxRenderable(renderer, {
  id: "box",
  width: 40, height: 10,
  backgroundColor: "#1a1a2e",
  border: true,
  borderStyle: "single" | "double" | "rounded" | "bold",
  borderColor: "#FFFFFF",
  title: "Panel Title",
  titleAlignment: "left" | "center" | "right",
  onMouseDown: (event) => {},
  onMouseUp: (event) => {},
  onMouseMove: (event) => {},
})
```

## InputRenderable

```typescript
import { InputRenderable, InputRenderableEvents } from "@opentui/core"

const input = new InputRenderable(renderer, {
  id: "input",
  width: 30,
  placeholder: "Enter text...",
  value: "",
  backgroundColor: "#1a1a1a",
  textColor: "#FFFFFF",
  cursorColor: "#00FF00",
  focusedBackgroundColor: "#2a2a2a",
})

input.on(InputRenderableEvents.CHANGE, (value: string) => {})
input.on(InputRenderableEvents.FOCUS, () => {})
input.on(InputRenderableEvents.BLUR, () => {})
input.focus()  // Must focus to receive input
```

## SelectRenderable

```typescript
import { SelectRenderable, SelectRenderableEvents } from "@opentui/core"

const select = new SelectRenderable(renderer, {
  id: "select",
  width: 30, height: 10,
  options: [
    { name: "Option 1", description: "First option", value: "1" },
    { name: "Option 2", description: "Second option", value: "2" },
  ],
  selectedIndex: 0,
})

select.on(SelectRenderableEvents.ITEM_SELECTED, (index, option) => {})   // Enter pressed
select.on(SelectRenderableEvents.SELECTION_CHANGED, (index, option) => {}) // Arrow keys
select.focus()
```

**Event distinction:**
- `ITEM_SELECTED` — Enter pressed, user confirms selection
- `SELECTION_CHANGED` — Arrow keys, user browsing options

## TabSelectRenderable

```typescript
import { TabSelectRenderable, TabSelectRenderableEvents } from "@opentui/core"

const tabs = new TabSelectRenderable(renderer, {
  id: "tabs",
  width: 60,
  options: [
    { name: "Home", description: "Dashboard" },
    { name: "Settings", description: "Configuration" },
  ],
  tabWidth: 20,
})

tabs.on(TabSelectRenderableEvents.ITEM_SELECTED, (index, option) => {})   // Enter pressed
tabs.on(TabSelectRenderableEvents.SELECTION_CHANGED, (index, option) => {}) // Arrow keys
tabs.focus()  // Navigate: left/right/[/], select: enter
```

## ScrollBoxRenderable

```typescript
import { ScrollBoxRenderable } from "@opentui/core"

const scrollbox = new ScrollBoxRenderable(renderer, {
  id: "scrollbox",
  width: 40, height: 20,
  showScrollbar: true,
  scrollbarOptions: {
    showArrows: true,
    trackOptions: {
      foregroundColor: "#7aa2f7",
      backgroundColor: "#414868",
    },
  },
})

// Scroll programmatically
scrollbox.scrollTo(0)         // Scroll to top
scrollbox.scrollToBottom()    // Scroll to end
scrollbox.scrollBy(10)        // Scroll relative

scrollbox.focus()  // Scroll with arrow keys
```

## ASCIIFontRenderable

```typescript
import { ASCIIFontRenderable, RGBA } from "@opentui/core"

const title = new ASCIIFontRenderable(renderer, {
  id: "title",
  text: "OPENTUI",
  font: "tiny" | "block" | "slick" | "shade",
  color: RGBA.fromHex("#FFFFFF"),
})
```

## FrameBufferRenderable

Low-level 2D rendering surface for custom graphics:

```typescript
import { FrameBufferRenderable, RGBA } from "@opentui/core"

const canvas = new FrameBufferRenderable(renderer, {
  id: "canvas",
  width: 50, height: 20,
})

canvas.frameBuffer.fillRect(10, 5, 20, 8, RGBA.fromHex("#FF0000"))
canvas.frameBuffer.drawText("Custom", 12, 7, RGBA.fromHex("#FFFFFF"))
canvas.frameBuffer.setCell(x, y, char, fg, bg)
```
