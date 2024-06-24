"use server";
import connectToMongoDB from "lib/db";
import QrCodeModel from "models/qrCode";
import { toDataURL } from "qrcode";

export const createQrCode = async () => {
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

    const data = {
      id: "6672ecd8bd5fbdb94e55a79b", // change this
      accessId: "lxn3nu53",
      html: "",
      owner: "",
      title: "Claim This Qr Code",
      previewImage: "",
      public: true,
      creaded_at: undefined,
      updatedAt: undefined,
      qrCode: code || "h",
    };

    try {
      // const code = new QrCodeModel(data);
      await QrCodeModel.findOneAndUpdate(
        { _id: data.id },
        { qrCode: data.qrCode, accessId: data.accessId },

        {
          // under construction
          new: true,
          upsert: true,
        }
      );
      // await code.save();
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

export const getQrCode = async (accessId: string) => {
  await connectToMongoDB();
  //send the owner a notificaton saying sombody viewed there code;
  try {
    const qr = await QrCodeModel.findOne({ accessId: accessId });
    if (!qr) {
      throw new Error("QR code not found");
    }
    return { status: 200, body: qr };
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

export const verifyQrWithEmail = async (qrId: string, email: string) => {
  try {
    const data = await QrCodeModel.findById(qrId);
    if (!data) {
      return { status: 404, message: "not found" };
    } else {
      console.log(data);
      if (data.owner === email) {
        return {
          status: 200,
          message: "success this users owns this qr-code",
          data: data,
        };
      }
      return { status: 401, message: "unauthorized to access this qr code" };
    }
  } catch (error) {
    console.log("error verifying qr with email", error);
    return { status: 500, message: "internal error verifying qr with email" };
  }
};

export const updateHtml = async (html: string, qrCodeId: string) => {
  try {
    const updatedQrCode = await QrCodeModel.findByIdAndUpdate(qrCodeId, {
      html: html,
    });
  } catch (error) {
    console.log("error");
  }
};
