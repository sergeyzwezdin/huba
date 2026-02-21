# Core Gotchas — Runtime & Setup

## Contents

- [Runtime Environment](#runtime-environment) — Bun, process.exit, env vars
- [Debugging TUIs](#debugging-tuis) — console visibility, test renderer
- [Focus Management](#focus-management) — components must be focused
- [Build Requirements](#build-requirements) — Zig for native builds

---

## Runtime Environment

### Use Bun, Not Node.js

```bash
# CORRECT
bun install @opentui/core
bun run src/index.ts
bun test

# WRONG
npm install @opentui/core
node src/index.ts
npx jest
```

Prefer Bun built-in APIs:

```typescript
Bun.file("path").text()           // instead of fs.readFile
Bun.$`ls -la`                     // instead of execa
import { Database } from "bun:sqlite"
```

### Avoid process.exit()

**Never use `process.exit()` directly** — it prevents terminal cleanup.

```typescript
// WRONG - Terminal may stay in broken state
if (error) process.exit(1)

// CORRECT
if (error) {
  await renderer.destroy()  // Restores terminal first
  process.exit(1)
}

// BETTER - Let renderer handle exit
const renderer = await createCliRenderer({ exitOnCtrlC: true })
// For programmatic exit:
renderer.destroy()
```

### Environment Variables

Bun auto-loads `.env`:

```typescript
// CORRECT
const apiKey = process.env.API_KEY

// WRONG - Don't use dotenv
import dotenv from "dotenv"
dotenv.config()
```

---

## Debugging TUIs

### Cannot See console.log Output

OpenTUI captures console output for the debug overlay. Options:

**1. Use the console overlay:**

```typescript
renderer.console.show()
console.log("This appears in overlay")
```

**2. Toggle with keyboard:**

```typescript
renderer.keyInput.on("keypress", (key) => {
  if (key.name === "f12") renderer.console.toggle()
})
```

**3. Write to a file:**

```typescript
import { appendFileSync } from "node:fs"
const debugLog = (msg: string) =>
  appendFileSync("debug.log", `${new Date().toISOString()} ${msg}\n`)
```

**4. Disable console capture:**

```bash
OTUI_USE_CONSOLE=false bun run src/index.ts
```

### Reproduce Issues in Tests

```typescript
test("reproduces the issue", async () => {
  const { renderer, snapshot } = await createTestRenderer({ width: 40, height: 10 })
  const box = new BoxRenderable(renderer, { /* ... */ })
  renderer.root.add(box)
  expect(snapshot()).toMatchSnapshot()
})
```

---

## Focus Management

### Components Must Be Focused

Input components only receive keyboard input when focused:

```typescript
const input = new InputRenderable(renderer, { id: "input", placeholder: "Type..." })
renderer.root.add(input)

// WRONG - won't receive keystrokes
// (no focus call)

// CORRECT
input.focus()
```

### Focus in Nested Components

```typescript
const container = new BoxRenderable(renderer, { id: "container" })
const input = new InputRenderable(renderer, { id: "input" })
container.add(input)
renderer.root.add(container)

// WRONG
container.focus()

// CORRECT
input.focus()
// Or:
container.getRenderable("input")?.focus()
// Or use delegate:
const form = delegate({ focus: "input" }, Box({}, Input({ id: "input" })))
form.focus()  // Routes to input
```

---

## Build Requirements

### Zig is Required for Native Builds

```bash
# Install Zig first (macOS)
brew install zig

# Then build native code
cd packages/core
bun run build
```

### When to Build

| Change type | Build needed? |
|-------------|--------------|
| TypeScript changes | No — Bun runs TS directly |
| Native (Zig) code changes | Yes |
