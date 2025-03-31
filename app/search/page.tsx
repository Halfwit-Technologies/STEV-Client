import { searchThreads } from '@/lib/db/queries';
import { formatEmailString, highlightText } from '@/lib/utils';
import { X } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { NavMenu } from '../components/menu';
import { Search } from '../components/search';

/**
 * Threads component - Displays search results based on query parameter
 * @param searchParams - Contains the search query 'q' from URL
 * @returns A list of email threads matching the search query
 */
async function Threads({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; id?: string }>;
}) {
  let q = (await searchParams).q;
  let threads = await searchThreads(q);

  return (
    <div className="h-[calc(100vh-64px)] overflow-auto">
      {threads.map((thread) => {
        const latestEmail = thread.latestEmail;
        return (
          <Link
            key={thread.id}
            href={`/f/${thread.folderName.toLowerCase()}/${thread.id}`}
          >
            <div
              className={`flex cursor-pointer items-center border-b border-gray-100 p-4 hover:bg-gray-50`}
            >
              <div className="flex grow items-center overflow-hidden">
                {/* Sender column with highlighted text matching search query */}
                <div className="mr-4 w-[200px] shrink-0">
                  <span className="truncate font-medium">
                    {highlightText(formatEmailString(latestEmail.sender), q)}
                  </span>
                </div>
                <div className="flex grow items-center overflow-hidden">
                  {/* Subject with highlighted text matching search query */}
                  <span className="mr-2 max-w-[400px] min-w-[175px] truncate font-medium">
                    {highlightText(thread.subject, q)}
                  </span>
                  {/* Email body preview with highlighted text matching search query */}
                  <span className="truncate text-gray-600">
                    {highlightText(latestEmail.body, q)}
                  </span>
                </div>
              </div>
              {/* Date display */}
              <div className="ml-4 flex w-40 shrink-0 items-center justify-end">
                <span className="text-sm text-gray-500">
                  {new Date(thread.lastActivityDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

/**
 * SearchPage component - Main search interface
 * @param searchParams - Contains the search query from URL parameters
 * @returns The search page layout with results
 */
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; id?: string }>;
}) {
  return (
    <div className="flex h-screen">
      <div className="grow overflow-hidden border-r border-gray-200">
        {/* Search header with navigation and search input */}
        <div className="flex h-[70px] items-center justify-between border-b border-gray-200 p-4">
          <div className="flex w-full items-center">
            <NavMenu />
            <Suspense>
              <Search />
            </Suspense>
          </div>
          {/* Close search button */}
          <div className="ml-4 flex items-center">
            <Link href="/" passHref>
              <button
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-gray-100"
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </Link>
          </div>
        </div>
        {/* Search results with loading boundary */}
        <Suspense>
          <Threads searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
