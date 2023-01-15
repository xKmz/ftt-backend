import { inject, injectable } from "tsyringe";

import { ITasksRepository } from "@modules/tasks/repositories/ITasksRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
}

@injectable()
class FinishTaskUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository,
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const taskExists = await this.tasksRepository.findById(id);

    if (!taskExists) {
      throw new AppError("Task does not exists");
    }

    if (taskExists.finished === true) {
      throw new AppError(
        "It is not possible to finish a task that has already been finished",
      );
    }

    await this.tasksRepository.finishTask(id, true);
  }
}

export { FinishTaskUseCase };
