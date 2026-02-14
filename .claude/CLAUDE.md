# CLAUDE.md

## Project Overview

TUI application for managing Claude Code tasks. Provides search, view, create, edit, and delete operations for task files stored in `~/.claude/projects/*/tasks/`.

## Tech Stack

- **Runtime**: Bun (package management, bundling, execution)
- **Language**: TypeScript (100% typed)
- **UI Framework**: Ink (React for CLI/TUI)
- **State Management**: Jotai (internal state)
- **Data Fetching**: TanStack Query (file system queries)
- **Distribution**: Single-file executable via Bun
- **Code Quality**: Biome (formatting and linting)

## Architecture

### Task File Format
- Task files are JSON stored in `~/.claude/projects/{project-hash}/tasks/{task-id}.json`
- Each task has: id, subject, description, activeForm, status (pending/in_progress/completed), owner, blocks/blockedBy arrays, metadata
- Files are managed by Claude Code's internal task manager

### File System Watching
- Watches `~/.claude/tasks/{task-id}` for real-time updates
- UI auto-refreshes when Claude Code modifies tasks
- Use TanStack Query for efficient cache invalidation

### Code Organization (FSD)

Follows Feature-Sliced Design architecture:

- `src/app/`: Application initialization, providers, entry point
- `src/pages/`: Screen components (task list, task detail, search)
- `src/widgets/`: Composite UI blocks (task table, filter panel)
- `src/features/`: User interactions (task filtering, task actions)
- `src/entities/`: Business logic (task model, project model)
- `src/shared/`: Reusable code
  - `src/shared/ui/`: Base Ink components
  - `src/shared/lib/`: Utilities (file I/O, parsing, watching)
  - `src/shared/api/`: File system queries (TanStack Query)
  - `src/shared/types/`: TypeScript definitions

FSD rules:
- Lower layers cannot import from upper layers
- Each slice is independent within its layer
- Cross-slice imports only through public API (index.ts)

### Key Design Principles
- Reactive UI: File watcher triggers re-renders when tasks change
- Type safety: Strict TypeScript types for task schema
- Path discovery: Scan `~/.claude/projects/` to find all task files across projects
- Efficient filtering: Support filtering by status, project, keywords
- Task relationships: Display blockedBy/blocks dependencies

## Development Commands

- Install dependencies: `bun install`
- Run dev mode: `bun run dev`
- Build executable: `bun build --compile --outfile=claude-tasks`
- Format code: `bun run format`
- Lint code: `bun run lint`
- Test: `bun test`
- Single test: `bun test <filename>`

## CI/CD

### GitHub Actions
- Workflow: `.github/workflows/build.yml`
- Triggers: Push to main, pull requests
- Steps:
  - Install Bun
  - Type check (`bun run typecheck`)
  - Run tests (`bun test`)
  - Build single-file executable (`bun build --compile`)
  - Create release artifacts (binaries for macOS, Linux, Windows)

## Technical Constraints

- Must handle concurrent access to task files (Claude Code may be writing)
- File watcher must debounce rapid changes
- Task IDs can be UUIDs or human-readable names
- Project paths use hash of project directory path
- JSON parsing must be lenient (handle missing optional fields)
- Ink uses React reconciliation; avoid expensive re-renders
