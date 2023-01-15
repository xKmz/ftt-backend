import { Repository } from "typeorm";

import { Project } from "@modules/projects/infra/typeorm/entities/Project";
import {
  ICreateProjectDTO,
  IProjectsRepository,
} from "@modules/projects/repositories/IProjectsRepository";
import dataSource from "@shared/infra/typeorm";

class ProjectsRepository implements IProjectsRepository {
  private repository: Repository<Project>;

  constructor() {
    this.repository = dataSource.getRepository(Project);
  }

  async create({ name, description }: ICreateProjectDTO): Promise<Project> {
    const project = this.repository.create({
      name,
      description,
    });

    await this.repository.save(project);

    return project;
  }

  async list(): Promise<Project[]> {
    const projects = await this.repository.find();
    return projects;
  }

  async findByName(name: string): Promise<Project> {
    const project = await this.repository.findOneBy({ name });
    return project;
  }

  async findById(id: string): Promise<Project> {
    const project = await this.repository.findOneBy({ id });
    return project;
  }

  async delete(id: string): Promise<void> {
    this.repository.delete(id);
  }
}

export { ProjectsRepository };
