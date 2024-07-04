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
  phonNumber?: string;
  password: string;
};

declare type VerifyEmail = {
  _id: mongoose.Schema.Types.ObjectId;
  email: string;
  createdAt: moongose.Date;
};

/*Database*/
declare global {
  var mongoose: {
    conn: typeof import("mongoose") | null;
    promise: Promise<typeof import("mongoose")> | null;
  };
}

/* User */
declare interface User {
  _id: mongoose.Schema.Types.ObjectId;
  emailToken: string;
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
  // content?: QrCode[];
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
  thumbnail: string;
};
declare type PageText = {
  id: string;
  text: string;
  active: boolean;
};
declare interface QrCode {
  _id: mongoose.Schema.Types.ObjectId;
  accessId: string; // !under 8 char long simplify qr code!
  content?: Array<PageLinks | PageText>;
  bio: string;
  previewImage?: string;
  owner?: string; // the username
  ownerProfilePic?: string;
  bio?: string;
  public: boolean;
  creaded_at: moongose.Date;
  updatedAt: moongose.Date;
  qrCode: string;
}
declare type ImageDataType = {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  image: string;
};
