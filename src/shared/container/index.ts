import { container } from "tsyringe";

import { ProjectsRepository } from "@modules/projects/infra/typeorm/repositories/ProjectsRepository";
import { IProjectsRepository } from "@modules/projects/repositories/IProjectsRepository";
import { TasksRepository } from "@modules/tasks/infra/typeorm/repositories/TasksRepository";
import { ITasksRepository } from "@modules/tasks/repositories/ITasksRepository";

container.registerSingleton<IProjectsRepository>(
  "ProjectsRepository",
  ProjectsRepository,
);

container.registerSingleton<ITasksRepository>(
  "TasksRepository",
  TasksRepository,
);
