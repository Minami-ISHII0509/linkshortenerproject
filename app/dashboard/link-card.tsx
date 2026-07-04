'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EditLinkDialog } from './edit-link-dialog';
import { DeleteLinkDialog } from './delete-link-dialog';

type Link = {
  id: number;
  shortCode: string;
  originalUrl: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

type LinkCardProps = {
  link: Link;
};

export function LinkCard({ link }: LinkCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const shortUrl = `${window.location.origin}/l/${link.shortCode}`;
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="font-mono">{link.shortCode}</span>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleCopy}
          >
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <p className="text-sm text-muted-foreground">Original URL</p>
            <p className="text-sm break-all">{link.originalUrl}</p>
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span>Created: {new Date(link.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex gap-2 mt-4">
            <EditLinkDialog link={link} />
            <DeleteLinkDialog link={link} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
