# React Configuration — Project Setup

## Contents

- [Project Setup](#project-setup) — quick start, manual setup
- [TypeScript Configuration](#typescript-configuration) — tsconfig.json
- [Package Configuration](#package-configuration) — package.json, scripts
- [Project Structure](#project-structure) — file layout, entry point, App component
- [Renderer Configuration](#renderer-configuration) — createCliRenderer options

---

## Project Setup

### Quick Start

```bash
bunx create-tui@latest -t react my-app
cd my-app && bun install
```

> The CLI creates the `my-app` directory — it must **not** already exist.
> Options: `--no-git`, `--no-install`

### Manual Setup

```bash
mkdir my-tui && cd my-tui
bun init
bun install @opentui/react @opentui/core react
```

---

## TypeScript Configuration

```json
{
  "compilerOptions": {
    "lib": ["ESNext", "DOM"],
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",

    "jsx": "react-jsx",
    "jsxImportSource": "@opentui/react",

    "strict": true,
    "skipLibCheck": true,
    "noEmit": true,
    "types": ["bun-types"]
  },
  "include": ["src/**/*"]
}
```

**Critical:** `jsx: "react-jsx"` + `jsxImportSource: "@opentui/react"`.
`DOM` lib is needed for React types — OpenTUI's JSX types extend React's.

---

## Package Configuration

```json
{
  "name": "my-tui-app",
  "type": "module",
  "scripts": {
    "start": "bun run src/index.tsx",
    "dev": "bun --watch run src/index.tsx",
    "test": "bun test",
    "build": "bun build src/index.tsx --outdir=dist --target=bun"
  },
  "dependencies": {
    "@opentui/core": "latest",
    "@opentui/react": "latest",
    "react": ">=19.0.0"
  },
  "devDependencies": {
    "@types/bun": "latest",
    "@types/react": ">=19.0.0",
    "typescript": "latest"
  }
}
```

---

## Project Structure

```
my-tui-app/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── MainContent.tsx
│   ├── hooks/
│   │   └── useAppState.ts
│   ├── App.tsx
│   └── index.tsx
├── package.json
└── tsconfig.json
```

### Entry Point (`src/index.tsx`)

```tsx
import { createCliRenderer } from "@opentui/core"
import { createRoot } from "@opentui/react"
import { App } from "./App"

const renderer = await createCliRenderer({ exitOnCtrlC: true })
createRoot(renderer).render(<App />)
```

### App Component (`src/App.tsx`)

```tsx
import type { FC } from "react"

export const App: FC = () => {
  return (
    <box flexDirection="column" width="100%" height="100%">
      <Header />
      <box flexDirection="row" flexGrow={1}>
        <Sidebar />
        <MainContent />
      </box>
    </box>
  )
}
```

---

## Renderer Configuration

```tsx
import { createCliRenderer, ConsolePosition } from "@opentui/core"

const renderer = await createCliRenderer({
  targetFPS: 60,
  exitOnCtrlC: true,        // Set false to handle Ctrl+C yourself
  autoFocus: true,          // Auto-focus elements on click (default: true)
  useMouse: true,           // Enable mouse support (default: true)
  consoleOptions: {
    position: ConsolePosition.BOTTOM,
    sizePercent: 30,
    startInDebugMode: false,
  },
  onDestroy: () => {
    // Cleanup code
  },
})
```
