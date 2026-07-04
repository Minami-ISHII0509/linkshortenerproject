---
description: Read this before implementing or modifying server actions and data mutations in the project.
--- 

# Server Actions Guidelines

## 🔄 Data Mutation Strategy

**CRITICAL:** This application uses **Server Actions** for ALL data mutations. Do NOT implement data mutations through API routes or client-side logic.

## 📋 Core Principles

### 1. Server Actions are the Single Data Mutation Method
- All data mutations (create, update, delete) MUST use Server Actions
- Server Actions are called from Client Components only
- Never perform mutations directly in Server Components

### 2. File Naming and Colocation
Server Action files **MUST** follow these rules:
- Always named `actions.ts` (never `serverActions.ts`, `mutations.ts`, etc.)
- Colocated in the same directory as the component that calls them
- One `actions.ts` per feature/component directory

Example structure:
```
app/
  dashboard/
    actions.ts          ← Server Actions for dashboard
    page.tsx
  profile/
    actions.ts          ← Server Actions for profile
    page.tsx
```

### 3. Type Safety Requirements
- ALL data passed to Server Actions MUST have explicit TypeScript types
- **NEVER** use the `FormData` TypeScript type
- Define proper interfaces/types for action parameters

### 4. Validation with Zod
- ALL incoming data MUST be validated using Zod schemas
- Validation happens at the top of each Server Action
- Return type-safe error messages on validation failure

### 5. Authentication Check
- EVERY Server Action MUST check for a logged-in user FIRST
- Use Clerk's `auth()` to verify authentication
- Return early with error if user is not authenticated

### 6. Database Operations via Helper Functions
- Server Actions MUST NOT contain direct Drizzle queries
- All database operations go through helper functions
- Helper functions are located in the `/data` directory
- Server Actions orchestrate, helpers execute

### 7. Error Handling
- Server Actions MUST NEVER throw errors
- Always return an object with `success` boolean property
- On success: return `{ success: true, data: ... }`
- On error: return `{ success: false, error: '...' }`
- Use try-catch to handle exceptions and return error objects

## 🛠️ Implementation Patterns

### ✅ Correct: Server Action Structure

```typescript
// app/dashboard/actions.ts
'use server';

import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import { createLink, updateLink } from '@/data/links';
import { revalidatePath } from 'next/cache';

// Define validation schema
const createLinkSchema = z.object({
  originalUrl: z.string().url(),
  shortCode: z.string().min(3).max(20),
  title: z.string().optional(),
});

// Define input type from schema
type CreateLinkInput = z.infer<typeof createLinkSchema>;

export async function createLinkAction(input: CreateLinkInput) {
  // 1. Check authentication FIRST
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: 'Unauthorized' };
  }

  // 2. Validate input data
  const validationResult = createLinkSchema.safeParse(input);
  if (!validationResult.success) {
    return { 
      success: false, 
      error: 'Invalid input',
      details: validationResult.error.flatten() 
    };
  }

  // 3. Call helper function for database operation
  try {
    const link = await createLink({
      ...validationResult.data,
      userId,
    });

    // 4. Revalidate relevant paths
    revalidatePath('/dashboard');

    // 5. ALWAYS return success object (never throw)
    return { success: true, data: link };
  } catch (error) {
    // 6. Catch errors and return error object (never throw)
    return { 
      success: false, 
      error: 'Failed to create link' 
    };
  }
}
```

### ✅ Correct: Calling from Client Component

```typescript
// app/dashboard/create-link-form.tsx
'use client';

import { useState } from 'react';
import { createLinkAction } from './actions';
import { Button } from '@/components/ui/button';

export function CreateLinkForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    
    // Create typed object from form data
    const input = {
      originalUrl: formData.get('url') as string,
      shortCode: formData.get('code') as string,
      title: formData.get('title') as string,
    };

    const result = await createLinkAction(input);
    
    // Server actions never throw - always check result.success
    if (result.success) {
      // Handle success - result.data is available
    } else {
      // Handle error - result.error contains message
      console.error(result.error);
    }
    
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <Button type="submit" disabled={isLoading}>
        Create Link
      </Button>
    </form>
  );
}
```

### ✅ Correct: Database Helper Function

```typescript
// data/links.ts
import { db } from '@/db';
import { links } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function createLink(data: {
  originalUrl: string;
  shortCode: string;
  userId: string;
  title?: string;
}) {
  const [link] = await db
    .insert(links)
    .values({
      originalUrl: data.originalUrl,
      shortCode: data.shortCode,
      userId: data.userId,
      title: data.title,
    })
    .returning();

  return link;
}

export async function getLinksByUserId(userId: string) {
  return db
    .select()
    .from(links)
    .where(eq(links.userId, userId));
}
```

## ❌ Incorrect Patterns

### ❌ Wrong: Using FormData Type

```typescript
// DON'T DO THIS
export async function createLinkAction(formData: FormData) {
  // This is NOT type-safe
}
```

### ❌ Wrong: Direct Drizzle Queries in Actions

```typescript
// DON'T DO THIS
'use server';

import { db } from '@/db';
import { links } from '@/db/schema';

export async function createLinkAction(input: CreateLinkInput) {
  const { userId } = await auth();
  
  // DON'T put Drizzle queries directly in actions
  const [link] = await db.insert(links).values({...}).returning();
  
  return { success: true, data: link };
}
```

### ❌ Wrong: No Authentication Check

```typescript
// DON'T DO THIS
export async function createLinkAction(input: CreateLinkInput) {
  // Missing auth check!
  const link = await createLink(input);
  return { success: true, data: link };
}
```

### ❌ Wrong: No Validation

```typescript
// DON'T DO THIS
export async function createLinkAction(input: any) {
  const { userId } = await auth();
  // No validation - accepting any input!
  const link = await createLink(input);
  return { success: true, data: link };
}
```

### ❌ Wrong: Wrong File Name or Location

```typescript
// DON'T DO THIS
// app/actions/dashboard-actions.ts  ❌ Wrong location
// app/dashboard/serverActions.ts     ❌ Wrong name

// CORRECT:
// app/dashboard/actions.ts           ✅ Correct
```

### ❌ Wrong: Throwing Errors

```typescript
// DON'T DO THIS
export async function createLinkAction(input: CreateLinkInput) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthorized'); // ❌ NEVER throw errors!
  }

  const validationResult = createLinkSchema.safeParse(input);
  if (!validationResult.success) {
    throw new Error('Invalid input'); // ❌ NEVER throw errors!
  }

  // Even in try-catch, don't let errors bubble up
  const link = await createLink(validationResult.data); // ❌ Uncaught errors
  return { success: true, data: link };
}

// CORRECT: Always return objects
export async function createLinkAction(input: CreateLinkInput) {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: 'Unauthorized' }; // ✅ Return error object
  }

  const validationResult = createLinkSchema.safeParse(input);
  if (!validationResult.success) {
    return { success: false, error: 'Invalid input' }; // ✅ Return error object
  }

  try {
    const link = await createLink(validationResult.data);
    return { success: true, data: link }; // ✅ Return success object
  } catch (error) {
    return { success: false, error: 'Failed to create link' }; // ✅ Catch and return
  }
}
```

## 🔗 Architecture Flow

```
Client Component (with "use client")
    ↓
    Calls Server Action
    ↓
Server Action (actions.ts)
    1. Check authentication
    2. Validate input with Zod
    3. Call helper function
    ↓
Helper Function (/data/*.ts)
    - Executes Drizzle query
    - Returns result
    ↓
Server Action
    - Revalidates cache if needed
    - Returns type-safe result
    ↓
Client Component
    - Handles success/error
    - Updates UI
```

## 📝 Checklist for Server Actions

Before implementing a Server Action, ensure:

- [ ] File is named `actions.ts` and colocated with component
- [ ] File has `'use server'` directive at the top
- [ ] Input has explicit TypeScript types (NO `FormData` type)
- [ ] Zod schema validates all input
- [ ] Authentication is checked FIRST using `auth()`
- [ ] Database operations use helper functions from `/data`
- [ ] No direct Drizzle queries in the action
- [ ] **NEVER throws errors** - always returns `{ success: boolean, data/error }`
- [ ] All operations wrapped in try-catch
- [ ] Returns type-safe response object
- [ ] Calls `revalidatePath()` or `revalidateTag()` if needed
- [ ] Called from a Client Component (`"use client"`)

## 💡 Best Practices

1. **Never Throw Errors**: ALWAYS return objects with `success` boolean - never throw or let errors bubble up
2. **Consistent Return Types**: Always return objects with `success` boolean and either `data` or `error`
3. **Error Handling**: Wrap all operations in try-catch and return user-friendly error messages
4. **Optimistic Updates**: Use with `useOptimistic()` hook for better UX
5. **Loading States**: Always show loading indicators in Client Components
6. **Revalidation**: Call `revalidatePath()` after mutations to update cached data

## 🚫 Never Do This

- **Throw errors** - ALWAYS return `{ success: false, error: '...' }` instead
- Let uncaught errors bubble up - wrap operations in try-catch
- Use API routes (`/app/api`) for data mutations
- Put mutations in Server Components
- Use `FormData` as a TypeScript type
- Skip validation with Zod
- Skip authentication checks
- Write Drizzle queries directly in Server Actions
- Name files anything other than `actions.ts`
- Place actions in a centralized `/actions` directory
