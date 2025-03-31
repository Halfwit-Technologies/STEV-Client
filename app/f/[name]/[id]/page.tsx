// Import required components and functions
import { LeftSidebar } from '@/app/components/left-sidebar';
import { ThreadActions } from '@/app/components/thread-actions';
import { getEmailsForThread } from '@/lib/db/queries';
import { notFound } from 'next/navigation';

/**
 * EmailPage component - Displays a specific email thread
 * Uses Next.js dynamic routing with [name] and [id] parameters
 */
export default async function EmailPage({
  params,
}: {
  params: Promise<{ name: string; id: string }>;
}) {
  // Extract thread ID from URL parameters
  let id = (await params).id;
  // Fetch the email thread data using the ID
  let thread = await getEmailsForThread(id);

  // If thread doesn't exist or has no emails, show 404 page
  if (!thread || thread.emails.length === 0) {
    notFound();
  }

  return (
    <div className="flex h-full grow">
      {/* Sidebar navigation */}
      <LeftSidebar />

      {/* Main content area */}
      <div className="grow overflow-auto p-2 sm:p-6">
        <div className="mx-auto w-full">
          {/* Thread header with subject and actions */}
          <div className="mx-6 mb-6 flex flex-col items-start justify-between sm:flex-row">
            <h1 className="mt-4 max-w-2xl grow pr-4 text-2xl font-semibold sm:mt-0">
              {thread.subject}
            </h1>
            <div className="mt-2 flex shrink-0 items-center space-x-1 sm:mt-0">
              <button className="mr-2 cursor-pointer text-sm font-medium text-gray-700">
                Share
              </button>
              <ThreadActions threadId={thread.id} />
            </div>
          </div>

          {/* List of emails in the thread */}
          <div className="space-y-6">
            {thread.emails.map((email) => (
              <div key={email.id} className="rounded-lg px-6 py-4">
                {/* Email metadata - sender, recipient, and date */}
                <div className="mb-2 flex flex-col items-start justify-between sm:flex-row sm:items-center">
                  <div className="font-semibold">
                    {email.sender.firstName} {email.sender.lastName} to{' '}
                    {/* Determine if the email was addressed to the current user or to everyone */}
                    {email.recipientId === thread.emails[0].sender.id
                      ? 'Me'
                      : 'All'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(email.sentDate!).toLocaleString()}
                  </div>
                </div>
                {/* Email content */}
                <div className="whitespace-pre-wrap">{email.body}</div>
                <br />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
