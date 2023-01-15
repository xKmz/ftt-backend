import { TaskRepositoryInMemory } from "@modules/tasks/repositories/in-memory/TaskRepositoryInMemory";

import { ListTasksByProjectIdUseCase } from "./ListTasksByProjectIdUseCase";

let tasksRepositoryInMemory: TaskRepositoryInMemory;
let listTasksByProjectIdUseCase: ListTasksByProjectIdUseCase;

describe("List Tasks By Id", () => {
  beforeEach(() => {
    tasksRepositoryInMemory = new TaskRepositoryInMemory();
    listTasksByProjectIdUseCase = new ListTasksByProjectIdUseCase(
      tasksRepositoryInMemory,
    );
  });

  it("should be able to list all tasks by project id", async () => {
    const task = await tasksRepositoryInMemory.create({
      name: "first task",
      person: "John Doe",
      end_date: new Date(),
      project_id: "cbcfb998-5ff9-4d47-8769-a420b35844c8",
    });

    const tasks = await listTasksByProjectIdUseCase.execute(task.project_id);

    expect(tasks).toEqual([task]);
  });
});
