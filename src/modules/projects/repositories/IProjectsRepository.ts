import { Project } from "@modules/projects/infra/typeorm/entities/Project";

interface ICreateProjectDTO {
  name: string;
  description: string;
}

interface IProjectsRepository {
  findByName(name: string): Promise<Project>;
  list(): Promise<Project[]>;
  create({ name, description }: ICreateProjectDTO): Promise<Project>;
  findById(id: string): Promise<Project>;
  delete(id: string): Promise<void>;
}

export { IProjectsRepository, ICreateProjectDTO };
