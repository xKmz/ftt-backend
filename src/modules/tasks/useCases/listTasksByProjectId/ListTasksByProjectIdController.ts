import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListTasksByProjectIdUseCase } from "./ListTasksByProjectIdUseCase";

class ListTasksByProjectIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { project_id } = request.query;

    const listTasksByProjectIdUseCase = container.resolve(
      ListTasksByProjectIdUseCase,
    );

    const all = await listTasksByProjectIdUseCase.execute(project_id as string);

    return response.json(all);
  }
}

export { ListTasksByProjectIdController };
