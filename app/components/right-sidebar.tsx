import { getUserProfile } from '@/lib/db/queries';
import Image from 'next/image';

/**
 * RightSidebar component - Shows user information and recent activity
 * Displayed on the right side of the application layout
 * @param userId - The ID of the user whose information should be displayed
 */
export async function RightSidebar({ userId }: { userId: number }) {
  try {
    // Fetch user profile data
    let user = await getUserProfile(userId);

    // If user not found, don't render anything
    if (!user) {
      return (
        <div className="hidden w-[350px] shrink-0 overflow-auto bg-neutral-50 p-6 sm:flex">
          <div className="w-full max-w-md">
            <h2 className="mb-2 text-lg font-medium text-gray-500">
              User profile not available
            </h2>
            <p className="text-sm text-gray-400">
              Database connection or user data issue
            </p>
          </div>
        </div>
      );
    }

    // Normal user profile rendering
    return (
      <div className="hidden w-[350px] shrink-0 overflow-auto bg-neutral-50 p-6 sm:flex">
        <div className="w-full max-w-md">
          {/* User header with name */}
          <h2 className="mb-2 text-2xl font-bold">{user.name}</h2>

          {/* User avatar and contact info */}
          <div className="mb-4 flex items-center">
            <img
              src={user.avatarUrl || '/placeholder.svg?height=40&width=40'}
              alt={`${user.name}`}
              className="mr-4 h-10 w-10 rounded-full"
            />
            <div>
              <p className="text-blue-600">{user.email}</p>
              {user.location && (
                <p className="text-sm text-gray-600">{user.location}</p>
              )}
            </div>
          </div>

          {/* User job information */}
          {(user.jobTitle || user.company) && (
            <p className="mb-4 text-gray-700">
              {`${user.jobTitle || ''} ${user.jobTitle && user.company ? 'at' : ''} ${user.company || ''}`}
            </p>
          )}

          {/* Recent email activity */}
          {user.latestThreads && user.latestThreads.length > 0 && (
            <>
              <h3 className="mb-2 font-semibold">Mail</h3>
              <ul className="mb-4 space-y-1 text-sm text-gray-600">
                {user.latestThreads.map((thread, index) => (
                  <li key={index}>{thread.subject}</li>
                ))}
              </ul>
            </>
          )}

          {/* Social media links */}
          <div className="space-y-2">
            {user.linkedin && (
              <a
                href={user.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Image
                  src="/linkedin.svg"
                  alt="LinkedIn"
                  width={16}
                  height={16}
                  className="mr-2"
                />
                <span className="text-sm">LinkedIn</span>
              </a>
            )}
            {user.twitter && (
              <a
                href={user.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Image
                  src="/x.svg"
                  alt="X/Twitter"
                  width={16}
                  height={16}
                  className="mr-2"
                />
                <span className="text-sm">Twitter/X</span>
              </a>
            )}
            {user.github && (
              <a
                href={user.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Image
                  src="/github.svg"
                  alt="GitHub"
                  width={16}
                  height={16}
                  className="mr-2"
                />
                <span className="text-sm">GitHub</span>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in RightSidebar:', error);
    return (
      <div className="hidden w-[350px] shrink-0 overflow-auto bg-neutral-50 p-6 sm:flex">
        <div className="w-full max-w-md">
          <h2 className="mb-2 text-lg font-medium text-gray-500">
            Error loading user profile
          </h2>
          <p className="text-sm text-gray-400">
            Please check database connection
          </p>
        </div>
      </div>
    );
  }
}
