import { ProjectsRepositoryInMemory } from "@modules/projects/repositories/in-memory/ProjectsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateProjectUseCase } from "./CreateProjectUseCase";

let createProjectUseCase: CreateProjectUseCase;
let projectsRepositoryInMemory: ProjectsRepositoryInMemory;

describe("Create Project", () => {
  beforeEach(() => {
    projectsRepositoryInMemory = new ProjectsRepositoryInMemory();
    createProjectUseCase = new CreateProjectUseCase(projectsRepositoryInMemory);
  });

  it("should be able to create a new project", async () => {
    const project = {
      name: "Project test",
      description: "Project description test",
    };

    await createProjectUseCase.execute({
      name: project.name,
      description: project.description,
    });

    const projectCreated = await projectsRepositoryInMemory.findByName(
      project.name,
    );

    expect(projectCreated).toHaveProperty("id");
  });

  it("should not be able to create a new project when name exists", () => {
    expect(async () => {
      const project = {
        name: "Project test",
        description: "Project description test",
      };

      await createProjectUseCase.execute({
        name: project.name,
        description: project.description,
      });

      await createProjectUseCase.execute({
        name: project.name,
        description: project.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
