import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateProjectUseCase } from "./CreateProjectUseCase";

class CreateProjectController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createProjectUseCase = container.resolve(CreateProjectUseCase);

    const project = await createProjectUseCase.execute({ name, description });

    return response.status(201).json(project);
  }
}

export { CreateProjectController };
