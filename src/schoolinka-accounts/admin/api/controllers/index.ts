import { Request } from 'express';
import httpStatus from 'http-status';

import { BaseController } from '../../../../famwork-shared/api';
import { getAdminService } from '../../services';


export class AdminController {

    static getUser = BaseController(async (request: Request) => {
        const adminID = request.params.adminID;
        const user = await getAdminService({ adminID }, { onAdminNotFound: () => { } });
        return {
            status: httpStatus.OK,
            message: "admin fetched successfully",
            data: user,
        };
    });
}
