<!-- BEGIN:agent-instructions -->
# Link Shortener Project - Agent Instructions

## ⚠️ CRITICAL: Read This First

This project uses **Next.js 16.2.9**, which has **breaking changes** from earlier versions. Your training data may be outdated. Always consult `node_modules/next/dist/.github/instructions/` for current API documentation before writing code.

## 📚 Required Reading

### ⛔ MANDATORY: NO CODE WITHOUT DOCUMENTATION ⛔

**YOU MUST READ THE RELEVANT DOCUMENTATION FILES BEFORE GENERATING ANY CODE.**

This is **NOT OPTIONAL**. Before making **ANY** changes to this codebase, you **MUST**:

1. **STOP** - Do not write any code yet
2. **READ** the relevant documentation file(s) from `/.github/instructions` directory
3. **UNDERSTAND** the patterns and conventions
4. **THEN** and ONLY THEN generate code following those patterns

### Core Documentation Files
**READ THE RELEVANT FILE(S) BEFORE WRITING ANY CODE:**

- **[/.github/instructions/authentication.instructions.md](/.github/instructions/authentication.instructions.md)** - Clerk authentication, protected routes, modal sign-in/sign-up
- **[/.github/instructions/server-actions.instructions.md](/.github/instructions/server-actions.instructions.md)** - Server Actions, data mutations, validation, database helpers
- **[/.github/instructions/database-patterns.md](/.github/instructions/database-patterns.md)** - Drizzle ORM usage, schema conventions
- **[/.github/instructions/ui-components.instructions.md](/.github/instructions/ui-components.instructions.md)** - Component structure, shadcn/ui, styling

## 🔄 Workflow for AI Agents

### ⚠️ CRITICAL: Documentation-First Workflow

**NEVER skip step 1. Reading documentation is MANDATORY before any code generation.**

### When Adding a New Feature

1. **🚨 READ DOCUMENTATION FIRST 🚨** - This is NON-NEGOTIABLE
   - Identify which `/.github/instructions` file(s) are relevant
   - Read the ENTIRE relevant documentation file(s)
   - Understand the patterns before writing ANY code
2. **Understand** the existing patterns in similar files
3. **Follow** the established conventions strictly
4. **Test** your changes match the project standards

### When Fixing a Bug

1. **🚨 READ DOCUMENTATION FIRST 🚨** - Identify and read relevant `/.github/instructions` file(s)
2. **Identify** which convention was violated (if any)
3. **Fix** the issue following the correct pattern
4. **Verify** the fix doesn't introduce new issues

### When Refactoring

1. **🚨 READ ALL RELEVANT DOCUMENTATION FIRST 🚨** - This is MANDATORY
2. **Ensure** the refactoring maintains consistency
3. **Update** documentation if patterns change
4. **Verify** all related code still works

## 🚫 Common Mistakes to Avoid

1. **Creating custom UI components** - ALWAYS use shadcn/ui components (see [/.github/instructions/ui-components.instructions.md](/.github/instructions/ui-components.instructions.md))
2. **Using outdated Next.js patterns** - Always check Next.js 16 docs
3. **Using `middleware.ts`** - **NEVER** use middleware.ts as it is deprecated in Next.js 16+. Use `proxy.ts` instead
4. **Importing from wrong paths** - Use `@/` alias, not relative paths
5. **Using `any` type** - TypeScript strict mode is enabled
6. **Creating custom CSS** - Use Tailwind utilities
7. **Hardcoding URLs** - Use environment variables
8. **Ignoring authentication** - All user routes must be protected
9. **Direct database access** - Use Drizzle ORM patterns
10. **Using API routes for mutations** - Use Server Actions, not API routes (see [/.github/instructions/server-actions.instructions.md](/.github/instructions/server-actions.instructions.md))
11. **Using FormData type** - Always use explicit TypeScript types in Server Actions
12. **Skipping validation** - ALL Server Action inputs must be validated with Zod

## 🎯 Project-Specific Rules

### Server Actions & Data Mutations
- All data mutations MUST use Server Actions (no API routes for mutations)
- Server Action files MUST be named `actions.ts` and colocated with components
- All Server Actions MUST validate input with Zod schemas
- All Server Actions MUST check authentication FIRST
- Database operations MUST use helper functions from `/data` directory
- Server Actions MUST NOT contain direct Drizzle queries
- Use explicit TypeScript types, NEVER use `FormData` type
- Call Server Actions from Client Components only

### Database
- Always use Drizzle ORM for database queries
- Never expose raw database errors to users
- Include `createdAt` and `updatedAt` on all tables
- Use transactions for multi-step operations

### Authentication
- All API routes must check `userId` from Clerk
- Use Server Components for sensitive data fetching
- Sync Clerk users to database via webhooks
- Store `clerkId`, not Clerk's internal `id`

### Components
- **CRITICAL**: ALL UI elements MUST use shadcn/ui - never create custom UI primitives
- Server Components by default (no `"use client"`)
- Add `"use client"` only when needed (hooks, events, browser APIs)
- Use shadcn/ui components from `/components/ui`
- Composition components go in `/components` (built FROM shadcn/ui components)
- Install missing components: `npx shadcn@latest add [component]`

### Styling
- Utility-first with Tailwind CSS v4
- Mobile-first responsive design
- Use `cn()` utility for conditional classes
- Use semantic color names (e.g., `bg-primary` not `bg-blue-500`)

### TypeScript
- Strict mode enabled - no implicit `any`
- Explicit types for function parameters and returns
- Use `@/` alias for all internal imports
- Prefer `type` over `interface` for unions

### File Organization
- kebab-case for file names
- One component per file (except related sub-components)
- Colocate types with components
- Use `/lib` for shared utilities

### Routing & Middleware
- **NEVER use `middleware.ts`** - This is deprecated in Next.js 16+
- Use `proxy.ts` instead for request interception and routing logic
- This project uses Next.js 16.2.9 which has removed middleware.ts support

## 📖 Quick Reference

### ⚠️ REMINDER: Read Documentation BEFORE Coding

Every section below starts with reading documentation. **This is MANDATORY, not a suggestion.**

### Creating a Protected Page
1. **🚨 MUST READ:** [/.github/instructions/authentication.instructions.md](/.github/instructions/authentication.instructions.md) **COMPLETELY BEFORE WRITING CODE**
2. 
3. Verify authentication using Clerk's `auth()` in Server Component
4. Redirect unauthenticated users appropriately
5. Follow TypeScript standards for props

### Creating a New Component
1. **🚨 MUST READ:** [/.github/instructions/ui-components.instructions.md](/.github/instructions/ui-components.instructions.md) **COMPLETELY BEFORE WRITING CODE**
2. Check if shadcn/ui has a similar component
3. Install it if missing: `npx shadcn@latest add [component]`
4. Use shadcn/ui components from `/components/ui`
5. Only create composition components in `/components` (built FROM shadcn/ui)
6. Use `cn()` for className merging

### Creating a Server Action (Data Mutations)
1. **🚨 MUST READ:** [/.github/instructions/server-actions.instructions.md](/.github/instructions/server-actions.instructions.md) **COMPLETELY BEFORE WRITING CODE**
2. Create `actions.ts` file colocated with the calling component
3. Add `'use server'` directive at the top
4. Define Zod validation schema for input
5. Check authentication with `auth()` FIRST
6. Validate input with Zod
7. Call helper function from `/data` directory (no direct Drizzle queries)
8. Return type-safe response object
9. Call from Client Component with `"use client"`

### Creating an API Route
1. **🚨 MUST READ:** [/.github/instructions/authentication.instructions.md](/.github/instructions/authentication.instructions.md) **COMPLETELY BEFORE WRITING CODE** 
2. **NOTE:** Use API routes ONLY for webhooks or third-party integrations, NOT for data mutations (use Server Actions instead)
3. Create `route.ts` (not `.tsx`) in `/app/api`
4. Always verify authentication with Clerk's `auth()`
5. Use Drizzle ORM for database queries

### Adding a Database Table
1. **🚨 MUST READ:** [/.github/instructions/database-patterns.md](/.github/instructions/database-patterns.md) **COMPLETELY BEFORE WRITING CODE**
2. 
3. Define schema in `/db/schema.ts`
3. Run `npx drizzle-kit generate` to create migration
4. Run `npx drizzle-kit migrate` to apply

## 🔗 External Documentation

When the `/.github/instructions` are insufficient, consult:
- Next.js 16 docs: `node_modules/next/dist/.github/instructions/`
- Drizzle ORM: https://orm.drizzle.team/
- Clerk: https://clerk.com/.github/instructions
- shadcn/ui: https://ui.shadcn.com/
- Tailwind CSS: https://tailwindcss.com/

## ✅ Before Submitting Code

- [ ] **🚨 MANDATORY:** Read all relevant `/.github/instructions` files BEFORE writing code (not after)
- [ ] Followed TypeScript standards (no `any`, explicit types)
- [ ] Used `@/` import alias consistently
- [ ] Followed Next.js 16 conventions (Server Components, etc.)
- [ ] Used shadcn/ui for ALL UI components (no custom primitives)
- [ ] Applied Tailwind utilities (no custom CSS)
- [ ] Checked authentication where needed
- [ ] Used Drizzle ORM for database queries
- [ ] Used Server Actions for data mutations (not API routes)
- [ ] Validated all Server Action inputs with Zod
- [ ] Server Actions use helper functions from `/data` (no direct Drizzle queries)
- [ ] Followed file naming conventions (kebab-case)
- [ ] Code is properly formatted and linted

## 💡 Remember

**Consistency is key.** When in doubt, look at existing code that does something similar, and follow the same pattern. If you're still unsure, read the relevant documentation again.

<!-- END:agent-instructions -->
