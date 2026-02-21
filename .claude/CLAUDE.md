# CLAUDE.md

## Project Overview

TUI application for managing Claude Code tasks. Provides search, view, create, edit, and delete operations for task files stored in `~/.claude/tasks/`.

## Tech Stack

- **Runtime**: Bun (package management, bundling, execution)
- **Language**: TypeScript (100% typed)
- **UI Framework**: OpenTUI (React for CLI/TUI)
- **State Management**: Jotai (internal state)
- **Data Fetching**: TanStack Query (file system queries)
- **Validation**: Zod (schema validation and type inference)
- **Distribution**: Single-file executable via Bun
- **Code Quality**: Biome (formatting and linting)

## Path Aliases

- `@/*` maps to `./src/*` (configured in tsconfig.json)
- Examples: `@/pages/list-selection`, `@/shared/routing`, `@/entities/task`

## Development Skills

**ALWAYS use these skills when working on this codebase:**

- **`typescript-developer`**: Use for ALL TypeScript work including:
  - Creating or modifying any .ts files
  - Defining types, interfaces, schemas, or models
  - Writing functions, classes, or utilities
  - Setting up Zod validation schemas
  - Any TypeScript code that requires type safety and quality guidance

- **`react-developer`**: Use for ALL React work including:
  - Creating or modifying any .tsx files
  - Building UI components (pages, widgets, features, entities)
  - Writing custom hooks
  - Managing state with Jotai or TanStack Query
  - Organizing code into FSD layers (app/pages/widgets/features/entities/shared)
  - Any React development

- **`opentui-developer`**: Use for ALL React/OpenTUI work including:
  - Creating or modifying any .tsx files
  - Building UI components (pages, widgets, features, entities)
  - Any React/OpenTUI TUI development

These skills provide SOLID principles, naming conventions, architectural patterns, and best practices that ensure code consistency across the project.

## Architecture

### Task File Format
- Task files: `~/.claude/tasks/{list-id}/{task-id}.json`
- Each task has: id, subject, description, activeForm, status (pending/in_progress/completed), owner, blocks/blockedBy arrays, metadata
- Task IDs are numbers assigned by Claude Code
- List entity: `src/entities/claude-list/` (manages list selection, watching, query)
- Files are managed by Claude Code's internal task manager

### File System Watching
- Task files watched via `src/entities/task/model/tasks-watcher.ts`
- List directories watched via `src/entities/claude-list/model/claude-lists-watcher.ts`
- UI auto-refreshes when Claude Code modifies tasks
- Use TanStack Query for efficient cache invalidation

### Keyboard Handling Pattern
- Each widget has its own `model/use-hotkeys.ts`; page-level in `pages/*/model/use-hotkeys.ts`
- Use `useKeyboard` from `@/shared/keyboard` (respects global enable/disable state)
- Use `useFocusManager` from `@/shared/focus-manager` for programmatic widget focus

### Toast Notifications
- Import `toast` from `@opentui-ui/toast`; themed `<Toaster>` registered in `src/app/toaster.tsx`
- Types: `toast.info()`, `toast.success()`, `toast.error()`, `toast.warning()`

### Theme System
- Built-in themes in `src/shared/theme/` (claude, catppuccin, github, contrast, grayed)
- Custom theme loadable from `~/.claude-tasks` (JSON)
- Access via `useTheme()` from `@/shared/settings`; use `theme.*` color tokens with `rgbToHex()`

### Persistent State
- Use `atomWithStorage` from `@/shared/state` for atoms that should survive navigation
- Example: `taskFilterAtom`, `taskSortAtom` in `src/entities/task/model/`

### Generic Select Component
- `BaseSelectRenderable` from `@/shared/ui/select` is the base for all list-style selectors
- Item type must extend `BaseSelectOption` (`{ id: string }`)

### Task Status Notes
- `blocked` status remains in schema for backward compatibility but is treated as `pending` for filtering
- Task filter `'pending'` matches both `pending` and `blocked` statuses

### Key Design Principles
- Reactive UI: File watcher triggers re-renders when tasks change
- Type safety: Strict TypeScript types for task schema
- Schema validation: Use Zod for runtime validation of all external data (JSON files, API responses)
- Path discovery: Scan `~/.claude/tasks/` to find all task files
- Efficient filtering: Support filtering by status, project, keywords
- Task relationships: Display blockedBy/blocks dependencies

## Development Commands

- Install dependencies: `bun install`
- Run dev mode: `bun run dev`
- Build executable: `bun build --compile --outfile=claude-tasks`
- Type check: `bun run typecheck`
- Format code: `bun run format`
- Format specific file: `bun run format:file <file>`
- Lint code: `bun run lint`
- Test: `bun test`
- Single test: `bun test <filename>`

## Entry Point & Environment

- **Main entry**: `index.tsx` (has `#!/usr/bin/env bun` shebang)
- **Environment variable**: `CLAUDE_CODE_TASK_LIST_ID`
  - Controls default route: if set, opens task-list view directly; otherwise shows list-selection
  - Usage: `CLAUDE_CODE_TASK_LIST_ID=abc123 bun run dev`

## Technical Constraints

- Must handle concurrent access to task files (Claude Code may be writing)
- File watcher must debounce rapid changes
- Task IDs are numbers (assigned by Claude Code)
- Project paths use hash of project directory path
- JSON parsing must be lenient (handle missing optional fields)
- OpenTUI uses React reconciliation; avoid expensive re-renders
