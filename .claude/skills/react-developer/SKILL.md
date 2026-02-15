---
name: react-developer
description: >
  React and Ink best practices for building clean, maintainable, performant TUI applications
  using Feature-Sliced Design architecture. ALWAYS use when working with React/Ink/TUI:
  (1) Creating or modifying ANY React/Ink components (.tsx files), (2) Organizing code into
  FSD layers (app/pages/widgets/features/entities/shared), (3) Writing custom hooks or React
  components, (4) Managing state with Jotai or TanStack Query, (5) Building CLI/TUI/terminal
  interfaces with Ink, (6) Creating page components, widget components, feature components, or
  UI components, (7) Structuring React applications with FSD architecture, (8) Any React/Ink
  development task requiring architectural or code quality guidance. Provides component patterns,
  hooks best practices, state management strategies, performance optimization, FSD layer organization,
  and Ink-specific TUI patterns. Auto-triggers for all .tsx files and FSD structure work.
---

# React Developer

Follow React best practices and Feature-Sliced Design architecture for clean, maintainable code.

## Quick Reference

### Core Principles
- **Components**: Arrow functions, named exports, FC type
- **Hooks**: Extract at 3+ uses, return objects not arrays
- **State**: Local (useState), Shared (Jotai), Server (TanStack Query)
- **FSD Layers**: `app → pages → widgets → features → entities → shared` (strict downward imports)
- **Performance**: Profile before optimizing, use composition over memo

### When to Read References

**For React/Ink component patterns:**
- Component structure and organization
- Custom hooks patterns
- State management strategy
- Performance optimization
- Ink-specific TUI patterns
- Error handling

→ Read [react-patterns.md](references/react-patterns.md)

**For FSD architecture:**
- Layer hierarchy and import rules
- Slice structure and organization
- Public API design (index.ts)
- Path aliases and naming conventions
- Common composition patterns

→ Read [fsd-architecture.md](references/fsd-architecture.md)

## Common Workflows

### Creating a New Component

1. Identify correct FSD layer (page/widget/feature/entity)
2. Create slice directory if needed: `feature-name/`
3. Add to appropriate segment: `ui/component-name.tsx`
4. Define props type, component (FC), exports (named)
5. Export from public API: `index.ts`

### Creating a Feature

1. Create feature slice: `src/features/feature-name/`
2. Add segments as needed:
   - `ui/` for components
   - `model/` for hooks, atoms, queries, types
   - `lib/` for utilities
3. Export public API via `index.ts`
4. Import only from lower layers (entities, shared)

### Organizing State

- **Component-local**: `useState` in component
- **Cross-component**: Jotai atom in `model/*.atom.ts`
- **Server data**: TanStack Query in `model/*.query.ts` or `shared/api/`
- **Derived**: Compute during render or `useMemo` if expensive

## Anti-Patterns to Avoid

- ❌ Default exports
- ❌ Upward imports (entities importing widgets)
- ❌ Business logic in shared layer
- ❌ Importing internals (bypass index.ts)
- ❌ Premature optimization
- ❌ Prop drilling > 2 levels
