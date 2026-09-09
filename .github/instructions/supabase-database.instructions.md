---
description: "Use when working with Supabase files, migrations, schemas, or database operations. Database schemas, tables, migrations, and data are protected. Never modify, delete, drop, truncate, reset, or migrate database structures without explicit approval."
applyTo: ["supabase/**", "src/lib/supabase.ts"]
---

# Supabase Database Safety Guidelines

## Protected Assets

The following are **strictly protected** and must never be modified, deleted, or reset without explicit written approval:

- Database schemas ([supabase/schema.sql](../../supabase/schema.sql))
- Table definitions and structures
- Migration files ([supabase/migrations/](../../supabase/migrations/))
- Existing data in all tables
- Row-level security (RLS) policies
- Database functions and triggers

## Prohibited Operations

**NEVER execute or suggest:**
- `DROP TABLE`, `DROP SCHEMA`, `DROP DATABASE`
- `TRUNCATE TABLE` (which deletes all data)
- `DELETE FROM table` without `WHERE` clause
- `ALTER TABLE ... DROP COLUMN`
- Resetting sequences, cascading deletes, or migration rollbacks
- Recreating or renaming tables
- Modifying RLS policies without explicit approval
- Destructive schema migrations

## Supabase Operations

When working with [src/lib/supabase.ts](../../src/lib/supabase.ts):

- **Read operations only** for auditing existing queries and data flows
- **Never delete rows** without explicit WHERE clause and approval
- **Never modify table structures** through migrations without approval
- **Validate all queries** before execution
- **Check RLS policies** to understand data access boundaries

## Migration Safety

Migration files are **audit trails of all schema changes** and must never be:
- Deleted or edited
- Renamed or reorganized
- Executed in reverse (rollback) without explicit approval

Any new migration must:
1. Be reversible
2. Be tested in a safe environment first
3. Include documentation of what changed and why
4. Require explicit approval before deployment

## When Working with Database Code

- Review existing queries in [src/lib/supabase.ts](../../src/lib/supabase.ts) to understand patterns
- Use types from [src/types/database.ts](../../src/types/database.ts) for type-safe operations
- Never create direct SQL queries without review
- Always scope changes to the minimum necessary

## Safety Questions to Ask

If uncertain about any database operation:
- "Will this change production data?"
- "Is this change reversible?"
- "Does this affect RLS policies or security?"
- "Will this require a migration?"

**If the answer is yes to any of these, request explicit approval before proceeding.**
