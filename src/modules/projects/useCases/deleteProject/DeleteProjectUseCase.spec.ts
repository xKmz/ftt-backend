import { ProjectsRepositoryInMemory } from "@modules/projects/repositories/in-memory/ProjectsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { DeleteProjectUseCase } from "./DeleteProjectUseCase";

let projectsRepositoryInMemory: ProjectsRepositoryInMemory;
let deleteProjectUseCase: DeleteProjectUseCase;

describe("Delete Project", () => {
  beforeEach(() => {
    projectsRepositoryInMemory = new ProjectsRepositoryInMemory();
    deleteProjectUseCase = new DeleteProjectUseCase(projectsRepositoryInMemory);
  });

  it("should be able to delete a project", async () => {
    const project = await projectsRepositoryInMemory.create({
      name: "Test project",
      description: "Test project description",
    });

    await projectsRepositoryInMemory.create({
      name: "Test second project",
      description: "Test project description",
    });

    await deleteProjectUseCase.execute({ id: project.id });

    const result = projectsRepositoryInMemory.findById(project.id);

    expect(result).toMatchObject({});
  });

  it("should not be able to delete a inexistent project", async () => {
    expect(async () => {
      const projectId = "test_id";

      await deleteProjectUseCase.execute({ id: projectId });
    }).rejects.toBeInstanceOf(AppError);
  });
});
