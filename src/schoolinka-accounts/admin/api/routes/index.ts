import userValidation from '../validations';
import { AdminController } from '../controllers';
import { AuthMiddleware } from '../../../../famwork-auth/middlewares';
import { baseRouter, baseValidation } from '../../../../famwork-shared/api';
// import { singleFileUploadMiddleware } from '../../../../famwork-shared/fileUpload';


const { GET, router } = baseRouter();

// PUT('/profile', [ singleFileUploadMiddleware.single('avatar'), baseValidation(userValidation.updateProfile), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, AdminController.updateProfile ]);

GET('/:adminID', [baseValidation(userValidation.get), AuthMiddleware.baseAuthToken, AuthMiddleware.IsAdminMiddleware, AdminController.getUser]);

export default router;
