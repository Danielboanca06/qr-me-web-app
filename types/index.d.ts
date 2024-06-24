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
  qrCodes?: QrCodePreview[];
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

declare type QrCode = {
  _id: mongoose.Schema.Types.ObjectId;
  accessId: string; // !under 8 char long simplify qr code!
  html?: React.ReactNode;
  title: string;
  previewImage?: string;
  owner?: string; // the users email
  public: boolean;
  creaded_at: moongose.Date;
  updatedAt: moongose.Date;
  qrCode: string;
};
