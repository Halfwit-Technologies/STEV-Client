import { User } from '@/interfaces/Schema';
import NextAuth from 'next-auth';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';

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
      profile(profile: GoogleProfile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          avatar_url: profile.picture,
          a_tok: profile.access_token,
          a_tok_exp: new Date(Date.now() + profile.expires_in * 1000),
          r_tok: profile.refresh_token,
          r_tok_exp: new Date(Date.now() + profile.expires_in * 1000),
        } as User;
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account, profile, email, credentials }) => {
      console.log('signIn', { user, account, profile, email, credentials });
      return true;
    },
  },
});

export { handler as GET, handler as POST };
