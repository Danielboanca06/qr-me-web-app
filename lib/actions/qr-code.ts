"use server";
import connectToMongoDB from "lib/db";
import QrCodeModel from "models/qrCode";
import UserModel from "models/user";
import { toDataURL } from "qrcode";

export const createQrCode = async (username: string) => {
  await connectToMongoDB();
  const url = "http://192.168.1.4:3005/scan-qr/6672ecd8bd5fbdb94e55a79b";

  const accessId =
    Date.now().toString(36) + Math.random().toString(36).substring(13);

  try {
    const code = await toDataURL(url, {
      errorCorrectionLevel: "L",
      type: "image/png",
      width: 210,
    });

    const qrCode = {
      accessId: accessId,
      bio: "",
      owner: username,
      previewImage: "",
      public: true,
      ownerProfilePic: "",
      creaded_at: undefined,
      updatedAt: undefined,
      content: [],
      qrCode: code,
    };

    try {
      const qr = await new QrCodeModel(qrCode);

      await qr.save();
      console.log("Qr Created successfully");
      return { status: 200 };
    } catch (e) {
      console.log("Error saving qr code to db", e);
      return { status: 500 };
    }
  } catch (err) {
    console.log("Error Creating qr code img, Message:", err);
    return { status: 500 };
  }
};

export const getScanQrCode = async (accessId: string) => {
  await connectToMongoDB();
  //send the owner a notificaton saying sombody viewed there code;
  try {
    let qr = await QrCodeModel.findOne({ accessId: accessId });

    if (!qr) {
      const data = await QrCodeModel.findOne({ owner: accessId });

      if (data) {
        return { status: 200, body: JSON.stringify(data) };
      } else {
        console.log("Error getting qr code from db");
      }
    }

    return { status: 200, body: JSON.stringify(qr) };
  } catch (e) {
    console.log("Error getting qr code from db", e);
  }
};

export const updateQrCode = async (qrData: QrCode) => {
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
  owner: string,
  data: Array<PageText | PageLinks>
) => {
  await connectToMongoDB();
  try {
    const updatedQrCode = await QrCodeModel.findOneAndUpdate(
      { owner: owner },
      { content: data },
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

export const getQrWithUserName = async (username: string) => {
  await connectToMongoDB();
  try {
    const data = await QrCodeModel.findOne({ owner: username });

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
