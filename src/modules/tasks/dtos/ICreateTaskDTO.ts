interface ICreateTaskDTO {
  name: string;
  person: string;
  end_date: Date;
  finished?: boolean;
  project_id: string;
}

export { ICreateTaskDTO };
