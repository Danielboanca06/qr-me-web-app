"use server";

import UserModel from "models/user";
import connectToMongoDB from "lib/db";
import { randomUUID } from "crypto";
import nodemailer from "nodemailer";
import VerifyEmail from "models/verifyEmail";
import { url } from "lib/constants";

const transporter = nodemailer.createTransport({
  service: process.env.NODEMIALER_SERVICE,
  auth: {
    user: process.env.NODEMIALER_USER,
    pass: process.env.NODEMIALER_PASS,
  },
});

export const sendEmail = async (email: string, token?: string) => {
  if (!token) {
    try {
      await connectToMongoDB();
      const data = await VerifyEmail.findOne({ email });
      token = data?.emailToken;
    } catch (e) {
      console.log("Error getting token form email. Message:", e);
      return { status: 500 };
    }
  }
  if (!token) {
    //user already registered
    //user verify document modal is deleted on register
    return { status: 400 };
  }
  try {
    const info = await transporter.sendMail({
      from: "Qr-me", // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `<p>Get started creating your account ?</p>
      <p>${url}sign-up/user-details/${token}</p>
      `, // html body
    });
    if (info.response) {
      return { status: 200 };
    }
    return { status: 500 };
  } catch (e) {
    console.log("Error has occured transporting email", e);
    return { status: 500 };
  }
};

export const verifyEmail = async (
  email: string
): Promise<{ status?: number; token?: string }> => {
  await connectToMongoDB();

  const existingUser = await UserModel.exists({ email });

  console.log({ existingUser });

  if (existingUser) {
    return { status: 400 };
  }

  const token = `${randomUUID()}${randomUUID()}`.replace(/-/g, "");

  try {
    await VerifyEmail.updateOne(
      { email }, // Query criteria to find the document
      {
        $set: {
          token,
          createdAt: new Date(),
        },
      },
      { upsert: true } // Upsert option to insert or update
    );
    console.log("Document inserted/updated successfully");
  } catch (e) {
    console.log("Error trying to create or update user. Message:", e);
    return { status: 500 };
  }

  const response = await sendEmail(email, token);
  if (response.status === 200) {
    return { ...response };
  }
  return response;
};

export const validateEmailToken = async (token: string) => {
  await connectToMongoDB();
  try {
    const oneTimeAccsessToken = await VerifyEmail.findOne({
      token: token,
    });

    if (!!oneTimeAccsessToken) {
      return { status: 200, email: oneTimeAccsessToken.email };
    } else {
      return { status: 400, redirect: true };
    }
  } catch (error) {
    console.error("Error checking token:", error);
    return { status: 500 };
  }
};
