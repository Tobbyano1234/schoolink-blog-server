import { ObjectId } from "mongodb";

export type DeleteTaskDTO = {
  taskID: string | ObjectId;
};
