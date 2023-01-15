import { TaskRepositoryInMemory } from "@modules/tasks/repositories/in-memory/TaskRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { FinishTaskUseCase } from "./FinishTaskUseCase";

let taskRepositoryInMemory: TaskRepositoryInMemory;
let finishTaskUseCase: FinishTaskUseCase;

describe("Finish Task", () => {
  beforeEach(() => {
    taskRepositoryInMemory = new TaskRepositoryInMemory();
    finishTaskUseCase = new FinishTaskUseCase(taskRepositoryInMemory);
  });

  it("should be able to finish a task", async () => {
    const task = await taskRepositoryInMemory.create({
      name: "Test task",
      person: "John Doe",
      end_date: new Date(),
      project_id: "id_test",
    });

    await finishTaskUseCase.execute({ id: task.id });

    const result = await taskRepositoryInMemory.findById(task.id);

    expect(result.finished).toBe(true);
  });

  it("should not be able to finish a finished task", async () => {
    expect(async () => {
      const task = await taskRepositoryInMemory.create({
        name: "Test task",
        person: "John Doe",
        end_date: new Date(),
        project_id: "id_test",
      });

      await finishTaskUseCase.execute({ id: task.id });

      await finishTaskUseCase.execute({ id: task.id });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to finish a inexistent task", async () => {
    expect(async () => {
      await finishTaskUseCase.execute({ id: "inexistent_id" });
    }).rejects.toBeInstanceOf(AppError);
  });
});
