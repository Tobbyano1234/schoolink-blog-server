import { CheckUserDTO, GetUserDTO, CheckEmailDTO } from "./DTOs/GetAdminDTO";
import { UpdateUserProfileDTO, UpdateUserUsernameDTO, UpdateUserEmailDTO } from "./DTOs/UpdateUserDTO";

export type UpdateUser = {
  DTO:
  | ['profile', UpdateUserProfileDTO]
  | ['username', UpdateUserUsernameDTO]
  | ['email', UpdateUserEmailDTO];
  onSuccess: (...args: any[]) => any;
};

export type GetUser = {
  DTO:
  | ['check-email', CheckEmailDTO]
  | ['check-username', CheckUserDTO]
  | ['single', GetUserDTO]
  | ['profile', GetUserDTO];
  onSuccess: (...args: any[]) => any;
};
