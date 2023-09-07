// import { TaskModel } from "../../famwork-entities";
// import { UpdateTaskDTO } from "../DTOs/UpdateTaskDTO";
// import { getTaskByIDService } from "./getTask.service";

// export const updateTaskService = async (UpdateTaskDTO: UpdateTaskDTO) => {
//     const { taskID, title, description, dueDate, status } = UpdateTaskDTO;
//     let newTitle: string, newDescription: string, newDueDate: Date, newStatus: string;
//     const { data: task } = await getTaskByIDService({ taskID }, { onTaskNotFound: () => { } });
//     if (!task) return {
//         success: false, message: `task with ${taskID} does not found`, data: null
//     };
//     const { _id, title: _title, description: _description, dueDate: _dueDate, status: _status } = task;
//     newTitle = title || _title;
//     newDescription = description || _description;
//     newDueDate = dueDate || _dueDate;
//     newStatus = status || _status;
//     const updatedTask = await TaskModel.findByIdAndUpdate(_id, { title: newTitle, description: newDescription, dueDate: newDueDate, status: newStatus }, { new: true });
//     return { success: true, message: `task updated successfully`, data: updatedTask }
// };

// // export const updateTask = async (UpdateTaskDTO: UpdateTaskDTO) => {
// //     const { taskID, name, description, price, imageUrl } = UpdateTaskDTO;
// //     let newName: string, newDescription: string, newPrice: number, newImageUrl: string;
// //     const { data: task } = await getTaskByIDService({ taskID });
// //     const { _id, name: _name, description: _description, price: _price, imageUrl: _imageUrl } = task;
// //     newName = name || _name;
// //     newDescription = description || _description;
// //     newPrice = price || _price;
// //     newImageUrl = imageUrl || _imageUrl;
// //     const updatedTask = await TaskModel.findByIdAndUpdate(_id, { name: newName, description: newDescription, price: newPrice, imageUrl: newImageUrl }, { new: true });
// //     return { status: httpStatus.OK, message: `product updated successfully`, data: updatedTask }
// // };