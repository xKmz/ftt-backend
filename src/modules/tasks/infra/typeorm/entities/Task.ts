import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Project } from "@modules/projects/infra/typeorm/entities/Project";

@Entity("tasks")
class Task {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  person: string;

  @Column()
  end_date: Date;

  @Column()
  finished: boolean;

  @ManyToOne(() => Project)
  @JoinColumn({ name: "project_id" })
  project: Project;

  @Column()
  project_id: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.finished = false;
    }
  }
}

export { Task };
