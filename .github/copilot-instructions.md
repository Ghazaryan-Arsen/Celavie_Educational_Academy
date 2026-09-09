# CELAVIE Educational Academy - Copilot Guidelines

## Project Overview

CELAVIE Educational Academy is a React/TypeScript/Vite educational platform with Supabase backend integration. The project includes:

- **Frontend**: React components, TypeScript, Tailwind CSS, Vite bundler
- **Backend**: Supabase (PostgreSQL database, authentication, real-time)
- **Integrations**: Make.com workflows, email systems, Google Sheets, NICE Exchange API
- **Forms**: Course registration, lead generation
- **Pages**: HomePage, ServicesPage, RegisterPage, LanguageCourseDetailsPage, AdminPage, and more

**Repository structure**: [See workspace folder organization](../../../)

## Core Architectural Principles

### 1. Preservation Over Redesign

- **Existing UI is intentional** — the design, layout, responsiveness, and visual style serve user needs
- **Do not redesign components** unless explicitly requested with specific rationale
- **Maintain responsive patterns** — preserve all media queries and breakpoint behaviors
- **Keep established patterns** — follow conventions from similar components in the codebase

### 2. Minimal, Scoped Changes

- Make **only the requested change**, nothing more
- Avoid "while we're at it" refactoring unless explicitly approved
- Do not bundle multiple unrelated changes in a single operation
- Explain the scope clearly before implementing

### 3. Safety-First Code Review

Before modifying any code:
1. **Analyze existing architecture** to understand dependencies
2. **Search for all references** to any code being changed or removed
3. **Identify breaking changes** and document them clearly
4. **Request explicit approval** for destructive or high-risk operations

### 4. Type Safety and Code Quality

- **Strict TypeScript**: Use types from [src/types/](src/types/) — never use `any`
- **Preserve existing types**: Extend interfaces instead of replacing them
- **Verify references**: Before removing code, confirm it's unused everywhere
- **Validate builds**: Run `npm run build` to ensure TypeScript compilation succeeds

### 5. Database Protection

- **Schemas and data are immutable**: Never modify, delete, truncate, or reset database structures
- **Migrations are audit trails**: Cannot be edited, deleted, or rolled back without approval
- **Production safety**: No destructive operations without explicit authorization
- See [.github/instructions/supabase-database.instructions.md](.github/instructions/supabase-database.instructions.md) for detailed rules

## Development Workflow

### Getting Started

```bash
npm install                 # Install dependencies
npm run dev                 # Start development server (Vite)
npm run build              # Build for production
npm run preview            # Preview production build
npm run lint               # Run ESLint
```

### Project Structure

- **src/pages/**: Route handlers and page components
- **src/components/domain/**: Business logic components (CourseCard, PricingCard, etc.)
- **src/components/ui/**: Reusable UI building blocks (Button, Input, Modal, etc.)
- **src/components/layout/**: Page structure (Navigation, Footer)
- **src/lib/**: Utilities, helpers, and integrations
- **src/types/**: TypeScript type definitions
- **src/data/**: Mock data and fixtures
- **supabase/**: Database schema and migrations

### Important Configuration Files

- [tsconfig.json](tsconfig.json): TypeScript strict mode enabled
- [vite.config.ts](vite.config.ts): Build and dev server config
- [package.json](package.json): Dependencies and scripts

## Code Standards

### React Components

- **Preserve existing patterns** — don't rewrite components unless requested
- **Maintain component hierarchy** — domain vs. UI vs. layout separation
- **Keep responsive design** — all existing breakpoints and media queries must remain
- **Type props strictly** — use TypeScript interfaces for all component props
- See [.github/instructions/react-components.instructions.md](.github/instructions/react-components.instructions.md)

### TypeScript

- **No `any` types** — use proper typing or request type expansion
- **Extend existing types** — don't duplicate type definitions
- **Verify code removal** — search entire codebase before deleting code
- **Validate compilation** — always run `npm run build` before completion
- See [.github/instructions/typescript-code.instructions.md](.github/instructions/typescript-code.instructions.md)

### Supabase Integration

- **Database structures are protected** — cannot be modified without approval
- **Migrations are final** — cannot be edited or rolled back
- **Use typed queries** — leverage [src/types/database.ts](src/types/database.ts) for type safety
- **No direct SQL** — review complex queries with the team
- See [.github/instructions/supabase-database.instructions.md](.github/instructions/supabase-database.instructions.md)

## Prohibited Operations

**NEVER do these without explicit approval:**

- Delete, drop, truncate, or reset databases or tables
- Modify database schemas or migrations
- Redesign or significantly restructure existing UI components
- Add authentication systems, dashboards, or payment systems
- Install dependencies without justification
- Commit or push code without explicit instruction
- Deploy to production
- Modify environment variables or secrets
- Make destructive changes without risk analysis
- Assume code is unused without comprehensive verification

## Integration Points

### Make.com Workflows
- Located in [src/lib/niceExchange.ts](src/lib/niceExchange.ts) and webhook handlers
- Trigger registration flows, email sending, lead capture
- Do not modify webhook endpoints without reviewing all Make.com connections

### Email System
- Integrated with registration and lead workflows
- Verify email templates and content before changes

### NICE Exchange API
- Defined in [src/types/niceExchange.ts](src/types/niceExchange.ts)
- Used for language exchange coordination
- Do not modify API integration without understanding full flow

### Google Sheets Integration
- Part of lead capture and data export workflows
- Verify before removing any sheet-related code

## Common Tasks & Patterns

### Adding a New Component

Use the existing component structure as template. Refer to [src/components/domain/CourseCard.tsx](src/components/domain/CourseCard.tsx) or [src/components/ui/Button.tsx](src/components/ui/Button.tsx) for patterns.

### Modifying a Page

Review the page in [src/pages/](src/pages/) for existing patterns. Maintain all existing routes, state management, and UI structure unless explicitly requested otherwise.

### Database Queries

Study [src/lib/supabase.ts](src/lib/supabase.ts) for existing patterns. Use types from [src/types/database.ts](src/types/database.ts). Never execute destructive queries.

### Form Validation

Check [src/lib/validation.ts](src/lib/validation.ts) for existing validation patterns. Extend when adding new forms.

## Requesting Changes

When asking for modifications:
- **Be specific about what to change** and why
- **Provide context** about the impact or benefit
- **Note if UI changes are acceptable** (they're generally preserved)
- **Approve breaking changes** explicitly if necessary
- **Allow time for analysis** — the agent will audit before implementing

## Questions Before Proceeding

The agent will ask clarifying questions when:
- A change could affect multiple parts of the codebase
- Removing code or dependencies
- Modifying core functionality
- There's ambiguity about scope or impact
- Breaking changes are involved

## Team Standards

This workspace uses the CELAVIE Architect agent for specialized codebase work. All agents follow these guidelines for consistency and safety.

**When in doubt, ask for clarification rather than assuming.**
