// import { Types } from 'mongoose';
// import { config } from '../../unboxd-web-api/config';
// import { daysFromDay } from '../../unboxd-shared/time';
// import { DeactivateAccountDTO } from '../DTOs/deactivateAccount.DTO';
// import { VerifyUserPasswordPipe } from './passwordManager.seller.service';
// import { getUserService } from '../../unboxd-accounts/user/services';
// import { TaskExecutionContext, WalletModel } from '../../unboxd-entities';
// import { scheduleDeactivateAccountTask } from '../../unboxd-tasks/tasks/account.deactivate.task';


// export const DeactivateAccountPipe = async (DeactivateAccountDTO: DeactivateAccountDTO) => {
//   const {userID, email, password} = DeactivateAccountDTO;
//   const user = await getUserService({email}, {shouldPopulate: false});
//   await VerifyUserPasswordPipe({oldPassword: password, email, computedProps: {_user: user}});
//   if (String(user._id) !== String(userID)) throw new Error(`Attempt to deactivate another user's account`);
//   // check if user still has wishlist with positive balance
//   const positiveWalletBalance = await WalletModel.exists({userID: new Types.ObjectId(userID), 'balance.Naira': {$gt: 0}});
//   if (positiveWalletBalance) throw new Error(`cannot deactivate account with positvie wallet balace`);
//   if (!user.isDeactivatedAccount){
//     await scheduleDeactivateAccountTask(
//       {associatedData: {userID: new Types.ObjectId(userID), email, password}, executionTime: daysFromDay(config.defaults.daysToEffectAccountDeactivation), executionContext: TaskExecutionContext.CONTROLLER});
//   }
//   return {success: true, message: `account deactivation in progress`, data: user, hookData: user};
// };
