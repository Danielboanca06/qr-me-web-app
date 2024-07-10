"use server";
import { url } from "lib/constants";
import connectToMongoDB from "lib/db";
import QrCodeModel from "models/qrCode";
import { ObjectId } from "mongoose";
import { PageLinks, PageText, QrCode, User } from "types";

export const createQrCode = async (user: User) => {
  await connectToMongoDB();

  const qrCode = {
    public: true,
    content: [],
    userid: user._id,
    ownerDetails: {
      bio: `Hi my name is Daniel 👋 Checkout my links bellow!`,
      title: "@" + user.username,
      profilePic: {
        type: "classic",
        fileName: "",
        url: "",
      },
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  };

  const qr = new QrCodeModel(qrCode);

  try {
    await qr.save();
    console.log("Qr Created successfully");
    return { status: 200 };
  } catch (e) {
    console.log("Error saving qr code to db", e);
    return { status: 500 };
  }
};

export const getScanQrCode = async (accessId: string) => {
  await connectToMongoDB();
  //send the owner a notificaton saying sombody viewed there code;
  try {
    console.log(accessId);
    const data = await QrCodeModel.findOne({
      "ownerDetails.username": accessId,
    });

    if (data) {
      return { status: 200, body: JSON.stringify(data) };
    } else {
      console.log("Error getting qr code from db");
    }
  } catch (e) {
    console.log("Error getting qr code from db", e);
  }
};
export const getQrWithUserName = async (userid: string | ObjectId) => {
  await connectToMongoDB();
  try {
    const data = await QrCodeModel.findOne({ userid });

    if (!data) {
      return { status: 404, message: "QR code not found" };
    }

    return {
      status: 200,
      message: "Success: this user owns this QR code",
      data: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error verifying QR code with email", error);
    return {
      status: 500,
      message: "Internal error verifying QR code with email",
    };
  }
};

export const updateQrCode = async (qrData: QrCode) => {
  await connectToMongoDB();
  try {
    const updatedQrCode = await QrCodeModel.findByIdAndUpdate(
      qrData._id,
      { $set: qrData },
      { new: true }
    );
    if (!updatedQrCode) {
      throw new Error("QR code not found");
    }
    return { status: 200, message: "success" };
  } catch (error) {
    console.error("Error updating QR code:", error);
    return { status: 500, message: "Internal server error" };
  }
};

export const updatedQrPageContent = async (
  userid: string,
  data: Array<PageLinks | PageText>
) => {
  await connectToMongoDB();
  console.log(data);
  try {
    const updatedQrCode = await QrCodeModel.findOneAndUpdate(
      { userid: userid },
      {
        $set: {
          content: data,
        },
      },
      { new: true }
    );

    if (!updatedQrCode) {
      throw new Error("QR code not found");
    }
    return { status: 200, message: "success" };
  } catch (error) {
    console.error("Error updating QR code:", error);
    return { status: 500, message: "Internal server error" };
  }
};

export const updateQrPageProfile = async (
  userid: string,
  data: QrCode["ownerDetails"]
) => {
  await connectToMongoDB();
  try {
    const updatedQrCode = await QrCodeModel.findOneAndUpdate(
      { userid: userid },
      {
        $set: {
          ownerDetails: data,
        },
      },
      { new: true }
    );

    if (!updatedQrCode) {
      throw new Error("QR code not found");
    }
    return { status: 200, message: "success" };
  } catch (error) {
    console.error("Error updating QR code:", error);
    return { status: 500, message: "Internal server error" };
  }
};
