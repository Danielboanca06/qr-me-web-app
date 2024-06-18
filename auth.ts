import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import UserModel from "models/user";
import bcrypt from "bcryptjs";
import connectToMongoDB from "lib/db";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
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
});
