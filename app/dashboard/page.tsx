import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getLinksByUserId } from '@/data/links';
import { Card, CardContent } from '@/components/ui/card';
import { CreateLinkDialog } from './create-link-dialog';
import { LinkCard } from './link-card';

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/');
  }
  
  const userLinks = await getLinksByUserId(userId);
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage your shortened links</p>
        </div>
        <CreateLinkDialog />
      </div>
      
      {userLinks.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              You haven&apos;t created any links yet. Create your first link to get started!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {userLinks.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
        </div>
      )}
    </div>
  );
}
