import { inject, injectable } from "tsyringe";

import { Project } from "@modules/projects/infra/typeorm/entities/Project";
import { IProjectsRepository } from "@modules/projects/repositories/IProjectsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateProjectUseCase {
  constructor(
    @inject("ProjectsRepository")
    private projectsRepository: IProjectsRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<Project> {
    const projectAlreadyExists = await this.projectsRepository.findByName(name);

    if (projectAlreadyExists) {
      throw new AppError("Project already exists");
    }

    const project = this.projectsRepository.create({ name, description });

    return project;
  }
}

export { CreateProjectUseCase };
