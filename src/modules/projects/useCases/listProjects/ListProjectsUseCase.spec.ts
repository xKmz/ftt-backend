import { ProjectsRepositoryInMemory } from "@modules/projects/repositories/in-memory/ProjectsRepositoryInMemory";

import { ListProjectsUseCase } from "./ListProjectsUseCase";

let listProjectsUseCase: ListProjectsUseCase;
let projectsRepositoryInMemory: ProjectsRepositoryInMemory;

describe("List Projects", () => {
  beforeEach(() => {
    projectsRepositoryInMemory = new ProjectsRepositoryInMemory();
    listProjectsUseCase = new ListProjectsUseCase(projectsRepositoryInMemory);
  });

  it("should be able to list projects", async () => {
    const project = await projectsRepositoryInMemory.create({
      name: "Project test",
      description: "Project description test",
    });

    const projects = await listProjectsUseCase.execute();

    expect(projects).toContain(project);
  });
});
