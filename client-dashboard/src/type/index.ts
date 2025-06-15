import { JwtPayload } from "jwt-decode";

export type TUser = {
  id: string;
  name: string;
  email: string;
  password?: string; // Made optional
  createdAt: string;
  updatedAt: string;

};

export type DecodedUser = JwtPayload & TUser;