import { Project } from "@modules/projects/infra/typeorm/entities/Project";

import { ICreateProjectDTO, IProjectsRepository } from "../IProjectsRepository";

class ProjectsRepositoryInMemory implements IProjectsRepository {
  projects: Project[] = [];

  async create({ name, description }: ICreateProjectDTO): Promise<Project> {
    const project = new Project();

    Object.assign(project, {
      name,
      description,
    });

    this.projects.push(project);

    return project;
  }

  async list(): Promise<Project[]> {
    const all = this.projects;
    return all;
  }

  async findByName(name: string): Promise<Project> {
    const project = this.projects.find(project => project.name === name);
    return project;
  }

  async findById(id: string): Promise<Project> {
    const project = this.projects.find(project => project.id === id);
    return project;
  }

  async delete(id: string): Promise<void> {
    const projectIndex = this.projects.findIndex(project => project.id === id);

    this.projects.splice(projectIndex, 1);
  }
}

export { ProjectsRepositoryInMemory };
