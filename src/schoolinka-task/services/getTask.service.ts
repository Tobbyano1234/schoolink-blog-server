import { TaskModel } from "../../famwork-entities";
import { GetAllTasksDTO, GetTaskDTO } from "../DTOs/GetTaskDTO";


export const getTaskByIDService = async ({ taskID }: GetTaskDTO, { onTaskNotFound = ({ taskID }: GetTaskDTO): void => { throw new Error(`task ${taskID} not found`) } }) => {
    const singleTask = await TaskModel.findOne({ _id: taskID });
    if (!singleTask) onTaskNotFound({ taskID });

    return { success: true, message: `task fetched successfully`, data: singleTask };
};

export const getAllTasksService = async ({ userID }: GetAllTasksDTO) => {
    const tasks = await TaskModel.find({ userID });
    if (tasks.length === 0) return {
        success: true, message: `you don't have any task`, data: tasks
    };

    return { success: true, message: `all tasks fetched successfully`, data: tasks };
};
