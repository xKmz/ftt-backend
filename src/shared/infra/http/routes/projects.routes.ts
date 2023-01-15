import { Router } from "express";

import { CreateProjectController } from "@modules/projects/useCases/createProject/CreateProjectController";
import { DeleteProjectController } from "@modules/projects/useCases/deleteProject/DeleteProjectController";
import { ListProjectsController } from "@modules/projects/useCases/listProjects/ListProjectsController";

const projectsRoutes = Router();

const createProjectController = new CreateProjectController();
const listProjectsController = new ListProjectsController();
const deleteProjectsController = new DeleteProjectController();

projectsRoutes.post("/", createProjectController.handle);
projectsRoutes.get("/", listProjectsController.handle);
projectsRoutes.delete("/:id", deleteProjectsController.handle);

export { projectsRoutes };
