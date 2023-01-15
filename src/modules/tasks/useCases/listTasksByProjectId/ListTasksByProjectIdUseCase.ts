import { inject, injectable } from "tsyringe";

import { Task } from "@modules/tasks/infra/typeorm/entities/Task";
import { ITasksRepository } from "@modules/tasks/repositories/ITasksRepository";

@injectable()
class ListTasksByProjectIdUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository,
  ) {}

  async execute(project_id: string): Promise<Task[]> {
    const all = await this.tasksRepository.findTaskByProjectId(project_id);

    return all;
  }
}

export { ListTasksByProjectIdUseCase };
