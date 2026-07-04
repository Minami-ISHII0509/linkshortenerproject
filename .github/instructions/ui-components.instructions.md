---
description: Read this before creating or modifying UI components inthe project.
--- 

# UI Components Guidelines

## 🎨 Component Library

**CRITICAL:** This application exclusively uses **shadcn/ui** for ALL UI components. Do NOT create custom UI components from scratch.

## 📋 Core Principles

### 1. shadcn/ui is the Single Component Source
- All UI elements (buttons, inputs, cards, dialogs, etc.) come from shadcn/ui
- Never build custom alternatives to shadcn/ui components
- If a component doesn't exist in shadcn/ui, install it first before using

### 2. Component Location Rules
- **shadcn/ui components**: Always in `/components/ui/` directory
- **Custom compositions**: In `/components/` directory (composed FROM shadcn/ui components)
- Never create custom UI primitives (buttons, inputs, etc.)

### 3. Installation Process
When you need a shadcn/ui component that isn't installed:

```bash
npx shadcn@latest add [component-name]
```

Common components:
- `button` - Buttons and interactive elements
- `input` - Form inputs
- `card` - Content containers
- `dialog` - Modals and dialogs
- `form` - Form components with validation
- `select` - Dropdown selects
- `table` - Data tables
- `badge` - Status badges
- `alert` - Alert messages

## 🛠️ Implementation Patterns

### ✅ Correct: Using shadcn/ui Components

```typescript
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export function MyForm() {
  return (
    <Card>
      <CardHeader>Sign In</CardHeader>
      <CardContent>
        <Input placeholder="Email" />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  );
}
```

### ✅ Correct: Composing Higher-Level Components

```typescript
// /components/link-card.tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type LinkCardProps = {
  url: string;
  shortCode: string;
  clicks: number;
};

export function LinkCard({ url, shortCode, clicks }: LinkCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{shortCode}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{url}</p>
        <p>Clicks: {clicks}</p>
        <Button variant="outline">Copy</Button>
      </CardContent>
    </Card>
  );
}
```

### ❌ Incorrect: Creating Custom UI Primitives

```typescript
// ❌ DON'T DO THIS - Use shadcn/ui Button instead
export function CustomButton({ children, onClick }: ButtonProps) {
  return (
    <button 
      className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// ❌ DON'T DO THIS - Use shadcn/ui Input instead
export function CustomInput({ value, onChange }: InputProps) {
  return (
    <input
      className="border rounded px-3 py-2"
      value={value}
      onChange={onChange}
    />
  );
}
```

## 🎯 Component Usage Rules

### Always Import from `/components/ui`
```typescript
import { Button } from '@/components/ui/button'; // ✅ Correct
import Button from '../ui/button'; // ❌ Wrong - use @/ alias
```

### Use Component Variants, Not Custom Styles
```typescript
// ✅ Correct - Use built-in variants
<Button variant="outline">Click Me</Button>
<Button variant="destructive">Delete</Button>
<Button size="lg">Large Button</Button>

// ❌ Wrong - Don't override with custom classes
<Button className="bg-red-500 px-8">Delete</Button>
```

### Extend with className, Don't Replace
```typescript
// ✅ Correct - Add additional classes with cn()
import { cn } from '@/lib/utils';

<Button className={cn("mt-4")}>Submit</Button>

// ❌ Wrong - Don't fight the built-in styles
<Button className="bg-custom text-custom border-custom">Submit</Button>
```

## 📚 Common Component Patterns

### Forms with Validation
Always use shadcn/ui's Form components with react-hook-form:

```typescript
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function MyForm() {
  const form = useForm();
  
  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
}
```

### Dialogs/Modals
```typescript
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function MyDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
        </DialogHeader>
        {/* Dialog content */}
      </DialogContent>
    </Dialog>
  );
}
```

## 🚫 Common Mistakes to Avoid

1. **Creating custom button components** - Use `<Button>` from shadcn/ui
2. **Building custom form inputs** - Use `<Input>`, `<Select>`, etc. from shadcn/ui
3. **Custom modal implementations** - Use `<Dialog>` from shadcn/ui
4. **Handcrafted card layouts** - Use `<Card>` components from shadcn/ui
5. **Custom loading spinners** - Use shadcn/ui's loading patterns
6. **Reinventing tooltips/popovers** - Install and use from shadcn/ui

## 📖 Reference

- shadcn/ui documentation: https://ui.shadcn.com/
- Available components: https://ui.shadcn.com/docs/components
- Installation guide: https://ui.shadcn.com/docs/installation

## ✅ Before Creating Any UI

- [ ] Check if shadcn/ui has the component you need
- [ ] Install it with `npx shadcn@latest add [component]` if missing
- [ ] Import from `@/components/ui/[component]`
- [ ] Use built-in variants instead of custom styling
- [ ] Only create composition components, never primitives
