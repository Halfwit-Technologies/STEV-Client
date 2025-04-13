import { GoogleOAuthProfile } from '@/interfaces/GoogleAuth';
import { User } from '@/interfaces/Schema';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { addUser, getUserByEmail } from '../../../../lib/db/queries';

const handler = NextAuth({
  useSecureCookies: process.env.NODE_ENV === 'production',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
      // Use our custom type for better type safety and documentation
      profile(profile: GoogleOAuthProfile): User {
        return {
          id: profile.sub,
          name: profile.name || `${profile.given_name} ${profile.family_name}`,
          email: profile.email || '',
          avatar_url: profile.picture || '',
          workspace_domain: profile.hd,

          // Token management
          access_token: profile.access_token || '',
          token_expiry: profile.expires_in
            ? new Date(Date.now() + profile.expires_in * 1000)
            : new Date(Date.now() + 3600 * 1000), // Default 1 hour

          refresh_token: profile.refresh_token,
          refresh_expiry: profile.refresh_expires_in
            ? new Date(Date.now() + profile.refresh_expires_in * 1000)
            : profile.refresh_token
              ? new Date(Date.now() + 30 * 24 * 3600 * 1000) // Default 30 days
              : undefined,
        };
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account, profile, email, credentials }) => {
      console.log('signIn', { user, account, profile, email, credentials });
      // Check if the user exists in the database
      const existingUser = await getUserByEmail(user.email as string);
      if (!existingUser) {
        // If the user does not exist, add them to the database
        const newUser = await addUser(user);
        if (!newUser) {
          return false; // User creation failed
        }
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
