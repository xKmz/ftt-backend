import { Router } from "express";

import { CreateTaskController } from "@modules/tasks/useCases/createTask/CreateTaskController";
import { DeleteTaskController } from "@modules/tasks/useCases/deleteTask/DeleteTaskController";
import { FinishTaskController } from "@modules/tasks/useCases/finishTask/FinishTaskController";
import { ListTasksByProjectIdController } from "@modules/tasks/useCases/listTasksByProjectId/ListTasksByProjectIdController";

const tasksRoutes = Router();

const createTaskController = new CreateTaskController();
const listTasksByProjectIdController = new ListTasksByProjectIdController();
const deleteTaskController = new DeleteTaskController();
const finishTaskController = new FinishTaskController();

tasksRoutes.post("/", createTaskController.handle);
tasksRoutes.get("/", listTasksByProjectIdController.handle);
tasksRoutes.delete("/:id", deleteTaskController.handle);
tasksRoutes.put("/:id", finishTaskController.handle);

export { tasksRoutes };
