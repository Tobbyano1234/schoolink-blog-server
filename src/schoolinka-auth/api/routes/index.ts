import authValidation from '../validations';
import { AuthController } from '../controllers';
import { AuthMiddleware } from '../../../schoolinka-auth/middlewares';
import { baseRouter, baseValidation } from '../../../schoolinka-shared/api';

const { POST, router } = baseRouter();

POST('/signup-user', [baseValidation(authValidation.signUpUser), AuthController.signUpUser]);
POST('/signup-admin', [baseValidation(authValidation.signUpAdmin), AuthController.signUpAdmin]);

// POST('/signin-user', [baseValidation(authValidation.signInUser), AuthController.signInUser]);
POST('/signin-admin', [baseValidation(authValidation.signInAdmin), AuthController.signInAdmin]);

POST('/signin-status', [baseValidation(authValidation.signInStatusUser), AuthController.signInStatus]);

POST('/send-otp-user', [baseValidation(authValidation.sendOtpUser), AuthController.sendBuyerOTP]);
POST('/send-otp-admin', [baseValidation(authValidation.sendOtpAdmin), AuthController.sendAdminOTP]);

POST('/verify-otp-user', [
    baseValidation(authValidation.verifyOtpUser), AuthController.verifyUserOTP]);
POST('/verify-otp-admin', [
    baseValidation(authValidation.verifyOtpAdmin), AuthController.verifyAdminOTP]);

POST('/verify-password-user', [
    baseValidation(authValidation.verifyPasswordUser), AuthController.verifyUserPassword]);
POST('/verify-password-admin', [
    baseValidation(authValidation.verifyPasswordAdmin), AuthController.verifyAdminPassword]);

POST('/verify-email-user', [
    baseValidation(authValidation.verifyEmailUser), AuthController.verifyUserEmail]);
POST('/verify-email-admin', [
    baseValidation(authValidation.verifyEmailAdmin), AuthController.verifyAdminEmail]);

POST('/change-password-user', [baseValidation(authValidation.changePasswordUser), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, AuthController.changeUserPassword]);
POST('/change-password-admin', [baseValidation(authValidation.changePasswordAdmin), AuthMiddleware.baseAuthToken, AuthMiddleware.IsAdminMiddleware, AuthController.changeAdminPassword]);

POST('/reset-password-user', [baseValidation(authValidation.resetPasswordUser), AuthController.resetUserPassword]);
POST('/reset-password-admin', [baseValidation(authValidation.resetPasswordAdmin), AuthController.resetAdminPassword]);

// POST('/deactivate-account-user', [baseValidation(authValidation.deactivateAccount), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, AuthController.deactivateAccount]);
// POST('/suspendAccount/user/:accountID', [AuthMiddleware.baseAuthToken, AuthMiddleware.IsAdminMiddleware, AuthController.suspendUserAccount]);

export default router;
