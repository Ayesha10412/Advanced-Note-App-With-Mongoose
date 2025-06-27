export interface IAddress {
  city: string;
  street: string;
  zip: number;
}

export interface IUser {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  role: "user" | "admin";
  address: IAddress;
}
