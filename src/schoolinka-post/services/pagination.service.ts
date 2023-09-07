// import { TaskModel } from "../../famwork-entities";
// import { GetTaskTableDTO } from "../DTOs/PaginatioDTO";
// import { livePagination, pagination } from "../../famwork-shared/misc/pagination";

// export const getTaskPaginationService = async (GetTaskTableDTO: GetTaskTableDTO) => {
//     const { page, limit: _limit } = GetTaskTableDTO as GetTaskTableDTO;
//     const { skip, limit } = pagination(page, _limit);
//     const test = livePagination(10, page, _limit);
//     console.log("test pagination", test)
//     const tasks = await TaskModel.find().limit(limit).skip(skip);
//     if (tasks.length === 0) throw new Error(`you don't have any tasks`);

//     return { success: true, message: `all tasks fetched successfully`, data: tasks };
// };
