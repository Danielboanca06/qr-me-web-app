/* Auth */
declare type SignUpParams = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  shoppingPreferance: "Men's" | "Women's";
  password: string;
};

declare type ShipppingDetails = {
  address: string;
  city: string;
  postalCode: string;
  dateOfBirth: string;
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

/* User */
declare type User = {
  _id: mongoose.Schema.Types.ObjectId;
  emailToken: string;
  createdAt: moongose.Date;
  updatedAt: moongose.Date;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  shoppingPreferance: "Men's" | "Women's";
};
