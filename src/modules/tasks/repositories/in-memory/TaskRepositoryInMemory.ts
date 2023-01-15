import { ICreateTaskDTO } from "@modules/tasks/dtos/ICreateTaskDTO";
import { Task } from "@modules/tasks/infra/typeorm/entities/Task";

import { ITasksRepository } from "../ITasksRepository";

class TaskRepositoryInMemory implements ITasksRepository {
  tasks: Task[] = [];

  async create({
    name,
    person,
    end_date,
    project_id,
  }: ICreateTaskDTO): Promise<Task> {
    const task = new Task();

    Object.assign(task, {
      name,
      person,
      end_date,
      project_id,
    });

    this.tasks.push(task);

    return task;
  }

  async findByName(name: string): Promise<Task> {
    const task = this.tasks.find(task => task.name === name);
    return task;
  }

  async findTaskByProjectId(project_id: string): Promise<Task[]> {
    const filtered = this.tasks.filter(task => task.project_id === project_id);
    return filtered;
  }

  async findById(id: string): Promise<Task> {
    const task = this.tasks.find(task => task.id === id);
    return task;
  }

  async delete(id: string): Promise<void> {
    const taskIndex = this.tasks.findIndex(task => task.id === id);

    this.tasks.splice(taskIndex, 1);
  }

  async finishTask(id: string, finished: boolean): Promise<void> {
    const task = this.tasks.find(task => task.id === id);

    task.finished = finished;
  }
}

export { TaskRepositoryInMemory };
