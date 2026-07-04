'use server';

import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import { createLink, updateLink, deleteLink } from '@/data/links';
import { revalidatePath } from 'next/cache';

// Define validation schema
const createLinkSchema = z.object({
  originalUrl: z.string().url('Please enter a valid URL'),
  shortCode: z.string()
    .min(3, 'Short code must be at least 3 characters')
    .max(20, 'Short code must be at most 20 characters')
    .regex(/^[a-zA-Z0-9-_]+$/, 'Short code can only contain letters, numbers, hyphens, and underscores'),
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
    const firstError = validationResult.error.issues[0];
    return { 
      success: false, 
      error: firstError?.message || 'Invalid input'
    };
  }

  try {
    // 3. Call helper function to create link
    const newLink = await createLink({
      shortCode: validationResult.data.shortCode,
      originalUrl: validationResult.data.originalUrl,
      userId,
    });

    // 4. Revalidate the dashboard page to show the new link
    revalidatePath('/dashboard');

    // 5. Return success with the created link
    return { 
      success: true, 
      data: newLink 
    };
  } catch (error) {
    console.error('Error creating link:', error);
    
    // Check for unique constraint violation
    if (error instanceof Error && error.message.includes('unique')) {
      return { 
        success: false, 
        error: 'This short code is already taken. Please choose another one.' 
      };
    }
    
    return { 
      success: false, 
      error: 'Failed to create link. Please try again.' 
    };
  }
}

// Define validation schema for updating links
const updateLinkSchema = z.object({
  id: z.number(),
  originalUrl: z.string().url('Please enter a valid URL'),
  shortCode: z.string()
    .min(3, 'Short code must be at least 3 characters')
    .max(20, 'Short code must be at most 20 characters')
    .regex(/^[a-zA-Z0-9-_]+$/, 'Short code can only contain letters, numbers, hyphens, and underscores'),
});

// Define input type from schema
type UpdateLinkInput = z.infer<typeof updateLinkSchema>;

export async function updateLinkAction(input: UpdateLinkInput) {
  // 1. Check authentication FIRST
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: 'Unauthorized' };
  }

  // 2. Validate input data
  const validationResult = updateLinkSchema.safeParse(input);
  if (!validationResult.success) {
    const firstError = validationResult.error.issues[0];
    return { 
      success: false, 
      error: firstError?.message || 'Invalid input'
    };
  }

  try {
    // 3. Call helper function to update link
    const updatedLink = await updateLink({
      id: validationResult.data.id,
      shortCode: validationResult.data.shortCode,
      originalUrl: validationResult.data.originalUrl,
      userId,
    });

    if (!updatedLink) {
      return {
        success: false,
        error: 'Link not found or you do not have permission to edit it.'
      };
    }

    // 4. Revalidate the dashboard page to show the updated link
    revalidatePath('/dashboard');

    // 5. Return success with the updated link
    return { 
      success: true, 
      data: updatedLink 
    };
  } catch (error) {
    console.error('Error updating link:', error);
    
    // Check for unique constraint violation
    if (error instanceof Error && error.message.includes('unique')) {
      return { 
        success: false, 
        error: 'This short code is already taken. Please choose another one.' 
      };
    }
    
    return { 
      success: false, 
      error: 'Failed to update link. Please try again.' 
    };
  }
}

// Define validation schema for deleting links
const deleteLinkSchema = z.object({
  id: z.number(),
});

// Define input type from schema
type DeleteLinkInput = z.infer<typeof deleteLinkSchema>;

export async function deleteLinkAction(input: DeleteLinkInput) {
  // 1. Check authentication FIRST
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: 'Unauthorized' };
  }

  // 2. Validate input data
  const validationResult = deleteLinkSchema.safeParse(input);
  if (!validationResult.success) {
    return { 
      success: false, 
      error: 'Invalid input'
    };
  }

  try {
    // 3. Call helper function to delete link
    const deleted = await deleteLink(validationResult.data.id, userId);

    if (!deleted) {
      return {
        success: false,
        error: 'Link not found or you do not have permission to delete it.'
      };
    }

    // 4. Revalidate the dashboard page to remove the deleted link
    revalidatePath('/dashboard');

    // 5. Return success
    return { 
      success: true 
    };
  } catch (error) {
    console.error('Error deleting link:', error);
    
    return { 
      success: false, 
      error: 'Failed to delete link. Please try again.' 
    };
  }
}
