# React Configuration — Index

| File | Contents |
|------|---------|
| [configuration-setup.md](./configuration-setup.md) | Project setup, tsconfig, package.json, project structure, renderer options |
| [configuration-advanced.md](./configuration-advanced.md) | Building executables, env variables, React DevTools, testing, common issues |

## Quick Start

```bash
# New project
bunx create-tui@latest -t react my-app

# Manual
bun install @opentui/react @opentui/core react
```

**Minimum `tsconfig.json`:**

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@opentui/react",
    "moduleResolution": "bundler"
  }
}
```

**Entry point:**

```tsx
const renderer = await createCliRenderer({ exitOnCtrlC: true })
createRoot(renderer).render(<App />)
```
