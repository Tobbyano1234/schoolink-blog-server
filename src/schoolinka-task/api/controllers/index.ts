import { Request } from "express";
import httpStatus from "http-status";

import { BaseController } from "../../../famwork-shared/api";
import { CreateTaskDTO, UpdateTaskDTO, DeleteTaskDTO } from "../../DTOs";
import { createTaskService, updateTaskService, deleteTaskService, getAllTasksService, getTaskByIDService, getTaskPaginationService } from "../../services";

export class TaskController {
    static createTask = BaseController(async (request: Request) => {
        const CreateTaskDTO = request.body as CreateTaskDTO;
        const userID = (request as any).token._id;
        CreateTaskDTO.userID = userID;
        const { success, message, data } = await createTaskService(CreateTaskDTO);
        return { status: success ? httpStatus.CREATED : httpStatus.BAD_REQUEST, message, data };
    });

    static getTaskByID = BaseController(async (request: Request) => {
        const taskID = request.params.taskID;
        const { success, message, data } = await getTaskByIDService({ taskID }, { onTaskNotFound: () => { } });
        return { status: success ? httpStatus.OK : httpStatus.BAD_REQUEST, message, data };

    });

    static getAllTasks = BaseController(async (request: Request) => {
        const userID = (request as any).token._id;
        const { success, message, data } = await getAllTasksService({ userID });
        return { status: success ? httpStatus.OK : httpStatus.BAD_REQUEST, message, data };
    });

    static getTaskPagination = BaseController(async (request: Request) => {
        const GetProductTableDTO = request.query;
        const { success, message, data } = await getTaskPaginationService(GetProductTableDTO);
        return { status: success ? httpStatus.OK : httpStatus.BAD_REQUEST, message, data };
    });

    static updateTask = BaseController(async (request: Request) => {
        const taskID = request.params.taskID;
        const UpdateTaskDTO = { taskID, ...request.body } as UpdateTaskDTO;
        const { success, message, data } = await updateTaskService(UpdateTaskDTO);
        return { status: success ? httpStatus.OK : httpStatus.BAD_REQUEST, message, data };
    });

    static deleteTask = BaseController(async (request: Request) => {
        const taskID = request.params.taskID;
        const DeleteTaskDTO = { taskID } as DeleteTaskDTO;
        const { success, message } = await deleteTaskService(DeleteTaskDTO);
        return { status: success ? httpStatus.OK : httpStatus.BAD_REQUEST, message };
    });
}