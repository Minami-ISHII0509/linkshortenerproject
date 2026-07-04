import { db } from '@/db';
import { links } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export type Link = {
  id: number;
  shortCode: string;
  originalUrl: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export async function getLinksByUserId(userId: string): Promise<Link[]> {
  try {
    const userLinks = await db
      .select()
      .from(links)
      .where(eq(links.userId, userId))
      .orderBy(desc(links.updatedAt));
    
    return userLinks;
  } catch (error) {
    console.error('Error fetching links:', error);
    return [];
  }
}

export async function createLink(data: {
  shortCode: string;
  originalUrl: string;
  userId: string;
}): Promise<Link> {
  const [newLink] = await db
    .insert(links)
    .values({
      shortCode: data.shortCode,
      originalUrl: data.originalUrl,
      userId: data.userId,
    })
    .returning();
  
  return newLink;
}

export async function updateLink(data: {
  id: number;
  shortCode: string;
  originalUrl: string;
  userId: string;
}): Promise<Link | null> {
  const [updatedLink] = await db
    .update(links)
    .set({
      shortCode: data.shortCode,
      originalUrl: data.originalUrl,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(links.id, data.id))
    .returning();
  
  return updatedLink || null;
}

export async function deleteLink(linkId: number, userId: string): Promise<boolean> {
  try {
    const result = await db
      .delete(links)
      .where(eq(links.id, linkId))
      .returning();
    
    return result.length > 0;
  } catch (error) {
    console.error('Error deleting link:', error);
    return false;
  }
}

export async function getLinkByShortCode(shortCode: string): Promise<Link | null> {
  try {
    const [link] = await db
      .select()
      .from(links)
      .where(eq(links.shortCode, shortCode))
      .limit(1);
    
    return link || null;
  } catch (error) {
    console.error('Error fetching link by short code:', error);
    return null;
  }
}
