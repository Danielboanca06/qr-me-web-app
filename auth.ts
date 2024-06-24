import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import UserModel from "models/user";
import bcrypt from "bcryptjs";
import connectToMongoDB from "lib/db";
import { getUser } from "lib/actions/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "string" },
        password: { type: "string" },
      },
      async authorize(credentials) {
        await connectToMongoDB();
        if (!credentials) return null;
        try {
          const user = await UserModel.findOne({ email: credentials.email });

          if (
            user &&
            typeof credentials.password === "string" &&
            (await bcrypt.compare(credentials.password!, user.password))
          ) {
            return {
              id: user._id.toString(),
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
            };
          } else {
            throw new Error("Email or Password is incorrect");
          }
        } catch (error) {
          console.error(error);
          throw new Error("Internal server error");
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.uid = user;
      }

      return token;
    },
    session: async ({ session, token }) => {
      // here we put session.useData and put inside it whatever you want to be in the session
      // here try to console.log(token) and see what it will have
      // sometimes the user get stored in token.uid.userData
      // sometimes the user data get stored in just token.uid
      const user = await getUser(session.user.email);
      session.user = user.user;
      return session;
    },
  },
});
