import { TaskModel } from "../../famwork-entities";
import { DeleteTaskDTO } from "../DTOs/DeleteTaskDTO";
import { getTaskByIDService } from "./getTask.service";

export const deleteTaskService = async (DeleteTaskDTO: DeleteTaskDTO) => {
    const { taskID } = DeleteTaskDTO;
    const { data: task } = await getTaskByIDService({ taskID }, { onTaskNotFound: () => { } });
    if (!task) return {
        success: false, message: `task with ${taskID} does not found`, data: null
    };
    const { _id } = task;
    const deletedTask = await TaskModel.findByIdAndDelete(_id);
    return { success: true, message: `task deleted successfully`, data: deletedTask }
}