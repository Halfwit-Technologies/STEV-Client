import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

interface GoogleProfile {
  id: string;
  name: string;
  email: string;
  image: string;
  token: string;
  accessToken: string;
  refreshToken: string;
  expires: number;
}

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
          image: profile.image,
          token: profile.at_hash,
          accessToken: profile.at_hash,
          refreshToken: profile.at_hash,
          expires: profile.expires,
        };
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user }) => {
      return true;
    },
  },
});

export { handler as GET, handler as POST };
