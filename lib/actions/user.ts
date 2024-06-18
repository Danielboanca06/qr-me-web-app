"use server";
import UserModel from "models/user";
import connectToMongoDB from "lib/db";
import bcrypt from "bcryptjs";
import { signIn } from "auth";
import VerifyEmail from "models/verifyEmail";

export const createUser = async (
  user: SignUpParams
): Promise<{ status: number; message: string }> => {
  const { email, password, firstName, lastName, username } = user;

  await connectToMongoDB();

  const hashedPassword = await bcrypt.hash(password, 5);

  const usernameExists = await UserModel.exists({ username: username });

  if (usernameExists) {
    return {
      message: "Username taken",
      status: 400,
    };
  }

  const newUser = new UserModel({
    email: email,
    password: hashedPassword,
    firstName,
    lastName,
    username,
    emailToken: "",
  });

  try {
    await VerifyEmail.deleteOne({ email });
    await newUser.save();
    try {
      await signIn("credentials", {
        email: email!,
        password: password!,
        redirect: false,
      });

      return {
        message: "User is created successfully",
        status: 200,
      };
    } catch (e) {
      console.error("Error loggin in user. Message:", e);
      return {
        message: "Internal server error",
        status: 500,
      };
    }
  } catch (err: any) {
    console.error("Error creating new User", err);
    return {
      message: "Internal server error",
      status: 500,
    };
  }
};

export const signUserIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    return {
      message: "User is signed in",
      status: 200,
    };
  } catch (e) {
    console.error("Error loggin in user. Message:", e);
    return {
      message: "Email or Password is incorrect",
      status: 500,
    };
  }
};
