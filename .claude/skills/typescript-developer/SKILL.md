---
name: typescript-developer
description: >
  TypeScript best practices for writing clean, maintainable, type-safe code. ALWAYS use when
  working with TypeScript: (1) Creating or modifying ANY .ts/.tsx files, (2) Defining types,
  interfaces, schemas, models, or domain entities, (3) Writing functions, classes, or utilities,
  (4) Setting up validation with Zod schemas, (5) Creating model definitions, type definitions,
  or entity types (examples: user models, task schemas, domain types), (6) Any TypeScript
  development task requiring code quality guidance. Provides SOLID principles, strong typing
  patterns, naming conventions, error handling, Zod validation best practices, and code
  organization guidance. Auto-triggers for all TypeScript file operations.
---

# TypeScript Developer

Write clean, maintainable, type-safe TypeScript code following SOLID principles.

## Core Principles

- **Readable & maintainable**: Write straightforward, clean code that's easy to understand and modify
- **SOLID principles**: Follow Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **Strong typing**: Explicit types for all variables, parameters, and return values. Never use `any`
- **Performance optimization**: Use `Promise.all()` and other standard techniques for large datasets
- **Zod-first validation**: Define schemas first, infer types using `z.infer<typeof schema>`
- **Documentation**: Use JSDoc to document all public classes, functions, and methods
- **Named exports only**: No default exports. Explicit imports improve discoverability
- **Arrow functions**: Use arrow functions with explicit return types for all functions
- **Single responsibility**: Functions <20 LOC, focused purpose, early returns
- **Prefer `undefined`**: Return `undefined` for empty responses instead of `null`

## Naming Conventions

- **Files/directories**: kebab-case (`user-service.ts`, `get-user.ts`)
- **Classes**: PascalCase (`UserService`, `TaskManager`)
- **Types/Interfaces**: PascalCase (`User`, `UserCardProps`)
- **Functions/variables**: camelCase (`getUser`, `userId`)
- **Booleans**: verb prefix (`isLoading`, `hasError`, `canDelete`)
- **Constants**: UPPERCASE for env (`API_URL`), camelCase for objects
- **Hooks**: `use` prefix (`useUser`, `useAuth`)
- **Functions**: start with verb (`get*`, `create*`, `format*`, `validate*`)

## Reference Documentation

### Validation & Schemas
See [validation.md](references/validation.md)
- Zod schema patterns and type inference
- Safe parsing with error handling
- Enum schemas and optional fields
- Type guards and array validation

### Functions & Types
See [functions-types.md](references/functions-types.md)
- Function patterns with explicit types
- Type-only imports and exports
- Props types and parameter objects (RO-RO pattern)
- Import organization and barrel exports

### Error Handling
See [error-handling.md](references/error-handling.md)
- Type guard filtering
- When to throw vs return `undefined`
- Context requirement validation

### Documentation
See [jsdoc.md](references/jsdoc.md)
- JSDoc standards for functions, types, and components
- TypeDoc-compatible tags
- Documentation coverage requirements
