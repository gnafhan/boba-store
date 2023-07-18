import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import  bcrypt  from 'bcrypt';

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      type:"credentials",
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Add your logic to match credentials with the backend here
        const { email, password } = credentials;

        // Replace the condition below with your backend logic
        const client = await clientPromise;
        const db = client.db("boba");
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({email})
        if (!user) throw Error("Couldn't find email'")

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) throw Error("Couldn't find password")


        // You can also Reject this callback with an Error or with a URL:
        // throw new Error('error message') // Redirect to error page
        // throw '/path/to/redirect'        // Redirect to a URL
        // return '/path/to/redirect'       // Redirect to a URL
        return{
          username: user.username,
          email: user.email,
          role: user.role,
          id: user._id
        }


      },
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,

  callbacks:{
    jwt(params){
      if(params.user?.role){
        params.token.role = params.user.role
        params.token.id = params.user.id
        params.token.username = params.user.username
      }
      return params.token
    },
    session({session, token}){
      if (session.user) {
        session.user.id= token.id
        session.user.role=token.role
        session.user.username=token.username
      }
      return session
    },
    // async signIn(user, account, profile) {
    //   if (account.provider === 'google') {
    //     user.role = 'admin'; // Menambahkan properti role ke objek user
    //   }
    //   return true;
    // },
  },

  // A database is optional, but required to persist accounts in a database


  pages: {
    signIn: "/auth/signIn",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

export default NextAuth(authOptions);
