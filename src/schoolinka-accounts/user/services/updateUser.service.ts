import { UserModel } from "../../../famwork-entities";
import { UpdateUserProfileDTO } from "../DTOs/UpdateUserDTO";
import { getUserService } from "./getUser.service";


export const updateUserService = async (UpdateUserProfileDTO: UpdateUserProfileDTO) => {
    const { userID, firstName, lastName, phoneNumber, avatar } = UpdateUserProfileDTO;
    const user = await getUserService({ userID }, { onUserNotFound: () => { }, withPassword: false });
    if (!user) return { success: false, message: `user not found` };

    const updatedProfile = await UserModel.findByIdAndUpdate(userID, { firstName, lastName, phoneNumber, avatar }, { new: true });
    return { success: true, message: `profile updated successfully`, data: updatedProfile }
};
