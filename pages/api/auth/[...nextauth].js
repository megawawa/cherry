import { profile } from 'console';
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { getUserFromCredential, genUserFromCredential } from '../../../libs/mongoDb'

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      authorize: async (credentials) => {
        console.log("Credentials credentials", credentials);
        if (credentials.isNewUser) {
          const user = await genUserFromCredential(credentials);

          if (user) {
            return Promise.resolve(user);
          } else {
            return Promise.reject('/signup?signUpError=1');
          }
        }
        // Add logic here to look up the user from the credentials supplied
        const user = await getUserFromCredential(credentials);

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return Promise.resolve(user);
        } else {
          // If you return null or false then the credentials will be rejected
          return Promise.reject('/login?loginError=1');
          // You can also Reject this callback with an Error or with a URL:
          // return Promise.reject(new Error('error message')) // Redirect to error page
          // return Promise.reject('/path/to/redirect')        // Redirect to a URL
        }
      },
    }),
    // ...add more providers here
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,

  pages: {
    signIn: '/login',
  },

  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },

  callbacks: {
    signIn: async (user, account, profile) => {
      console.log("sign in", user, account, profile);
      return Promise.resolve(true)
    },
    redirect: async (url, baseUrl) => {
      return Promise.resolve(baseUrl);
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      // result would be passed to session
      console.log('jwt', token, user, account, profile, isNewUser);

      if (user) {
        token.isTutor = user.isTutor ?? false;
        token.isStudent = user.isStudent ?? false;
      }

      return Promise.resolve(token);
    },
    session: async (session, user) => {
      console.log('session', session, user);

      if (user) {
        session.user.isTutor = user.isTutor ?? false;
        session.user.isStudent = user.isStudent ?? false;
      }

      return Promise.resolve(session);
    },
  },

  // secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    // secret: process.env.NEXTAUTH_SECRET,
    encryption: true, // Very important to encrypt the JWT, otherwise you're leaking username+password into the browser
  },

}

export default (req, res) => NextAuth(req, res, options)