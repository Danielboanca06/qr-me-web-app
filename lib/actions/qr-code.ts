"use server";
import connectToMongoDB from "lib/db";
import QrCodeModel from "models/qrCode";
import { toDataURL } from "qrcode";

export const createQrCode = async () => {
  await connectToMongoDB();
  const url = "http://192.168.1.4:3005/scan-qr/123";

  try {
    const code = await toDataURL(url, {
      errorCorrectionLevel: "H",
      type: "image/png",
      maskPattern: 7,
      width: 200,
    });

    const data: QrCode = {
      html: "",
      owner: "",
      id: "123",
      title: "Claim This Qr Code",
      previewImage: "",
      public: true,
      creaded_at: undefined,
      updatedAt: undefined,
      qrCode: code || "h",
    };

    try {
      await QrCodeModel.findOneAndUpdate({ id: data.id }, data, {
        // under construction
        new: true,
        upsert: true,
      });
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

export const getQrCode = async (id: string) => {
  await connectToMongoDB();
  //send the owner a notificaton saying sombody viewed there code;
  try {
    const qr = await QrCodeModel.findOne({ id: id });
    return { status: 200, body: qr };
  } catch (e) {
    console.log("Error getting qr code from db", e);
  }
};
