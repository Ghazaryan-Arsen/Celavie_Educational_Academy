---
description: "Use when modifying TypeScript files (.ts, .tsx). Enforce strict type safety, avoid any types, preserve existing type definitions, and only remove code after verifying all references in the codebase."
applyTo: "**/*.ts"
---

# TypeScript Code Guidelines

## Type Safety Requirements

- **Never use `any` type** — use proper types or request type expansion
- **Strict mode enabled** — tsconfig.json has `strict: true`; comply with compiler settings
- **Preserve existing types** — extend from [src/types/](../../src/types/) index.ts and specialized type files
- **Document complex types** — use JSDoc comments for non-obvious type definitions
- **Avoid type assertions (`as`)** — only when absolutely necessary with explicit comment explaining why

## Type Sources

- **App types**: [src/types/index.ts](../../src/types/index.ts) — application domain types
- **Domain types**: [src/types/niceExchange.ts](../../src/types/niceExchange.ts) — Nice Exchange form types
- When adding types, extend or add to the appropriate file, don't create isolated type files

## Code Removal Safety

**Before removing any code, function, or import:**
1. Search the entire codebase for all references using grep/search tools
2. Verify the code is truly unused in all files (not just one)
3. Check for dynamic references (string references, indirect imports)
4. Confirm no tests or build configs depend on it
5. Only remove after explicit approval

Never assume code is unused without comprehensive search.

## Import Organization

- Keep imports organized: types first, then functions/defaults
- Remove only genuinely unused imports after verification
- Maintain absolute imports via tsconfig `baseUrl` and `paths`

## Build Validation

- Run `npm run build` to validate TypeScript compilation
- Ensure no type errors are introduced
- Respect the existing type configuration in [tsconfig.json](../../tsconfig.json)

## Common Patterns in CELAVIE

- Event handlers: `React.MouseEvent<HTMLElement>`, `React.ChangeEvent<HTMLInputElement>`
- API responses: Use types from [src/types/registration.ts](../../src/types/registration.ts)
- Form data: Check [src/lib/validation.ts](../../src/lib/validation.ts) for existing validation types

## When in Doubt

Show the type error clearly. Request clarification on whether to extend existing types or create new ones. Never silently use `any` as a workaround.
