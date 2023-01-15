import { Task } from "@modules/tasks/infra/typeorm/entities/Task";

import { ICreateTaskDTO } from "../dtos/ICreateTaskDTO";

interface ITasksRepository {
  create(data: ICreateTaskDTO): Promise<Task>;
  findByName(name: string): Promise<Task>;
  findTaskByProjectId(project_id: string): Promise<Task[]>;
  findById(id: string): Promise<Task>;
  delete(id: string): Promise<void>;
  finishTask(id: string, finished: boolean): Promise<void>;
}

export { ITasksRepository };
