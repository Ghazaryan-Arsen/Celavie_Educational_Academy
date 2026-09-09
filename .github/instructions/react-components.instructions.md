---
description: "Use when modifying or creating React components (.tsx). Preserve existing UI patterns, component structure, responsiveness, and styling. Avoid unnecessary rewrites. Maintain the established component hierarchy and prop interfaces."
applyTo: "**/*.tsx"
---

# React Component Development Guidelines

## Preservation Rules

- **Do NOT redesign components** unless explicitly requested
- **Preserve responsive behavior** — maintain existing media queries and breakpoints
- **Keep established patterns** — follow the component structure already used in similar components
- **Maintain prop interfaces** — extend interfaces instead of replacing them
- **Don't remove styling** — all CSS classes and styling logic should remain unless replacing with equivalent

## Component Patterns

Refer to existing domain components in [src/components/domain/](../../src/components/domain/) and UI components in [src/components/ui/](../../src/components/ui/) for established patterns:

- **Domain Components** (CourseCard, PricingCard, TestimonialCard): Task-specific, styled business logic
- **UI Components** (Button, Input, Modal): Reusable, unstyled building blocks
- **Layout Components** (Navigation, Footer): Page structure and structure only

When modifying any component, maintain its classification and responsibility.

## Type Safety

- Use strict TypeScript types from [src/types/](../../src/types/)
- Extend existing interfaces instead of creating duplicates
- Document component props with JSDoc comments
- Avoid using `any` type

## Styling

- CSS modules are in collocated `.css` files (e.g., `Button.tsx` → `Button.css`)
- Maintain responsive design with established breakpoints
- Do not modify existing class names without updating all usages
- Keep responsive patterns consistent with Tailwind utility classes where present

## Performance

- Memoize expensive components with `React.memo()` if already used
- Avoid unnecessary re-renders by respecting existing prop interfaces
- Do not add new dependencies without approval

## When in Doubt

Ask which specific parts of the component should change. Show the existing pattern and your proposed change before implementing.
