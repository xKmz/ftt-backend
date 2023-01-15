import { inject, injectable } from "tsyringe";

import { Project } from "@modules/projects/infra/typeorm/entities/Project";
import { IProjectsRepository } from "@modules/projects/repositories/IProjectsRepository";

@injectable()
class ListProjectsUseCase {
  constructor(
    @inject("ProjectsRepository")
    private projectsRepository: IProjectsRepository,
  ) {}

  async execute(): Promise<Project[]> {
    const projects = await this.projectsRepository.list();

    return projects;
  }
}

export { ListProjectsUseCase };
