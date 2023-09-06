import { ObjectId } from "mongodb";

export type GetTaskDTO = {
    taskID: string | ObjectId;
};

export type GetAllTasksDTO = {
    userID: string | ObjectId;
};

