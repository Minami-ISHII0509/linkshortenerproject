<!-- BEGIN:agent-instructions -->
# Link Shortener Project - Agent Instructions

## ⚠️ CRITICAL: Read This First

This project uses **Next.js 16.2.9**, which has **breaking changes** from earlier versions. Your training data may be outdated. Always consult `node_modules/next/dist/docs/` for current API documentation before writing code.

## 📚 Required Reading

### ⛔ MANDATORY: NO CODE WITHOUT DOCUMENTATION ⛔

**YOU MUST READ THE RELEVANT DOCUMENTATION FILES BEFORE GENERATING ANY CODE.**

This is **NOT OPTIONAL**. Before making **ANY** changes to this codebase, you **MUST**:

1. **STOP** - Do not write any code yet
2. **READ** the relevant documentation file(s) from `/docs` directory
3. **UNDERSTAND** the patterns and conventions
4. **THEN** and ONLY THEN generate code following those patterns

### Core Documentation Files
**READ THE RELEVANT FILE(S) BEFORE WRITING ANY CODE:**

- **[/docs/authentication.md](/docs/authentication.md)** - Clerk authentication, protected routes, modal sign-in/sign-up
- **[/docs/nextjs-conventions.md](/docs/nextjs-conventions.md)** - Next.js 16 patterns, routing, API routes
- **[/docs/database-patterns.md](/docs/database-patterns.md)** - Drizzle ORM usage, schema conventions
- **[/docs/ui-components.md](/docs/ui-components.md)** - Component structure, shadcn/ui, styling

## 🔄 Workflow for AI Agents

### ⚠️ CRITICAL: Documentation-First Workflow

**NEVER skip step 1. Reading documentation is MANDATORY before any code generation.**

### When Adding a New Feature

1. **🚨 READ DOCUMENTATION FIRST 🚨** - This is NON-NEGOTIABLE
   - Identify which `/docs` file(s) are relevant
   - Read the ENTIRE relevant documentation file(s)
   - Understand the patterns before writing ANY code
2. **Understand** the existing patterns in similar files
3. **Follow** the established conventions strictly
4. **Test** your changes match the project standards

### When Fixing a Bug

1. **🚨 READ DOCUMENTATION FIRST 🚨** - Identify and read relevant `/docs` file(s)
2. **Identify** which convention was violated (if any)
3. **Fix** the issue following the correct pattern
4. **Verify** the fix doesn't introduce new issues

### When Refactoring

1. **🚨 READ ALL RELEVANT DOCUMENTATION FIRST 🚨** - This is MANDATORY
2. **Ensure** the refactoring maintains consistency
3. **Update** documentation if patterns change
4. **Verify** all related code still works

## 🚫 Common Mistakes to Avoid

1. **Creating custom UI components** - ALWAYS use shadcn/ui components (see [/docs/ui-components.md](/docs/ui-components.md))
2. **Using outdated Next.js patterns** - Always check Next.js 16 docs
3. **Importing from wrong paths** - Use `@/` alias, not relative paths
4. **Using `any` type** - TypeScript strict mode is enabled
5. **Creating custom CSS** - Use Tailwind utilities
6. **Hardcoding URLs** - Use environment variables
7. **Ignoring authentication** - All user routes must be protected
8. **Direct database access** - Use Drizzle ORM patterns

## 🎯 Project-Specific Rules

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

## 📖 Quick Reference

### ⚠️ REMINDER: Read Documentation BEFORE Coding

Every section below starts with reading documentation. **This is MANDATORY, not a suggestion.**

### Creating a Protected Page
1. **🚨 MUST READ:** [/docs/authentication.md](/docs/authentication.md) **COMPLETELY BEFORE WRITING CODE**
2. 
3. Verify authentication using Clerk's `auth()` in Server Component
4. Redirect unauthenticated users appropriately
5. Follow TypeScript standards for props

### Creating a New Page
1. **🚨 MUST READ:** [/docs/nextjs-conventions.md](/docs/nextjs-conventions.md) **COMPLETELY BEFORE WRITING CODE**
2. 
3. Create `page.tsx` in appropriate `/app` subdirectory
3. Use Server Component by default
4. Follow TypeScript standards for props

### Creating a New Component
1. **🚨 MUST READ:** [/docs/ui-components.md](/docs/ui-components.md) **COMPLETELY BEFORE WRITING CODE**
2. Check if shadcn/ui has a similar component
3. Install it if missing: `npx shadcn@latest add [component]`
4. Use shadcn/ui components from `/components/ui`
5. Only create composition components in `/components` (built FROM shadcn/ui)
6. Use `cn()` for className merging

### Creating an API Route
1. **🚨 MUST READ:** [/docs/authentication.md](/docs/authentication.md) **COMPLETELY BEFORE WRITING CODE**
2. **🚨 MUST READ:** [/docs/nextjs-conventions.md](/docs/nextjs-conventions.md) **FOR API ROUTE PATTERNS**
3. 
4. Create `route.ts` (not `.tsx`) in `/app/api`
4. Always verify authentication with Clerk's `auth()`
5. Use Drizzle ORM for database queries

### Adding a Database Table
1. **🚨 MUST READ:** [/docs/database-patterns.md](/docs/database-patterns.md) **COMPLETELY BEFORE WRITING CODE**
2. 
3. Define schema in `/db/schema.ts`
3. Run `npx drizzle-kit generate` to create migration
4. Run `npx drizzle-kit migrate` to apply

## 🔗 External Documentation

When the `/docs` are insufficient, consult:
- Next.js 16 docs: `node_modules/next/dist/docs/`
- Drizzle ORM: https://orm.drizzle.team/
- Clerk: https://clerk.com/docs
- shadcn/ui: https://ui.shadcn.com/
- Tailwind CSS: https://tailwindcss.com/

## ✅ Before Submitting Code

- [ ] **🚨 MANDATORY:** Read all relevant `/docs` files BEFORE writing code (not after)
- [ ] Followed TypeScript standards (no `any`, explicit types)
- [ ] Used `@/` import alias consistently
- [ ] Followed Next.js 16 conventions (Server Components, etc.)
- [ ] Used shadcn/ui for ALL UI components (no custom primitives)
- [ ] Applied Tailwind utilities (no custom CSS)
- [ ] Checked authentication where needed
- [ ] Used Drizzle ORM for database queries
- [ ] Followed file naming conventions (kebab-case)
- [ ] Code is properly formatted and linted

## 💡 Remember

**Consistency is key.** When in doubt, look at existing code that does something similar, and follow the same pattern. If you're still unsure, read the relevant documentation again.

<!-- END:agent-instructions -->
