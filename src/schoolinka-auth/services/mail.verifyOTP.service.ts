import bcrypt from 'bcrypt';

import { MailVerifyOtpDTO } from "../DTOs/verifyOtp.DTO";
import { verifyOtp } from "../plugins";
import { Admin, AdminModel, User, UserModel, GeneralModel, ModelNames } from '../../famwork-entities';
import { UserMetaDataGeneral } from '../../typings/User.types';
import { timeDifferenceInSeconds } from '../../famwork-shared/time';
import { issueToken } from '../plugins/token.plugin';
import { AccountType } from '../../typings/Account.types';
import { sendRegistrationMail } from '../../famwork-shared/mail/sendRegistrationMail';
import { getAdminService } from '../../famwork-accounts/admin/services';
import { AdminMetaDataGeneral } from '../../typings/Admin.types';
import { getUserService } from '../../famwork-accounts/user/services';

export const MailVerifyUserOtpService = async ({ email, newPassword, otp, type }: MailVerifyOtpDTO) => {
  const user = await getUserService({ email }, { onUserNotFound: () => { } }) as User;
  if (!user) return { success: false, message: 'user not found' };

  const { _id } = user;
  const getOtp = await verifyOtp(email, otp);
  if (!getOtp) return { success: false, message: 'otp expired or incorrect', data: null };

  if (type === 'reset' && newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const data = await UserModel.findByIdAndUpdate(_id, { password: hashedPassword }, { new: true }) as User;
    await GeneralModel.findOneAndUpdate(
      { collectionID: _id, collectionName: ModelNames.USER, 'associatedData.type': 'metaData' },
      {
        $push: { 'associatedData.metaData.passwordChangedAt': [new Date()] }
      },
      { new: true }
    );

    const UserMetaData = await GeneralModel.findOne(
      { collectionID: _id, collectionName: ModelNames.USER, 'associatedData.type': 'metaData' }) as
      UserMetaDataGeneral;
    if (UserMetaData) {
      const verifiedAt = UserMetaData.associatedData.metaData.verifiedAt;
      if (timeDifferenceInSeconds(verifiedAt) <= 30) {
        await sendRegistrationMail({ email: user.email, firstName: user.firstName, lastName: user.lastName });
      }
    };

    return { success: true, message: 'password change successfully', data };
  } else {
    const data = await UserModel.findByIdAndUpdate(_id,
      { isVerified: true }, { new: true }) as User;
    await GeneralModel.findOneAndUpdate(
      { collectionID: _id, collectionName: ModelNames.USER, 'associatedData.type': 'metaData' },
      {
        'associatedData.metaData.verifiedAt': new Date(),
      },
      { new: true }
    );
    const token = await issueToken({ accountType: AccountType.USER, _id, issuedAt: Date.now(), email });

    const UserMetaData = await GeneralModel.findOne(
      { collectionID: _id, collectionName: ModelNames.USER, 'associatedData.type': 'metaData' }) as
      UserMetaDataGeneral;
    if (UserMetaData) {
      const verifiedAt = UserMetaData.associatedData.metaData.verifiedAt;
      if (timeDifferenceInSeconds(verifiedAt) <= 30) {
        await sendRegistrationMail({ email: user.email, firstName: user.firstName, lastName: user.lastName });
      }
    };

    return { success: true, message: 'user verified successfully', data, token };
  }
};

export const MailVerifyAdminOtpService = async ({ email, newPassword, otp, type }: MailVerifyOtpDTO) => {
  const admin = await getAdminService({ email }, { withPassword: false, onAdminNotFound: () => { } });
  const { _id } = admin;

  const getOtp = await verifyOtp(email, otp);
  if (!getOtp) return { success: false, message: 'Otp expired or incorrect', data: null, hookData: null };

  if (type === 'reset' && newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const data = await AdminModel.findByIdAndUpdate(_id, { password: hashedPassword }, { new: true }) as Admin;
    await GeneralModel.findOneAndUpdate(
      { collectionID: _id, collectionName: ModelNames.ADMIN, 'associatedData.type': 'metaData' },
      {
        $push: { 'associatedData.metaData.passwordChangedAt': [new Date()] }
      },
      { new: true }
    );

    const AdminMetaData = await GeneralModel.findOne(
      { collectionID: _id, collectionName: ModelNames.ADMIN, 'associatedData.type': 'metaData' }) as
      AdminMetaDataGeneral;
    if (AdminMetaData) {
      const verifiedAt = AdminMetaData.associatedData.metaData.verifiedAt;
      if (timeDifferenceInSeconds(verifiedAt) <= 30) {
        await sendRegistrationMail({ email: admin.email, firstName: admin.firstName, lastName: admin.lastName });
      }
    }

    return { success: true, message: 'password change successfully', data, hookData: data };
  } else {
    const data = await AdminModel.findByIdAndUpdate(_id,
      { isVerified: true }, { new: true }) as Admin;
    await GeneralModel.findOneAndUpdate(
      { collectionID: _id, collectionName: ModelNames.ADMIN, 'associatedData.type': 'metaData' },
      {
        'associatedData.metaData.verifiedAt': new Date(),
      },
      { new: true }
    );
    const token = await issueToken({ accountType: AccountType.ADMIN, _id, issuedAt: Date.now(), email });

    const AdminMetaData = await GeneralModel.findOne(
      { collectionID: _id, collectionName: ModelNames.ADMIN, 'associatedData.type': 'metaData' }) as
      AdminMetaDataGeneral;
    if (AdminMetaData) {
      const verifiedAt = AdminMetaData.associatedData.metaData.verifiedAt;
      if (timeDifferenceInSeconds(verifiedAt) <= 30) {
        await sendRegistrationMail({ email: admin.email, firstName: admin.firstName, lastName: admin.lastName });
      }
    }

    return { success: true, message: 'success', data, token, hookData: data };
  }
};