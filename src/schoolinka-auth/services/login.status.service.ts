import { getAdminService } from "../../famwork-accounts/admin/services";
import { getUserService } from "../../famwork-accounts/user/services";
import { LoginStatusDTO } from "../DTOs/LoginStatusDTO";
import { verifyTokenSync } from "../plugins";


export const LoginStatusService = async (LoginStatusDTO: LoginStatusDTO) => {
  const { userID, adminID, token } = LoginStatusDTO;

  if (userID) {
    const user = await getUserService({ userID }, {onUserNotFound:() => { }});
    if (!user) return { success: false, message: `user ${userID} not found`, data: null, token };

    const { err, res } = verifyTokenSync(token);
    if (err) return {
      success: false,
      message: err.message,
      data: null,
    };
    if (String(res._id) !== String(userID)) return { success: false, message: `token does not belong to user ${userID}`, data: null, token };
  };

  if (adminID) {
    const admin = await getAdminService({ adminID }, {onAdminNotFound:() => { }});
    if (!admin) return { success: false, message: `admin ${userID} not found`, data: null, token };

    const { err, res } = verifyTokenSync(token);
    if (err) return {
      success: false,
      message: err.message,
      data: null,
    };
    if (String(res._id) !== String(userID)) return { success: false, message: `token does not belong to admin ${userID}`, data: null, token };
  };

  return { success: true, message: "user logged in", data: null, token };
};
