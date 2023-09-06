import { AccountTokenType } from '../Account.types';

declare global {
  export namespace Express {
    interface Request {
      token: AccountTokenType;
    }
  }
}
