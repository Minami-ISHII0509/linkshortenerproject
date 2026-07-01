# Authentication Guidelines

## 🔐 Authentication Provider

**CRITICAL:** This application uses **Clerk** for all authentication and user management. Do NOT implement or use any other authentication methods (NextAuth, custom JWT, sessions, etc.).

## 📋 Core Principles

### 1. Clerk is the Single Source of Truth
- All user authentication flows go through Clerk
- Never create custom login/signup forms
- Always use Clerk's provided components and hooks

### 2. Protected Routes
The `/dashboard` page and all user-specific routes **MUST** be protected:
- Users must be authenticated to access `/dashboard`
- Unauthenticated users should be redirected to sign-in

### 3. Homepage Redirect Logic
When a **logged-in user** accesses the homepage (`/`):
- They should be automatically redirected to `/dashboard`
- This ensures authenticated users go directly to their dashboard

### 4. Modal-Based Authentication
Sign-in and sign-up flows **MUST** launch as modals:
- Use Clerk's modal mode, not separate pages
- Provides seamless UX without full-page navigation
- Configure in Clerk component props

## 🛠️ Implementation Patterns

### Server Components (Recommended for Protection)

```typescript
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }
  
  // Protected content here
  return <div>Dashboard Content</div>;
}
```

### Client Components (When Needed)

```typescript
'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedComponent() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (isLoaded && !userId) {
      router.push('/sign-in');
    }
  }, [isLoaded, userId, router]);
  
  if (!isLoaded || !userId) {
    return <div>Loading...</div>;
  }
  
  return <div>Protected Content</div>;
}
```

### Homepage with Redirect Logic

```typescript
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const { userId } = await auth();
  
  // Redirect logged-in users to dashboard
  if (userId) {
    redirect('/dashboard');
  }
  
  // Show public homepage for unauthenticated users
  return <div>Public Homepage</div>;
}
```

### Clerk Components (Modal Mode)

```typescript
import { SignIn, SignUp } from '@clerk/nextjs';

// Sign In Modal
<SignIn 
  routing="modal" 
  signUpUrl="/sign-up"
/>

// Sign Up Modal
<SignUp 
  routing="modal" 
  signInUrl="/sign-in"
/>
```

## 🔑 API Route Protection

All API routes that handle user-specific data **MUST** verify authentication:

```typescript
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized' }, 
      { status: 401 }
    );
  }
  
  // Handle authenticated request
  return NextResponse.json({ data: 'protected data' });
}
```

## 🗄️ Database Integration

### User Syncing
- Sync Clerk users to your database via webhooks
- Store `clerkId` (Clerk's user ID), not their internal `id`
- Keep user records in sync with Clerk's user lifecycle events

### Example Schema Pattern

```typescript
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  clerkId: text('clerk_id').notNull().unique(),
  email: text('email').notNull(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
```

## ✅ Checklist for Protected Features

When building any user-specific feature:

- [ ] Verify authentication in Server Component or API route
- [ ] Use `userId` from Clerk's `auth()` function
- [ ] Redirect unauthenticated users appropriately
- [ ] Never expose sensitive data without auth check
- [ ] Use modal mode for sign-in/sign-up components
- [ ] Sync user data to database via Clerk webhooks
- [ ] Store `clerkId` for user references in database

## 🚫 What NOT to Do

- ❌ Don't implement custom auth logic (passwords, tokens, sessions)
- ❌ Don't use NextAuth, Passport, or other auth libraries
- ❌ Don't create custom login/signup forms
- ❌ Don't store passwords in your database
- ❌ Don't use full-page redirects for sign-in/sign-up (use modals)
- ❌ Don't allow unauthenticated access to `/dashboard` or user routes
- ❌ Don't let logged-in users linger on the homepage (redirect to dashboard)

## 📚 Additional Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Next.js Integration](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Server-Side Helpers](https://clerk.com/docs/references/nextjs/overview)
