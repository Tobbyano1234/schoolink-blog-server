import { Types } from "mongoose";
import { Admin, AdminModel } from "../../../famwork-entities";
import { GetAdminDTO, GetAdminOptions } from "../DTOs/GetAdminDTO";


export const getAdminService = async (
    { email, adminID }: GetAdminDTO,
    {
        withPassword = false,
        onAdminNotFound = ({ email, adminID }: GetAdminDTO) => {
            throw new Error(`user ${email || adminID} not found`);
        },
    }: GetAdminOptions
) => {
    if (!adminID && !email) throw new Error(`cannot get admin`);
    let admin;
    if (withPassword) {
        if (adminID) {
            admin = await AdminModel.findById(adminID).select("-password") as Admin;
        };
        if (email) {
            admin = await AdminModel.findOne({ email }).select("-password") as Admin;
        };
    };

    const filter = adminID ? { _id: new Types.ObjectId(adminID) } : { email };
    //    admin = await AdminModel.findById(adminID) as Admin;
     admin = await AdminModel.findOne({ filter }) as Admin;
    //   const admin = await AdminModel.findOne({email }) as Admin;
   
    if (!admin) onAdminNotFound({ email, adminID });
    return admin;
};

export const getPaginatedUsers = async () => { };
