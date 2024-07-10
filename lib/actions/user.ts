"use server";
import UserModel from "models/user";
import connectToMongoDB from "lib/db";
import bcrypt from "bcryptjs";
import { signIn } from "auth";
import VerifyEmail from "models/verifyEmail";
import { createQrCode } from "./qr-code";
import { SignUpParams } from "types";

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
    const user = await newUser.save();
    console.log({ user });
    await createQrCode(user);
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
    await connectToMongoDB();
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

export async function getUser(email: string) {
  try {
    await connectToMongoDB();
    const user = await UserModel.findOne({ email }).lean();
    if (!user) {
      throw new Error("User not found");
    }
    return { user };
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching user data");
  }
}

// export const addQrCodeToUser = async (qr: QrCodePreview, userId: string) => {
//   try {
//     await connectToMongoDB();

//     const updatedUser = await UserModel.findByIdAndUpdate(
//       userId,
//       { $push: { qrCodes: qr } },
//       { new: true, upsert: true }
//     );

//     if (!updatedUser) {
//       throw new Error("User not found");
//     }

//     return { status: 200, message: "success" };
//   } catch (e) {
//     console.error("Error adding QR code to user:", e);
//     return { status: 500, message: "Internal server error" };
//   }
// };
