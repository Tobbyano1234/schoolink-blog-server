import { UserModel } from "../../famwork-entities";
import { AccountStatus } from "../../typings/Account.types";
import { UserSuspendAccountDTO } from "../DTOs/suspendAccount.DTO";
import { getUserService } from "../../famwork-accounts/user/services";


export const UserSuspendAccountService = async ({ userID, suspend }: UserSuspendAccountDTO) => {
    const user = await getUserService({ userID }, { onUserNotFound: () => { }, withPassword: false });
    if (!user) return { success: true, message: `user ${userID} not found`, data: null };
    const { _id } = user;
    const updatedUser = await UserModel.findByIdAndUpdate(_id,
        { status: suspend ? AccountStatus.SUSPENDED : AccountStatus.ACTIVE }, { new: true });
    return { success: true, message: `user ${suspend ? 'suspended' : 'activated'}`, data: updatedUser };
};
