---
name: react-developer
description: >
  React and OpenTUI best practices for building clean, maintainable, performant TUI applications
  using Feature-Sliced Design architecture. ALWAYS use when working with React/OpenTUI/TUI:
  (1) Creating or modifying ANY React/OpenTUI components (.tsx files), (2) Organizing code into
  FSD layers (app/pages/widgets/features/entities/shared), (3) Writing custom hooks or React
  components, (4) Managing state with Jotai or TanStack Query, (5) Building CLI/TUI/terminal
  interfaces with OpenTUI, (6) Creating page components, widget components, feature components, or
  UI components, (7) Structuring React applications with FSD architecture, (8) Any React/OpenTUI
  development task requiring architectural or code quality guidance. Provides component patterns,
  hooks best practices, state management strategies, performance optimization, FSD layer organization,
  and OpenTUI-specific TUI patterns. Auto-triggers for all .tsx files and FSD structure work.
---

# React Developer

Follow React best practices and Feature-Sliced Design architecture for clean, maintainable code.

## Core Principles

- **Components**: Arrow functions, named exports, `{ComponentName}Props` type
- **Hooks**: Extract at 3+ uses or complex stateful logic; return objects not arrays
- **State**: Local (`useState`), Shared (Jotai atom), Server (TanStack Query)
- **FSD Layers**: `app → pages → widgets → features → entities → shared` (strict downward imports)
- **Performance**: Profile before optimizing; composition over memo

## Reference Files

Read only what's needed for the current task:

### FSD Architecture
| File | Read when… |
|------|-----------|
| [fsd-layers.md](references/fsd-layers.md) | Deciding which layer a component/hook belongs to; understanding import rules; layer purposes with examples |
| [fsd-slices.md](references/fsd-slices.md) | Creating a new slice; organizing `ui/`/`model/`/`lib/` segments; writing `index.ts`; path aliases; naming conventions |
| [fsd-patterns.md](references/fsd-patterns.md) | Composing features with entities; widget orchestration; cross-slice dependencies; anti-patterns; migration |

### React & OpenTUI
| File | Read when… |
|------|-----------|
| [react-components.md](references/react-components.md) | Writing components, custom hooks, or managing state; component structure and organization rules |
| [react-performance.md](references/react-performance.md) | Optimizing renders; deciding when to use `React.memo`; error handling patterns |
| [opentui-patterns.md](references/opentui-patterns.md) | Working with TUI elements (`<box>`, `<text>`); keyboard/renderer hooks; style prop patterns |

## Common Workflows

### Creating a New Component

1. Identify correct FSD layer (page/widget/feature/entity) → [fsd-layers.md](references/fsd-layers.md)
2. Create slice directory if needed: `feature-name/`
3. Add to segment: `ui/component-name.tsx` → [react-components.md](references/react-components.md)
4. Export from public API: `index.ts` → [fsd-slices.md](references/fsd-slices.md)

### Creating a Feature

1. Create slice: `src/features/feature-name/`
2. Add segments: `ui/` for components, `model/` for hooks/atoms/queries, `lib/` for utilities
3. Export public API via `index.ts`
4. Import only from lower layers (entities, shared)

### Organizing State

- **Component-local**: `useState` in component
- **Cross-component**: Jotai atom in `model/*.atom.ts`
- **Server data**: TanStack Query in `model/*.query.ts` or `shared/api/`
- **Derived**: Compute during render or `useMemo` if expensive
