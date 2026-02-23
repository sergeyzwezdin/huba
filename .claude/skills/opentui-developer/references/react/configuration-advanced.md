# React Configuration — Build, DevTools & Testing

## Contents

- [Building for Distribution](#building-for-distribution) — bundling, executables
- [Environment Variables](#environment-variables) — .env, Bun auto-loading
- [React DevTools](#react-devtools) — connecting DevTools, DEV env var
- [Testing Configuration](#testing-configuration) — test setup, example
- [Common Issues](#common-issues) — JSX types, React version, module resolution

---

## Building for Distribution

### Bundle with Bun

```typescript
// build.ts
await Bun.build({
  entrypoints: ["./src/index.tsx"],
  outdir: "./dist",
  target: "bun",
  minify: true,
})
```

```bash
bun run build.ts
```

### Create Standalone Executable

```typescript
// build.ts
await Bun.build({
  entrypoints: ["./src/index.tsx"],
  outdir: "./dist",
  target: "bun",
  compile: {
    target: "bun-darwin-arm64",  // bun-linux-x64, bun-windows-x64, etc.
    outfile: "my-app",
  },
})
```

---

## Environment Variables

Bun auto-loads `.env` files — no dotenv needed:

```env
# .env
OTUI_SHOW_STATS=false
SHOW_CONSOLE=false
API_URL=https://api.example.com
```

```tsx
const apiUrl = process.env.API_URL
```

---

## React DevTools

### Setup

1. Install DevTools (must be version 7):
   ```bash
   bun add react-devtools-core@7 -d
   ```

2. Run standalone DevTools app:
   ```bash
   npx react-devtools@7
   ```

3. Start your app with `DEV=true`:
   ```bash
   DEV=true bun run src/index.tsx
   ```

Auto-connect **only** happens when `DEV=true` is set. OpenTUI checks `process.env["DEV"] === "true"` at startup and dynamically imports `react-devtools-core`.

---

## Testing Configuration

### Test Helper

```typescript
// src/test-utils.tsx
import { createTestRenderer } from "@opentui/core/testing"
import { createRoot } from "@opentui/react"

export const renderForTest = async (
  element: React.ReactElement,
  options = { width: 80, height: 24 }
) => {
  const testSetup = await createTestRenderer(options)
  createRoot(testSetup.renderer).render(element)
  return testSetup
}
```

### Test Example

```typescript
import { test, expect } from "bun:test"
import { renderForTest } from "../test-utils"
import { Counter } from "./Counter"

test("Counter renders initial value", async () => {
  const { snapshot } = await renderForTest(<Counter initialValue={5} />)
  expect(snapshot()).toContain("Count: 5")
})
```

---

## Common Issues

### JSX Types Not Working

Ensure `jsxImportSource` is set in `tsconfig.json`:

```json
{ "compilerOptions": { "jsx": "react-jsx", "jsxImportSource": "@opentui/react" } }
```

### React Version Mismatch

Requires React 19+:

```bash
bun install react@19 @types/react@19
```

### Module Resolution Errors

Use `moduleResolution: "bundler"` for Bun compatibility.
