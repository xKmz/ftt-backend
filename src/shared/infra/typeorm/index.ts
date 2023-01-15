import { DataSource } from "typeorm";

import { Project } from "@modules/projects/infra/typeorm/entities/Project";
import { Task } from "@modules/tasks/infra/typeorm/entities/Task";
import { CreateProjects1673570079117 } from "@shared/infra/typeorm/migrations/1673570079117-CreateProjects";
import { CreateTasks1673622020174 } from "@shared/infra/typeorm/migrations/1673622020174-CreateTasks";

const dataSource = new DataSource({
  type: "postgres",
  port: 5432,
  username: "docker",
  password: "ftt123",
  database: "ftt",
  entities: [Project, Task],
  migrations: [CreateProjects1673570079117, CreateTasks1673622020174],
});

export function createConnection(host = "database_ftt"): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}

// export function createConnection(): Promise<DataSource> {
//   return dataSource.initialize();
// }

export default dataSource;
