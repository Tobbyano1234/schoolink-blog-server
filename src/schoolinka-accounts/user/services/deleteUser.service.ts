import { UserModel } from "../../../famwork-entities";
import { getUserService } from "./getUser.service";
import { DeleteUserProfileDTO } from "../DTOs/DeleteUserDTO";
import { getAdminService } from "../../../famwork-accounts/admin/services";
import { AccountType } from "../../../typings/Account.types";


export const deleteUserService = async ({ userID, adminID, role }: DeleteUserProfileDTO) => {
    const admin = await getAdminService({ adminID }, { onAdminNotFound: () => { }, withPassword: false });
    if (!admin) return { success: false, message: `admin not found`, data: null };
    if (role !== AccountType.ADMIN) return { success: false, message: `unauthorized to delete user`, data: null }
    const user = await getUserService({ userID }, { onUserNotFound: () => { }, withPassword: false });
    if (!user) return { success: false, message: `user not found` };

    await UserModel.findByIdAndDelete(userID);
    return { success: true, message: `user profile deleted successfully`, data: null }
};
