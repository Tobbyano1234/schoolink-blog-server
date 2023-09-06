import bcrypt from 'bcrypt';

import { issueToken } from "../plugins";
import { LocalSignInDTO } from "../DTOs/signIn.DTO";
import { AccountType } from '../../typings/Account.types';
import { getAdminService } from '../../famwork-accounts/admin/services';
import { ModelNames, GeneralModel } from '../../famwork-entities';
import { Types } from 'mongoose';
import { AdminMetaDataGeneral } from '../../typings/Admin.types';

export const LocalSignInAdminService = async (DTO: LocalSignInDTO) => {
    const { email, password } = DTO;
    const admin = await getAdminService({ email }, { shouldPopulate: false, onAdminNotFound: () => { } });
    if (!admin) return { success: false, message: 'incorrect credential', data: null };

    const { _id, password: hashedPassword } = admin;

    const passwordVerfied = await bcrypt.compare(password, hashedPassword);
    if (!passwordVerfied) return { success: false, message: 'incorrect credential', data: null };

    const token = await issueToken({ accountType: AccountType.ADMIN, _id, issuedAt: Date.now(), email });

    const AdminMetaData = await GeneralModel.findOne(
        { collectionID: new Types.ObjectId(_id), collectionName: ModelNames.ADMIN, 'associatedData.type': 'metaData' }) as
        AdminMetaDataGeneral;

    if (AdminMetaData) {
        await GeneralModel.findByIdAndUpdate(AdminMetaData._id,
            {
                'associatedData.metaData.lastLoginDate': new Date(),
            }
        );
    }

    return {
        success: true,
        message: 'user signed in succesfully',
        data: admin,
        token,
    };
};
