import { accessControl } from './accessControl.service';
import { authTokenService } from './authToken.service';
import { headerBearerToken } from './policies.service';
import { AccountTokenType, AccountType } from '../../typings/Account.types';


export class AuthMiddleware {
  static IsUser = (token?: AccountTokenType) => accessControl({AccountTypes: [AccountType.USER], token});
  static IsUserMiddleware = AuthMiddleware.IsUser();

  static IsAdmin = (token?: AccountTokenType) => accessControl({AccountTypes: [AccountType.ADMIN], token});
  static IsAdminMiddleware = AuthMiddleware.IsAdmin();

  static IsUserOrAdmin = (token?: AccountTokenType) => accessControl({AccountTypes: [AccountType.USER, AccountType.ADMIN], token});
    static IsUserOrAdminMiddleware = AuthMiddleware.IsUserOrAdmin();

  static baseAuthToken = authTokenService({
    authPolicy: headerBearerToken,
    allowExternalAccess: false
  });
}
