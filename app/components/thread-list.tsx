'use client';

import { ThreadActions } from '@/app/components/thread-actions';
import { emails, users } from '@/lib/db/schema';
import { formatEmailString } from '@/lib/utils';
import { PenSquare, Search, User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NavMenu } from './menu';

type Email = Omit<typeof emails.$inferSelect, 'threadId'> & {
  sender: Pick<User, 'id' | 'name' | 'email'>;
};
type User = typeof users.$inferSelect;

type ThreadWithEmails = {
  id: number;
  subject: string | null;
  lastActivityDate: Date | null;
  emails: Email[];
};

interface ThreadListProps {
  folderName: string;
  threads: ThreadWithEmails[];
  searchQuery?: string;
}

export function ThreadHeader({
  folderName,
  count,
}: {
  folderName: string;
  count?: number | undefined;
}) {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';

  const user = session?.user as User | undefined;

  return (
    <div className="flex h-[70px] items-center justify-between border-b border-gray-200 p-4">
      <div className="flex items-center">
        <NavMenu />
        <h1 className="flex items-center text-xl font-semibold capitalize">
          {folderName}
          <span className="ml-2 text-sm text-gray-400">{count}</span>
        </h1>
      </div>
      <div className="flex items-center space-x-2">
        <Link
          href={`/mail/${folderName}/new`}
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
        >
          <PenSquare size={18} />
        </Link>
        <Link
          href="/search"
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
        >
          <Search size={18} />
        </Link>
        <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-gray-100">
          {isAuthenticated ? (
            <span className="ml-2 h-8 w-8 overflow-hidden rounded-full bg-gray-200">
              {user?.avatar_url ? (
                <img src={user.avatar_url} alt="User Avatar" />
              ) : (
                <User
                  size={18}
                  className="text-center align-middle text-gray-500"
                />
              )}
            </span>
          ) : (
            <Link href="/login">
              <User
                size={18}
                className="text-center align-middle text-gray-500"
              />
            </Link>
          )}
        </button>
      </div>
    </div>
  );
}

export function ThreadList({ folderName, threads }: ThreadListProps) {
  const [hoveredThread, setHoveredThread] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.matchMedia('(hover: none)').matches);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const handleMouseEnter = (threadId: number) => {
    if (!isMobile) {
      setHoveredThread(threadId);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setHoveredThread(null);
    }
  };

  return (
    <div className="grow overflow-hidden border-r border-gray-200">
      <ThreadHeader folderName={folderName} count={threads.length} />
      <div className="h-[calc(100vh-64px)] overflow-auto">
        {threads.map((thread) => {
          const latestEmail = thread.emails[0];

          return (
            <Link
              key={thread.id}
              href={`/mail/${folderName.toLowerCase()}/${thread.id}`}
              className="block cursor-pointer border-b border-gray-100 hover:bg-gray-50"
            >
              <div
                className="flex items-center"
                onMouseEnter={() => handleMouseEnter(thread.id)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex grow items-center overflow-hidden p-4">
                  <div className="mr-4 w-[200px] shrink-0">
                    <span className="truncate font-medium">
                      {formatEmailString(latestEmail.sender)}
                    </span>
                  </div>
                  <div className="flex grow items-center overflow-hidden">
                    <span className="mr-2 max-w-[400px] min-w-[175px] truncate font-medium">
                      {thread.subject}
                    </span>
                    <span className="truncate text-gray-600">
                      {latestEmail.body}
                    </span>
                  </div>
                </div>
                <div className="flex w-40 shrink-0 items-center justify-end p-4">
                  {!isMobile && hoveredThread === thread.id ? (
                    <ThreadActions threadId={thread.id} />
                  ) : (
                    <span className="text-sm text-gray-500">
                      {new Date(thread.lastActivityDate!).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
