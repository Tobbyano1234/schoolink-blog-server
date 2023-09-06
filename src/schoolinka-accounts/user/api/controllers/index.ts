import { Request } from "express";
import httpStatus from "http-status";

import { BaseController } from "../../../../famwork-shared/api";
import { singleFileUpload } from '../../../../famwork-shared/fileUpload';
import { UpdateUserProfileDTO } from "../../DTOs/UpdateUserDTO";
import { getUserService, updateUserService } from "../../services";
import { deleteUserService } from "../../services/deleteUser.service";

export class UserController {
  static updateProfile = BaseController(async (request: Request) => {
    const UpdateUserProfileDTO = request.body as UpdateUserProfileDTO;
    const { avatar: image } = UpdateUserProfileDTO;
    UpdateUserProfileDTO.userID = (request as any).token._id;
    UpdateUserProfileDTO.avatar = request.file ? (await singleFileUpload(request)).secure_url : image || '';
    const { message, data } = await updateUserService(UpdateUserProfileDTO);
    return { status: httpStatus.OK, message, data };
  });

  static getUser = BaseController(async (request: Request) => {
    const userID = request.params.userID;
    const user = await getUserService({ userID }, { onUserNotFound: () => { } });
    return {
      status: httpStatus.OK,
      message: "user fetched successfully",
      data: user,
    };
  });

  static deleteUser = BaseController(async (request: Request) => {
    const userID = request.params.userID;
    const adminID = (request as any).token._id as string;
    const role = (request as any).token.accountType as string;
    const { success, message, data } = await deleteUserService({ userID, role, adminID });
    return {
      status: success ? httpStatus.OK : httpStatus.BAD_REQUEST,
      message,
      data,
    };
  });


}
