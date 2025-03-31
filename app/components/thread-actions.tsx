'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { moveThreadToDone, moveThreadToTrash } from '@/lib/db/actions';
import { Archive, Check, Clock } from 'lucide-react';
import { useActionState } from 'react';

interface ThreadActionsProps {
  threadId: number;
}

/**
 * ThreadActions component - Provides action buttons for email thread management
 * Includes actions for marking as done, snoozing, and archiving
 * Uses server actions with optimistic UI updates
 *
 * @param threadId - The ID of the thread to perform actions on
 */
export function ThreadActions({ threadId }: ThreadActionsProps) {
  // Initial state for action feedback
  const initialState = {
    error: null,
    success: false,
  };

  // Set up action handlers with state management
  const [doneState, doneAction, donePending] = useActionState(
    moveThreadToDone,
    initialState,
  );
  const [trashState, trashAction, trashPending] = useActionState(
    moveThreadToTrash,
    initialState,
  );

  // Feature disabled in production environment
  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';

  return (
    <TooltipProvider>
      <div className="flex items-center space-x-1">
        {/* Mark as done action */}
        <Tooltip>
          <TooltipTrigger asChild>
            <form action={doneAction}>
              <input type="hidden" name="threadId" value={threadId} />
              <button
                type="submit"
                disabled={donePending || isProduction}
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Check size={14} className="text-gray-600" />
              </button>
            </form>
          </TooltipTrigger>
          {isProduction && (
            <TooltipContent>
              <p>Marking as done is disabled in production</p>
            </TooltipContent>
          )}
        </Tooltip>

        {/* Snooze action - currently disabled/not implemented */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              disabled
              className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Clock size={14} className="text-gray-400" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>This feature is not yet implemented</p>
          </TooltipContent>
        </Tooltip>

        {/* Archive/move to trash action */}
        <Tooltip>
          <TooltipTrigger asChild>
            <form action={trashAction}>
              <input type="hidden" name="threadId" value={threadId} />
              <button
                type="submit"
                disabled={trashPending || isProduction}
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Archive size={14} className="text-gray-600" />
              </button>
            </form>
          </TooltipTrigger>
          {isProduction && (
            <TooltipContent>
              <p>Moving to trash is disabled in production</p>
            </TooltipContent>
          )}
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
