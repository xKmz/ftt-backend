import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateTaskUseCase } from "./CreateTaskUseCase";

class CreateTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, person, end_date, project_id } = request.body;

    const createTaskUseCase = container.resolve(CreateTaskUseCase);

    const task = await createTaskUseCase.execute({
      name,
      person,
      end_date,
      project_id,
    });

    return response.status(201).json(task);
  }
}

export { CreateTaskController };
