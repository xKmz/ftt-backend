import { TaskRepositoryInMemory } from "@modules/tasks/repositories/in-memory/TaskRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { DeleteTaskUseCase } from "./DeleteTaskUseCase";

let taskRepositoryInMemory: TaskRepositoryInMemory;
let deleteTaskUseCase: DeleteTaskUseCase;

describe("Delete Task", () => {
  beforeEach(() => {
    taskRepositoryInMemory = new TaskRepositoryInMemory();
    deleteTaskUseCase = new DeleteTaskUseCase(taskRepositoryInMemory);
  });

  it("should be able to delete a task", async () => {
    const task = await taskRepositoryInMemory.create({
      name: "Test task",
      person: "John Doe",
      end_date: new Date(),
      project_id: "id_test",
    });

    await taskRepositoryInMemory.create({
      name: "Test second task",
      person: "John Three",
      end_date: new Date(),
      project_id: "id_test",
    });

    await deleteTaskUseCase.execute({ id: task.id });

    const result = taskRepositoryInMemory.findById(task.id);

    expect(result).toMatchObject({});
  });

  it("should not be able to delete a inexistent task", async () => {
    expect(async () => {
      const taskId = "test_id";

      await deleteTaskUseCase.execute({ id: taskId });
    }).rejects.toBeInstanceOf(AppError);
  });
});
