import userValidation from '../validations';
import { UserController } from '../controllers';
import { AuthMiddleware } from '../../../../famwork-auth/middlewares';
import { baseRouter, baseValidation } from '../../../../famwork-shared/api';
import { singleFileUploadMiddleware } from '../../../../famwork-shared/fileUpload';


const { PUT, GET, DELETE, router } = baseRouter();

PUT('/profile', [singleFileUploadMiddleware.single('avatar'), baseValidation(userValidation.updateProfile), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, UserController.updateProfile]);
DELETE('/:userID', [baseValidation(userValidation.deleteProfile), AuthMiddleware.baseAuthToken, AuthMiddleware.IsAdminMiddleware, UserController.deleteUser]);
GET('/:userID', [baseValidation(userValidation.get), UserController.getUser]);


export default router;
