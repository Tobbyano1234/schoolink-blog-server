// import { Joi } from "celebrate";
// import { toObjectId } from "../../../famwork-shared/validateToObjectID";


// export default {
//     createTask: {
//         body: Joi.object({
//             title: Joi.string().required(),
//             description: Joi.string().max(500).required(),
//             dueDate: Joi.date().required(),
//         })
//     },
//     getTask: {
//         params: {
//             taskID: Joi.string().custom(toObjectId).required(),
//         }
//     },
//     updateTask: {
//         body: Joi.object({
//             title: Joi.string().required(),
//             description: Joi.string().max(500).required(),
//             dueDate: Joi.date().required(),
//             status: Joi.string().required(),
//         }),
//         params: {
//             taskID: Joi.string().custom(toObjectId).required(),
//         }
//     },

//     deleteTask: {
//         params: {
//             taskID: Joi.string().custom(toObjectId).required(),
//         }
//     },
//     getPagination: {
//         query: {
//             page: Joi.number(),
//             limit: Joi.number(),
//         }
//     },
// };