import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTasks1673622020174 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tasks",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "person",
            type: "varchar",
          },
          {
            name: "end_date",
            type: "date",
          },
          {
            name: "finished",
            type: "boolean",
            default: false,
          },
          {
            name: "project_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKProjectTask",
            referencedTableName: "projects",
            referencedColumnNames: ["id"],
            columnNames: ["project_id"],
            onDelete: "CASCADE",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("tasks");
  }
}
