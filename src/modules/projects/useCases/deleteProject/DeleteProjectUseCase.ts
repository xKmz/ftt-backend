import { inject, injectable } from "tsyringe";

import { IProjectsRepository } from "@modules/projects/repositories/IProjectsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
}

@injectable()
class DeleteProjectUseCase {
  constructor(
    @inject("ProjectsRepository")
    private projectsRepository: IProjectsRepository,
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const projectExists = await this.projectsRepository.findById(id);

    if (!projectExists) {
      throw new AppError("Project does not exists");
    }

    await this.projectsRepository.delete(id);
  }
}

export { DeleteProjectUseCase };
