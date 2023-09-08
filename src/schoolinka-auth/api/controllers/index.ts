import { Request } from "express";
import httpStatus from "http-status";

import { BaseController } from "../../../schoolinka-shared/api";
import { LocalSignInDTO } from "../../DTOs/signIn.DTO";
import { LocalSignUpAdminDTO } from "../../DTOs/signUp.DTO";
import {
  // LocalSignInUserService,
  LocalSignUpUserService,
  MailSendAdminOtpService,
  MailSendUserOtpService,
  MailVerifyAdminOtpService,
  LocalSignUpAdminService,
  LocalSignInAdminService,
  MailVerifyUserOtpService,
  VerifyUserPasswordService,
  VerifyUserEmailService,
  ResetUserPasswordService,
  ChangeUserPasswordService,
} from "../../../schoolinka-auth/services";
import { MailSendOtpDTO } from "../../../schoolinka-auth/DTOs/sendOtp.DTO";
import { MailVerifyOtpDTO } from "../../../schoolinka-auth/DTOs/verifyOtp.DTO";
import { LoginStatusService } from "../../../schoolinka-auth/services";
import { LoginStatusDTO } from "../../../schoolinka-auth/DTOs/LoginStatusDTO";
import {
  ChangeAdminPasswordDTO,
  ChangeUserPasswordDTO,
  ResetPasswordDTO,
  VerifyAdminEmailDTO,
  VerifyAdminPasswordDTO,
  VerifyUserEmailDTO,
  VerifyUserPasswordDTO,
} from "../../../schoolinka-auth/DTOs/passwordManager.DTO";
import { LocalSignUpUserDTO } from "../../../schoolinka-auth/DTOs/signUp.DTO";
import {
  VerifyAdminPasswordService,
  VerifyAdminEmailService,
  ResetAdminPasswordService,
  ChangeAdminPasswordService,
} from "../../../schoolinka-auth/services/passwordManager.admin.service";
// import { SocketHandler } from "../../../schoolinka-push-server/services/push.server";
// import { Socket } from "socket.io";
// import { UserSuspendAccountDTO } from "src/schoolinka-auth/DTOs/suspendAccount.DTO";
// import { DeactivateAccountDTO } from "src/schoolinka-auth/DTOs/deactivateAccount.DTO";

export class AuthController {
  static signUpUser = BaseController(async (request: Request) => {
    const LocalSignUpDTO = request.body as LocalSignUpUserDTO;
    const { success, message, data } = await LocalSignUpUserService(
      LocalSignUpDTO
    );
    return {
      status: success ? httpStatus.CREATED : httpStatus.BAD_REQUEST,
      message,
      data,
    };
  });

  // static signInUser = BaseController(async (request: Request) => {
  //   const LocalSignInDTO = request.body as LocalSignInDTO;
  //   const { success, message, data, token } = await LocalSignInUserService(
  //     LocalSignInDTO
  //   );
  //   SocketHandler.messageHandler(data)
  //   // SocketHandler.connectionHandler()
  //   return {
  //     status: success ? httpStatus.OK : httpStatus.UNAUTHORIZED,
  //     message,
  //     data,
  //     token,
  //   };
  // });

  static signInStatus = BaseController(async (request: Request) => {
    const LoginStatusDTO = request.body as LoginStatusDTO;
    if (LoginStatusDTO.userID) {
      LoginStatusDTO.userID = (LoginStatusDTO.userID);
    }
    if (LoginStatusDTO.adminID) {
      LoginStatusDTO.adminID = (LoginStatusDTO.adminID);
    }
    const { success, message, data, token } = await LoginStatusService(
      LoginStatusDTO
    );
    return {
      status: success ? httpStatus.OK : httpStatus.BAD_REQUEST,
      message,
      data,
      token,
    };
  });

  static signUpAdmin = BaseController(async (request: Request) => {
    const LocalSignUpDTO = request.body as LocalSignUpAdminDTO;
    const { message, data } = await LocalSignUpAdminService(LocalSignUpDTO);
    return { status: httpStatus.CREATED, message, data };
  });

  static signInAdmin = BaseController(async (request: Request) => {
    const LocalSignInDTO = request.body as LocalSignInDTO;
    const { success, message, data, token } = await LocalSignInAdminService(
      LocalSignInDTO
    );
    return {
      status: success ? httpStatus.OK : httpStatus.PRECONDITION_REQUIRED,
      message,
      data,
      token,
    };
  });

  static sendBuyerOTP = BaseController(async (request: Request) => {
    const MailSendOtpDTO = request.body as MailSendOtpDTO;
    const { success, message, data } = await MailSendUserOtpService(
      MailSendOtpDTO
    );
    return {
      status: success ? httpStatus.OK : httpStatus.BAD_REQUEST,
      message,
      data,
    };
  });

  static sendAdminOTP = BaseController(async (request: Request) => {
    const MailSendOtpDTO = request.body as MailSendOtpDTO;
    const { success, message, data } = await MailSendAdminOtpService(
      MailSendOtpDTO
    );
    return {
      status: success ? httpStatus.OK : httpStatus.BAD_REQUEST,
      message,
      data,
    };
  });

  static verifyUserOTP = BaseController(async (request: Request) => {
    const MailVerifyOtpDTO = request.body as MailVerifyOtpDTO;
    const { success, message, data, token } = await MailVerifyUserOtpService(
      MailVerifyOtpDTO
    );
    return {
      status: success ? httpStatus.OK : httpStatus.BAD_REQUEST,
      message,
      data,
      token,
    };
  });

  static verifyAdminOTP = BaseController(async (request: Request) => {
    const MailVerifyOtpDTO = request.body as MailVerifyOtpDTO;
    const { success, message, data, token } = await MailVerifyAdminOtpService(
      MailVerifyOtpDTO
    );
    return {
      status: success ? httpStatus.OK : httpStatus.BAD_REQUEST,
      message,
      data,
      token,
    };
  });

  static verifyUserPassword = BaseController(async (request: Request) => {
    const VerifyPasswordDTO = request.body as VerifyUserPasswordDTO;
    const { success, message, data } = await VerifyUserPasswordService(
      VerifyPasswordDTO
    );
    return {
      status: success ? httpStatus.OK : httpStatus.BAD_REQUEST,
      message,
      data,
    };
  });

  static verifyAdminPassword = BaseController(async (request: Request) => {
    const VerifyPasswordDTO = request.body as VerifyAdminPasswordDTO;
    const { success, message, data } = await VerifyAdminPasswordService(
      VerifyPasswordDTO
    );
    return {
      status: success ? httpStatus.OK : httpStatus.BAD_REQUEST,
      message,
      data,
    };
  });

  static verifyUserEmail = BaseController(async (request: Request) => {
    const VerifyEmailDTO = request.body as VerifyUserEmailDTO;
    const { success, message, data } = await VerifyUserEmailService(
      VerifyEmailDTO
    );
    return {
      status: success ? httpStatus.OK : httpStatus.BAD_REQUEST,
      message,
      data,
    };
  });

  static verifyAdminEmail = BaseController(async (request: Request) => {
    const VerifyEmailDTO = request.body as VerifyAdminEmailDTO;
    const { success, message, data } = await VerifyAdminEmailService(
      VerifyEmailDTO
    );
    return {
      status: success ? httpStatus.OK : httpStatus.BAD_REQUEST,
      message,
      data,
    };
  });

  static changeUserPassword = BaseController(async (request: Request) => {
    const ChangePasswordDTO = request.body as ChangeUserPasswordDTO;
    ChangePasswordDTO.userID = (request as any).token._id;
    const { success, message, data } = await ChangeUserPasswordService(
      ChangePasswordDTO
    );
    return {
      status: success ? httpStatus.OK : httpStatus.BAD_REQUEST,
      message,
      data,
    };
  });

  static changeAdminPassword = BaseController(async (request: Request) => {
    const ChangePasswordDTO = request.body as ChangeAdminPasswordDTO;
    ChangePasswordDTO.adminID = (request as any).token._id;
    const { success, message, data } = await ChangeAdminPasswordService(
      ChangePasswordDTO
    );
    return {
      status: success ? httpStatus.OK : httpStatus.BAD_REQUEST,
      message,
      data,
    };
  });

  static resetUserPassword = BaseController(async (request: Request) => {
    const ResetPasswordDTO = request.body as ResetPasswordDTO;
    const { success, message, data } = await ResetUserPasswordService(
      ResetPasswordDTO
    );
    return {
      status: success ? httpStatus.OK : httpStatus.BAD_REQUEST,
      message,
      data,
    };
  });

  static resetAdminPassword = BaseController(async (request: Request) => {
    const ResetPasswordDTO = request.body as ResetPasswordDTO;
    const { success, message, data } = await ResetAdminPasswordService(
      ResetPasswordDTO
    );
    return {
      status: success ? httpStatus.OK : httpStatus.BAD_REQUEST,
      message,
      data,
    };
  });

//   static suspendUserAccount = BaseController(async (request: Request) => {
//     const UserSuspendAccountDTO = request.body as UserSuspendAccountDTO;
//     const { success, message, data } = await SuspendUserAccountService(
//       UserSuspendAccountDTO
//     );
//     return {
//       status: success ? httpStatus.OK : httpStatus.BAD_REQUEST,
//       message,
//       data,
//     };
//   });

//   static deleteUserAccount = BaseController(async (request: Request) => {
//     const UserSuspendAccountDTO = request.body as UserSuspendAccountDTO;
//     const { success, message, data } = await DeleteUserAccountService(
//       UserSuspendAccountDTO
//     );
//     return {
//       status: success ? httpStatus.OK : httpStatus.BAD_REQUEST,
//       message,
//       data,
//     };
//   });

//   static deactivateAccount = BaseController(async (request: Request) => {
//     const DeactivateAccountDTO = request.body as DeactivateAccountDTO;
//     DeactivateAccountDTO.userID = request.token._id;
//     const { success, message, data } = await DeactivateAccountService({
//       DeactivateAccountDTO,
//       onSuccess: UserDeactivateAccountHook,
//     });
//     return {
//       status: success ? httpStatus.OK : httpStatus.BAD_REQUEST,
//       message,
//       data,
//     };
//   });
}
