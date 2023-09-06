// import { UserType } from '../../../types/user';
// import GroupInterface from '../../../types/group';


// export interface inviteMailType {
//   (
//     userData: {
//       user?: UserType;
//       email?: string;
//       group: GroupInterface;
//     }
//   ) : Promise<void>;
// }

export type MailAccount = {
  email: string;
  firstName: string;
  lastName: string;
};

