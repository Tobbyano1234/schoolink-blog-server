// import { AuthMiddleware } from "../../../famwork-auth/middlewares";
// import { baseRouter, baseValidation } from "../../../famwork-shared/api";
// import { TaskController } from "../controllers";
// import taskValidation from "../validations"

// const { POST, GET, PUT, DELETE, router } = baseRouter();

// POST("/", [baseValidation(taskValidation.createTask), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, TaskController.createTask]);
// PUT("/:taskID", [baseValidation(taskValidation.updateTask), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, TaskController.updateTask]);
// DELETE("/:taskID", [baseValidation(taskValidation.deleteTask), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, TaskController.deleteTask]);
// GET("/:taskID", [baseValidation(taskValidation.getTask), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, TaskController.getTaskByID]);
// GET("/", [AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, TaskController.getAllTasks]);
// GET("/pagination/all", [baseValidation(taskValidation.getPagination), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, TaskController.getTaskPagination]);

// export default router;