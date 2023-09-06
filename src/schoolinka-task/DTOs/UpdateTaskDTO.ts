import { ObjectId } from "mongodb";

export type UpdateTaskDTO = { taskID: string|ObjectId } & Partial<{
    title: string;
    description: string;
    dueDate: Date;
    status: string;
}>;
