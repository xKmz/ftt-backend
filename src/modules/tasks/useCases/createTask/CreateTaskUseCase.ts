import { inject, injectable } from "tsyringe";

import { Task } from "@modules/tasks/infra/typeorm/entities/Task";
import { ITasksRepository } from "@modules/tasks/repositories/ITasksRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  person: string;
  end_date: Date;
  project_id: string;
}

@injectable()
class CreateTaskUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository,
  ) {}

  async execute({
    name,
    person,
    end_date,
    project_id,
  }: IRequest): Promise<Task> {
    const taskAlreadyExists = await this.tasksRepository.findByName(name);

    if (taskAlreadyExists) {
      throw new AppError("Task already exists");
    }

    const task = await this.tasksRepository.create({
      name,
      person,
      end_date,
      project_id,
    });

    return task;
  }
}

export { CreateTaskUseCase };
