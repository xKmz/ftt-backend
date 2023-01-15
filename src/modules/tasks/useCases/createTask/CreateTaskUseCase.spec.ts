import { TaskRepositoryInMemory } from "@modules/tasks/repositories/in-memory/TaskRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateTaskUseCase } from "./CreateTaskUseCase";

let createTaskUseCase: CreateTaskUseCase;
let taskRepositoryInMemory: TaskRepositoryInMemory;

describe("Create Task", () => {
  beforeEach(() => {
    taskRepositoryInMemory = new TaskRepositoryInMemory();
    createTaskUseCase = new CreateTaskUseCase(taskRepositoryInMemory);
  });

  it("should be able to create a task", async () => {
    const task = await createTaskUseCase.execute({
      name: "Test task",
      person: "John Doe",
      end_date: new Date(),
      project_id: "id_test",
    });

    expect(task).toHaveProperty("id");
  });

  it("sould not be able to create a task when name exists", () => {
    expect(async () => {
      await createTaskUseCase.execute({
        name: "Test task",
        person: "John Doe",
        end_date: new Date(),
        project_id: "id_test",
      });

      await createTaskUseCase.execute({
        name: "Test task",
        person: "John Three",
        end_date: new Date(),
        project_id: "id_test2",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("sould not be able to create a task with finished true", async () => {
    const task = await createTaskUseCase.execute({
      name: "Test task",
      person: "John Doe",
      end_date: new Date(),
      project_id: "id_test",
    });

    expect(task.finished).toBe(false);
  });
});
