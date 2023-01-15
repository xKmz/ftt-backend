import { Repository } from "typeorm";

import { ICreateTaskDTO } from "@modules/tasks/dtos/ICreateTaskDTO";
import { Task } from "@modules/tasks/infra/typeorm/entities/Task";
import { ITasksRepository } from "@modules/tasks/repositories/ITasksRepository";
import dataSource from "@shared/infra/typeorm";

class TasksRepository implements ITasksRepository {
  private repository: Repository<Task>;

  constructor() {
    this.repository = dataSource.getRepository(Task);
  }

  async create({
    name,
    person,
    end_date,
    project_id,
  }: ICreateTaskDTO): Promise<Task> {
    const task = this.repository.create({
      name,
      person,
      end_date,
      project_id,
    });

    await this.repository.save(task);

    return task;
  }

  async findByName(name: string): Promise<Task> {
    const task = await this.repository.findOneBy({ name });

    return task;
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.repository.find();

    return tasks;
  }

  async findTaskByProjectId(project_id: string): Promise<Task[]> {
    const filteredQuery = await this.repository
      .createQueryBuilder("t")
      .where("project_id = :project_id", { project_id });

    const tasks = await filteredQuery.getMany();

    return tasks;
  }

  async findById(id: string): Promise<Task> {
    const task = await this.repository.findOneBy({ id });

    return task;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async finishTask(id: string, finished: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ finished })
      .where("id = :id")
      .setParameters({ id })
      .execute();
  }
}

export { TasksRepository };
