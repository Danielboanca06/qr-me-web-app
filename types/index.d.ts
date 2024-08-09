import mongoose from "mongoose";

/* Auth */
declare type SignUpParams = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phoneNumber?: string;
  password: string;
};

declare type ShipppingDetails = {
  address: string;
  city: string;
  postalCode: string;
  dateOfBirth: string;
  shoppingPreference: "Men's" | "Women's";
};

declare type LoginUser = {
  email: string;
  password: string;
  phonNumber?: string;
};

declare type VerifyEmail = {
  _id: mongoose.Schema.Types.ObjectId;
  email: string;
  createdAt: moongose.Date;
};

/*Database*/
declare global {
  const mongoose: {
    conn: typeof import("mongoose") | null;
    promise: Promise<typeof import("mongoose")> | null;
  };
}

/* User */
declare interface User {
  _id: mongoose.Schema.Types.ObjectId;
  createdAt: moongose.Date;
  updatedAt: moongose.Date;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  shoppingPreference: "Men's" | "Women's";
  emailToken?: string;
  profilePic?: {
    fileName: string;
    url: stirng;
  };
}

/* Qr Code */
declare type QrCodePreview = {
  _id: mongoose.Schema.Types.ObjectId;
  accessId: string;
  title: string;
  previewImage?: string;
  public: boolean;
  updatedAt: moongose.Date;
};

declare type PageLinks = {
  id: string;
  title: string;
  link: string;
  active: boolean;
  layout: string;
  thumbnail: {
    fileName: string;
    url: stirng;
  };
};
declare type PageText = {
  id: string;
  text: string;
  active: boolean;
};
declare type SocialIconsType = {
  socialName: string;
  url?: string;
  iconColor?: string;
};

declare type BackgroundBoardType = {
  type?: string;
  color?: string;
  gradientDirection?: "up" | "down";
  contentUrl?: string;
};
declare type ButtonBoardType = {
  type?: string;
  radius?: string;
  color?: string;
  fontColor?: string;
};
declare type FontBoardType = {
  font?: string;
  color?: string;
};

declare interface QrCode {
  _id?: mongoose.Schema.Types.ObjectId;
  content?: Array<PageLinks | PageText>;
  userid: string;
  socialIcons?: SocialIconsType[];
  ownerDetails: {
    bio?: string;
    title?: string;
    profilePic?: {
      type: ButtonBoardVariantsType;
      fileName: string;
      url: stirng;
    };
    username?: string;
    firstName?: string;
    lastName?: string;
  };
  background?: BackgroundBoardType;
  button?: ButtonBoardType;
  font?: FontBoardType;
  public: boolean;
  creaded_at: moongose.Date;
  updatedAt: moongose.Date;
}

declare type ImageDataType = {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  userid: string;
  imageFile: string;
  createdAt: mongoose.Date;
};
