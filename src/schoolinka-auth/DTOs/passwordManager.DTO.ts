import { ObjectId } from "mongodb";
import { User} from "../../famwork-entities";

export type VerifyUserPasswordDTO = {
  oldPassword: string;
  email: string;  
  computedProps?: {
    _user?: User;
  };
};

export type VerifyAdminPasswordDTO = {
  oldPassword: string;
  email: string;  
  computedProps?: {
    _user?: User;
  };
};

export type ResetPasswordDTO = {
  otp: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
};

export type ChangeUserPasswordDTO = {
  userID: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  otp: string;
  computedProps?: {
    _user?: User;
  };
};

export type ChangeAdminPasswordDTO = {
  adminID: string | ObjectId;
  newPassword: string;
  confirmPassword: string; 
};

export type VerifyUserEmailDTO = {
  userID: string,
  email: string,
};

export type VerifyAdminEmailDTO = {
  adminID: string | ObjectId,
  email: string,
};