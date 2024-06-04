"use server";
import UserModel from "@models/user";
import VerifyEmail from "@models/verifyEmail";
import { connectToMongoDB } from "../db";
import { randomUUID } from "crypto";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import path from "path"; // Import the path module

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "danieljamesboanca2006@gmail.com",
    pass: "wqwwjwtfuiluefup",
  },
});

export const sendEmail = async (email: string, token: string) => {
  console.log(token);
  try {
    const info = await transporter.sendMail({
      from: "Qr-me", // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `<p>Get started creating your account ?</p>
      <p>http://localhost:3005/sign-up/user-details/${token}</p>
      `, // html body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (e) {
    console.log(e);
  }
};

export const signUp = async (formData: FormData) => {
  //   connectToMongoDB();
};

export const verifyEmail = async (email: string) => {
  await connectToMongoDB();
  const token = `${randomUUID()}${randomUUID()}`.replace(/-/g, "");

  const activateToken = await VerifyEmail.updateOne(
    { email },
    { email, token, createdAt: new Date() },
    { upsert: true, new: true }
  );

  console.log({ activateToken });

  await sendEmail(email, token);
};

export const validateEmailToken = async (token: string) => {
  await connectToMongoDB();
  try {
    const tokenData = await VerifyEmail.findOne({ token });
    if (tokenData) {
      const { email } = tokenData;
      return { email, tokenExists: true };
    }
    return { email: null, tokenExists: false };
  } catch (error) {
    console.error("Error checking token:", error);
    return { email: null, tokenExists: false };
  }
};
