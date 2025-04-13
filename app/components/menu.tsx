'use client';

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { getUserLabels } from '@/lib/db/queries';
import { Check, FileText, Menu, Send, Star, Trash } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

/**
 * NavMenu component - Navigation menu for email folders and labels
 * Client component that fetches user labels on mount
 */
export function NavMenu() {
  // Define Label type for user labels
  interface Label {
    id: number;
    name: string;
    color: string;
  }

  // State for storing user labels
  const [labels, setLabels] = useState<Label[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user labels when component mounts
  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const data = await getUserLabels(1);
        setLabels(data || []);
      } catch (error) {
        console.error('Error fetching labels:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLabels();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="mr-2 -ml-1 cursor-pointer rounded-full p-2 hover:bg-gray-100">
          <Menu size={20} />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] transition-transform duration-200 ease-out data-[state=open]:duration-200 data-[state=open]:ease-out sm:w-[400px]"
      >
        <SheetTitle>Menu</SheetTitle>
        <nav className="mt-4 flex flex-col space-y-4">
          <Link
            href="/mail/inbox"
            className="flex items-center space-x-2 rounded p-2 text-gray-700 hover:bg-gray-100"
          >
            <Menu size={20} />
            <span>Inbox</span>
          </Link>
          <Link
            href="/mail/starred"
            className="flex items-center space-x-2 rounded p-2 text-gray-700 hover:bg-gray-100"
          >
            <Star size={20} />
            <span>Starred</span>
          </Link>
          <Link
            href="/mail/drafts"
            className="flex items-center space-x-2 rounded p-2 text-gray-700 hover:bg-gray-100"
          >
            <FileText size={20} />
            <span>Drafts</span>
          </Link>
          <Link
            href="/mail/sent"
            className="flex items-center space-x-2 rounded p-2 text-gray-700 hover:bg-gray-100"
          >
            <Send size={20} />
            <span>Sent Mail</span>
          </Link>
          <Link
            href="/mail/archive"
            className="flex items-center space-x-2 rounded p-2 text-gray-700 hover:bg-gray-100"
          >
            <Check size={20} />
            <span>Archive</span>
          </Link>
          <Link
            href="/mail/trash"
            className="flex items-center space-x-2 rounded p-2 text-gray-700 hover:bg-gray-100"
          >
            <Trash size={20} />
            <span>Trash</span>
          </Link>
        </nav>

        {/* Labels section */}
        <div className="mt-6">
          <SheetTitle>Labels</SheetTitle>
          {isLoading ? (
            <div className="mt-2 text-sm text-gray-500">Loading labels...</div>
          ) : labels.length > 0 ? (
            <div className="mt-2 space-y-1">
              {labels.map((label) => (
                <div
                  key={label.id}
                  className="flex items-center space-x-2 rounded p-2 text-gray-700 hover:bg-gray-100"
                >
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: label.color }}
                  />
                  <span>{label.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-2 text-sm text-gray-500">No labels found</div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
