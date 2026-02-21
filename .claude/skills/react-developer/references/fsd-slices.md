# FSD: Slice Structure, Public API & Naming

## Slice Directory Structure

Each slice (except `app` and `shared`) follows:

```
feature-name/
├── index.ts                    # Public API (required)
├── ui/                         # React components + co-located tests
│   ├── component-name.tsx
│   └── component-name.test.tsx
├── model/                      # Business logic
│   ├── types.ts
│   ├── use-feature.ts          # Custom hooks
│   ├── feature.atom.ts         # Jotai atoms
│   └── feature.query.ts        # TanStack Query queries
└── lib/                        # Slice-specific utilities
    └── helpers.ts
```

**When NOT to create a segment:** Don't create empty segments. Simple slices may only have `ui/` + `index.ts`.

## Public API (index.ts)

Every slice must export through `index.ts`. Never import from internal paths directly.

```typescript
// src/features/task-filtering/index.ts
export { TaskFilterInput } from './ui/task-filter-input';
export { useTaskFilter } from './model/use-task-filter';
export { filterAtom } from './model/filter.atom';
export type { TaskFilterState } from './model/types';
export { matchesFilter } from './lib/filter-helpers';
```

**Rules:**
- Export only public interface — don't expose internals
- Group exports by segment with comments
- Export types with `export type`
- Named exports only (no default exports)

## Path Aliases

Use `@` for absolute imports from `src/`:

```typescript
// tsconfig.json
{ "compilerOptions": { "baseUrl": ".", "paths": { "@/*": ["./src/*"] } } }

// Usage
import type { Task } from '@/entities/task';
import { useTaskFilter } from '@/features/task-filtering';
import { Panel } from '@/shared/ui/panel';
```

## Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Slices | kebab-case | `task-filtering`, `task-table` |
| Components | PascalCase | `TaskFilterInput`, `TaskTable` |
| Hooks | `use` prefix, camelCase | `useTaskFilter` |
| Types | PascalCase | `Task`, `TaskStatus` |
| Files | kebab-case, match export | `task-table.tsx` → `TaskTable` |

**File → export mapping:**
- `use-{name}.ts` → `use{Name}` hook (e.g., `use-hotkeys.ts` → `useHotkeys`)
- `{name}.atom.ts` → `{name}Atom` (e.g., `tasks-filter.atom.ts` → `taskFilterAtom`)
- `{name}.query.ts` → `use{Name}Query`, `use{Name}` hooks
- `{name}-watcher.ts` → `use{Name}Watcher` hook (e.g., `tasks-watcher.ts` → `useTasksWatcher`)
- `{name}.renderable.ts` → `{Name}Renderable` class (e.g., `task-select.renderable.ts` → `TaskSelectRenderable`)
