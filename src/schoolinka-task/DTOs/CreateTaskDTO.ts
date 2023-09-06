import { ObjectId } from "mongodb";

export type CreateTaskDTO = {
    userID: string | ObjectId;
    title: string;
    description: string;
    dueDate: number;
};